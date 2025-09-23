import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomPrompt, Card } from '@core/types';

const CUSTOM_PROMPTS_KEY = 'custom_prompts_v1';
const CUSTOM_SUIT = 'custom';

export interface CustomPromptsStore {
  getCustomPrompts(): Promise<CustomPrompt[]>;
  addCustomPrompt(title: string, body?: string): Promise<CustomPrompt>;
  updateCustomPrompt(id: string, title: string, body?: string): Promise<CustomPrompt>;
  deleteCustomPrompt(id: string): Promise<void>;
  getCustomCards(): Promise<Card[]>;
  clear(): Promise<void>;
}

function generateId(): string {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function validatePrompt(title: string, body?: string): void {
  if (!title || title.trim().length === 0) {
    throw new Error('Title is required');
  }
  if (title.trim().length > 100) {
    throw new Error('Title must be 100 characters or less');
  }
  if (body && body.length > 500) {
    throw new Error('Description must be 500 characters or less');
  }
}

export const customPromptsStore: CustomPromptsStore = {
  async getCustomPrompts(): Promise<CustomPrompt[]> {
    try {
      const raw = await AsyncStorage.getItem(CUSTOM_PROMPTS_KEY);
      return raw ? (JSON.parse(raw) as CustomPrompt[]) : [];
    } catch (error) {
      console.error('Error loading custom prompts:', error);
      return [];
    }
  },

  async addCustomPrompt(title: string, body?: string): Promise<CustomPrompt> {
    validatePrompt(title, body);

    const now = Date.now();
    const prompt: CustomPrompt = {
      id: generateId(),
      title: title.trim(),
      body: body?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    };

    const prompts = await this.getCustomPrompts();
    prompts.push(prompt);
    await AsyncStorage.setItem(CUSTOM_PROMPTS_KEY, JSON.stringify(prompts));

    return prompt;
  },

  async updateCustomPrompt(id: string, title: string, body?: string): Promise<CustomPrompt> {
    validatePrompt(title, body);

    const prompts = await this.getCustomPrompts();
    const promptIndex = prompts.findIndex(p => p.id === id);

    if (promptIndex === -1) {
      throw new Error('Custom prompt not found');
    }

    const updatedPrompt: CustomPrompt = {
      ...prompts[promptIndex],
      title: title.trim(),
      body: body?.trim() || undefined,
      updatedAt: Date.now(),
    };

    prompts[promptIndex] = updatedPrompt;
    await AsyncStorage.setItem(CUSTOM_PROMPTS_KEY, JSON.stringify(prompts));

    return updatedPrompt;
  },

  async deleteCustomPrompt(id: string): Promise<void> {
    const prompts = await this.getCustomPrompts();
    const filteredPrompts = prompts.filter(p => p.id !== id);

    if (filteredPrompts.length === prompts.length) {
      throw new Error('Custom prompt not found');
    }

    await AsyncStorage.setItem(CUSTOM_PROMPTS_KEY, JSON.stringify(filteredPrompts));
  },

  async getCustomCards(): Promise<Card[]> {
    const prompts = await this.getCustomPrompts();
    return prompts.map(prompt => ({
      id: prompt.id,
      suit: CUSTOM_SUIT,
      title: prompt.title,
      body: prompt.body,
      isCustom: true,
    }));
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(CUSTOM_PROMPTS_KEY);
  },
};