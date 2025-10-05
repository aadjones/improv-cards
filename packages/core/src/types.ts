export type SuitId = string;
export type CardId = string;

export type Card = {
  id: CardId;
  suit: SuitId;
  title: string; // short prompt
  description?: string; // optional elaboration (unified from body/description)
  type: 'practice' | 'improv'; // card category
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
  description?: string;
  type: 'practice' | 'improv'; // card category
  suit?: string; // optional suit assignment
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
};
