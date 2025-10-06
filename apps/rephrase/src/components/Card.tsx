import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card as CardType } from '@core/types';
import { SUIT_COLORS, SUIT_INFO } from '../data/cards';

interface CardProps {
  card: CardType;
  onPress?: () => void;
  onRefresh?: () => void;
  style?: object;
}

export function Card({ card, onPress, onRefresh, style }: CardProps) {
  const suitColors = SUIT_COLORS[card.suit] || SUIT_COLORS.custom;
  const suitInfo = SUIT_INFO[card.suit];

  const containerStyle = [
    styles.container,
    {
      backgroundColor: suitColors.background,
      borderColor: suitColors.border,
    },
    style,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <View style={styles.suitLabelContainer}>
          {suitInfo && <Text style={styles.suitEmoji}>{suitInfo.emoji}</Text>}
          <Text style={[styles.suitLabel, { color: suitColors.text }]}>
            {suitInfo ? suitInfo.displayName.toUpperCase() : card.suit.toUpperCase()}
          </Text>
        </View>
        {onRefresh && (
          <TouchableOpacity
            style={styles.refreshButton}
            onPress={e => {
              e.stopPropagation();
              onRefresh();
            }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={[styles.refreshIcon, { color: suitColors.text }]}>↻</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: suitColors.text }]}>{card.title}</Text>
        {card.description && (
          <Text style={[styles.description, { color: suitColors.text }]}>{card.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 3,
    padding: 20,
    minHeight: 160,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  suitLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  suitEmoji: {
    fontSize: 14,
  },
  suitLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    opacity: 0.7,
  },
  refreshButton: {
    padding: 4,
  },
  refreshIcon: {
    fontSize: 24,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.85,
  },
});
