import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type Mode = 'practice' | 'improv';

interface ModeSwitchProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
}

export function ModeSwitch({ mode, onChange }: ModeSwitchProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, mode === 'practice' && styles.activeButton]}
        onPress={() => onChange('practice')}
        activeOpacity={0.8}
      >
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={[styles.buttonText, mode === 'practice' && styles.activeText]}>
            General Practice
          </Text>
        </View>
        <Text style={[styles.description, mode === 'practice' && styles.activeDescription]}>
          Mindful, focused work
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, mode === 'improv' && styles.activeButton]}
        onPress={() => onChange('improv')}
        activeOpacity={0.8}
      >
        <View style={styles.titleRow}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={[styles.buttonText, mode === 'improv' && styles.activeText]}>
            Improvisation
          </Text>
        </View>
        <Text style={[styles.description, mode === 'improv' && styles.activeDescription]}>
          Creative exploration
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6B7280',
  },
  activeText: {
    color: '#111827',
  },
  description: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeDescription: {
    color: '#6B7280',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 16,
    marginRight: 4,
    lineHeight: 16,
  },
});
