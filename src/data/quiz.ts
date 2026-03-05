export type PersonaType =
  | "authoritative"
  | "authoritarian"
  | "permissive"
  | "neglectful";

export interface QuizOption {
  text: string;
  type: PersonaType;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "ลูกไม่ยอมทำการบ้าน คุณจะทำยังไง?",
    options: [
      { text: "อธิบายเหตุผลว่าทำไมต้องทำ แล้วให้เลือกเวลาเอง", type: "authoritative" },
      { text: "บังคับให้ทำทันที ไม่ต้องถามเหตุผล", type: "authoritarian" },
      { text: "ไม่เป็นไร ลูกเหนื่อยก็พักก่อนนะ", type: "permissive" },
      { text: "ไม่รู้เหมือนกัน ไม่ค่อยได้ดูเรื่องการบ้าน", type: "neglectful" },
    ],
  },
  {
    question: "ลูกอยากเล่นเกมทั้งวัน คุณจะจัดการยังไง?",
    options: [
      { text: "ตกลงเวลาเล่นด้วยกัน เช่น ทำงานเสร็จเล่นได้ 1 ชม.", type: "authoritative" },
      { text: "ห้ามเล่นเด็ดขาด ยึดเครื่องเลย", type: "authoritarian" },
      { text: "ปล่อยเล่นไปเถอะ ลูกมีความสุขก็ดีแล้ว", type: "permissive" },
      { text: "ลูกเล่นเกมเหรอ? ไม่ค่อยรู้", type: "neglectful" },
    ],
  },
  {
    question: "ถึงเวลานอน แต่ลูกยังไม่ยอมนอน",
    options: [
      { text: "บอกว่าอีก 15 นาทีนะ แล้วอ่านหนังสือด้วยกัน", type: "authoritative" },
      { text: "ปิดไฟเลย ถึงเวลาก็ต้องนอน", type: "authoritarian" },
      { text: "ก็ให้นอนดึกหน่อยนะลูก", type: "permissive" },
      { text: "ลูกนอนกี่โมง ไม่แน่ใจ", type: "neglectful" },
    ],
  },
  {
    question: "ลูกทะเลาะกับเพื่อนที่โรงเรียน",
    options: [
      { text: "ถามว่าเกิดอะไรขึ้น แล้วช่วยคิดวิธีแก้ด้วยกัน", type: "authoritative" },
      { text: "บอกลูกว่าอย่าไปทะเลาะ ครั้งหน้าห้ามเด็ดขาด", type: "authoritarian" },
      { text: "เลี้ยงไอศกรีมให้หายเศร้า ไม่เป็นไร", type: "permissive" },
      { text: "ลูกมีปัญหาเหรอ? ไม่ค่อยรู้เรื่อง", type: "neglectful" },
    ],
  },
  {
    question: "วันหยุดสุดสัปดาห์ ครอบครัวคุณมักจะ...",
    options: [
      { text: "ทำกิจกรรมด้วยกัน โดยให้ลูกช่วยวางแผน", type: "authoritative" },
      { text: "พ่อ/แม่กำหนดโปรแกรมทั้งหมด ลูกตามที่จัดให้", type: "authoritarian" },
      { text: "ให้ลูกอยากทำอะไรก็ทำ ตามใจเลย", type: "permissive" },
      { text: "ต่างคนต่างอยู่ ไม่ค่อยได้ทำอะไรด้วยกัน", type: "neglectful" },
    ],
  },
  {
    question: "ลูกต้องสอบเข้ามหาวิทยาลัย คุณจะ...",
    options: [
      { text: "ช่วยวางแผนด้วยกัน ให้ลูกเลือกคณะที่ชอบ สนับสนุนทรัพยากร", type: "authoritative" },
      { text: "เลือกคณะให้ลูก กำหนดตารางอ่านหนังสือ ต้องสอบติด", type: "authoritarian" },
      { text: "ลูกอยากเรียนอะไรก็เรียนนะ ไม่ต้องเครียด", type: "permissive" },
      { text: "เรื่องเรียนลูกดูเองนะ พ่อ/แม่ไม่ถนัดแนะนำ", type: "neglectful" },
    ],
  },
];
