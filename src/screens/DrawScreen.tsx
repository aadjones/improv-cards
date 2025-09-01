import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  TextInput,
  Switch,
} from 'react-native';
import { Card, EmptyGridSlot } from '../components/Card';
import { 
  Card as CardType, 
  Settings, 
  DEFAULT_SETTINGS,
  TECHNICAL_SUITS,
  LEVELS,
  MOOD_SUIT,
} from '../constants/cards';
import { drawCards, getTechnicalCards, getMoodCards } from '../utils/cardUtils';
import { loadSettings, saveSettings } from '../utils/storage';

interface DrawScreenProps {
  onCardPress: (card: CardType) => void;
}

export function DrawScreen({ onCardPress }: DrawScreenProps) {
  const [drawnCards, setDrawnCards] = useState<CardType[]>([]);
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
      setDrawnCards(newCards);
    } catch (error) {
      Alert.alert('Error', 'No technical cards available with current settings.');
    }
  };

  const clearCards = () => {
    setDrawnCards([]);
  };

  const moodCard = drawnCards.find(card => card.suit === MOOD_SUIT);
  const technicalDrawnCards = drawnCards.filter(card => card.suit !== MOOD_SUIT);

  const getCardForSuit = (suit: string) => {
    return drawnCards.find(card => card.suit === suit);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Draw Practice Cards</Text>
        <Text style={styles.subtitle}>Creative constraints to inspire your practice</Text>
      </View>

      {/* Controls */}
      <View style={styles.controlsContainer}>
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Number of constraint cards:</Text>
          <TextInput
            style={styles.numberInput}
            value={settings.technicalCount.toString()}
            onChangeText={(text) => {
              const num = parseInt(text) || 1;
              updateSettings({ ...settings, technicalCount: Math.max(1, Math.min(4, num)) });
            }}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>

        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>Include mood card</Text>
          <Switch
            value={settings.includeMood}
            onValueChange={(value) => updateSettings({ ...settings, includeMood: value })}
          />
        </View>

        <Text style={styles.availableText}>
          {technicalCards.length} constraint cards • {moodCards.length} mood cards available
        </Text>
      </View>

      {/* Draw Button */}
      <TouchableOpacity style={styles.drawButton} onPress={handleDrawCards}>
        <Text style={styles.drawButtonText}>🎲 Draw Cards</Text>
      </TouchableOpacity>

      {/* Advanced Filters Toggle */}
      <TouchableOpacity 
        style={styles.filtersToggle} 
        onPress={() => setShowFilters(!showFilters)}
      >
        <Text style={styles.filtersToggleText}>
          {showFilters ? '▼' : '▶'} Advanced Filters
        </Text>
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
                  settings.allowedSuits.includes(suit) && styles.checkboxChecked
                ]}
                onPress={() => {
                  const newSuits = settings.allowedSuits.includes(suit)
                    ? settings.allowedSuits.filter(s => s !== suit)
                    : [...settings.allowedSuits, suit];
                  updateSettings({ ...settings, allowedSuits: newSuits });
                }}
              >
                {settings.allowedSuits.includes(suit) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
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
                  settings.allowedLevels.includes(level) && styles.checkboxChecked
                ]}
                onPress={() => {
                  const newLevels = settings.allowedLevels.includes(level)
                    ? settings.allowedLevels.filter(l => l !== level)
                    : [...settings.allowedLevels, level];
                  updateSettings({ ...settings, allowedLevels: newLevels });
                }}
              >
                {settings.allowedLevels.includes(level) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>{level}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Drawn Cards */}
      {drawnCards.length > 0 && (
        <View style={styles.drawnCardsContainer}>
          <Text style={styles.sessionTitle}>Your Practice Session</Text>
          
          {/* Clear Button */}
          <TouchableOpacity style={styles.clearButton} onPress={clearCards}>
            <Text style={styles.clearButtonText}>Clear Cards</Text>
          </TouchableOpacity>

          {/* Mood Banner */}
          {moodCard && (
            <View style={styles.moodBanner}>
              <Text style={styles.moodBannerEmoji}>🎭</Text>
              <View style={styles.moodBannerContent}>
                <Text style={styles.moodBannerTitle}>
                  Practice with a <Text style={styles.moodBannerMood}>
                    {moodCard.title.toUpperCase()}
                  </Text> mood
                </Text>
                <Text style={styles.moodBannerDescription}>{moodCard.description}</Text>
              </View>
            </View>
          )}

          {/* Technical Cards Grid */}
          <View style={styles.gridContainer}>
            {/* Form Slot */}
            {getCardForSuit("🏗️ Form") ? (
              <Card 
                card={getCardForSuit("🏗️ Form")!} 
                isGridCard={true}
                onPress={() => onCardPress(getCardForSuit("🏗️ Form")!)}
              />
            ) : (
              <EmptyGridSlot suitEmoji="🏗️" suitName="Form" />
            )}

            {/* Time Slot */}
            {getCardForSuit("⏳ Time") ? (
              <Card 
                card={getCardForSuit("⏳ Time")!} 
                isGridCard={true}
                onPress={() => onCardPress(getCardForSuit("⏳ Time")!)}
              />
            ) : (
              <EmptyGridSlot suitEmoji="⏳" suitName="Time" />
            )}

            {/* Pitch Slot */}
            {getCardForSuit("〰️ Pitch") ? (
              <Card 
                card={getCardForSuit("〰️ Pitch")!} 
                isGridCard={true}
                onPress={() => onCardPress(getCardForSuit("〰️ Pitch")!)}
              />
            ) : (
              <EmptyGridSlot suitEmoji="〰️" suitName="Pitch" />
            )}

            {/* Position Slot */}
            {getCardForSuit("🎹 Position") ? (
              <Card 
                card={getCardForSuit("🎹 Position")!} 
                isGridCard={true}
                onPress={() => onCardPress(getCardForSuit("🎹 Position")!)}
              />
            ) : (
              <EmptyGridSlot suitEmoji="🎹" suitName="Position" />
            )}
          </View>
        </View>
      )}

      {/* Getting Started */}
      {drawnCards.length === 0 && (
        <View style={styles.gettingStarted}>
          <Text style={styles.gettingStartedEmoji}>🎹</Text>
          <Text style={styles.gettingStartedTitle}>Ready to Practice?</Text>
          <Text style={styles.gettingStartedText}>
            {settings.includeMood 
              ? `Draw ${settings.technicalCount} constraint card${settings.technicalCount > 1 ? 's' : ''} + 1 mood`
              : `Draw ${settings.technicalCount} constraint card${settings.technicalCount > 1 ? 's' : ''}`
            }
          </Text>
        </View>
      )}
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
  numberInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    width: 60,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  availableText: {
    fontSize: 12,
    color: '#6b7280',
  },
  drawButton: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
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
  drawnCardsContainer: {
    marginTop: 16,
  },
  sessionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#111827',
  },
  clearButton: {
    backgroundColor: '#6b7280',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  clearButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  moodBanner: {
    backgroundColor: '#fef3f2',
    borderWidth: 2,
    borderColor: '#fecaca',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodBannerEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  moodBannerContent: {
    flex: 1,
  },
  moodBannerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  moodBannerMood: {
    color: '#be185d',
    fontWeight: 'bold',
  },
  moodBannerDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 8,
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