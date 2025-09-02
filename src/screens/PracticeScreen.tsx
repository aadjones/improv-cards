import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Card } from '../components/Card';
import { Card as CardData } from '../constants/cards';
import { getCardWidth } from '../utils/responsive';
import { RootStackParamList } from '../types/navigation';

type PracticeScreenProps = NativeStackScreenProps<RootStackParamList, 'Practice'>;

export const PracticeScreen: React.FC<PracticeScreenProps> = ({ navigation, route }) => {
  const { drawnCards } = route.params;
  const constraintCards = drawnCards.filter(card => card.suit !== '🎭 Mood');
  const moodCard = drawnCards.find(card => card.suit === '🎭 Mood');

  const cardSize = Math.min(getCardWidth(), 180);

  const renderCard = (card: CardData) => (
    <View key={card.id} style={[styles.cardContainer, { width: cardSize }]}>
      <Card
        card={card}
        onPress={() => {}} // No press action needed in practice mode
        style={{
          minHeight: cardSize * 1.2,
          marginBottom: 0,
        }}
      />
    </View>
  );

  const getGridLayout = () => {
    const numConstraints = constraintCards.length;
    if (numConstraints <= 2) {
      return { numColumns: 2, constraintRows: 1 };
    } else {
      return { numColumns: 2, constraintRows: 2 };
    }
  };

  const { numColumns } = getGridLayout();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Setup</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Practice Session</Text>
        <TouchableOpacity style={styles.newSessionButton} onPress={() => navigation.goBack()}>
          <Text style={styles.newSessionText}>New Session</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Mood Card - Full Width at Top */}
        {moodCard && (
          <View style={styles.moodSection}>
            <View style={styles.moodCardContainer}>
              <Card
                card={moodCard}
                onPress={() => {}}
                style={{
                  minHeight: cardSize * 0.8,
                  marginBottom: 0,
                }}
              />
            </View>
          </View>
        )}

        {/* Constraint Cards Grid */}
        <View style={styles.constraintSection}>
          <View style={[styles.grid, { maxWidth: cardSize * numColumns + 32 }]}>
            {constraintCards.map(card => renderCard(card))}
          </View>
        </View>

        {/* Practice Tips */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipText}>
            💡 Use these constraints as creative guidelines, not strict rules
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  newSessionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
  },
  newSessionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    alignItems: 'center',
  },
  moodSection: {
    width: '100%',
    marginBottom: 24,
    alignItems: 'center',
  },
  moodCardContainer: {
    width: '90%',
    maxWidth: 400,
  },
  constraintSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  cardContainer: {
    // Individual card styling handled by responsive values
  },
  tipsSection: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tipText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
