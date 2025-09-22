import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@core/types';
import { practiceDeck } from '../deck';
import { groupCardsBySuit } from '../utils/cardUtils';

interface LibraryProps {
  onCardPress?: (card: Card) => void;
}

export default function Library({ onCardPress }: LibraryProps) {
  const groupedCards = groupCardsBySuit(practiceDeck.cards);

  const getSuitColor = (suit: string) => {
    const colors: Record<string, string> = {
      physical: '#8B5A3C',
      listening: '#4C1D95',
      time: '#2C5530',
      expression: '#1A365D',
      instrument: '#744210',
    };
    return colors[suit] || '#6B7280';
  };

  const renderCard = ({ item }: { item: Card }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getSuitColor(item.suit) }]}
      onPress={() => onCardPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.suitLabel, { color: getSuitColor(item.suit) }]}>
          {item.suit.toUpperCase()}
        </Text>
      </View>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.cardBody} numberOfLines={3}>
        {item.body}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Practice Library</Text>
        <Text style={styles.subtitle}>Explore all practice techniques</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={practiceDeck.suits}
        keyExtractor={suit => suit}
        renderItem={({ item: suit }) => {
          const cards = groupedCards[suit] || [];
          const displayName = suit.replace('-', ' ');

          return (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: getSuitColor(suit) }]}>
                  {displayName}
                </Text>
                <Text style={styles.cardCount}>({cards.length})</Text>
              </View>
              <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={card => card.id}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                scrollEnabled={false}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 24 }} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginRight: 8,
    textTransform: 'capitalize',
  },
  cardCount: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 4,
  },
  cardHeader: {
    marginBottom: 8,
  },
  suitLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});
