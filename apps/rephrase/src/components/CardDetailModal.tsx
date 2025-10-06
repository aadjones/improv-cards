import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Card as CardType } from '@core/types';
import { SUIT_COLORS } from '../data/cards';

interface CardDetailModalProps {
  card: CardType | null;
  visible: boolean;
  onClose: () => void;
  onPracticeThis?: (card: CardType) => void;
}

export function CardDetailModal({ card, visible, onClose, onPracticeThis }: CardDetailModalProps) {
  if (!card) return null;

  const suitColors = SUIT_COLORS[card.suit] || SUIT_COLORS.custom;

  return (
    <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{card.title}</Text>
            </View>

            {/* Suit */}
            <Text style={[styles.suit, { color: suitColors.text }]}>
              {card.suit.toUpperCase()} • {card.type === 'practice' ? 'Practice' : 'Improvisation'}
            </Text>

            {/* Description */}
            {card.description && <Text style={styles.description}>{card.description}</Text>}
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            {onPracticeThis && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.primaryButton,
                  { backgroundColor: suitColors.border },
                ]}
                onPress={() => onPracticeThis(card)}
              >
                <Text style={styles.buttonText}>Practice This</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={onClose}>
              <Text style={[styles.buttonText, styles.secondaryButtonText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  scrollView: {
    padding: 24,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 34,
  },
  suit: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 20,
    opacity: 0.7,
  },
  description: {
    fontSize: 17,
    lineHeight: 26,
    color: '#374151',
    marginBottom: 24,
  },
  actions: {
    padding: 24,
    paddingTop: 0,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButton: {
    // backgroundColor set dynamically
  },
  secondaryButton: {
    backgroundColor: '#F3F4F6',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#374151',
  },
});
