import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { drawBiasedCard } from '@core/rotation';
import { Card } from '@core/types';
import { practiceDeck } from '../deck';
import { localStore } from '../store/localStore';

export default function Home() {
  const [card, setCard] = useState<Card | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  async function draw() {
    setIsDrawing(true);
    try {
      const history = await localStore.getHistory();
      const c = drawBiasedCard(practiceDeck, history, {
        windowDays: 14,
        minSuitCooldown: 1,
      });
      setCard(c);
      await localStore.append({
        cardId: c.id,
        suit: c.suit,
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('Error drawing card:', error);
    } finally {
      setIsDrawing(false);
    }
  }

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindful Practice</Text>
        <Text style={styles.subtitle}>Draw a prompt to guide your attention</Text>
      </View>

      {!card ? (
        <View style={styles.drawSection}>
          <TouchableOpacity
            style={[styles.drawButton, isDrawing && styles.drawButtonDisabled]}
            onPress={draw}
            disabled={isDrawing}
          >
            <Text style={styles.drawButtonText}>{isDrawing ? 'Drawing...' : 'Draw Prompt'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.cardSection}>
          <View style={[styles.card, { borderLeftColor: getSuitColor(card.suit) }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.suitLabel, { color: getSuitColor(card.suit) }]}>
                {card.suit.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.cardTitle}>{card.title}</Text>
            {card.body && <Text style={styles.cardBody}>{card.body}</Text>}
          </View>

          <TouchableOpacity style={styles.anotherButton} onPress={draw} disabled={isDrawing}>
            <Text style={styles.anotherButtonText}>
              {isDrawing ? 'Drawing...' : 'Draw Another'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
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
  drawSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawButton: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  drawButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  drawButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  cardSection: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 32,
  },
  cardHeader: {
    marginBottom: 16,
  },
  suitLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  cardBody: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  anotherButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignSelf: 'center',
  },
  anotherButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '500',
  },
});
