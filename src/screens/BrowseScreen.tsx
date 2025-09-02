import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from '../components/Card';
import { Card as CardType, CARDS_DATA, SUITS } from '../constants/cards';
import { groupCardsBySuit } from '../utils/cardUtils';

interface BrowseScreenProps {
  onCardPress: (card: CardType) => void;
}

export function BrowseScreen({ onCardPress }: BrowseScreenProps) {
  const groupedCards = groupCardsBySuit(CARDS_DATA);

  const renderCard = ({ item }: { item: CardType }) => (
    <Card card={item} onPress={() => onCardPress(item)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Browse All Cards</Text>
        <Text style={styles.subtitle}>Explore all improvisation constraints</Text>
      </View>

      <FlatList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        data={Object.entries(SUITS)}
        keyExtractor={([suit]) => suit}
        renderItem={({ item: [suit, suitInfo] }) => {
          const cards = groupedCards[suit] || [];
          const title = suit === '🎭 Mood' ? '🎭 Moods' : suit;

          return (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: suitInfo.textColor }]}>{title}</Text>
                <Text style={styles.cardCount}>({cards.length})</Text>
              </View>
              <FlatList
                data={cards}
                renderItem={renderCard}
                keyExtractor={card => card.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
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
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 8,
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
  },
  cardCount: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  section: {
    marginBottom: 8,
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
});
