export type TarotArcana = "major" | "minor";
export type TarotSuitKey = "wands" | "cups" | "swords" | "pentacles";
export type TarotElement = "fire" | "water" | "air" | "earth" | "spirit";

export interface TarotCard {
  id: string;
  arcana: TarotArcana;
  suit?: TarotSuitKey;
  name_en: string;
  name_th: string;
  keywords_th: readonly string[];
  upright_meaning_th: string;
  reversed_meaning_th: string;
  element: TarotElement;
  number: number;
}

interface MinorSuitDefinition {
  key: TarotSuitKey;
  name_en: string;
  name_th: string;
  element: Exclude<TarotElement, "spirit">;
  lifeArea_th: string;
  uprightTone_th: string;
  reversedTone_th: string;
  keywordBase: readonly string[];
}

interface MinorRankDefinition {
  key: string;
  number: number;
  name_en: string;
  name_th: string;
  keywords_th: readonly string[];
  uprightFocus_th: string;
  reversedFocus_th: string;
}

function uniqueKeywords(keywords: readonly string[]): readonly string[] {
  return Array.from(new Set(keywords));
}

export const MAJOR_ARCANA: readonly TarotCard[] = [
  {
    id: "major-00",
    arcana: "major",
    name_en: "The Fool",
    name_th: "นักเดินทาง",
    keywords_th: ["เริ่มต้น", "อิสระ", "กล้าก้าว"],
    upright_meaning_th:
      "ไพ่ใบนี้คือพลังของการเริ่มต้นใหม่แบบยังไม่ต้องมีคำตอบครบทุกข้อ คุณกำลังถูกชวนให้เชื่อใจเส้นทางและลองก้าวแรกด้วยหัวใจที่เบาแต่ตื่นเต้น",
    reversed_meaning_th:
      "พลังเริ่มต้นยังมีอยู่ แต่ตอนนี้อาจเผลอลุยโดยไม่เช็กความพร้อม หรือกลัวพลาดจนไม่กล้าก้าว ลองตั้งหลักแล้วเริ่มแบบค่อยเป็นค่อยไป",
    element: "spirit",
    number: 0,
  },
  {
    id: "major-01",
    arcana: "major",
    name_en: "The Magician",
    name_th: "นักมายากล",
    keywords_th: ["ลงมือทำ", "ทักษะ", "พลังสร้างสรรค์"],
    upright_meaning_th:
      "คุณมีเครื่องมือครบกว่าที่คิด ไพ่ใบนี้บอกว่าถึงเวลาหยิบความสามารถที่มีออกมาใช้จริง แล้วเปลี่ยนไอเดียให้กลายเป็นของที่จับต้องได้",
    reversed_meaning_th:
      "อาจมีพลังดีแต่ยังใช้ไม่เต็มที่ หรือเผลอกระจายพลังจนหลุดโฟกัส ลองกลับมารวมสมาธิกับสิ่งที่สำคัญที่สุดก่อน",
    element: "spirit",
    number: 1,
  },
  {
    id: "major-02",
    arcana: "major",
    name_en: "The High Priestess",
    name_th: "นักบวชหญิง",
    keywords_th: ["สัญชาตญาณ", "ความลับ", "ฟังใจ"],
    upright_meaning_th:
      "คำตอบบางอย่างไม่ได้ดังแต่ชัด ไพ่ใบนี้ชวนให้คุณเงียบลงนิดหนึ่งแล้วฟังอินทูอิชันตัวเอง เพราะความจริงกำลังค่อย ๆ เผยออกมา",
    reversed_meaning_th:
      "คุณอาจรู้ลึก ๆ อยู่แล้วว่าควรทำอะไร แต่เสียงรอบตัวดังเกินไปจนใจตัวเองเบาลง ลองเว้นระยะจากความวุ่นวายแล้วฟังตัวเองอีกครั้ง",
    element: "spirit",
    number: 2,
  },
  {
    id: "major-03",
    arcana: "major",
    name_en: "The Empress",
    name_th: "จักรพรรดินี",
    keywords_th: ["อุดมสมบูรณ์", "ดูแล", "เติบโต"],
    upright_meaning_th:
      "นี่คือไพ่ของความงอกงาม ความรัก และการดูแลอย่างอ่อนโยน สิ่งที่คุณบ่มเพาะไว้มีแนวโน้มออกดอก ขอแค่ให้เวลากับมันอีกหน่อย",
    reversed_meaning_th:
      "อาจกำลังให้พลังกับคนอื่นมากจนลืมเติมตัวเอง ไพ่ใบนี้เตือนให้กลับมาดูแลร่างกาย ใจ และขอบเขตของตัวเองก่อน",
    element: "spirit",
    number: 3,
  },
  {
    id: "major-04",
    arcana: "major",
    name_en: "The Emperor",
    name_th: "จักรพรรดิ",
    keywords_th: ["โครงสร้าง", "ผู้นำ", "ความมั่นคง"],
    upright_meaning_th:
      "สถานการณ์นี้ต้องการความชัดเจนและโครงสร้าง ไพ่ใบนี้สนับสนุนให้คุณวางขอบเขต ตัดสินใจเด็ดขาด และสร้างฐานที่มั่นคงให้ตัวเอง",
    reversed_meaning_th:
      "ความคุมเกมอาจกลายเป็นความแข็ง หรืออีกมุมคือคุณยังไม่กล้าถืออำนาจในชีวิตตัวเอง ลองหาจุดกลางระหว่างความยืดหยุ่นกับความเด็ดขาด",
    element: "spirit",
    number: 4,
  },
  {
    id: "major-05",
    arcana: "major",
    name_en: "The Hierophant",
    name_th: "พระสันตะปาปา",
    keywords_th: ["ประเพณี", "บทเรียน", "คุณค่า"],
    upright_meaning_th:
      "ไพ่ใบนี้พูดถึงกรอบคิด ความเชื่อ หรือคำสอนที่มีประโยชน์ในตอนนี้ คุณอาจได้เรียนรู้อะไรจากคนที่มีประสบการณ์หรือระบบที่ผ่านการพิสูจน์มาแล้ว",
    reversed_meaning_th:
      "ถึงเวลาตั้งคำถามกับกฎเดิมบางอย่างที่ไม่พอดีกับคุณแล้ว ลองเลือกสิ่งที่จริงกับใจ ไม่ใช่ทำตามเพราะเคยชินอย่างเดียว",
    element: "spirit",
    number: 5,
  },
  {
    id: "major-06",
    arcana: "major",
    name_en: "The Lovers",
    name_th: "คู่รัก",
    keywords_th: ["ความรัก", "การเลือก", "ความจริงใจ"],
    upright_meaning_th:
      "นี่ไม่ใช่แค่ไพ่รัก แต่คือไพ่ของการเลือกในสิ่งที่สอดคล้องกับหัวใจจริง ๆ ความสัมพันธ์และการตัดสินใจจะไปได้ดีเมื่อคุณซื่อสัตย์กับตัวเอง",
    reversed_meaning_th:
      "อาจมีความลังเล ความสัมพันธ์ไม่ชัด หรือใจหนึ่งอยากไปอีกทาง ไพ่ใบนี้ชวนให้คุยตรง ๆ และเลือกในสิ่งที่ไม่ทรยศตัวเอง",
    element: "spirit",
    number: 6,
  },
  {
    id: "major-07",
    arcana: "major",
    name_en: "The Chariot",
    name_th: "รถศึก",
    keywords_th: ["ชัยชนะ", "ควบคุมทิศทาง", "มุ่งมั่น"],
    upright_meaning_th:
      "คุณกำลังมีแรงขับพาไปข้างหน้า ไพ่ใบนี้บอกว่าถ้าคุมใจ คุมวินัย และไม่หลุดเป้าหมาย คุณมีสิทธิ์พาตัวเองไปถึงจุดที่ต้องการได้จริง",
    reversed_meaning_th:
      "ช่วงนี้อาจเหมือนพลังเยอะแต่คนละทิศ หรือชีวิตวิ่งเร็วเกินจนควบคุมไม่ทัน ลองเบรกนิดหนึ่งแล้วตั้งเข็มให้ชัดก่อนเร่งอีกครั้ง",
    element: "spirit",
    number: 7,
  },
  {
    id: "major-08",
    arcana: "major",
    name_en: "Strength",
    name_th: "พลัง",
    keywords_th: ["พลังใจ", "อ่อนโยนแต่มั่นคง", "อดทน"],
    upright_meaning_th:
      "ความแข็งแรงของคุณตอนนี้ไม่ใช่การบังคับทุกอย่าง แต่คือการประคองตัวเองด้วยใจนิ่ง ไพ่ใบนี้พูดถึงความกล้าแบบไม่ต้องเสียงดัง",
    reversed_meaning_th:
      "คุณอาจกำลังสงสัยในตัวเองหรือใช้พลังผิดจังหวะ ลองจำไว้ว่าความอ่อนโยนกับตัวเองก็เป็นพลังแบบหนึ่งที่สำคัญมาก",
    element: "spirit",
    number: 8,
  },
  {
    id: "major-09",
    arcana: "major",
    name_en: "The Hermit",
    name_th: "ฤๅษี",
    keywords_th: ["ทบทวนตัวเอง", "ปัญญาภายใน", "อยู่กับตัวเอง"],
    upright_meaning_th:
      "ไพ่ใบนี้ชวนให้ถอยมามองชีวิตด้วยมุมที่สงบขึ้น ช่วงเวลาอยู่กับตัวเองตอนนี้ไม่ได้แปลว่าโดดเดี่ยว แต่มันคือพื้นที่ให้เห็นคำตอบชัดกว่าเดิม",
    reversed_meaning_th:
      "อาจเก็บตัวมากเกินไปจนกลายเป็นปิดใจ หรืออีกมุมคือคุณยังไม่ยอมให้ตัวเองได้พัก ลองหาสมดุลระหว่างอยู่คนเดียวกับเปิดรับการช่วยเหลือ",
    element: "spirit",
    number: 9,
  },
  {
    id: "major-10",
    arcana: "major",
    name_en: "Wheel of Fortune",
    name_th: "กงล้อโชคชะตา",
    keywords_th: ["การเปลี่ยนแปลง", "วัฏจักร", "จังหวะใหม่"],
    upright_meaning_th:
      "จังหวะชีวิตกำลังหมุน ไพ่ใบนี้บอกว่าบางอย่างเริ่มขยับไปในทางใหม่ และคุณอาจได้โอกาสจากการยอมไหลไปกับการเปลี่ยนแปลงอย่างมีสติ",
    reversed_meaning_th:
      "ตอนนี้อาจรู้สึกว่าจังหวะยังไม่เข้าที่ หรือมีเรื่องเดิมวนกลับมาให้เรียนอีกครั้ง ลองถามตัวเองว่ามีบทเรียนอะไรที่ยังไม่เก็บให้ครบ",
    element: "spirit",
    number: 10,
  },
  {
    id: "major-11",
    arcana: "major",
    name_en: "Justice",
    name_th: "ความยุติธรรม",
    keywords_th: ["สมดุล", "ความจริง", "รับผิดชอบ"],
    upright_meaning_th:
      "ไพ่ใบนี้เน้นความจริงและผลของการตัดสินใจ ทุกอย่างกำลังเชิญให้คุณมองอย่างแฟร์ทั้งกับตัวเองและคนอื่น แล้วเลือกบนพื้นฐานของความชัดเจน",
    reversed_meaning_th:
      "อาจมีความไม่สมดุล การตัดสินจากอารมณ์ หรือยังไม่เห็นภาพทั้งหมด ลองชะลอแล้วกลับมาดูข้อเท็จจริงอีกครั้งก่อนสรุป",
    element: "spirit",
    number: 11,
  },
  {
    id: "major-12",
    arcana: "major",
    name_en: "The Hanged Man",
    name_th: "คนห้อยหัว",
    keywords_th: ["หยุดเพื่อมองใหม่", "ยอมรับ", "เปลี่ยนมุมมอง"],
    upright_meaning_th:
      "บางครั้งการไปต่อเร็วไม่ใช่คำตอบ ไพ่ใบนี้ชวนให้หยุดชั่วคราว เพื่อเห็นบางอย่างจากมุมใหม่และปล่อยการควบคุมที่ไม่จำเป็น",
    reversed_meaning_th:
      "คุณอาจค้างอยู่ในสภาพเดิมนานเกินไป หรือพยายามยื้อสิ่งที่ควรปล่อย ลองถามใจว่าตอนนี้ถึงเวลาขยับหรือยัง",
    element: "spirit",
    number: 12,
  },
  {
    id: "major-13",
    arcana: "major",
    name_en: "Death",
    name_th: "ความตาย",
    keywords_th: ["จบเพื่อเริ่ม", "ปล่อยวาง", "เปลี่ยนผ่าน"],
    upright_meaning_th:
      "ไพ่ใบนี้ไม่ได้หมายถึงความตายจริง แต่มันคือการปิดฉากบางอย่างที่หมดเวลาแล้ว เพื่อเปิดพื้นที่ให้ชีวิตบทใหม่เข้ามาแบบจริงจัง",
    reversed_meaning_th:
      "อาจกำลังยึดติดกับสิ่งเดิมจนไปต่อยาก ไพ่ใบนี้เตือนอย่างอ่อนโยนว่าการยอมปล่อย คือประตูสำคัญของการเริ่มต้นรอบใหม่",
    element: "spirit",
    number: 13,
  },
  {
    id: "major-14",
    arcana: "major",
    name_en: "Temperance",
    name_th: "ความพอดี",
    keywords_th: ["สมดุล", "กลมกล่อม", "ค่อยเป็นค่อยไป"],
    upright_meaning_th:
      "นี่คือไพ่ของการผสมสิ่งต่าง ๆ ให้ลงตัว คุณอาจไม่ต้องเร่งอะไรเพิ่ม แค่ค่อย ๆ ปรับจนชีวิตกลับมารู้สึกพอดีมากขึ้น",
    reversed_meaning_th:
      "ตอนนี้อาจมีบางอย่างมากไปหรือน้อยไป ลองดูว่าชีวิตด้านไหนกำลังเสียบาลานซ์ แล้วค่อย ๆ จูนแบบไม่กดดันตัวเองเกินจำเป็น",
    element: "spirit",
    number: 14,
  },
  {
    id: "major-15",
    arcana: "major",
    name_en: "The Devil",
    name_th: "ปีศาจ",
    keywords_th: ["พันธนาการ", "สิ่งยึดติด", "ความอยาก"],
    upright_meaning_th:
      "ไพ่ใบนี้ส่องให้เห็นสิ่งที่กำลังผูกเราไว้ ไม่ว่าจะเป็นความกลัว ความสัมพันธ์ที่ไม่เฮลท์ตี้ หรือพฤติกรรมที่รู้ว่าไม่เวิร์ก การเห็นมันคือก้าวแรกของอิสระ",
    reversed_meaning_th:
      "คุณกำลังเริ่มคลายโซ่บางอย่างออกจากใจตัวเอง อาจยังไม่หลุดหมด แต่ภาพรวมคือมีสติพอจะเลือกสิ่งที่ดีกับตัวเองมากขึ้นแล้ว",
    element: "spirit",
    number: 15,
  },
  {
    id: "major-16",
    arcana: "major",
    name_en: "The Tower",
    name_th: "หอคอย",
    keywords_th: ["พังเพื่อรีเซ็ต", "ความจริงเปิด", "เปลี่ยนฉับพลัน"],
    upright_meaning_th:
      "ไพ่ใบนี้อาจดูแรง แต่สารจริงคือสิ่งที่ไม่มั่นคงกำลังถูกเขย่าออกไป เพื่อให้คุณสร้างใหม่บนฐานที่จริงกว่าเดิม แม้ตอนแรกจะรู้สึกโหวงนิดหนึ่งก็ตาม",
    reversed_meaning_th:
      "คุณอาจรับรู้แล้วว่าต้องเปลี่ยน แต่ยังพยายามยื้อโครงสร้างเดิมไว้ ลองยอมรับความจริงเร็วขึ้น แล้วการรีเซ็ตจะเจ็บน้อยลงมาก",
    element: "spirit",
    number: 16,
  },
  {
    id: "major-17",
    arcana: "major",
    name_en: "The Star",
    name_th: "ดวงดาว",
    keywords_th: ["ความหวัง", "เยียวยา", "แสงนำทาง"],
    upright_meaning_th:
      "หลังจากช่วงหนัก ๆ ไพ่ใบนี้นำความหวังกลับมา มันบอกว่าคุณยังมีแสงของตัวเองอยู่ และกำลังค่อย ๆ ฟื้นแรงใจขึ้นอย่างสวยงาม",
    reversed_meaning_th:
      "อาจมีความเหนื่อยจนลืมว่าใจตัวเองยังมีแสงอยู่ ไพ่ใบนี้ชวนให้กลับมาดูแลความหวังเล็ก ๆ และไม่ดูถูกพลังของการพักใจ",
    element: "spirit",
    number: 17,
  },
  {
    id: "major-18",
    arcana: "major",
    name_en: "The Moon",
    name_th: "พระจันทร์",
    keywords_th: ["ความรู้สึกลึก", "ภาพลวง", "อินทูอิชัน"],
    upright_meaning_th:
      "ตอนนี้มีบางอย่างยังไม่ชัดเจน ไพ่ใบนี้ชวนให้เดินช้า ๆ และใช้ทั้งสัญชาตญาณกับความจริงไปพร้อมกัน เพราะไม่ใช่ทุกอย่างที่เห็นจะเป็นทั้งหมดของเรื่อง",
    reversed_meaning_th:
      "หมอกในใจเริ่มบางลง คุณอาจเริ่มเห็นว่าความกลัวไหนเป็นแค่ความคิด และความจริงไหนที่ควรยอมรับแล้วก้าวต่อ",
    element: "spirit",
    number: 18,
  },
  {
    id: "major-19",
    arcana: "major",
    name_en: "The Sun",
    name_th: "ดวงอาทิตย์",
    keywords_th: ["ความสุข", "ความชัดเจน", "สำเร็จ"],
    upright_meaning_th:
      "นี่คือไพ่แห่งความชัดเจน ความสดใส และการเห็นผลของสิ่งที่ทำ คุณมีพลังจะเปล่งแสงแบบไม่ต้องย่อขนาดตัวเองในช่วงนี้",
    reversed_meaning_th:
      "ความสุขยังอยู่ แต่ตอนนี้อาจมีเมฆบาง ๆ บังแสงไว้ ลองกลับมาถามว่าคุณกำลังเครียดจนลืมเห็นเรื่องดี ๆ ตรงหน้าหรือเปล่า",
    element: "spirit",
    number: 19,
  },
  {
    id: "major-20",
    arcana: "major",
    name_en: "Judgement",
    name_th: "การพิพากษา",
    keywords_th: ["ตื่นรู้", "เรียกคืนพลัง", "บทสรุป"],
    upright_meaning_th:
      "ไพ่ใบนี้คือช่วงเวลาตื่นรู้ บางอย่างกำลังเรียกให้คุณกลับมาเป็นเวอร์ชันที่ตรงกับตัวเองมากกว่าเดิม และไม่ใช้ชีวิตแบบ autopilot อีกต่อไป",
    reversed_meaning_th:
      "อาจยังติดโหมดโทษตัวเองหรือไม่ยอมให้อภัยอดีต ลองปล่อยน้ำหนักเก่า ๆ ลง แล้วให้โอกาสตัวเองได้เริ่มจากความเข้าใจใหม่",
    element: "spirit",
    number: 20,
  },
  {
    id: "major-21",
    arcana: "major",
    name_en: "The World",
    name_th: "โลก",
    keywords_th: ["ครบวงจร", "สำเร็จ", "บรรลุผล"],
    upright_meaning_th:
      "นี่คือไพ่แห่งการปิดจบอย่างสวยงาม คุณอาจกำลังไปถึงเส้นชัยบางอย่าง หรือรู้สึก finally ว่าสิ่งที่ทำมานานเริ่มลงตัวจริง ๆ แล้ว",
    reversed_meaning_th:
      "เส้นชัยอยู่ใกล้มากแล้ว แต่อาจมีรายละเอียดสุดท้ายที่ยังต้องเคลียร์ อย่าเพิ่งท้อ เพราะอีกนิดเดียวคุณก็จะปิดจบได้แบบโล่งใจ",
    element: "spirit",
    number: 21,
  },
] as const;

const MINOR_SUITS: readonly MinorSuitDefinition[] = [
  {
    key: "wands",
    name_en: "Wands",
    name_th: "ไม้เท้า",
    element: "fire",
    lifeArea_th: "แพสชัน การลงมือทำ และแรงบันดาลใจ",
    uprightTone_th: "เชื่อไฟในตัวเองแล้วเริ่มขยับจริง",
    reversedTone_th: "เช็กว่าไฟล้นหรือมอดเกินไป แล้วค่อยจูนพลังกลับมา",
    keywordBase: ["แรงบันดาลใจ", "การลงมือทำ", "ไฟในตัว"],
  },
  {
    key: "cups",
    name_en: "Cups",
    name_th: "ถ้วย",
    element: "water",
    lifeArea_th: "อารมณ์ ความรัก และความสัมพันธ์",
    uprightTone_th: "ฟังหัวใจตัวเองอย่างซื่อตรงและเปิดรับความรู้สึกดี ๆ",
    reversedTone_th: "ยอมรับอารมณ์ที่ค้างอยู่ก่อน แล้วค่อยเยียวยาหรือคุยให้ชัด",
    keywordBase: ["ความรัก", "อารมณ์", "ความสัมพันธ์"],
  },
  {
    key: "swords",
    name_en: "Swords",
    name_th: "ดาบ",
    element: "air",
    lifeArea_th: "ความคิด การสื่อสาร และการตัดสินใจ",
    uprightTone_th: "ใช้เหตุผลอย่างคมชัดโดยไม่หลุดจากความจริงในใจ",
    reversedTone_th: "หยุดคิดวนหรือคำพูดที่แรงเกิน แล้วจัดความคิดใหม่ให้เคลียร์กว่าเดิม",
    keywordBase: ["ความคิด", "การสื่อสาร", "การตัดสินใจ"],
  },
  {
    key: "pentacles",
    name_en: "Pentacles",
    name_th: "เหรียญ",
    element: "earth",
    lifeArea_th: "งาน เงิน สุขภาพ และสิ่งที่จับต้องได้",
    uprightTone_th: "ค่อย ๆ สร้างผลลัพธ์แบบยืนระยะและมั่นคง",
    reversedTone_th: "กลับมาดูฐานชีวิต การใช้พลัง และทรัพยากรให้พอดีก่อนลุยต่อ",
    keywordBase: ["งาน", "การเงิน", "ความมั่นคง"],
  },
] as const;

const MINOR_RANKS: readonly MinorRankDefinition[] = [
  {
    key: "ace",
    number: 1,
    name_en: "Ace",
    name_th: "เอซ",
    keywords_th: ["เริ่มต้น", "โอกาส", "ประกายแรก"],
    uprightFocus_th: "การเริ่มต้นใหม่กำลังเปิดประตูให้คุณ",
    reversedFocus_th: "การเริ่มต้นใหม่ยังไม่ค่อยลงล็อกนัก",
  },
  {
    key: "two",
    number: 2,
    name_en: "Two",
    name_th: "สอง",
    keywords_th: ["สมดุล", "คู่", "การเลือก"],
    uprightFocus_th: "มีพลังของการจับคู่และหาจุดสมดุลเกิดขึ้น",
    reversedFocus_th: "ความสมดุลยังสวิงอยู่หรือมีความลังเลบางอย่างค้างคา",
  },
  {
    key: "three",
    number: 3,
    name_en: "Three",
    name_th: "สาม",
    keywords_th: ["เติบโต", "ร่วมมือ", "ขยับขยาย"],
    uprightFocus_th: "การเติบโตผ่านการร่วมมือเริ่มชัดขึ้นเรื่อย ๆ",
    reversedFocus_th: "การเติบโตอาจติดที่ความไม่ชัดหรือความคาดหวังไม่ตรงกัน",
  },
  {
    key: "four",
    number: 4,
    name_en: "Four",
    name_th: "สี่",
    keywords_th: ["ฐาน", "พัก", "มั่นคง"],
    uprightFocus_th: "ถึงเวลาสร้างฐานให้มั่นคงและพักพลังอย่างมีคุณภาพ",
    reversedFocus_th: "ฐานที่วางไว้ยังแกว่ง หรือคุณอาจพักน้อยเกินไป",
  },
  {
    key: "five",
    number: 5,
    name_en: "Five",
    name_th: "ห้า",
    keywords_th: ["บททดสอบ", "เสียดทาน", "ปรับตัว"],
    uprightFocus_th: "มีบททดสอบหรือแรงเสียดทานให้คุณเรียนรู้จากมัน",
    reversedFocus_th: "ความตึงอาจสะสมอยู่เงียบ ๆ หรือยังหาทางคลี่คลายไม่เจอ",
  },
  {
    key: "six",
    number: 6,
    name_en: "Six",
    name_th: "หก",
    keywords_th: ["ไหลลื่น", "ช่วยเหลือ", "กลมกลืน"],
    uprightFocus_th: "พลังเริ่มไหลลื่นขึ้นและมีคนหรือโอกาสมาช่วยส่ง",
    reversedFocus_th: "การช่วยเหลืออาจไม่บาลานซ์ หรือคุณยังไม่ยอมเปิดรับการสนับสนุน",
  },
  {
    key: "seven",
    number: 7,
    name_en: "Seven",
    name_th: "เจ็ด",
    keywords_th: ["ทบทวน", "ตั้งคำถาม", "เช็กใจ"],
    uprightFocus_th: "ถึงเวลาทบทวนและเช็กใจตัวเองก่อนก้าวต่อ",
    reversedFocus_th: "ความลังเลอาจยืดเยื้อจนพลังเริ่มรั่ว ลองตัดสิ่งรบกวนแล้วฟังใจตัวเองให้ชัด",
  },
  {
    key: "eight",
    number: 8,
    name_en: "Eight",
    name_th: "แปด",
    keywords_th: ["เคลื่อนไหว", "โฟกัส", "เร่งจังหวะ"],
    uprightFocus_th: "สถานการณ์กำลังเคลื่อนเร็วและต้องใช้โฟกัสให้มากขึ้น",
    reversedFocus_th: "พลังอาจติดขัดหรือกระจัดกระจายเกินไปจนไปต่อไม่สุด",
  },
  {
    key: "nine",
    number: 9,
    name_en: "Nine",
    name_th: "เก้า",
    keywords_th: ["ใกล้สำเร็จ", "ความอึด", "เก็บงาน"],
    uprightFocus_th: "คุณเข้าใกล้ผลลัพธ์และเห็นคุณค่าของความพยายามชัดขึ้น",
    reversedFocus_th: "ใกล้ถึงเส้นชัยแล้วแต่ใจอาจเริ่มล้า ต้องพักและประคองพลังตัวเองดี ๆ",
  },
  {
    key: "ten",
    number: 10,
    name_en: "Ten",
    name_th: "สิบ",
    keywords_th: ["บทสรุป", "ครบวงจร", "ปิดรอบ"],
    uprightFocus_th: "วัฏจักรหนึ่งกำลังครบและกำลังให้บทสรุปชัดเจน",
    reversedFocus_th: "มีบางอย่างค้างอยู่ในตอนจบ หรือปิดรอบเก่าได้ไม่สุดนัก",
  },
  {
    key: "page",
    number: 11,
    name_en: "Page",
    name_th: "เด็ก",
    keywords_th: ["ข่าวใหม่", "เรียนรู้", "ความสดใหม่"],
    uprightFocus_th: "ข่าวใหม่หรือบทเรียนใหม่กำลังเข้ามาแบบสด ๆ",
    reversedFocus_th: "ข่าวหรือบทเรียนใหม่ยังไม่ลงตัว หรือคุณยังไม่พร้อมเปิดรับมันเต็มที่",
  },
  {
    key: "knight",
    number: 12,
    name_en: "Knight",
    name_th: "อัศวิน",
    keywords_th: ["ลุย", "แรงขับ", "เคลื่อนเกม"],
    uprightFocus_th: "พลังการขับเคลื่อนชัดและพร้อมให้คุณลุยต่ออย่างจริงจัง",
    reversedFocus_th: "แรงขับอาจแรงไปจนรีบ หรืออ่อนลงจนขยับไม่ค่อยออก",
  },
  {
    key: "queen",
    number: 13,
    name_en: "Queen",
    name_th: "ราชินี",
    keywords_th: ["วุฒิภาวะ", "ดูแล", "พลังนิ่ง"],
    uprightFocus_th: "การดูแลพลังด้านนี้อย่างมีวุฒิภาวะจะพาคุณไปไกล",
    reversedFocus_th: "อาจดูแลคนอื่นมากจนลืมตัวเอง หรือกดอารมณ์ไว้จนพลังนิ่งเกินไป",
  },
  {
    key: "king",
    number: 14,
    name_en: "King",
    name_th: "ราชา",
    keywords_th: ["คุมเกม", "มั่นคง", "อำนาจ"],
    uprightFocus_th: "ถึงเวลาคุมเกมด้านนี้อย่างมั่นคงและมีอำนาจในทางที่ดี",
    reversedFocus_th: "การคุมเกมอาจตึงเกินไป หรือยังไม่มั่นใจพอจะถือบทบาทผู้นำของตัวเอง",
  },
] as const;

function buildMinorCard(
  suit: MinorSuitDefinition,
  rank: MinorRankDefinition,
): TarotCard {
  const paddedNumber = String(rank.number).padStart(2, "0");

  return {
    id: `${suit.key}-${paddedNumber}`,
    arcana: "minor",
    suit: suit.key,
    name_en: `${rank.name_en} of ${suit.name_en}`,
    name_th: `${rank.name_th}${suit.name_th}`,
    keywords_th: uniqueKeywords([
      ...rank.keywords_th.slice(0, 2),
      ...suit.keywordBase.slice(0, 2),
    ]).slice(0, 3),
    upright_meaning_th: `${rank.uprightFocus_th} ในเรื่อง${suit.lifeArea_th} ไพ่ใบนี้ชวนให้${suit.uprightTone_th} เพราะนี่คือช่วงที่พลังของไพ่พร้อมผลักคุณไปอีกขั้นถ้าคุณไม่ลังเลเกินไป`,
    reversed_meaning_th: `${rank.reversedFocus_th} ในเรื่อง${suit.lifeArea_th} พลังของไพ่ดูติดขัดหรือไหลย้อนอยู่บ้าง เลยควร${suit.reversedTone_th} ก่อน แล้วค่อยขยับแบบมั่นคงกว่าเดิม`,
    element: suit.element,
    number: rank.number,
  };
}

export const MINOR_ARCANA: readonly TarotCard[] = MINOR_SUITS.flatMap((suit) =>
  MINOR_RANKS.map((rank) => buildMinorCard(suit, rank)),
);

export const TAROT_DECK: readonly TarotCard[] = [
  ...MAJOR_ARCANA,
  ...MINOR_ARCANA,
] as const;

export function getTarotCardById(id: string): TarotCard {
  const card = TAROT_DECK.find((entry) => entry.id === id);

  if (!card) {
    throw new Error(`Unknown tarot card id: ${id}`);
  }

  return card;
}

export function getTarotCardsBySuit(suit: TarotSuitKey): readonly TarotCard[] {
  return TAROT_DECK.filter((card) => card.suit === suit);
}
