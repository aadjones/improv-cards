import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import { CardDetailModal } from '../components/CardDetailModal';
import { ModeSwitch } from '../components/ModeSwitch';
import { drawPracticeCard, drawRandomCard } from '../utils/drawing';
import { getPracticeDeck, getImprovDeck } from '../data/cards';
import { practiceStore } from '../store/practiceStore';

type Mode = 'practice' | 'improv';

export default function PracticeScreen() {
  const [mode, setMode] = useState<Mode>('practice');
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [drawnMood, setDrawnMood] = useState<CardType | null>(null); // For improv mood banner
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Clear drawn cards when switching modes
  useEffect(() => {
    setDrawnCard(null);
    setDrawnMood(null);
  }, [mode]);

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      let card: CardType;
      let mood: CardType | null = null;

      if (mode === 'practice') {
        // Biased draw for practice mode
        const history = await practiceStore.getHistory();
        const deck = {
          suits: ['physical', 'listening', 'tempo', 'expression', 'instrument'],
          cards: getPracticeDeck(),
        };
        card = drawPracticeCard(deck, history);

        // Save to history
        await practiceStore.append({
          cardId: card.id,
          suit: card.suit,
          timestamp: Date.now(),
        });
      } else {
        // Random draw for improv mode: always draw mood + technical card
        const improvCards = getImprovDeck();

        // Draw mood card
        const moodCards = improvCards.filter(c => c.suit === 'mood');
        mood = drawRandomCard(moodCards);

        // Draw technical card (non-mood)
        const technicalCards = improvCards.filter(c => c.suit !== 'mood');
        card = drawRandomCard(technicalCards);
      }

      setDrawnCard(card);
      setDrawnMood(mood);
    } catch (error) {
      console.error('Error drawing card:', error);
      // TODO: Show error to user
    } finally {
      setIsDrawing(false);
    }
  };

  const handleCardPress = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Mode Switcher */}
        <ModeSwitch mode={mode} onChange={setMode} />

        {/* Draw Button or Card */}
        {!drawnCard ? (
          <View style={styles.drawSection}>
            <TouchableOpacity
              style={[styles.drawButton, isDrawing && styles.drawButtonDisabled]}
              onPress={handleDraw}
              disabled={isDrawing}
            >
              {isDrawing ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.drawButtonText}>
                  {mode === 'practice' ? 'Draw Prompt' : 'Draw Card'}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={styles.hint}>
              {mode === 'practice'
                ? 'Get a focused practice prompt to guide your attention'
                : 'Draw a creative constraint for improvisation'}
            </Text>
          </View>
        ) : (
          <View style={styles.cardSection}>
            {/* Mood Banner for Improv Mode */}
            {drawnMood && (
              <View style={styles.moodBanner}>
                <Text style={styles.moodLabel}>MOOD</Text>
                <Text style={styles.moodTitle}>{drawnMood.title}</Text>
                {drawnMood.description && (
                  <Text style={styles.moodDescription}>{drawnMood.description}</Text>
                )}
              </View>
            )}

            {/* Main Card */}
            <Card card={drawnCard} onPress={() => handleCardPress(drawnCard)} />

            {/* Draw Again Button */}
            <TouchableOpacity
              style={styles.drawAgainButton}
              onPress={handleDraw}
              disabled={isDrawing}
            >
              <Text style={styles.drawAgainText}>
                {isDrawing ? 'Drawing...' : 'Draw Again'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Card Detail Modal */}
      <CardDetailModal card={selectedCard} visible={!!selectedCard} onClose={handleCloseModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  moodBanner: {
    backgroundColor: '#FCE7F3',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#BE185D',
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#9F1239',
    marginBottom: 6,
  },
  moodTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9F1239',
    marginBottom: 4,
  },
  moodDescription: {
    fontSize: 14,
    color: '#9F1239',
    opacity: 0.85,
    lineHeight: 20,
  },
  drawSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  drawButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  hint: {
    marginTop: 16,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 20,
  },
  cardSection: {
    paddingTop: 20,
  },
  drawAgainButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  drawAgainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
});
