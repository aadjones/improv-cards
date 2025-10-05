import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { Card as CardType } from '@core/types';
import { Card } from '../components/Card';
import { CardDetailModal } from '../components/CardDetailModal';
import { ModeSwitch } from '../components/ModeSwitch';
import { drawPracticeCard, drawImprovCard } from '../utils/drawing';
import { getPracticeDeck, getImprovDeck } from '../data/cards';
import { practiceStore } from '../store/practiceStore';

type Mode = 'practice' | 'improv';

export default function PracticeScreen() {
  const [mode, setMode] = useState<Mode>('practice');
  const [includeMood, setIncludeMood] = useState(true);
  const [drawnCard, setDrawnCard] = useState<CardType | null>(null);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleDraw = async () => {
    setIsDrawing(true);
    try {
      let card: CardType;

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
        // Random draw for improv mode
        const improvCards = getImprovDeck();
        card = drawImprovCard(improvCards, includeMood);
      }

      setDrawnCard(card);
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

        {/* Improv Settings */}
        {mode === 'improv' && (
          <View style={styles.settingsSection}>
            <View style={styles.settingRow}>
              <Text style={styles.settingLabel}>Include mood card</Text>
              <Switch
                value={includeMood}
                onValueChange={setIncludeMood}
                trackColor={{ false: '#D1D5DB', true: '#93C5FD' }}
                thumbColor={includeMood ? '#2563EB' : '#F3F4F6'}
              />
            </View>
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
            <Card card={drawnCard} onPress={() => handleCardPress(drawnCard)} />
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
  settingsSection: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
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
