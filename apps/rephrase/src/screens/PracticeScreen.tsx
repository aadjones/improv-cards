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
import { getPracticeDeck, getImprovDeck } from '../data/cards';
import { practiceStore } from '../store/practiceStore';

export default function PracticeScreen() {
  const isFocused = useIsFocused();
  const { mode, setMode, preselectedCard, preselectedMood, clearPreselectedCards } = usePractice();
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [drawnMood, setDrawnMood] = useState<CardType | null>(null); // For improv mood banner
  const [isDrawing, setIsDrawing] = useState(false);

  // Example cards for empty state
  const [examplePracticeCard, setExamplePracticeCard] = useState<CardType | null>(null);
  const [exampleImprovCard, setExampleImprovCard] = useState<CardType | null>(null);
  const [exampleMood, setExampleMood] = useState<CardType | null>(null);

  // Set random example cards on mount
  useEffect(() => {
    const practiceDeck = getPracticeDeck();
    const improvDeck = getImprovDeck();

    const randomPractice = drawRandomCard(practiceDeck);
    setExamplePracticeCard(randomPractice);

    const moodCards = improvDeck.filter(c => c.suit === 'mood');
    const randomMood = drawRandomCard(moodCards);
    setExampleMood(randomMood);

    const technicalCards = improvDeck.filter(c => c.suit !== 'mood');
    const randomImprov = drawRandomCard(technicalCards);
    setExampleImprovCard(randomImprov);
  }, []);

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
    }
  }, [mode, preselectedCard, preselectedMood]);

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

  const handleRerollMood = async () => {
    // Redraw only the mood
    const improvCards = getImprovDeck();
    const moodCards = improvCards.filter(c => c.suit === 'mood');
    const newMood = drawRandomCard(moodCards);
    setDrawnMood(newMood);
  };

  const handleRerollTechnical = async () => {
    // Redraw only the technical card
    const improvCards = getImprovDeck();
    const technicalCards = improvCards.filter(c => c.suit !== 'mood');
    const newCard = drawRandomCard(technicalCards);
    setDrawnCard(newCard);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Mode Switcher */}
        <ModeSwitch mode={mode} onChange={setMode} />

        {/* Subtitle */}
        <Text style={styles.subtitle}>Creative constraints for focused piano practice</Text>

        {/* Draw Button or Card */}
        {!drawnCard ? (
          <View style={styles.drawSection}>
            {/* Example Cards Preview */}
            {mode === 'practice' && examplePracticeCard && (
              <View style={styles.exampleContainer}>
                <View style={[styles.exampleCard, { opacity: 0.3 }]}>
                  <Text style={styles.exampleSuit}>{examplePracticeCard.suit.toUpperCase()}</Text>
                  <Text style={styles.exampleTitle}>{examplePracticeCard.title}</Text>
                  {examplePracticeCard.description && (
                    <Text style={styles.exampleDescription}>{examplePracticeCard.description}</Text>
                  )}
                </View>
                <Text style={styles.exampleLabel}>Example prompt</Text>
              </View>
            )}
            {mode === 'improv' && exampleMood && exampleImprovCard && (
              <View style={styles.exampleContainer}>
                <View style={[styles.exampleMoodBanner, { opacity: 0.3 }]}>
                  <Text style={styles.exampleMoodLabel}>MOOD</Text>
                  <Text style={styles.exampleMoodTitle}>{exampleMood.title}</Text>
                  {exampleMood.description && (
                    <Text style={styles.exampleMoodDescription}>{exampleMood.description}</Text>
                  )}
                </View>
                <View style={[styles.exampleCard, { opacity: 0.3 }]}>
                  <Text style={styles.exampleSuit}>{exampleImprovCard.suit.toUpperCase()}</Text>
                  <Text style={styles.exampleTitle}>{exampleImprovCard.title}</Text>
                  {exampleImprovCard.description && (
                    <Text style={styles.exampleDescription}>{exampleImprovCard.description}</Text>
                  )}
                </View>
                <Text style={styles.exampleLabel}>Example cards</Text>
              </View>
            )}

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
                : 'Get a mood + constraint to spark creative improvisation'}
            </Text>
          </View>
        ) : (
          <View style={styles.cardSection}>
            {/* Mood Banner for Improv Mode */}
            {drawnMood && (
              <View style={styles.moodBanner}>
                <View style={styles.bannerHeader}>
                  <Text style={styles.moodLabel}>MOOD</Text>
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
  exampleContainer: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 32,
    alignItems: 'center',
  },
  exampleMoodBanner: {
    width: '100%',
    backgroundColor: '#FCE7F3',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#BE185D',
  },
  exampleMoodLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#9F1239',
    marginBottom: 6,
  },
  exampleMoodTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#9F1239',
    marginBottom: 4,
  },
  exampleMoodDescription: {
    fontSize: 14,
    color: '#9F1239',
    opacity: 0.85,
    lineHeight: 20,
  },
  exampleCard: {
    width: '100%',
    backgroundColor: '#E9D5FF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#4C1D95',
  },
  exampleSuit: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#581C87',
    marginBottom: 8,
  },
  exampleTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#581C87',
    marginBottom: 8,
  },
  exampleDescription: {
    fontSize: 15,
    color: '#581C87',
    lineHeight: 22,
  },
  exampleLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 8,
    fontStyle: 'italic',
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
});
