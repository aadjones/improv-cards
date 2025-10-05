import React, { useState } from 'react';
import { View, Text, StyleSheet, SectionList, TouchableOpacity } from 'react-native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import { CardDetailModal } from '../components/CardDetailModal';
import {
  ALL_CARDS,
  PRACTICE_SUITS,
  IMPROV_SUITS,
  getCardsBySuit,
  getCardsByType,
} from '../data/cards';

interface CardSectionData {
  title: string;
  data: CardType[];
}

export default function LibraryScreen() {
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Library</Text>
        <Text style={styles.headerSubtitle}>Browse all cards</Text>
      </View>

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
});
