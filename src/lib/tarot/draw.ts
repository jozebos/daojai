import { TAROT_DECK, type TarotCard } from "./deck";
import { createSeededRandom, hashString } from "../utils/hash";
import { type DateInput, toDateKey } from "../utils/date";

export type TarotOrientation = "upright" | "reversed";
export type TarotThreeCardPosition = "past" | "present" | "future";

export interface DrawnTarotCard {
  card: TarotCard;
  orientation: TarotOrientation;
  seed: number;
}

export interface DailyTarotDraw extends DrawnTarotCard {
  userId: string;
  date: string;
}

export interface ThreeCardSpreadItem extends DrawnTarotCard {
  position: TarotThreeCardPosition;
}

function shuffleDeterministically(
  deck: readonly TarotCard[],
  random: () => number,
): TarotCard[] {
  const shuffled = [...deck];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled;
}

function buildSeedKey(userId: string, date: DateInput): string {
  return `${userId}-${toDateKey(date)}`;
}

function drawCards(
  userId: string,
  date: DateInput,
  count: number,
  deck: readonly TarotCard[] = TAROT_DECK,
): DrawnTarotCard[] {
  if (!userId.trim()) {
    throw new Error("userId is required for deterministic tarot draws");
  }

  if (!Number.isInteger(count) || count <= 0) {
    throw new Error(`Draw count must be a positive integer, received ${count}`);
  }

  if (count > deck.length) {
    throw new Error(`Cannot draw ${count} cards from a deck of ${deck.length}`);
  }

  const seedKey = buildSeedKey(userId, date);
  const seed = hashString(seedKey);
  const random = createSeededRandom(seed);
  const shuffledDeck = shuffleDeterministically(deck, random);

  return shuffledDeck.slice(0, count).map((card) => ({
    card,
    orientation: random() < 0.5 ? "reversed" : "upright",
    seed,
  }));
}

export function drawDailyTarotCard(
  userId: string,
  date: DateInput,
  deck: readonly TarotCard[] = TAROT_DECK,
): DailyTarotDraw {
  const [drawnCard] = drawCards(userId, date, 1, deck);

  return {
    ...drawnCard,
    userId,
    date: toDateKey(date),
  };
}

export function drawThreeCardSpread(
  userId: string,
  date: DateInput,
  deck: readonly TarotCard[] = TAROT_DECK,
): readonly ThreeCardSpreadItem[] {
  const positions: readonly TarotThreeCardPosition[] = [
    "past",
    "present",
    "future",
  ] as const;

  return drawCards(userId, date, 3, deck).map((drawnCard, index) => ({
    ...drawnCard,
    position: positions[index],
  }));
}

export function getTarotMeaningByOrientation(drawnCard: DrawnTarotCard): string {
  return drawnCard.orientation === "upright"
    ? drawnCard.card.upright_meaning_th
    : drawnCard.card.reversed_meaning_th;
}
