export const R2_TAROT_BASE = "https://pub-86244ba66c1247a7850218ca7cc8a538.r2.dev/tarot";

const CARD_FILENAMES: Record<string, string> = {
  "card-back": "card-back.webp",
  // Major Arcana
  "major-00": "major-00-fool.webp",
  "major-01": "major-01-magician.webp",
  "major-02": "major-02-high-priestess.webp",
  "major-03": "major-03-empress.webp",
  "major-04": "major-04-emperor.webp",
  "major-05": "major-05-hierophant.webp",
  "major-06": "major-06-lovers.webp",
  "major-07": "major-07-chariot.webp",
  "major-08": "major-08-strength.webp",
  "major-09": "major-09-hermit.webp",
  "major-10": "major-10-wheel-of-fortune.webp",
  "major-11": "major-11-justice.webp",
  "major-12": "major-12-hanged-man.webp",
  "major-13": "major-13-death.webp",
  "major-14": "major-14-temperance.webp",
  "major-15": "major-15-devil.webp",
  "major-16": "major-16-tower.webp",
  "major-17": "major-17-star.webp",
  "major-18": "major-18-moon.webp",
  "major-19": "major-19-sun.webp",
  "major-20": "major-20-judgement.webp",
  "major-21": "major-21-world.webp",
  // Wands
  "wands-01": "wands-01-ace.webp",
  "wands-02": "wands-02-two.webp",
  "wands-03": "wands-03-three.webp",
  "wands-04": "wands-04-four.webp",
  "wands-05": "wands-05-five.webp",
  "wands-06": "wands-06-six.webp",
  "wands-07": "wands-07-seven.webp",
  "wands-08": "wands-08-eight.webp",
  "wands-09": "wands-09-nine.webp",
  "wands-10": "wands-10-ten.webp",
  "wands-11": "wands-11-page.webp",
  "wands-12": "wands-12-knight.webp",
  "wands-13": "wands-13-queen.webp",
  "wands-14": "wands-14-king.webp",
  // Cups
  "cups-01": "cups-01-ace.webp",
  "cups-02": "cups-02-two.webp",
  "cups-03": "cups-03-three.webp",
  "cups-04": "cups-04-four.webp",
  "cups-05": "cups-05-five.webp",
  "cups-06": "cups-06-six.webp",
  "cups-07": "cups-07-seven.webp",
  "cups-08": "cups-08-eight.webp",
  "cups-09": "cups-09-nine.webp",
  "cups-10": "cups-10-ten.webp",
  "cups-11": "cups-11-page.webp",
  "cups-12": "cups-12-knight.webp",
  "cups-13": "cups-13-queen.webp",
  "cups-14": "cups-14-king.webp",
  // Swords
  "swords-01": "swords-01-ace.webp",
  "swords-02": "swords-02-two.webp",
  "swords-03": "swords-03-three.webp",
  "swords-04": "swords-04-four.webp",
  "swords-05": "swords-05-five.webp",
  "swords-06": "swords-06-six.webp",
  "swords-07": "swords-07-seven.webp",
  "swords-08": "swords-08-eight.webp",
  "swords-09": "swords-09-nine.webp",
  "swords-10": "swords-10-ten.webp",
  "swords-11": "swords-11-page.webp",
  "swords-12": "swords-12-knight.webp",
  "swords-13": "swords-13-queen.webp",
  "swords-14": "swords-14-king.webp",
  // Pentacles
  "pentacles-01": "pentacles-01-ace.webp",
  "pentacles-02": "pentacles-02-two.webp",
  "pentacles-03": "pentacles-03-three.webp",
  "pentacles-04": "pentacles-04-four.webp",
  "pentacles-05": "pentacles-05-five.webp",
  "pentacles-06": "pentacles-06-six.webp",
  "pentacles-07": "pentacles-07-seven.webp",
  "pentacles-08": "pentacles-08-eight.webp",
  "pentacles-09": "pentacles-09-nine.webp",
  "pentacles-10": "pentacles-10-ten.webp",
  "pentacles-11": "pentacles-11-page.webp",
  "pentacles-12": "pentacles-12-knight.webp",
  "pentacles-13": "pentacles-13-queen.webp",
  "pentacles-14": "pentacles-14-king.webp",
};

export function getCardImageUrl(cardId: string): string {
  const filename = CARD_FILENAMES[cardId];
  if (!filename) return "";
  return `${R2_TAROT_BASE}/${filename}`;
}

export function getCardBackUrl(): string {
  return `${R2_TAROT_BASE}/card-back.webp`;
}
