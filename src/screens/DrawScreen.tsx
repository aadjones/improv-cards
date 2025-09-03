import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, Switch } from 'react-native';
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
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
  const [showFilters, setShowFilters] = useState(false);

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

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Number of constraint cards:</Text>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() =>
                updateSettings({
                  ...settings,
                  technicalCount: Math.max(1, settings.technicalCount - 1),
                })
              }
              disabled={settings.technicalCount <= 1}
            >
              <Text
                style={[
                  styles.stepperButtonText,
                  settings.technicalCount <= 1 && styles.stepperButtonDisabled,
                ]}
              >
                −
              </Text>
            </TouchableOpacity>

            <View style={styles.stepperValue}>
              <Text style={styles.stepperValueText}>{settings.technicalCount}</Text>
            </View>

            <TouchableOpacity
              style={styles.stepperButton}
              onPress={() =>
                updateSettings({
                  ...settings,
                  technicalCount: Math.min(4, settings.technicalCount + 1),
                })
              }
              disabled={settings.technicalCount >= 4}
            >
              <Text
                style={[
                  styles.stepperButtonText,
                  settings.technicalCount >= 4 && styles.stepperButtonDisabled,
                ]}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Include mood card</Text>
          <Switch
            value={settings.includeMood}
            onValueChange={value => updateSettings({ ...settings, includeMood: value })}
          />
        </View>

        <Text style={styles.availableText}>
          {technicalCards.length} constraint cards • {moodCards.length} mood cards available
        </Text>
      </View>

      {/* Advanced Filters Toggle */}
      <TouchableOpacity style={styles.filtersToggle} onPress={() => setShowFilters(!showFilters)}>
        <Text style={styles.filtersToggleText}>{showFilters ? '▼' : '▶'} Advanced Filters</Text>
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
        </View>
      )}

      {/* Getting Started */}
      <View style={styles.gettingStarted}>
        <Text style={styles.gettingStartedEmoji}>🎹</Text>
        <Text style={styles.gettingStartedTitle}>Ready to Practice?</Text>
        <Text style={styles.gettingStartedText}>
          {settings.includeMood
            ? `Draw ${settings.technicalCount} constraint card${settings.technicalCount > 1 ? 's' : ''} + 1 mood`
            : `Draw ${settings.technicalCount} constraint card${settings.technicalCount > 1 ? 's' : ''}`}
        </Text>

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
  controlsContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    height: 36,
  },
  stepperButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 36,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  stepperButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563eb',
    lineHeight: 16,
  },
  stepperButtonDisabled: {
    color: '#d1d5db',
  },
  stepperValue: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    width: 36,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#e5e7eb',
  },
  stepperValueText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    lineHeight: 15,
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
});
