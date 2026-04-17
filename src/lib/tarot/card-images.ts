export const R2_TAROT_BASE = "https://pub-86244ba66c1247a7850218ca7cc8a538.r2.dev/tarot";

const CARD_FILENAMES: Record<string, string> = {
  "card-back": "card-back.png",
  // Major Arcana
  "major-00": "major-00-fool.png",
  "major-01": "major-01-magician.png",
  "major-02": "major-02-high-priestess.png",
  "major-03": "major-03-empress.png",
  "major-04": "major-04-emperor.png",
  "major-05": "major-05-hierophant.png",
  "major-06": "major-06-lovers.png",
  "major-07": "major-07-chariot.png",
  "major-08": "major-08-strength.png",
  "major-09": "major-09-hermit.png",
  "major-10": "major-10-wheel-of-fortune.png",
  "major-11": "major-11-justice.png",
  "major-12": "major-12-hanged-man.png",
  "major-13": "major-13-death.png",
  "major-14": "major-14-temperance.png",
  "major-15": "major-15-devil.png",
  "major-16": "major-16-tower.png",
  "major-17": "major-17-star.png",
  "major-18": "major-18-moon.png",
  "major-19": "major-19-sun.png",
  "major-20": "major-20-judgement.png",
  "major-21": "major-21-world.png",
  // Wands
  "wands-01": "wands-01-ace.png",
  "wands-02": "wands-02-two.png",
  "wands-03": "wands-03-three.png",
  "wands-04": "wands-04-four.png",
  "wands-05": "wands-05-five.png",
  "wands-06": "wands-06-six.png",
  "wands-07": "wands-07-seven.png",
  "wands-08": "wands-08-eight.png",
  "wands-09": "wands-09-nine.png",
  "wands-10": "wands-10-ten.png",
  "wands-11": "wands-11-page.png",
  "wands-12": "wands-12-knight.png",
  "wands-13": "wands-13-queen.png",
  "wands-14": "wands-14-king.png",
  // Cups
  "cups-01": "cups-01-ace.svg",
  "cups-02": "cups-02-two.png",
  "cups-03": "cups-03-three.png",
  "cups-04": "cups-04-four.png",
  "cups-05": "cups-05-five.png",
  "cups-06": "cups-06-six.png",
  "cups-07": "cups-07-seven.png",
  "cups-08": "cups-08-eight.png",
  "cups-09": "cups-09-nine.png",
  "cups-10": "cups-10-ten.png",
  "cups-11": "cups-11-page.png",
  "cups-12": "cups-12-knight.png",
  "cups-13": "cups-13-queen.png",
  "cups-14": "cups-14-king.png",
  // Swords
  "swords-01": "swords-01-ace.png",
  "swords-02": "swords-02-two.png",
  "swords-03": "swords-03-three.png",
  "swords-04": "swords-04-four.png",
  "swords-05": "swords-05-five.png",
  "swords-06": "swords-06-six.png",
  "swords-07": "swords-07-seven.png",
  "swords-08": "swords-08-eight.png",
  "swords-09": "swords-09-nine.png",
  "swords-10": "swords-10-ten.png",
  "swords-11": "swords-11-page.png",
  "swords-12": "swords-12-knight.png",
  "swords-13": "swords-13-queen.png",
  "swords-14": "swords-14-king.png",
  // Pentacles
  "pentacles-01": "pentacles-01-ace.png",
  "pentacles-02": "pentacles-02-two.png",
  "pentacles-03": "pentacles-03-three.png",
  "pentacles-04": "pentacles-04-four.png",
  "pentacles-05": "pentacles-05-five.png",
  "pentacles-06": "pentacles-06-six.png",
  "pentacles-07": "pentacles-07-seven.png",
  "pentacles-08": "pentacles-08-eight.png",
  "pentacles-09": "pentacles-09-nine.png",
  "pentacles-10": "pentacles-10-ten.png",
  "pentacles-11": "pentacles-11-page.png",
  "pentacles-12": "pentacles-12-knight.png",
  "pentacles-13": "pentacles-13-queen.png",
  "pentacles-14": "pentacles-14-king.png",
};

export function getCardImageUrl(cardId: string): string {
  const filename = CARD_FILENAMES[cardId];
  if (!filename) return "";
  return `${R2_TAROT_BASE}/${filename}`;
}

export function getCardBackUrl(): string {
  return `${R2_TAROT_BASE}/card-back.png`;
}
