import cardBack from "@/assets/tarot/card-back.png";
import major00 from "@/assets/tarot/major-00-fool.png";
import major01 from "@/assets/tarot/major-01-magician.png";
import major02 from "@/assets/tarot/major-02-high-priestess.png";
import major03 from "@/assets/tarot/major-03-empress.png";
import major04 from "@/assets/tarot/major-04-emperor.png";
import major05 from "@/assets/tarot/major-05-hierophant.png";
import major06 from "@/assets/tarot/major-06-lovers.png";
import major07 from "@/assets/tarot/major-07-chariot.png";
import major08 from "@/assets/tarot/major-08-strength.png";
import major09 from "@/assets/tarot/major-09-hermit.png";
import major10 from "@/assets/tarot/major-10-wheel-of-fortune.png";
import major11 from "@/assets/tarot/major-11-justice.png";
import major12 from "@/assets/tarot/major-12-hanged-man.png";
import major13 from "@/assets/tarot/major-13-death.png";
import major14 from "@/assets/tarot/major-14-temperance.png";
import major15 from "@/assets/tarot/major-15-devil.png";
import major16 from "@/assets/tarot/major-16-tower.png";
import major17 from "@/assets/tarot/major-17-star.png";
import major18 from "@/assets/tarot/major-18-moon.png";
import major19 from "@/assets/tarot/major-19-sun.png";
import major20 from "@/assets/tarot/major-20-judgement.png";
import major21 from "@/assets/tarot/major-21-world.png";
import wands01 from "@/assets/tarot/wands-01-ace.png";
import wands02 from "@/assets/tarot/wands-02-two.png";
import wands03 from "@/assets/tarot/wands-03-three.png";
import wands04 from "@/assets/tarot/wands-04-four.png";
import wands05 from "@/assets/tarot/wands-05-five.png";
import wands06 from "@/assets/tarot/wands-06-six.png";
import wands07 from "@/assets/tarot/wands-07-seven.png";
import wands08 from "@/assets/tarot/wands-08-eight.png";
import wands09 from "@/assets/tarot/wands-09-nine.png";
import wands10 from "@/assets/tarot/wands-10-ten.png";
import wands11 from "@/assets/tarot/wands-11-page.png";
import wands12 from "@/assets/tarot/wands-12-knight.png";
import wands13 from "@/assets/tarot/wands-13-queen.png";
import wands14 from "@/assets/tarot/wands-14-king.png";
import cups01 from "@/assets/tarot/cups-01-ace.svg";
import cups02 from "@/assets/tarot/cups-02-two.png";
import cups03 from "@/assets/tarot/cups-03-three.png";
import cups04 from "@/assets/tarot/cups-04-four.png";
import cups05 from "@/assets/tarot/cups-05-five.png";
import cups06 from "@/assets/tarot/cups-06-six.png";
import cups07 from "@/assets/tarot/cups-07-seven.png";
import cups08 from "@/assets/tarot/cups-08-eight.png";
import cups09 from "@/assets/tarot/cups-09-nine.png";
import cups10 from "@/assets/tarot/cups-10-ten.png";
import cups11 from "@/assets/tarot/cups-11-page.png";
import cups12 from "@/assets/tarot/cups-12-knight.png";
import cups13 from "@/assets/tarot/cups-13-queen.png";
import cups14 from "@/assets/tarot/cups-14-king.png";
import swords01 from "@/assets/tarot/swords-01-ace.png";
import swords02 from "@/assets/tarot/swords-02-two.png";
import swords03 from "@/assets/tarot/swords-03-three.png";
import swords04 from "@/assets/tarot/swords-04-four.png";
import swords05 from "@/assets/tarot/swords-05-five.png";
import swords06 from "@/assets/tarot/swords-06-six.png";
import swords07 from "@/assets/tarot/swords-07-seven.png";
import swords08 from "@/assets/tarot/swords-08-eight.png";
import swords09 from "@/assets/tarot/swords-09-nine.png";
import swords10 from "@/assets/tarot/swords-10-ten.png";
import swords11 from "@/assets/tarot/swords-11-page.png";
import swords12 from "@/assets/tarot/swords-12-knight.png";
import swords13 from "@/assets/tarot/swords-13-queen.png";
import swords14 from "@/assets/tarot/swords-14-king.png";
import pentacles01 from "@/assets/tarot/pentacles-01-ace.png";
import pentacles02 from "@/assets/tarot/pentacles-02-two.png";
import pentacles03 from "@/assets/tarot/pentacles-03-three.png";
import pentacles04 from "@/assets/tarot/pentacles-04-four.png";
import pentacles05 from "@/assets/tarot/pentacles-05-five.png";
import pentacles06 from "@/assets/tarot/pentacles-06-six.png";
import pentacles07 from "@/assets/tarot/pentacles-07-seven.png";
import pentacles08 from "@/assets/tarot/pentacles-08-eight.png";
import pentacles09 from "@/assets/tarot/pentacles-09-nine.png";
import pentacles10 from "@/assets/tarot/pentacles-10-ten.png";
import pentacles11 from "@/assets/tarot/pentacles-11-page.png";
import pentacles12 from "@/assets/tarot/pentacles-12-knight.png";
import pentacles13 from "@/assets/tarot/pentacles-13-queen.png";
import pentacles14 from "@/assets/tarot/pentacles-14-king.png";

export type CardImageId =
  | "card-back"
  | `major-${string}`
  | `wands-${string}`
  | `cups-${string}`
  | `swords-${string}`
  | `pentacles-${string}`;

export const CARD_IMAGES: Record<string, ImageMetadata | string> = {
  "card-back": cardBack,
  "major-00": major00,
  "major-01": major01,
  "major-02": major02,
  "major-03": major03,
  "major-04": major04,
  "major-05": major05,
  "major-06": major06,
  "major-07": major07,
  "major-08": major08,
  "major-09": major09,
  "major-10": major10,
  "major-11": major11,
  "major-12": major12,
  "major-13": major13,
  "major-14": major14,
  "major-15": major15,
  "major-16": major16,
  "major-17": major17,
  "major-18": major18,
  "major-19": major19,
  "major-20": major20,
  "major-21": major21,
  "wands-01": wands01,
  "wands-02": wands02,
  "wands-03": wands03,
  "wands-04": wands04,
  "wands-05": wands05,
  "wands-06": wands06,
  "wands-07": wands07,
  "wands-08": wands08,
  "wands-09": wands09,
  "wands-10": wands10,
  "wands-11": wands11,
  "wands-12": wands12,
  "wands-13": wands13,
  "wands-14": wands14,
  "cups-01": cups01,
  "cups-02": cups02,
  "cups-03": cups03,
  "cups-04": cups04,
  "cups-05": cups05,
  "cups-06": cups06,
  "cups-07": cups07,
  "cups-08": cups08,
  "cups-09": cups09,
  "cups-10": cups10,
  "cups-11": cups11,
  "cups-12": cups12,
  "cups-13": cups13,
  "cups-14": cups14,
  "swords-01": swords01,
  "swords-02": swords02,
  "swords-03": swords03,
  "swords-04": swords04,
  "swords-05": swords05,
  "swords-06": swords06,
  "swords-07": swords07,
  "swords-08": swords08,
  "swords-09": swords09,
  "swords-10": swords10,
  "swords-11": swords11,
  "swords-12": swords12,
  "swords-13": swords13,
  "swords-14": swords14,
  "pentacles-01": pentacles01,
  "pentacles-02": pentacles02,
  "pentacles-03": pentacles03,
  "pentacles-04": pentacles04,
  "pentacles-05": pentacles05,
  "pentacles-06": pentacles06,
  "pentacles-07": pentacles07,
  "pentacles-08": pentacles08,
  "pentacles-09": pentacles09,
  "pentacles-10": pentacles10,
  "pentacles-11": pentacles11,
  "pentacles-12": pentacles12,
  "pentacles-13": pentacles13,
  "pentacles-14": pentacles14,
};

export function getCardImage(cardId: string): ImageMetadata | string | undefined {
  return CARD_IMAGES[cardId];
}

export function getCardBackImage(): ImageMetadata | string {
  return CARD_IMAGES["card-back"];
}
