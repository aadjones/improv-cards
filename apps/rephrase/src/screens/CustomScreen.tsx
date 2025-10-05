import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CustomScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Custom Prompts</Text>
        <Text style={styles.subtitle}>Coming soon!</Text>
      </View>

      <View style={styles.placeholder}>
        <Text style={styles.placeholderEmoji}>✏️</Text>
        <Text style={styles.placeholderText}>
          Custom prompts feature will be available in a future update.
        </Text>
        <Text style={styles.placeholderHint}>
          You'll be able to create your own practice prompts and improvisation cards.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
    paddingTop: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  placeholder: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  placeholderEmoji: {
    fontSize: 64,
    marginBottom: 24,
    opacity: 0.3,
  },
  placeholderText: {
    fontSize: 17,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 24,
  },
  placeholderHint: {
    fontSize: 15,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 22,
  },
});
