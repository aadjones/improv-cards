import AsyncStorage from '@react-native-async-storage/async-storage';
import { localStore } from '../src/store/localStore';
import { DrawEvent } from '@core/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { mockAsyncStorage } from './setup';

// TypeScript-friendly mock
const mockStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

describe('localStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getHistory', () => {
    it('returns empty array when no data exists', async () => {
      mockStorage.getItem.mockResolvedValue(null);

      const history = await localStore.getHistory();

      expect(history).toEqual([]);
      expect(mockStorage.getItem).toHaveBeenCalledWith('practice_history_v1');
    });

    it('parses and returns stored history', async () => {
      const storedEvents: DrawEvent[] = [
        { cardId: 'physical-1', suit: 'physical', timestamp: 1234567890 },
        { cardId: 'time-1', suit: 'time', timestamp: 1234567891 },
      ];

      mockStorage.getItem.mockResolvedValue(JSON.stringify(storedEvents));

      const history = await localStore.getHistory();

      expect(history).toEqual(storedEvents);
    });

    it('handles corrupted data gracefully', async () => {
      mockStorage.getItem.mockResolvedValue('invalid json');

      await expect(localStore.getHistory()).rejects.toThrow();
    });
  });

  describe('append', () => {
    it('adds new event to empty history', async () => {
      mockStorage.getItem.mockResolvedValue(null);
      mockStorage.setItem.mockResolvedValue();

      const newEvent: DrawEvent = {
        cardId: 'physical-1',
        suit: 'physical',
        timestamp: Date.now(),
      };

      await localStore.append(newEvent);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'practice_history_v1',
        JSON.stringify([newEvent])
      );
    });

    it('adds new event to existing history', async () => {
      const existingEvents: DrawEvent[] = [
        { cardId: 'time-1', suit: 'time', timestamp: 1234567890 },
      ];
      const newEvent: DrawEvent = {
        cardId: 'physical-1',
        suit: 'physical',
        timestamp: 1234567891,
      };

      mockStorage.getItem.mockResolvedValue(JSON.stringify(existingEvents));
      mockStorage.setItem.mockResolvedValue();

      await localStore.append(newEvent);

      expect(mockStorage.setItem).toHaveBeenCalledWith(
        'practice_history_v1',
        JSON.stringify([...existingEvents, newEvent])
      );
    });
  });

  describe('clear', () => {
    it('removes all stored history', async () => {
      mockStorage.removeItem.mockResolvedValue();

      await localStore.clear();

      expect(mockStorage.removeItem).toHaveBeenCalledWith('practice_history_v1');
    });
  });

  describe('storage key consistency', () => {
    it('uses consistent key across all operations', async () => {
      const key = 'practice_history_v1';

      mockStorage.getItem.mockResolvedValue(null);
      mockStorage.setItem.mockResolvedValue();
      mockStorage.removeItem.mockResolvedValue();

      await localStore.getHistory();
      await localStore.append({ cardId: 'test', suit: 'physical', timestamp: Date.now() });
      await localStore.clear();

      expect(mockStorage.getItem).toHaveBeenCalledWith(key);
      expect(mockStorage.setItem).toHaveBeenCalledWith(key, expect.any(String));
      expect(mockStorage.removeItem).toHaveBeenCalledWith(key);
    });
  });
});
