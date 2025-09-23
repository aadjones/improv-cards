import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { suitDistribution } from '@core/rotation';
import { localStore } from '../store/localStore';
import { getCompleteDeck } from '../deck';

export default function Balance() {
  const [distribution, setDistribution] = useState<Record<string, number>>({});
  const [suits, setSuits] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDistribution = async () => {
    try {
      const [deck, history] = await Promise.all([getCompleteDeck(), localStore.getHistory()]);

      const dist = suitDistribution(history, 14);
      setDistribution(dist);

      // Only show suits that have either:
      // 1. Cards drawn in history, OR
      // 2. Available cards in the current deck
      const suitsWithActivity = deck.suits.filter(suit => {
        const hasHistory = (dist[suit] || 0) > 0;
        const hasCards = deck.cards.some(card => card.suit === suit);
        return hasHistory || hasCards;
      });

      setSuits(suitsWithActivity);
    } catch (error) {
      console.error('Error loading distribution:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDistribution();
    setRefreshing(false);
  };

  const clearHistory = async () => {
    Alert.alert(
      'Clear Practice History',
      'This will permanently delete all your practice history and reset your balance. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await localStore.clear();
              await loadDistribution();
            } catch (error) {
              console.error('Error clearing history:', error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    loadDistribution();
  }, []);

  const getSuitColor = (suit: string) => {
    const colors: Record<string, string> = {
      physical: '#8B5A3C',
      listening: '#4C1D95',
      time: '#2C5530',
      expression: '#1A365D',
      instrument: '#744210',
      custom: '#7C2D12', // Distinctive orange-brown for custom prompts
    };
    return colors[suit] || '#6B7280';
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const totalDraws = Object.values(distribution).reduce((sum, count) => sum + count, 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Practice Balance</Text>
        <Text style={styles.subtitle}>Last 14 days • {totalDraws} total draws</Text>
      </View>

      {totalDraws === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No practice data yet</Text>
          <Text style={styles.emptySubtitle}>
            Start drawing prompts to see your practice balance
          </Text>
        </View>
      ) : (
        <View style={styles.gardenContainer}>
          {suits.map(suit => {
            const count = distribution[suit] || 0;
            const percentage = totalDraws > 0 ? (count / totalDraws) * 100 : 0;

            // Circle size based on square root for better visual scaling
            const baseSize = 40;
            const maxSize = 80;
            const circleSize = count === 0 ? baseSize * 0.6 : baseSize + Math.sqrt(count) * 15;
            const finalSize = Math.min(circleSize, maxSize);

            return (
              <View key={suit} style={styles.circleContainer}>
                <View
                  style={[
                    styles.circle,
                    {
                      width: finalSize,
                      height: finalSize,
                      backgroundColor: count === 0 ? 'transparent' : getSuitColor(suit),
                      borderColor: getSuitColor(suit),
                      borderWidth: count === 0 ? 2 : 0,
                      borderStyle: count === 0 ? 'dashed' : 'solid',
                      opacity: count === 0 ? 0.3 : 0.8,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.circleCount,
                      { color: count === 0 ? getSuitColor(suit) : '#FFFFFF' },
                    ]}
                  >
                    {count}
                  </Text>
                </View>
                <Text style={[styles.circleLabel, { color: getSuitColor(suit) }]}>
                  {suit.replace('-', '\n')}
                </Text>
                <Text style={styles.circlePercentage}>{percentage.toFixed(0)}%</Text>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Pull down to refresh • Balance updates automatically with each draw
        </Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearHistory}>
          <Text style={styles.clearButtonText}>Clear History</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 24,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 24,
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
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  gardenContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  circleContainer: {
    alignItems: 'center',
    marginBottom: 24,
    width: '30%',
    minWidth: 100,
  },
  circle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  circleCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  circleLabel: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: 4,
    lineHeight: 14,
  },
  circlePercentage: {
    fontSize: 11,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 16,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: 'transparent',
    alignSelf: 'center',
  },
  clearButtonText: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});
