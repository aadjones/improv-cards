import { Card as CardType } from '../constants/cards';

export type RootStackParamList = {
  Main: undefined;
  Practice: {
    drawnCards: CardType[];
  };
};
