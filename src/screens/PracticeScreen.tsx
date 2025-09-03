import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../components/Card';
import { Card as CardData } from '../constants/cards';
import { getCardWidth } from '../utils/responsive';
import { RootStackParamList } from '../types/navigation';
import { getMoodCards, getTechnicalCards } from '../utils/cardUtils';
import { loadSettings } from '../utils/storage';

type PracticeScreenProps = NativeStackScreenProps<RootStackParamList, 'Practice'> & {
  onCardPress?: (card: CardData) => void;
};

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ route, onCardPress }) => {
  const { drawnCards } = route.params;
  const [currentCards, setCurrentCards] = useState<CardData[]>(drawnCards);

  const constraintCards = currentCards.filter(card => card.suit !== '🎭 Mood');
  const moodCard = currentCards.find(card => card.suit === '🎭 Mood');

  const handleRerollMood = async () => {
    try {
      const allMoodCards = getMoodCards();
      const currentMoodCard = moodCard;

      if (allMoodCards.length > 1) {
        // Filter out the current mood card to ensure we get a different one
        const availableMoodCards = allMoodCards.filter(card => card.id !== currentMoodCard?.id);
        const newMoodCard =
          availableMoodCards[Math.floor(Math.random() * availableMoodCards.length)];

        setCurrentCards(prevCards => {
          const newCards = prevCards.filter(card => card.suit !== '🎭 Mood');
          return [newMoodCard, ...newCards];
        });
      } else {
        Alert.alert('Info', 'Only one mood card available.');
      }
    } catch {
      Alert.alert('Error', 'Unable to reroll mood card.');
    }
  };

  const handleRerollTechnical = async () => {
    try {
      const settings = await loadSettings();
      const allTechnicalCards = getTechnicalCards(settings);
      const currentTechnicalCards = constraintCards;

      if (allTechnicalCards.length > currentTechnicalCards.length) {
        // Group technical cards by suit
        const cardsBySuit: Record<string, CardData[]> = {};
        allTechnicalCards.forEach(card => {
          if (!cardsBySuit[card.suit]) {
            cardsBySuit[card.suit] = [];
          }
          cardsBySuit[card.suit].push(card);
        });

        const availableSuits = Object.keys(cardsBySuit);
        const shuffledSuits = availableSuits.sort(() => Math.random() - 0.5);
        const newTechnicalCards: CardData[] = [];
        const currentCardIds = currentTechnicalCards.map(card => card.id);

        for (let i = 0; i < Math.min(currentTechnicalCards.length, shuffledSuits.length); i++) {
          const suit = shuffledSuits[i];
          const suitCards = cardsBySuit[suit];

          // Filter out current cards to ensure we get different ones
          const availableCardsInSuit = suitCards.filter(card => !currentCardIds.includes(card.id));

          if (availableCardsInSuit.length > 0) {
            const randomCard =
              availableCardsInSuit[Math.floor(Math.random() * availableCardsInSuit.length)];
            newTechnicalCards.push(randomCard);
          } else {
            // If no different cards available in this suit, pick any card from this suit
            const randomCard = suitCards[Math.floor(Math.random() * suitCards.length)];
            newTechnicalCards.push(randomCard);
          }
        }

        setCurrentCards(prevCards => {
          const currentMoodCard = prevCards.find(card => card.suit === '🎭 Mood');
          return currentMoodCard ? [currentMoodCard, ...newTechnicalCards] : newTechnicalCards;
        });
      } else {
        Alert.alert('Info', 'Not enough different cards available for reroll.');
      }
    } catch {
      Alert.alert('Error', 'Unable to reroll technical cards.');
    }
  };

  const cardSize = Math.min(getCardWidth(), 180);

  const renderCard = (card: CardData) => (
    <View key={card.id} style={[styles.cardContainer, { width: cardSize }]}>
      <Card
        card={card}
        onPress={() => onCardPress?.(card)}
        style={{
          minHeight: cardSize * 1.2,
          marginBottom: 0,
        }}
      />
      <TouchableOpacity style={styles.cardRerollButton} onPress={handleRerollTechnical}>
        <Text style={styles.cardRerollButtonText}>🔄</Text>
      </TouchableOpacity>
    </View>
  );

  const getGridLayout = () => {
    const numConstraints = constraintCards.length;
    if (numConstraints <= 2) {
      return { numColumns: 2, constraintRows: 1 };
    } else {
      return { numColumns: 2, constraintRows: 2 };
    }
  };

  const { numColumns } = getGridLayout();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Card - Banner Style */}
        {moodCard && (
          <View style={styles.moodBanner}>
            <View style={styles.moodContent}>
              <Text style={styles.moodTitle}>🎭 Suggested Mood: {moodCard.title}</Text>
              <Text style={styles.moodDescription}>{moodCard.description}</Text>
            </View>
            <TouchableOpacity style={styles.rerollButton} onPress={handleRerollMood}>
              <Text style={styles.rerollButtonText}>🔄</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Constraint Cards Grid */}
        <View style={styles.constraintSection}>
          <View style={[styles.grid, { maxWidth: cardSize * numColumns + 32 }]}>
            {constraintCards.map(card => renderCard(card))}
          </View>
        </View>

        {/* Practice Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipText}>
            💡 Use these constraints as creative guidelines, not strict rules
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  moodBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3f2',
    borderWidth: 1,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    width: '100%',
  },
  moodContent: {
    flex: 1,
  },
  moodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#be185d',
    marginBottom: 2,
  },
  moodDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  constraintSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 32,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  cardContainer: {
    position: 'relative',
  },
  cardRerollButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRerollButtonText: {
    fontSize: 12,
    color: 'white',
  },
  tipsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  rerollButton: {
    padding: 8,
    backgroundColor: '#3b82f6',
    borderRadius: 6,
    marginLeft: 8,
  },
  rerollButtonText: {
    fontSize: 14,
    color: 'white',
  },
});
