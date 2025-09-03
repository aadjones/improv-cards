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
import { drawCards } from '../utils/cardUtils';
import { loadSettings } from '../utils/storage';

type PracticeScreenProps = NativeStackScreenProps<RootStackParamList, 'Practice'> & {
  onCardPress?: (card: CardData) => void;
};

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ route, onCardPress }) => {
  const { drawnCards } = route.params;
  const [currentCards, setCurrentCards] = useState<CardData[]>(drawnCards);

  const constraintCards = currentCards.filter(card => card.suit !== '🎭 Mood');
  const moodCard = currentCards.find(card => card.suit === '🎭 Mood');

  const handleRedraw = async () => {
    try {
      const settings = await loadSettings();
      const newCards = drawCards(settings);
      setCurrentCards(newCards);
    } catch {
      Alert.alert('Error', 'Unable to draw new cards. Please try again.');
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
      {/* Redraw Button */}
      <TouchableOpacity style={styles.redrawButton} onPress={handleRedraw}>
        <Text style={styles.redrawText}>🎲 Redraw Cards</Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Card - Banner Style */}
        {moodCard && (
          <View style={styles.moodBanner}>
            <Text style={styles.moodEmoji}>🎭</Text>
            <View style={styles.moodContent}>
              <Text style={styles.moodTitle}>{moodCard.title}</Text>
              <Text style={styles.moodDescription}>{moodCard.description}</Text>
            </View>
            <Text style={styles.moodLabel}>Mood</Text>
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
  redrawButton: {
    margin: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    alignItems: 'center',
  },
  redrawText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    borderRadius: 8,
    padding: 12,
    margin: 16,
    marginBottom: 12,
  },
  moodEmoji: {
    fontSize: 24,
    marginRight: 12,
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
  moodLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
  constraintSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  cardContainer: {
    // Individual card styling handled by responsive values
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
});
