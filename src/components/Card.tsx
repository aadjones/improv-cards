import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Card as CardType, SUITS } from '../constants/cards';
import { getCardWidth, getFontSize, isTablet } from '../utils/responsive';

interface CardProps {
  card: CardType;
  isGridCard?: boolean;
  onPress?: () => void;
  style?: any;
}

const cardMargin = 8;
const gridCardWidth = getCardWidth();

export function Card({ card, isGridCard = false, onPress, style }: CardProps) {
  const suitInfo = SUITS[card.suit];
  const suitEmoji = card.suit.split(' ')[0];
  const suitName = card.suit.split(' ')[1];

  const cardStyle = isGridCard ? styles.gridCard : styles.regularCard;
  const containerStyle = [
    styles.container,
    cardStyle,
    { backgroundColor: suitInfo.lightColor, borderColor: suitInfo.darkColor },
    style,
  ];

  return (
    <TouchableOpacity 
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <Text style={styles.emoji}>{suitEmoji}</Text>
        {card.level && (
          <View style={[styles.levelBadge, { backgroundColor: 'rgba(255,255,255,0.8)' }]}>
            <Text style={[styles.levelText, { color: suitInfo.textColor }]}>
              {card.level}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: suitInfo.textColor }]} numberOfLines={2}>
          {card.title}
        </Text>
        <Text 
          style={[styles.description, { color: suitInfo.textColor }]} 
          numberOfLines={isGridCard ? 4 : 5}
        >
          {card.description}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.suitName, { color: suitInfo.textColor }]}>
          {suitName}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export function EmptyGridSlot({ suitEmoji, suitName }: { suitEmoji: string; suitName: string }) {
  return (
    <View style={[styles.container, styles.gridCard, styles.emptySlot]}>
      <View style={styles.emptyContent}>
        <Text style={styles.emptyEmoji}>{suitEmoji}</Text>
        <Text style={styles.emptySuitName}>{suitName}</Text>
        <Text style={styles.emptyLabel}>Empty</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: cardMargin,
  },
  regularCard: {
    padding: 16,
    height: 200,
    flex: 1,
  },
  gridCard: {
    padding: 12,
    width: gridCardWidth,
    aspectRatio: 1, // Square cards for grid
  },
  emptySlot: {
    backgroundColor: '#f9fafb',
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  emoji: {
    fontSize: getFontSize(24),
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: getFontSize(isTablet ? 18 : 16),
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: getFontSize(isTablet ? 14 : 12),
    lineHeight: getFontSize(isTablet ? 20 : 16),
    opacity: 0.8,
  },
  footer: {
    alignItems: 'flex-end',
  },
  suitName: {
    fontSize: 10,
    opacity: 0.6,
  },
  emptyContent: {
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 32,
    marginBottom: 8,
    opacity: 0.4,
  },
  emptySuitName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 2,
  },
  emptyLabel: {
    fontSize: 10,
    color: '#9ca3af',
  },
});