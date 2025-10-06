import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import {
  getCardsBySuit,
  PRACTICE_SUITS,
  IMPROV_SUITS,
  SUIT_INFO,
  SUIT_COLORS,
} from '../data/cards';

interface SuitSectionData {
  suit: string;
  typeLabel: string;
}

export default function LibraryScreen() {

  // Create suit sections
  const practiceSections: SuitSectionData[] = PRACTICE_SUITS.map(suit => ({
    suit,
    typeLabel: 'PRACTICE PROMPTS',
  }));

  const improvSections: SuitSectionData[] = IMPROV_SUITS.map(suit => ({
    suit,
    typeLabel: 'IMPROVISATION CARDS',
  }));

  const allSections = [...practiceSections, ...improvSections];

  const renderCard = ({ item }: { item: CardType }) => <Card card={item} />;

  const handleRequestCard = () => {
    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLSdzOwEXaYVf_UT2h9x0UE3y70z0hXSTx4qwLhL1GoA1RMDWLQ/viewform?usp=dialog';
    Linking.openURL(formUrl);
  };

  const handleSupport = () => {
    const kofiUrl = 'https://ko-fi.com/studiodemby';
    Linking.openURL(kofiUrl);
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

      <FlatList
        data={allSections}
        keyExtractor={(item, index) => `${item.suit}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item: section, index }) => {
          const cards = getCardsBySuit(section.suit);
          const suitInfo = SUIT_INFO[section.suit];
          const suitColors = SUIT_COLORS[section.suit];

          // Show type label before first suit in each category
          const showTypeLabel =
            (index === 0 && section.typeLabel === 'PRACTICE PROMPTS') ||
            (index === PRACTICE_SUITS.length && section.typeLabel === 'IMPROVISATION CARDS');

          return (
            <View>
              {showTypeLabel && (
                <View style={styles.typeHeader}>
                  <Text style={styles.typeTitle}>{section.typeLabel}</Text>
                </View>
              )}

              <View style={styles.suitSection}>
                <View style={styles.suitHeader}>
                  <Text style={[styles.suitTitle, { color: suitColors.text }]}>
                    {suitInfo.emoji} {suitInfo.displayName}
                  </Text>
                  <Text style={styles.cardCount}>({cards.length})</Text>
                </View>

                <FlatList
                  data={cards}
                  renderItem={renderCard}
                  keyExtractor={card => card.id}
                  scrollEnabled={false}
                />
              </View>
            </View>
          );
        }}
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
  typeHeader: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  typeTitle: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#374151',
  },
  suitSection: {
    marginBottom: 16,
  },
  suitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  suitTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginRight: 8,
  },
  cardCount: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
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
