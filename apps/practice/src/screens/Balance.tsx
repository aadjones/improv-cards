import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { suitDistribution } from '@core/rotation';
import { localStore } from '../store/localStore';

export default function Balance() {
  const [distribution, setDistribution] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadDistribution = async () => {
    try {
      const history = await localStore.getHistory();
      const dist = suitDistribution(history, 14);
      setDistribution(dist);
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

  useEffect(() => {
    loadDistribution();
  }, []);

  const suits = ['tone', 'intonation', 'rhythm', 'phrasing', 'body', 'listening'];
  const maxCount = Math.max(...Object.values(distribution), 1);

  const getSuitColor = (suit: string) => {
    const colors: Record<string, string> = {
      tone: '#8B5A3C',
      intonation: '#4A5D23',
      rhythm: '#2C5530',
      phrasing: '#1A365D',
      body: '#744210',
      listening: '#4C1D95',
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
        <View style={styles.chartContainer}>
          {suits.map(suit => {
            const count = distribution[suit] || 0;
            const percentage = totalDraws > 0 ? (count / totalDraws) * 100 : 0;
            const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;

            return (
              <View key={suit} style={styles.barRow}>
                <View style={styles.labelContainer}>
                  <Text style={[styles.suitLabel, { color: getSuitColor(suit) }]}>{suit}</Text>
                  <Text style={styles.countLabel}>
                    {count} ({percentage.toFixed(0)}%)
                  </Text>
                </View>
                <View style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        width: `${barWidth}%`,
                        backgroundColor: getSuitColor(suit),
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Pull down to refresh • Balance updates automatically with each draw
        </Text>
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
  chartContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 20,
  },
  barRow: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  suitLabel: {
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  countLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  barContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
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
  },
});
