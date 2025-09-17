import { DrawEvent } from './types';

export interface PracticeStore {
  getHistory(): Promise<DrawEvent[]>;
  append(event: DrawEvent): Promise<void>;
  clear(): Promise<void>;
}
