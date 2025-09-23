export type SuitId = string;
export type CardId = string;

export type Card = {
  id: CardId;
  suit: SuitId;
  title: string; // short prompt
  body?: string; // optional elaboration
  tags?: string[]; // "mindful" | "technical" | "constraint" | etc.
  isCustom?: boolean; // true for user-created prompts
};

export type Deck = {
  suits: SuitId[];
  cards: Card[];
};

export type DrawEvent = {
  cardId: CardId;
  suit: SuitId;
  timestamp: number; // ms
};

export type CustomPrompt = {
  id: CardId;
  title: string;
  body?: string;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
};
