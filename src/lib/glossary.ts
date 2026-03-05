/**
 * Education Glossary — เบื้องหลังคำศัพท์การศึกษา
 *
 * Designed for first-time parents unfamiliar with international education terms.
 * Each term includes a plain-language explanation in 4 languages.
 * Terms auto-highlight in chat messages and school cards via GlossaryTooltip.
 */

export interface GlossaryEntry {
  term: string;
  /** Variants that should also match (case-insensitive) */
  aliases: string[];
  /** Plain-language explanations by language */
  description: Record<"th" | "en" | "zh" | "ja", string>;
  /** Optional: category for grouping */
  category: "curriculum" | "assessment" | "methodology" | "metric" | "policy";
}

export const GLOSSARY: GlossaryEntry[] = [
  // ── Curriculum Systems ──
  {
    term: "IB",
    aliases: ["International Baccalaureate", "IB PYP", "IB MYP", "IB DP"],
    category: "curriculum",
    description: {
      th: "หลักสูตรสากลที่เน้นการคิดวิเคราะห์และความเข้าใจข้ามวัฒนธรรม แบ่งเป็น 3 ช่วง: PYP (อนุบาล-ป.6), MYP (ม.1-3), DP (ม.4-6) เป็นที่ยอมรับของมหาวิทยาลัยทั่วโลก",
      en: "An internationally recognized curriculum emphasizing critical thinking and intercultural understanding. Three stages: PYP (ages 3–12), MYP (ages 11–16), DP (ages 16–19). Accepted by universities worldwide.",
      zh: "国际认可的课程体系，注重批判性思维和跨文化理解。分三个阶段：PYP（3-12岁）、MYP（11-16岁）、DP（16-19岁）。全球大学认可。",
      ja: "批判的思考力と異文化理解を重視する国際的なカリキュラム。PYP（3〜12歳）、MYP（11〜16歳）、DP（16〜19歳）の3段階。世界中の大学で認められています。",
    },
  },
  {
    term: "IGCSE",
    aliases: ["International GCSE", "Cambridge IGCSE"],
    category: "assessment",
    description: {
      th: "หลักสูตร Cambridge สำหรับนักเรียนอายุ 14-16 ปี (ม.3-4) เป็นพื้นฐานก่อนเข้า A-Level เน้นความรู้รอบด้านทั้งวิทย์ ศิลป์ และภาษา เป็นที่ยอมรับในหลายประเทศ",
      en: "A Cambridge qualification for students aged 14–16 (Years 10–11). Provides a broad foundation across sciences, arts, and languages before progressing to A-Levels. Recognized in many countries.",
      zh: "剑桥为14-16岁学生设计的资格考试（10-11年级）。在进入A-Level之前，提供科学、艺术和语言的广泛基础。在许多国家被认可。",
      ja: "14〜16歳（Year 10〜11）を対象としたケンブリッジの資格。A-Levelに進む前に、科学・芸術・言語の幅広い基礎を提供。多くの国で認められています。",
    },
  },
  {
    term: "A-Level",
    aliases: ["A Level", "Cambridge A-Level", "GCE A-Level"],
    category: "assessment",
    description: {
      th: "วุฒิการศึกษาระดับ ม.ปลาย จากระบบ Cambridge เลือกเรียน 3-4 วิชาเชิงลึก (อายุ 16-18 ปี) เป็นที่ยอมรับสูงในมหาวิทยาลัยชั้นนำของอังกฤษ ออสเตรเลีย และทั่วโลก",
      en: "An advanced-level qualification from the Cambridge system. Students specialize in 3–4 subjects in depth (ages 16–18). Highly regarded by top universities in the UK, Australia, and worldwide.",
      zh: "剑桥体系的高级资格。学生深入学习3-4个科目（16-18岁）。在英国、澳大利亚及全球顶尖大学中备受认可。",
      ja: "ケンブリッジシステムの上級資格。3〜4科目を深く専門的に学びます（16〜18歳）。英国・オーストラリアをはじめ世界中のトップ大学で高く評価されています。",
    },
  },
  {
    term: "AP",
    aliases: ["Advanced Placement"],
    category: "assessment",
    description: {
      th: "หลักสูตรระดับมหาวิทยาลัยที่เรียนได้ตั้งแต่ ม.ปลาย ออกแบบโดย College Board (สหรัฐฯ) หากสอบได้คะแนนสูง สามารถเทียบหน่วยกิตมหาวิทยาลัยได้เลย",
      en: "University-level courses taken during high school, designed by the US College Board. High scores can earn college credit, potentially shortening university study.",
      zh: "由美国College Board设计的大学水平课程，可在高中阶段修读。高分可获得大学学分，有助于缩短大学学习时间。",
      ja: "米国College Board設計の大学レベルの科目を高校在学中に履修。高得点なら大学の単位として認められ、大学の学習期間を短縮できる場合があります。",
    },
  },
  {
    term: "EP",
    aliases: ["English Program", "English Programme"],
    category: "curriculum",
    description: {
      th: "โปรแกรมภาษาอังกฤษในโรงเรียนไทย สอนวิชาหลัก (คณิต วิทย์) เป็นภาษาอังกฤษ แต่ยังเรียนหลักสูตรกระทรวงฯ ไทย ค่าเทอมมักถูกกว่าอินเตอร์",
      en: "An English-medium program within Thai schools. Core subjects (math, science) are taught in English while following Thailand's national curriculum. Typically more affordable than international schools.",
      zh: "泰国学校中的英语教学项目。核心科目（数学、科学）以英语授课，同时遵循泰国国家课程。学费通常比国际学校更实惠。",
      ja: "タイの学校における英語教育プログラム。主要科目（数学・理科）を英語で教えつつ、タイの国家カリキュラムに沿っています。一般的にインター校より学費が手頃です。",
    },
  },
  // ── Teaching Methodologies ──
  {
    term: "Montessori",
    aliases: ["มอนเตสซอรี่"],
    category: "methodology",
    description: {
      th: "แนวการเรียนที่เด็กเป็นศูนย์กลาง เรียนรู้ผ่านการลงมือทำด้วยตนเอง ตามจังหวะของเด็ก เน้นความเป็นอิสระ ความรับผิดชอบ และความอยากรู้ตามธรรมชาติ",
      en: "A child-centered approach where children learn through hands-on activities at their own pace. Emphasizes independence, responsibility, and natural curiosity.",
      zh: "以儿童为中心的教学方法，孩子通过动手实践按自己的节奏学习。强调独立性、责任感和天生的好奇心。",
      ja: "子ども中心のアプローチ。子どもが自分のペースで手を動かしながら学びます。自立心・責任感・自然な好奇心を大切にします。",
    },
  },
  {
    term: "Waldorf",
    aliases: ["วอลดอร์ฟ", "Steiner"],
    category: "methodology",
    description: {
      th: "แนวการเรียนแบบองค์รวม เน้นจินตนาการ ศิลปะ และธรรมชาติ ไม่เร่งรัดวิชาการ เน้นให้เด็กเรียนรู้ตามวัย ผ่านการเล่น ศิลปะ ดนตรี และการสัมผัสธรรมชาติ",
      en: "A holistic educational approach emphasizing imagination, arts, and nature. Avoids early academic pressure, allowing children to learn through play, art, music, and nature experiences appropriate for their developmental stage.",
      zh: "一种注重想象力、艺术和自然的整体教育方法。避免过早的学术压力，让孩子通过游戏、艺术、音乐和自然体验来学习。",
      ja: "想像力・芸術・自然を重視するホリスティックな教育。早期の学業プレッシャーを避け、発達段階に合った遊び・芸術・音楽・自然体験を通じて学びます。",
    },
  },
  // ── Metrics & Scores ──
  {
    term: "EF",
    aliases: ["EF Score", "Executive Function", "EF สกอร์"],
    category: "metric",
    description: {
      th: "ดัชนีพัฒนาทักษะสมอง (Executive Function) — วัดว่าโรงเรียนช่วยให้เด็กพัฒนาทักษะการวางแผน ควบคุมตัวเอง และคิดอย่างยืดหยุ่นได้ดีแค่ไหน ยิ่งสูง ยิ่งเน้นพัฒนาทักษะชีวิตนอกเหนือวิชาการ",
      en: "Executive Function Score — measures how well a school develops children's planning, self-regulation, and flexible thinking skills. Higher scores indicate stronger emphasis on life skills beyond academics.",
      zh: "执行功能评分——衡量学校在培养孩子规划能力、自我调节能力和灵活思维方面的表现。分数越高，表示学校越重视学术之外的生活技能。",
      ja: "実行機能スコア — 学校が子どもの計画力・自己調整力・柔軟な思考力をどれだけ発達させるかを測る指標。高得点ほど、学業以外のライフスキルを重視していることを示します。",
    },
  },
  {
    term: "ONET",
    aliases: ["O-NET"],
    category: "assessment",
    description: {
      th: "ข้อสอบวัดผลระดับชาติ จัดโดย สทศ. สอบในชั้น ป.6, ม.3 และ ม.6 ใช้เป็นส่วนหนึ่งของเกณฑ์สอบเข้ามหาวิทยาลัยไทย",
      en: "Thailand's national standardized test administered by NIETS. Taken in Grades 6, 9, and 12. Used as part of Thai university admission criteria.",
      zh: "泰国国家标准化考试，由NIETS管理。在6年级、9年级和12年级进行。用作泰国大学录取标准的一部分。",
      ja: "NIETSが実施するタイの全国統一試験。小6・中3・高3で実施。タイの大学入試基準の一部として使用されます。",
    },
  },
  {
    term: "SAT",
    aliases: ["SAT Exam"],
    category: "assessment",
    description: {
      th: "ข้อสอบมาตรฐานของสหรัฐฯ ใช้ในการสมัครมหาวิทยาลัยในอเมริกาและบางมหาวิทยาลัยทั่วโลก วัดทักษะการอ่าน เขียน และคณิตศาสตร์",
      en: "A US standardized test used for university admissions in America and some universities worldwide. Measures reading, writing, and math skills.",
      zh: "美国标准化考试，用于美国及部分全球大学的入学申请。测试阅读、写作和数学技能。",
      ja: "米国の標準テスト。アメリカおよび世界の一部の大学入試に使用。読解・作文・数学のスキルを測定します。",
    },
  },
  {
    term: "IELTS",
    aliases: [],
    category: "assessment",
    description: {
      th: "ข้อสอบวัดระดับภาษาอังกฤษระดับสากล ใช้สมัครเรียนต่อในมหาวิทยาลัยที่ใช้ภาษาอังกฤษ โดยเฉพาะในอังกฤษ ออสเตรเลีย และนิวซีแลนด์",
      en: "An international English proficiency test for studying at English-speaking universities, especially in the UK, Australia, and New Zealand.",
      zh: "国际英语水平考试，用于申请英语授课的大学，特别是英国、澳大利亚和新西兰。",
      ja: "国際英語能力試験。英語圏の大学への留学に使用。特にイギリス・オーストラリア・ニュージーランドで重要視されます。",
    },
  },
  {
    term: "TOEFL",
    aliases: [],
    category: "assessment",
    description: {
      th: "ข้อสอบวัดระดับภาษาอังกฤษ นิยมใช้สมัครเรียนต่อมหาวิทยาลัยในสหรัฐฯ และแคนาดา",
      en: "An English proficiency test commonly used for university admissions in the US and Canada.",
      zh: "英语水平考试，通常用于美国和加拿大的大学入学申请。",
      ja: "英語能力試験。主に米国・カナダの大学入試で使用されます。",
    },
  },
  // ── Policy Terms ──
  {
    term: "PDPA",
    aliases: ["พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล"],
    category: "policy",
    description: {
      th: "พ.ร.บ.คุ้มครองข้อมูลส่วนบุคคล — กฎหมายไทยที่คุ้มครองข้อมูลส่วนตัวของทุกคน คล้ายกับ GDPR ของยุโรป",
      en: "Thailand's Personal Data Protection Act — a law protecting everyone's personal data, similar to Europe's GDPR.",
      zh: "泰国个人数据保护法——保护所有人个人数据的法律，类似于欧洲的GDPR。",
      ja: "タイの個人データ保護法。欧州のGDPRに類似した、個人情報を保護する法律です。",
    },
  },
  {
    term: "Bilingual",
    aliases: ["สองภาษา", "bilingual program"],
    category: "curriculum",
    description: {
      th: "โปรแกรมที่สอนสลับระหว่าง 2 ภาษา (มักเป็นไทย-อังกฤษ) เด็กจะได้ทั้งพื้นฐานภาษาไทยที่แข็งแรงและทักษะภาษาอังกฤษ",
      en: "A program alternating between two languages (usually Thai and English). Children develop both a strong Thai foundation and English skills.",
      zh: "在两种语言之间交替教学的项目（通常是泰语和英语）。孩子既能打好泰语基础，又能培养英语技能。",
      ja: "2言語（通常はタイ語と英語）を交互に使う教育プログラム。タイ語の基盤と英語力の両方を身につけられます。",
    },
  },
  {
    term: "Trilingual",
    aliases: ["สามภาษา", "trilingual program"],
    category: "curriculum",
    description: {
      th: "โปรแกรมที่สอน 3 ภาษา (เช่น ไทย-อังกฤษ-จีน) เหมาะกับครอบครัวที่ต้องการให้ลูกได้ทักษะหลายภาษาตั้งแต่เล็ก",
      en: "A program teaching three languages (e.g., Thai–English–Chinese). Ideal for families wanting multilingual skills from an early age.",
      zh: "三种语言教学项目（如泰语-英语-中文）。适合希望孩子从小掌握多种语言的家庭。",
      ja: "3言語（タイ語・英語・中国語など）で教えるプログラム。早くからマルチリンガルを目指すご家庭に最適です。",
    },
  },
];

/**
 * Build a regex pattern to match glossary terms in text
 * Matches longest terms first to avoid partial matches
 */
export function buildGlossaryRegex(): RegExp {
  const allTerms: string[] = [];
  for (const entry of GLOSSARY) {
    allTerms.push(entry.term);
    allTerms.push(...entry.aliases.filter((a) => a.length > 1));
  }
  // Sort by length (longest first) to match "A-Level" before "A"
  allTerms.sort((a, b) => b.length - a.length);
  // Escape regex special chars
  const escaped = allTerms.map((t) =>
    t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );
  return new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
}

/** Find the glossary entry for a matched term */
export function findGlossaryEntry(matchedText: string): GlossaryEntry | null {
  const lower = matchedText.toLowerCase();
  for (const entry of GLOSSARY) {
    if (entry.term.toLowerCase() === lower) return entry;
    if (entry.aliases.some((a) => a.toLowerCase() === lower)) return entry;
  }
  return null;
}
