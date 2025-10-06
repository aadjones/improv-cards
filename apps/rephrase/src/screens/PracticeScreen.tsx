import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import { ModeSwitch } from '../components/ModeSwitch';
import { usePractice } from '../context/PracticeContext';
import { drawPracticeCard, drawRandomCard } from '../utils/drawing';
import { getPracticeDeck, getImprovDeck, SUIT_INFO } from '../data/cards';
import { practiceStore } from '../store/practiceStore';

export default function PracticeScreen() {
  const isFocused = useIsFocused();
  const { mode, setMode, preselectedCard, preselectedMood, clearPreselectedCards } = usePractice();
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [drawnMood, setDrawnMood] = useState<CardType | null>(null); // For improv mood banner
  const [isDrawing, setIsDrawing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load preselected cards when screen is focused
  useEffect(() => {
    if (isFocused && (preselectedCard || preselectedMood)) {
      setDrawnCard(preselectedCard);
      setDrawnMood(preselectedMood);
      clearPreselectedCards();
    }
  }, [isFocused, preselectedCard, preselectedMood, clearPreselectedCards]);

  // Clear drawn cards when switching modes (but not if we have preselected cards)
  useEffect(() => {
    if (!preselectedCard && !preselectedMood) {
      setDrawnCard(null);
      setDrawnMood(null);
      setError(null);
    }
  }, [mode, preselectedCard, preselectedMood]);

  const handleDraw = async () => {
    setIsDrawing(true);
    setError(null);
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
    } catch (err) {
      console.error('Error drawing card:', err);
      setError(err instanceof Error ? err.message : 'Unable to draw a card. Please try again.');
    } finally {
      setIsDrawing(false);
    }
  };

  const handleRerollMood = async () => {
    try {
      setError(null);
      const improvCards = getImprovDeck();
      const moodCards = improvCards.filter(c => c.suit === 'mood');
      const newMood = drawRandomCard(moodCards);
      setDrawnMood(newMood);
    } catch (err) {
      console.error('Error rerolling mood:', err);
      setError(err instanceof Error ? err.message : 'Unable to redraw mood. Please try again.');
    }
  };

  const handleRerollTechnical = async () => {
    try {
      setError(null);
      const improvCards = getImprovDeck();
      const technicalCards = improvCards.filter(c => c.suit !== 'mood');
      const newCard = drawRandomCard(technicalCards);
      setDrawnCard(newCard);
    } catch (err) {
      console.error('Error rerolling technical card:', err);
      setError(err instanceof Error ? err.message : 'Unable to redraw card. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Mode Switcher */}
        <ModeSwitch mode={mode} onChange={setMode} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>Creative constraints for focused piano practice</Text>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError(null)} style={styles.dismissButton}>
              <Text style={styles.dismissText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        )}

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
                  {mode === 'practice' ? 'Draw Prompt' : 'Draw Cards'}
                </Text>
              )}
            </TouchableOpacity>
            <Text style={styles.hint}>
              {mode === 'practice'
                ? 'Draw a mindful prompt to focus your practice session'
                : 'Get a mood and a constraint to spark creative improvisation'}
            </Text>
          </View>
        ) : (
          <View style={styles.cardSection}>
            {/* Mood Banner for Improv Mode */}
            {drawnMood && (
              <View style={styles.moodBanner}>
                <View style={styles.bannerHeader}>
                  <View style={styles.moodLabelContainer}>
                    {SUIT_INFO[drawnMood.suit] && (
                      <Text style={styles.moodEmoji}>{SUIT_INFO[drawnMood.suit].emoji}</Text>
                    )}
                    <Text style={styles.moodLabel}>MOOD</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.refreshButton}
                    onPress={handleRerollMood}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Text style={styles.refreshIcon}>↻</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.moodTitle}>{drawnMood.title}</Text>
                {drawnMood.description && (
                  <Text style={styles.moodDescription}>{drawnMood.description}</Text>
                )}
              </View>
            )}

            {/* Main Card */}
            <Card
              card={drawnCard}
              onRefresh={mode === 'improv' ? handleRerollTechnical : undefined}
            />

            {/* Draw Again Button */}
            <TouchableOpacity
              style={styles.drawAgainButton}
              onPress={handleDraw}
              disabled={isDrawing}
            >
              <Text style={styles.drawAgainText}>
                {isDrawing
                  ? 'Drawing...'
                  : mode === 'improv'
                    ? 'Draw New Cards'
                    : 'Draw New Prompt'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
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
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  moodLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  moodEmoji: {
    fontSize: 14,
  },
  moodLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#9F1239',
  },
  refreshButton: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9F1239',
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
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
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
  errorContainer: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  errorText: {
    fontSize: 14,
    color: '#991B1B',
    lineHeight: 20,
    marginBottom: 8,
  },
  dismissButton: {
    alignSelf: 'flex-start',
  },
  dismissText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#DC2626',
  },
});
