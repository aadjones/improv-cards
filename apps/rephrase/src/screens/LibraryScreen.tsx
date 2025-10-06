import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import { CardDetailModal } from '../components/CardDetailModal';
import { usePractice } from '../context/PracticeContext';
import { drawRandomCard } from '../utils/drawing';
import {
  ALL_CARDS,
  PRACTICE_SUITS,
  IMPROV_SUITS,
  getCardsBySuit,
  getCardsByType,
  getImprovDeck,
} from '../data/cards';

interface CardSectionData {
  title: string;
  data: CardType[];
}

export default function LibraryScreen() {
  const navigation = useNavigation();
  const { setMode, setPreselectedCards } = usePractice();
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  // Group cards by type and suit
  const practiceCards = getCardsByType('practice');
  const improvCards = getCardsByType('improv');

  const sections: CardSectionData[] = [
    {
      title: 'PRACTICE PROMPTS',
      data: practiceCards,
    },
    {
      title: 'IMPROVISATION CARDS',
      data: improvCards,
    },
  ];

  const renderSectionHeader = ({ section }: { section: CardSectionData }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      <Text style={styles.sectionCount}>({section.data.length} cards)</Text>
    </View>
  );

  const renderCard = ({ item }: { item: CardType }) => (
    <Card card={item} onPress={() => setSelectedCard(item)} style={styles.card} />
  );

  const handleRequestCard = () => {
    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSdzOwEXaYVf_UT2h9x0UE3y70z0hXSTx4qwLhL1GoA1RMDWLQ/viewform?usp=dialog';
    Linking.openURL(formUrl);
  };

  const handleSupport = () => {
    const kofiUrl = 'https://ko-fi.com/studiodemby';
    Linking.openURL(kofiUrl);
  };

  const handlePracticeThis = (card: CardType) => {
    const improvDeck = getImprovDeck();

    if (card.type === 'practice') {
      // Practice card: set mode to practice, show that card
      setMode('practice');
      setPreselectedCards(card);
    } else {
      // Improv card
      setMode('improv');

      if (card.suit === 'mood') {
        // Mood card: draw random technical card
        const technicalCards = improvDeck.filter(c => c.suit !== 'mood');
        const randomTechnical = drawRandomCard(technicalCards);
        setPreselectedCards(randomTechnical, card); // card is mood
      } else {
        // Technical card: draw random mood
        const moodCards = improvDeck.filter(c => c.suit === 'mood');
        const randomMood = drawRandomCard(moodCards);
        setPreselectedCards(card, randomMood); // card is technical, second param is mood
      }
    }

    // Close modal and navigate to Practice tab
    setSelectedCard(null);
    navigation.navigate('Practice' as never);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Library</Text>
            <Text style={styles.headerSubtitle}>Browse all cards</Text>
          </View>
          <View style={styles.supportContainer}>
            <Text style={styles.supportLabel}>Like this app?</Text>
            <TouchableOpacity style={styles.supportButton} onPress={handleSupport}>
              <Text style={styles.supportButtonText}>☕ Support</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.requestButton} onPress={handleRequestCard}>
        <Text style={styles.requestButtonText}>✨ Request a Card</Text>
        <Text style={styles.requestButtonSubtext}>Missing something? Suggest a new card!</Text>
      </TouchableOpacity>

      <SectionList
        sections={sections}
        renderItem={renderCard}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={item => item.id}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <CardDetailModal
        card={selectedCard}
        visible={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        onPracticeThis={handlePracticeThis}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  supportContainer: {
    alignItems: 'flex-end',
  },
  supportLabel: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 4,
  },
  supportButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  supportButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  listContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#374151',
  },
  sectionCount: {
    fontSize: 14,
    color: '#9CA3AF',
    marginLeft: 8,
    fontWeight: '500',
  },
  card: {
    marginHorizontal: 0,
  },
  requestButton: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  requestButtonSubtext: {
    fontSize: 14,
    color: '#6B7280',
  },
});
