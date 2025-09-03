import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  Card as CardType,
  Settings,
  DEFAULT_SETTINGS,
  TECHNICAL_SUITS,
  LEVELS,
} from '../constants/cards';
import { drawCards, getTechnicalCards, getMoodCards } from '../utils/cardUtils';
import { loadSettings, saveSettings } from '../utils/storage';
import { RootStackParamList } from '../types/navigation';

interface DrawScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
  onCardPress: (card: CardType) => void;
}

export function DrawScreen({ navigation }: DrawScreenProps) {
  const [settings, setSettings] = useState<Settings>({ ...DEFAULT_SETTINGS, technicalCount: 1 });
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    loadSettings().then(setSettings);
  }, []);

  const updateSettings = async (newSettings: Settings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const technicalCards = useMemo(() => getTechnicalCards(settings), [settings]);
  const moodCards = useMemo(() => getMoodCards(), []);

  const handleDrawCards = () => {
    try {
      const newCards = drawCards(settings);
      navigation.navigate('Practice', { drawnCards: newCards });
    } catch {
      Alert.alert('Error', 'No technical cards available with current settings.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Practice Setup</Text>
        <Text style={styles.subtitle}>Creative constraints to inspire your practice</Text>
      </View>

      {/* Card Count Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.availableText}>
          {technicalCards.length} constraint cards • {moodCards.length} mood cards available
        </Text>
      </View>

      {/* Filter Options Toggle */}
      <TouchableOpacity style={styles.filtersToggle} onPress={() => setShowFilters(!showFilters)}>
        <Text style={styles.filtersToggleText}>{showFilters ? '▼' : '▶'} Filter Options</Text>
      </TouchableOpacity>

      {/* Advanced Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <Text style={styles.filterTitle}>Constraint Card Suits</Text>
          {TECHNICAL_SUITS.map(suit => (
            <View key={suit} style={styles.checkboxRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  settings.allowedSuits.includes(suit) && styles.checkboxChecked,
                ]}
                onPress={() => {
                  const newSuits = settings.allowedSuits.includes(suit)
                    ? settings.allowedSuits.filter(s => s !== suit)
                    : [...settings.allowedSuits, suit];
                  updateSettings({ ...settings, allowedSuits: newSuits });
                }}
              >
                {settings.allowedSuits.includes(suit) && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>{suit}</Text>
            </View>
          ))}

          <Text style={styles.filterTitle}>Difficulty Levels</Text>
          {LEVELS.map(level => (
            <View key={level} style={styles.checkboxRow}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  settings.allowedLevels.includes(level) && styles.checkboxChecked,
                ]}
                onPress={() => {
                  const newLevels = settings.allowedLevels.includes(level)
                    ? settings.allowedLevels.filter(l => l !== level)
                    : [...settings.allowedLevels, level];
                  updateSettings({ ...settings, allowedLevels: newLevels });
                }}
              >
                {settings.allowedLevels.includes(level) && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>{level}</Text>
            </View>
          ))}

          {/* All Set Button */}
          <TouchableOpacity style={styles.allSetButton} onPress={() => setShowFilters(false)}>
            <Text style={styles.allSetButtonText}>✓ All Set!</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Getting Started */}
      <View style={styles.gettingStarted}>
        <Text style={styles.gettingStartedEmoji}>🎹</Text>
        <Text style={styles.gettingStartedTitle}>Ready to Practice?</Text>
        <Text style={styles.gettingStartedText}>Draw 1 constraint card + mood inspiration</Text>

        {/* Draw Button - Final Action */}
        <TouchableOpacity style={styles.drawButton} onPress={handleDrawCards}>
          <Text style={styles.drawButtonText}>🎲 Draw Cards</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  infoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  availableText: {
    fontSize: 12,
    color: '#6b7280',
  },
  drawButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'stretch',
  },
  drawButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  filtersToggle: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  filtersToggleText: {
    color: '#2563eb',
    fontSize: 14,
    fontWeight: '500',
  },
  filtersContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 16,
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#374151',
  },
  gettingStarted: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    marginTop: 32,
  },
  gettingStartedEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  gettingStartedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  gettingStartedText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  allSetButton: {
    backgroundColor: '#10b981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  allSetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
