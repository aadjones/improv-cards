import { Card as CardType } from '../constants/cards';

export type RootStackParamList = {
  Main: undefined;
  Browse: undefined;
  Practice: {
    drawnCards: CardType[];
  };
};
