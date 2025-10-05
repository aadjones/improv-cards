import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card as CardType } from '@core/types';
import { SUIT_COLORS } from '../data/cards';

interface CardProps {
  card: CardType;
  onPress?: () => void;
  style?: object;
}

export function Card({ card, onPress, style }: CardProps) {
  const suitColors = SUIT_COLORS[card.suit] || SUIT_COLORS.custom;

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
        <Text style={[styles.suitLabel, { color: suitColors.text }]}>
          {card.suit.toUpperCase()}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={[styles.title, { color: suitColors.text }]}>{card.title}</Text>
        {card.description && (
          <Text style={[styles.description, { color: suitColors.text }]}>
            {card.description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderWidth: 3,
    padding: 24,
    minHeight: 180,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 16,
    marginHorizontal: 20,
  },
  header: {
    marginBottom: 16,
  },
  suitLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    opacity: 0.7,
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
