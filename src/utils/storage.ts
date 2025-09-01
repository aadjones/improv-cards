import AsyncStorage from '@react-native-async-storage/async-storage';
import { Settings, DEFAULT_SETTINGS } from '../constants/cards';

const SETTINGS_KEY = 'pianoImprovCards_settings';

export const loadSettings = async (): Promise<Settings> => {
  try {
    const storedSettings = await AsyncStorage.getItem(SETTINGS_KEY);
    if (storedSettings) {
      const parsed = JSON.parse(storedSettings);
      // Ensure all required fields exist by merging with defaults
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch (error) {
    console.warn('Failed to load settings from storage:', error);
  }
  return DEFAULT_SETTINGS;
};

export const saveSettings = async (settings: Settings): Promise<void> => {
  try {
    await AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.warn('Failed to save settings to storage:', error);
  }
};