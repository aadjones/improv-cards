import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawEvent } from '@core/types';
import { PracticeStore } from '@core/store';

const KEY = 'practice_history_v1';

export const localStore: PracticeStore = {
  async getHistory() {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DrawEvent[]) : [];
  },
  async append(event: DrawEvent) {
    const history = await this.getHistory();
    history.push(event);
    await AsyncStorage.setItem(KEY, JSON.stringify(history));
  },
  async clear() {
    await AsyncStorage.removeItem(KEY);
  },
};
