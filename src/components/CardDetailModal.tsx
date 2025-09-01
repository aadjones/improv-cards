import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { Card as CardType, SUITS } from '../constants/cards';

interface CardDetailModalProps {
  card: CardType | null;
  visible: boolean;
  onClose: () => void;
  onPracticeThis?: () => void;
}

export function CardDetailModal({ card, visible, onClose, onPracticeThis }: CardDetailModalProps) {
  if (!card) return null;

  const suitInfo = SUITS[card.suit];
  const suitEmoji = card.suit.split(' ')[0];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.titleRow}>
                <Text style={styles.emoji}>{suitEmoji}</Text>
                <Text style={styles.title}>{card.title}</Text>
              </View>
              {card.level && (
                <View style={[styles.levelBadge, { backgroundColor: suitInfo.lightColor }]}>
                  <Text style={[styles.levelText, { color: suitInfo.textColor }]}>
                    {card.level}
                  </Text>
                </View>
              )}
            </View>

            {/* Suit */}
            <Text style={[styles.suit, { color: suitInfo.textColor }]}>
              {card.suit}
            </Text>

            {/* Description */}
            <Text style={styles.description}>
              {card.description}
            </Text>

            {/* Future content placeholder */}
            <View style={styles.futureContent}>
              <Text style={styles.futureText}>
                🎵 Audio and video examples coming in future updates!
              </Text>
            </View>
          </ScrollView>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            {onPracticeThis && (
              <TouchableOpacity
                style={[styles.button, styles.practiceButton]}
                onPress={onPracticeThis}
              >
                <Text style={styles.practiceButtonText}>Practice This</Text>
              </TouchableOpacity>
            )}
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
    padding: 16,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    overflow: 'hidden',
  },
  scrollView: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  emoji: {
    fontSize: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginLeft: 8,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  suit: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    marginBottom: 24,
  },
  futureContent: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 8,
  },
  futureText: {
    fontSize: 14,
    color: '#6b7280',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#e5e7eb',
  },
  closeButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  practiceButton: {
    backgroundColor: '#2563eb',
  },
  practiceButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});