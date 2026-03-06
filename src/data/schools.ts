// School data — SchoolFinder
// 160 schools total: International (1-30), Thai top (31-61), EP/Gifted (62-95), Bilingual (96-130), Trilingual+Alt (131-160)

import type { CurriculumType, SchoolSchedule } from '../types/school';
import { group1Schools } from './schools-group1';
import { group3Schools } from './schools-group3';
import { group45Schools } from './schools-group45';

// ─── Interfaces ───

export interface ParentFit {
  authoritative: number;
  authoritarian: number;
  permissive: number;
  neglectful: number;
}

export interface TrackRecord {
  igcse?: string;
  aLevel?: string;
  ibAvg?: string;
  ibNote?: string;
  topUni?: string[];
  medical?: string | boolean;
  note?: string;
  src?: string;
}

export interface SchoolData {
  id: number;
  name: string;
  short: string;
  flag: string;
  cur: CurriculumType | 'french' | 'thai';
  curL: string;
  loc: string;
  city: string;
  locL: string;
  lat: number;
  lng: number;
  tMin: number;
  tMax: number;
  ls: string[];
  web?: string;
  mq?: string;
  efScore: number;
  efNote?: string;
  parentFit: ParentFit;
  track: TrackRecord;
  desc: string;
  pros?: string[];
  tags: string[];
  upcoming?: boolean;
  // contact
  phone?: string;
  // ── School identity ──
  establishedYear?: number;           // Founded year (e.g., 1957)
  usp?: string;                       // Unique Selling Proposition — one-liner
  // ── Academic outcomes ──
  topUniAcceptance?: string;          // Latest summary (e.g., "416 offers จาก 77 มหาลัย (2024)")
  // ── Student demographics ──
  foreignPassportRatio?: string;      // % foreign passport holders (e.g., "70%")
  chineseStudentRatio?: string;       // % Chinese students (e.g., "15%")
  avgClassSize?: number;              // Average students per class
  competitionRate?: string;           // Admission competition (e.g., "1:8")
  // ── Teacher quality ──
  teacherStudentRatio?: string;       // Ratio (e.g., "1:8")
  nativeEnglishTeachers?: boolean;    // Has native English teachers?
  teacherAccent?: string;             // Dominant accent (British/American/Mixed)
  avgTeacherTenure?: string;          // Average years teachers stay (e.g., "5-7 ปี")
  // ── Parent feedback ──
  parentPraise?: string[];            // What parents commonly praise
  // extras (merged from schoolExtras)
  shadow?: string;
  youtime?: string;
  extra?: string;
  // buzz / wow facts (pre-verified, law-compliant)
  buzz?: string[];
  // schedule
  schedule?: SchoolSchedule;
  // network (branch schools)
  networkBrand?: string;
  parentSchoolCountry?: string;
  parentSchoolUrl?: string;
  // admission details (community-sourced)
  admission?: {
    assessmentTypes?: string[];
    placementTest?: string;
    siblingPolicy?: string;
    transferNotes?: string;
    languagePrep?: string;
  };
  // payment intelligence (community-sourced)
  payment?: {
    creditCardAccepted?: boolean;
    creditCardBrands?: string[];
    earlyPaymentDiscount?: string;
    installmentPlans?: string;
    additionalFees?: string;
    sourceNote?: string;
  };
}

export interface AdmissionEvent {
  m: number;
  label: string;
  note: string;
  type?: 'exam' | 'apply' | 'deadline' | 'result' | 'openday' | 'info';
}

export interface AdmissionCalendarEntry {
  id: number;
  name: string;
  events: AdmissionEvent[];
  termStart: string;
  src: string;
}

// ─── School Data (174 schools) ───

export const schools: SchoolData[] = [
  // ═══ INTERNATIONAL SCHOOLS (1-30) ═══
  {id:1,name:'Shrewsbury International School',short:'Shrewsbury',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'riverside',city:'bangkok',locL:'ริเวอร์ไซด์',lat:13.6940,lng:100.5100,
    tMin:700000,tMax:950000,ls:['visual','readwrite'],
    web:'https://www.shrewsbury.ac.th',mq:'Shrewsbury+International+School+Bangkok',
    efScore:9,efNote:'Inquiry + Pastoral care สร้าง EF ดี',phone:'+66 2 675 1888',
    parentFit:{authoritative:10,authoritarian:8,permissive:8,neglectful:7},
    track:{igcse:'56% A*/A (2x UK avg)',topUni:['Oxford','Cambridge','Yale','Cornell'],medical:'สอบเข้าแพทย์ 12 คน (2024)',src:'shrewsbury.ac.th'},
    desc:'IGCSE/A-Level ชั้นนำ 56% A*/A สูงกว่า UK 2 เท่า',
    pros:['ผลสอบระดับ World-class','Oxbridge + Ivy League','Pastoral care เข้มแข็ง'],tags:['igcse','a-level','top-results'],
    establishedYear:2003,usp:'IGCSE ผลสอบ 56% A*/A สูงกว่า UK 2 เท่า + แคมปัสริมแม่น้ำเจ้าพระยา',
    topUniAcceptance:'Oxbridge + Ivy League ทุกปี (2024)',foreignPassportRatio:'~65%',chineseStudentRatio:'~10%',
    avgClassSize:22,competitionRate:'1:5',teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'5-7 ปี',parentPraise:['ผลสอบระดับ World-class','Pastoral care ดูแลเด็กถึงตัว','แคมปัสริมน้ำสวยมาก'],
    buzz:['IGCSE 56% A*/A — สูงกว่าค่าเฉลี่ย UK ถึง 2 เท่า','ส่งนักเรียนเข้า Oxford, Cambridge, Yale ทุกปี','แคมปัสริมน้ำเจ้าพระยา วิวที่สวยที่สุดในบรรดาโรงเรียนนานาชาติ'],
    shadow:'มี SEN Support, TA in class',youtime:'Pastoral Care + House System + Counselor ประจำ',extra:'กีฬา 40+ ชนิด, ดนตรี, Drama, Model UN, Duke of Edinburgh, Swimming Academy'},

  {id:2,name:'Harrow International School Bangkok',short:'Harrow',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'donmuang',city:'bangkok',locL:'ดอนเมือง',lat:13.9200,lng:100.5930,
    tMin:650000,tMax:900000,ls:['visual','kinesthetic'],
    web:'https://www.harrowschool.ac.th',mq:'Harrow+International+School+Bangkok',
    efScore:8,efNote:'British tradition + Leadership programme สร้าง EF',phone:'+66 2 503 7222',
    parentFit:{authoritative:9,authoritarian:9,permissive:7,neglectful:6},
    track:{aLevel:'59% A*-A (2023)',topUni:['Stanford','Oxford','Imperial','Melbourne'],note:'91% first choice, 13% QS Top 10',src:'harrowschool.ac.th'},
    desc:'A-Level 59% A*-A / 91% ได้มหาลัยตัวเลือกแรก',
    pros:['ชื่อเสียง 450 ปี Harrow London','Leadership programme','แคมปัสขนาดใหญ่'],tags:['igcse','a-level','leadership'],
    establishedYear:2005,usp:'สืบทอด DNA Harrow London 450+ ปี / Boarding school แท้ + Leadership',
    topUniAcceptance:'91% ได้มหาลัยตัวเลือกแรก / 13% QS Top 10 (2023)',foreignPassportRatio:'~55%',chineseStudentRatio:'~15%',
    avgClassSize:20,competitionRate:'1:4',teacherStudentRatio:'1:7',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'4-6 ปี',parentPraise:['Leadership programme ดีมาก','Boarding school แท้จริง','แคมปัสกว้างขวาง'],
    buzz:['A-Level 59% A*-A — 91% ได้มหาลัยตัวเลือกแรก','Harrow London 450 ปี — สาขาเดียวใน Thailand','มี Boarding school เหมือน Harrow UK แท้ๆ'],
    shadow:'มี Learning Support Dept, TA ทุกห้อง',youtime:'House System (แบบ Harrow UK), Tutor Group, Counselor',extra:'กีฬา 30+ ชนิด, CCF, Leadership Programmes, Polo, Cricket, Swimming'},

  {id:3,name:'Bangkok Patana School',short:'Patana',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + IB DP',
    loc:'bangna',city:'bangkok',locL:'บางนา',lat:13.6620,lng:100.6390,
    tMin:600000,tMax:850000,ls:['visual','readwrite','kinesthetic'],
    web:'https://www.patana.ac.th',mq:'Bangkok+Patana+School',
    efScore:9,efNote:'IGCSE+IB Hybrid สร้าง EF ทั้ง Structure + Inquiry',phone:'+66 2 785 2200',
    parentFit:{authoritative:10,authoritarian:8,permissive:8,neglectful:6},
    track:{igcse:'Strong A*/A rates',topUni:['Cambridge','Oxford','Brown','Cornell','UPenn'],src:'patana.ac.th'},
    desc:'เก่าแก่ที่สุดในไทย (1957) IGCSE+IB',
    pros:['โรงเรียนนานาชาติเก่าแก่ที่สุด','IGCSE → IB DP pathway','แคมปัส 50 ไร่'],tags:['igcse','ib-dp','established'],
    establishedYear:1957,usp:'โรงเรียนนานาชาติเก่าแก่ที่สุดในไทย (1957) + แคมปัส 50 ไร่',
    topUniAcceptance:'Oxbridge + Ivy League ทุกปี (2024)',foreignPassportRatio:'~80%',chineseStudentRatio:'~5%',
    avgClassSize:22,competitionRate:'1:6',teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'5-8 ปี',parentPraise:['ชุมชนนานาชาติจริงๆ','มี Educational Psychologist ประจำ','ศิษย์เก่า C-suite ทั่วเอเชีย'],
    buzz:['เก่าแก่ที่สุดในไทย ก่อตั้ง 1957 — ศิษย์เก่าเป็นผู้บริหารระดับ C-suite ทั่วเอเชีย','แคมปัส 50 ไร่ ใหญ่ที่สุดในบรรดาโรงเรียนนานาชาติกรุงเทพ','มี Educational Psychologist ประจำ — ไม่ใช่ทุกโรงเรียนที่มี'],
    shadow:'มี Learning Support Centre, Educational Psychologist',youtime:'Pastoral Care system, Homeroom, Counselor',extra:'กีฬา 40+ ชนิด, ดนตรี, ศิลปะ, Model UN, Community Service, Swimming'},

  {id:4,name:'ISB International School Bangkok',short:'ISB',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'American (AP + IB)',
    loc:'nichada',city:'nonthaburi',locL:'นิชดาธานี',lat:13.9107,lng:100.5170,
    tMin:700000,tMax:1000000,ls:['visual','kinesthetic','auditory'],
    web:'https://www.isb.ac.th',mq:'ISB+International+School+Bangkok',
    efScore:9,efNote:'AP+IB Dual track → ลูกเลือกเส้นทางเอง → Authoritative teaching',phone:'+66 2 963 5800',
    parentFit:{authoritative:10,authoritarian:7,permissive:8,neglectful:6},
    track:{ibAvg:'Strong IB + AP results',topUni:['Stanford','Oxford','Brown','Columbia','UPenn','LSE'],src:'isb.ac.th'},
    desc:'American curriculum + IB / AP ครบทุกทาง',
    pros:['Dual AP + IB pathway','แคมปัส 40 ไร่','Community เข้มแข็ง'],tags:['ap','ib-dp','american'],
    establishedYear:1951,usp:'เก่าแก่ที่สุดในเอเชียตะวันออกเฉียงใต้ (1951) Dual AP+IB / แคมปัส 40 ไร่',
    topUniAcceptance:'Stanford, Ivy League, Oxbridge ทุกปี (2024)',foreignPassportRatio:'~85%',chineseStudentRatio:'~5%',
    avgClassSize:18,competitionRate:'1:5',teacherStudentRatio:'1:7',nativeEnglishTeachers:true,teacherAccent:'American',
    avgTeacherTenure:'6-8 ปี',parentPraise:['Community เข้มแข็งมาก','แคมปัส 40 ไร่สมบูรณ์แบบ','AP+IB เลือกเส้นทางเอง'],
    shadow:'มี Learning Support, SEN specialist, TA ทุกห้อง',youtime:'Advisory Program, Counselor, Social-Emotional Learning',extra:'กีฬา 50+ ชนิด (แคมปัส 40 ไร่), ดนตรี, Drama, Robotics, Community Service'},

  {id:5,name:'KIS International School',short:'KIS',flag:'\u{1F30D}',cur:'ib',curL:'Full IB (PYP→MYP→DP)',
    loc:'pracha-uthit',city:'bangkok',locL:'ประชาอุทิศ',lat:13.6930,lng:100.5400,
    tMin:450000,tMax:720000,ls:['visual','kinesthetic'],
    web:'https://www.kis.ac.th',mq:'KIS+International+School+Bangkok',
    efScore:9,efNote:'Full IB Continuum = Inquiry-based ตลอด → EF เยี่ยม',phone:'+66 2 274 3444',
    parentFit:{authoritative:10,authoritarian:8,permissive:7,neglectful:5},
    track:{ibAvg:'35 (2024)',ibNote:'5-year avg 34.5, above world avg 30',topUni:['Top UK','US universities'],src:'kis.ac.th'},
    desc:'IB เฉลี่ย 35/45 สูงกว่าค่าเฉลี่ยโลก',
    pros:['Full IB Continuum','IB score สูงกว่าค่าเฉลี่ยโลก','ค่าเทอมคุ้มค่า'],tags:['ib-pyp','ib-myp','ib-dp'],
    establishedYear:1998,usp:'Full IB Continuum ไม่กี่แห่งในไทย / IB เฉลี่ย 35 สูงกว่าค่าเฉลี่ยโลก',
    topUniAcceptance:'UK/US Top 50 (2024)',foreignPassportRatio:'~50%',chineseStudentRatio:'~15%',
    avgClassSize:20,competitionRate:'1:3',teacherStudentRatio:'1:9',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'4-6 ปี',parentPraise:['IB score สูง ค่าเทอมคุ้มค่า','ครูให้เด็กคิดเอง','ชุมชนอบอุ่น'],
    shadow:'มี Student Support Services, Inclusion programme',youtime:'Pastoral Care, Homeroom advisory',extra:'กีฬา 20+ ชนิด, ดนตรี, Visual Arts, CAS activities, Swimming'},

  {id:6,name:'NIST International School',short:'NIST',flag:'\u{1F30D}',cur:'ib',curL:'Full IB (PYP→MYP→DP)',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท 15',lat:13.7254,lng:100.5631,
    tMin:700000,tMax:920000,ls:['visual','kinesthetic'],
    web:'https://www.nist.ac.th',mq:'NIST+International+School+Bangkok',
    efScore:10,efNote:'IB Inquiry-based + UN values → EF ทุกด้าน',phone:'+66 2 017 5888',
    parentFit:{authoritative:10,authoritarian:9,permissive:7,neglectful:5},
    track:{ibAvg:'36 (2024)',ibNote:'99% pass, 29% scored 40+, 36M THB scholarships',topUni:['LSE','Ivy League','Oxford','Cambridge'],note:'416 offers, 77 universities',src:'nist.ac.th'},
    desc:'IB เฉลี่ย 36/45 (โลก: 30) สูงกว่า 20%',
    pros:['IB อันดับต้นๆ ไทย','UN-affiliated','416 offers จาก 77 มหาลัย'],tags:['ib-pyp','ib-myp','ib-dp','top-ib'],
    establishedYear:1992,usp:'IB Top ของไทย เฉลี่ย 36/45 / UN-affiliated / 416 offers จาก 77 มหาลัย',
    topUniAcceptance:'416 offers จาก 77 มหาลัย / ทุนรวม 36M THB (2024)',foreignPassportRatio:'~75%',chineseStudentRatio:'~8%',
    avgClassSize:20,competitionRate:'1:5',teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'4-6 ปี',parentPraise:['IB score สูงสุดในไทย','Diversity ระดับ UN','Global citizen values'],
    shadow:'มี Student Support, Inclusion specialist',youtime:'Advisory Group, Counselor, Mindfulness programme',extra:'กีฬา 30+ ชนิด, UN Day, NIST Festival, CAS, MUN, IAYP'},

  {id:7,name:'Ruamrudee International School',short:'RIS',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'American (AP)',
    loc:'minburi',city:'bangkok',locL:'มีนบุรี',lat:13.8190,lng:100.7300,
    tMin:400000,tMax:620000,ls:['visual','readwrite'],
    web:'https://www.rfrism.ac.th',mq:'Ruamrudee+International+School+Bangkok',
    efScore:7,efNote:'AP track + Catholic values สร้าง EF ปานกลาง',phone:'+66 2 791 8900',
    parentFit:{authoritative:8,authoritarian:8,permissive:7,neglectful:6},
    track:{topUni:['UC Berkeley','U Michigan','Chulalongkorn'],src:'rfrism.ac.th'},
    desc:'AP American curriculum โรงเรียนคาทอลิก',
    pros:['ค่าเทอมคุ้มค่า','Community ดี','ประวัติยาวนาน'],tags:['ap','american','catholic'],
    establishedYear:1957,usp:'โรงเรียนคาทอลิกนานาชาติ AP ยาวนาน / ชุมชนครอบครัวอบอุ่น',
    foreignPassportRatio:'~40%',chineseStudentRatio:'~10%',avgClassSize:20,competitionRate:'1:3',
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'American',
    avgTeacherTenure:'5-7 ปี',parentPraise:['ชุมชนอบอุ่นแบบครอบครัว','ค่าเทอมคุ้มค่า','ค่านิยมดี'],
    shadow:'มี Learning Resource Centre',youtime:'Homeroom, Spiritual guidance, Counselor',extra:'กีฬา 20+ ชนิด, Campus Ministry, Service Learning, Drama'},

  {id:8,name:'St. Andrews International School (Sukhumvit 107)',short:'St.Andrews 107',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level / IB',
    loc:'bangna',city:'bangkok',locL:'สุขุมวิท 107',lat:13.6600,lng:100.6210,
    tMin:350000,tMax:650000,ls:['visual','kinesthetic'],
    web:'https://www.standrews-schools.com',mq:'St+Andrews+International+School+Sukhumvit+107',
    efScore:7,efNote:'British + IB options = หลากหลายเส้นทาง',phone:'+66 2 056 9550',
    parentFit:{authoritative:8,authoritarian:8,permissive:7,neglectful:6},
    track:{topUni:['UK universities','Australian universities'],src:'standrews-schools.com'},
    desc:'British curriculum ค่าเทอมจับต้องได้',
    pros:['ค่าเทอมสมเหตุสมผล','British + IB dual path','สาขาหลายที่'],tags:['igcse','a-level','affordable'],
    establishedYear:2003,usp:'British + IB dual path / ค่าเทอมจับต้องได้ / หลายสาขา',
    foreignPassportRatio:'~45%',chineseStudentRatio:'~15%',avgClassSize:22,competitionRate:'1:3',
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['ค่าเทอมสมเหตุสมผล','มีหลายเส้นทาง','สาขาใกล้บ้าน'],
    shadow:'มี Learning Support',youtime:'Pastoral system, Tutor group',extra:'กีฬา 20+ ชนิด, ดนตรี, Art, Coding Club'},

  {id:9,name:'VERSO International School',short:'VERSO',flag:'\u{1F30D}',cur:'ib',curL:'IB-style / PBL',
    loc:'bangphli',city:'samutprakan',locL:'บางพลี สมุทรปราการ',lat:13.6040,lng:100.7050,
    tMin:450000,tMax:700000,ls:['kinesthetic','visual'],
    web:'https://www.verso.ac.th',mq:'VERSO+International+School+Bangkok',
    efScore:10,efNote:'PBL + Design Thinking = Authoritative teaching → EF สูงสุด',phone:'+66 2 080 6200',
    parentFit:{authoritative:10,authoritarian:6,permissive:8,neglectful:5},
    track:{topUni:['โรงเรียนใหม่ - รอ track record'],src:'verso.ac.th'},
    desc:'โรงเรียนนวัตกรรม PBL + Design Thinking',
    pros:['Innovation-focused','PBL เต็มรูปแบบ','Future-ready skills'],tags:['pbl','design-thinking','innovative'],
    establishedYear:2020,usp:'โรงเรียนนวัตกรรม PBL + Design Thinking แห่งเดียวในไทย',
    foreignPassportRatio:'~30%',chineseStudentRatio:'~20%',avgClassSize:18,competitionRate:'1:2',
    teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'2-3 ปี',parentPraise:['นวัตกรรมเต็มรูปแบบ','เด็กได้คิดสร้างสรรค์จริง','Maker Space ทันสมัย'],
    shadow:'มี Individual Learning Plan, Innovation mentor',youtime:'Advisory, Design Thinking reflection',extra:'Maker Space, Robotics, Entrepreneurship, Design Lab, Community projects'},

  {id:10,name:'Wellington College International Bangkok',short:'Wellington',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'krungthep-kreetha',city:'bangkok',locL:'กรุงเทพกรีฑา',lat:13.7420,lng:100.6680,
    tMin:550000,tMax:850000,ls:['visual','kinesthetic','auditory'],
    web:'https://www.wellingtoncollege.ac.th',mq:'Wellington+College+International+Bangkok',
    efScore:8,efNote:'Wellington identity + British rigour สร้าง EF ดี',phone:'+66 2 087 8888',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{topUni:['UK universities','Top 50 global'],src:'wellingtoncollege.ac.th'},
    desc:'พันธมิตร Wellington College UK',
    pros:['ชื่อเสียง Wellington UK','แคมปัสทันสมัย','Well-rounded education'],tags:['igcse','a-level','premium'],
    establishedYear:2018,usp:'สืบทอด DNA Wellington College UK 160+ ปี / แคมปัสทันสมัยมาก',
    foreignPassportRatio:'~50%',chineseStudentRatio:'~15%',avgClassSize:20,competitionRate:'1:3',
    teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['แคมปัสสวยทันสมัย','Wellington DNA','Well-being programme ดี'],
    shadow:'มี Learning Support, SEN provision',youtime:'House System (Wellington identity), Wellbeing programme',extra:'กีฬา 30+ ชนิด, Performing Arts, Music Academy, CCAs 40+'},

  {id:11,name:"Regent's International School Bangkok",short:"Regent's",flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + IB DP + A-Level',
    loc:'minburi',city:'bangkok',locL:'มีนบุรี',lat:13.8170,lng:100.7240,
    tMin:350000,tMax:650000,ls:['visual','readwrite'],
    web:'https://www.regents.ac.th',mq:'Regents+International+School+Bangkok',
    efScore:7,efNote:'Round Square membership = Service learning + EF',phone:'+66 2 957 5777',
    parentFit:{authoritative:8,authoritarian:7,permissive:7,neglectful:7},
    track:{topUni:['UK universities','Australian universities'],src:'regents.ac.th'},
    desc:'Round Square membership + IGCSE/IB',
    pros:['Round Square network','Boarding option','ค่าเทอมสมเหตุสมผล'],tags:['igcse','ib-dp','boarding'],
    establishedYear:2003,usp:'Round Square membership / Boarding option / IGCSE + IB dual path',
    foreignPassportRatio:'~60%',chineseStudentRatio:'~10%',avgClassSize:18,competitionRate:'1:2',
    teacherStudentRatio:'1:9',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['Boarding โปรแกรมดี','Round Square เครือข่ายระดับโลก','ค่าเทอมไม่แพง'],
    shadow:'มี Learning Support, EAL programme',youtime:'House system (Round Square), Pastoral care',extra:'IDEALS activities, Duke of Edinburgh, กีฬา 25+ ชนิด, Community Service'},

  {id:12,name:'Brighton College Bangkok',short:'Brighton',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'krungthep-kreetha',city:'bangkok',locL:'กรุงเทพกรีฑา',lat:13.7380,lng:100.6700,
    tMin:550000,tMax:800000,ls:['visual','readwrite'],
    web:'https://www.brightoncollege.ac.th',mq:'Brighton+College+Bangkok',
    efScore:8,efNote:'UK top school DNA + Academic rigour',phone:'+66 2 300 9600',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{topUni:['UK Russell Group','Top 100 global'],src:'brightoncollege.ac.th'},
    desc:'พันธมิตร Brighton College UK #1',
    pros:['Brighton UK อันดับ 1','Academic excellence','Modern facilities'],tags:['igcse','a-level','premium'],
    establishedYear:2016,usp:'สืบทอด DNA Brighton College UK อันดับ 1 / เน้น Academic excellence',
    foreignPassportRatio:'~45%',chineseStudentRatio:'~15%',avgClassSize:20,competitionRate:'1:3',
    teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['Brighton UK #1 brand','ครูคุณภาพสูง','Academic rigour ดี'],
    shadow:'มี Academic Support, EAL',youtime:'Pastoral system, House system',extra:'กีฬา 25+ ชนิด, Music, Drama, STEM Club, Art'},

  {id:13,name:'Anglo Singapore International School',short:'Anglo Singapore',flag:'\u{1F1F8}\u{1F1EC}',cur:'igcse',curL:'IGCSE',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท 31',lat:13.7370,lng:100.5620,
    tMin:300000,tMax:500000,ls:['readwrite','visual'],
    web:'https://www.anglo.ac.th',mq:'Anglo+Singapore+International+School+Bangkok',
    efScore:6,efNote:'Singapore-style structured learning',phone:'+66 2 331 1874',
    parentFit:{authoritative:7,authoritarian:9,permissive:6,neglectful:5},
    track:{topUni:['Singapore universities','UK universities'],src:'anglo.ac.th'},
    desc:'Singapore-style academic rigour + IGCSE',
    pros:['ค่าเทอมจับต้องได้','Singapore maths','ใจกลางสุขุมวิท'],tags:['igcse','singapore','affordable'],
    establishedYear:2000,usp:'Singapore Maths เข้มข้น + IGCSE / ค่าเทอมจับต้องได้ใจกลางสุขุมวิท',
    foreignPassportRatio:'~35%',chineseStudentRatio:'~20%',avgClassSize:22,competitionRate:'1:2',
    teacherStudentRatio:'1:11',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'3-5 ปี',parentPraise:['คณิตศาสตร์เข้มข้น','ค่าเทอมจับต้องได้','ใจกลางสุขุมวิท'],
    shadow:'มี Learning Support',youtime:'Class teacher pastoral, Counselor',extra:'กีฬา 15+ ชนิด, Coding, Math Olympiad, Chinese enrichment'},

  {id:14,name:'ICS International School',short:'ICS',flag:'\u{1F30D}',cur:'ib',curL:'IB (PYP→MYP→DP)',
    loc:'minburi',city:'bangkok',locL:'มีนบุรี',lat:13.8090,lng:100.7310,
    tMin:300000,tMax:550000,ls:['kinesthetic','visual'],
    web:'https://www.ics.ac.th',mq:'ICS+International+School+Bangkok',
    efScore:8,efNote:'Full IB + Small community → Pastoral care + EF',phone:'+66 2 338 0777',
    parentFit:{authoritative:9,authoritarian:7,permissive:8,neglectful:7},
    track:{topUni:['UK universities','US universities'],src:'ics.ac.th'},
    desc:'Full IB community school ขนาดเล็ก',
    pros:['ชุมชนเล็กอบอุ่น','Full IB','ค่าเทอมคุ้มค่า'],tags:['ib-pyp','ib-myp','ib-dp','small'],
    establishedYear:1993,usp:'Full IB community school ขนาดเล็กอบอุ่น ดูแลเด็กถึงตัว',
    foreignPassportRatio:'~60%',chineseStudentRatio:'~10%',avgClassSize:16,competitionRate:'1:2',
    teacherStudentRatio:'1:7',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'4-6 ปี',parentPraise:['ห้องเรียนเล็กดูแลถึง','ชุมชนอบอุ่นเหมือนครอบครัว','ค่าเทอมคุ้มค่า'],
    shadow:'มี Student Support, Small class ดูแลใกล้ชิด',youtime:'Pastoral care, Homeroom advisory',extra:'กีฬา 20+ ชนิด, Art, Music, CAS, MUN'},

  {id:15,name:'Wells International School',short:'Wells',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'American (AP)',
    loc:'onnut',city:'bangkok',locL:'อ่อนนุช',lat:13.7060,lng:100.6010,
    tMin:250000,tMax:500000,ls:['visual','readwrite'],
    web:'https://www.wells.ac.th',mq:'Wells+International+School+Bangkok',
    efScore:7,efNote:'American style + small class = Individual attention',phone:'+66 2 746 6060',
    parentFit:{authoritative:8,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['US universities','Thai universities'],src:'wells.ac.th'},
    desc:'American AP curriculum ค่าเทอมย่อมเยา',
    pros:['ค่าเทอมต่ำ','AP pathway','ห้องเรียนเล็ก'],tags:['ap','american','affordable'],
    establishedYear:2001,usp:'American AP ค่าเทอมย่อมเยาที่สุดในกลุ่ม / ห้องเรียนเล็ก',
    foreignPassportRatio:'~30%',chineseStudentRatio:'~15%',avgClassSize:18,competitionRate:'1:2',
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'American',
    avgTeacherTenure:'3-5 ปี',parentPraise:['ค่าเทอมถูกมาก','ห้องเรียนเล็กดูแลถึง','บรรยากาศอบอุ่น'],
    shadow:'มี Learning Support, ห้องเรียนเล็ก',youtime:'Homeroom advisory',extra:'กีฬา 15+ ชนิด, Club activities, Thai cultural'},

  {id:16,name:'Lycee Francais International de Bangkok',short:'Lycee Francais',flag:'\u{1F1EB}\u{1F1F7}',cur:'french',curL:'French Baccalaureate',
    loc:'sathorn',city:'bangkok',locL:'สาทร',lat:13.7190,lng:100.5300,
    tMin:350000,tMax:600000,ls:['readwrite','auditory'],
    web:'https://www.lfib.ac.th',mq:'Lycee+Francais+International+Bangkok',
    efScore:7,efNote:'French critical thinking tradition = Cognitive Flexibility',phone:'+66 2 934 8008',
    parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:5},
    track:{topUni:['French Grandes Ecoles','Sciences Po','Sorbonne'],src:'lfib.ac.th'},
    desc:'French Baccalaureate + trilingual',
    pros:['French Bac pathway','Trilingual (FR/EN/TH)','European network'],tags:['french-bac','trilingual'],
    establishedYear:1962,usp:'French Bac trilingual (FR/EN/TH) แห่งเดียวในไทย',
    foreignPassportRatio:'~60%',chineseStudentRatio:'~5%',avgClassSize:22,
    teacherStudentRatio:'1:10',nativeEnglishTeachers:false,teacherAccent:'French',
    avgTeacherTenure:'4-6 ปี',parentPraise:['French Bac pathway แท้จริง','Trilingual จริง','European network'],
    shadow:'มี Accompagnement scolaire',youtime:'Vie scolaire (French pastoral system)',extra:'French culture, Music, Sport, Art, theatre, Coding'},

  {id:17,name:'Concordian International School',short:'Concordian',flag:'\u{1F1FA}\u{1F1F8}\u{1F1E8}\u{1F1F3}',cur:'ib',curL:'IB (PYP/MYP/DP) + Trilingual EN/ZH/TH',
    loc:'bangna',city:'samut_prakan',locL:'บางแก้ว บางพลี (บางนา กม.7)',lat:13.6381,lng:100.6739,
    tMin:626400,tMax:963400,ls:['visual','kinesthetic','auditory'],
    web:'https://www.concordian.ac.th',mq:'Concordian+International+School+Bangkok',
    efScore:9,efNote:'Only fully trilingual IB school in Thailand / IB avg 36 / NEASC+CIS accredited / CP Group family',phone:'+66 2 034 9000',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{ibNote:'IB avg 36 (2021, above global avg 33) / IB PYP+MYP+DP ครบ',topUni:['UK universities','US universities','Chinese universities','Thai universities'],note:'Only fully trilingual IB school in Thailand / NEASC + CIS accredited / English-Chinese immersion N-G4',src:'concordian.ac.th'},
    desc:'IB Trilingual EN/ZH/TH เดียวในไทย / IB avg 36 / NEASC + CIS accredited',
    pros:['IB Trilingual เดียวในไทย (EN/ZH/TH)','IB avg 36','NEASC + CIS accredited','English-Chinese immersion','Campus ใหญ่ สระ 50m','Residential Life Skills programme'],tags:['ib','trilingual','chinese','premium','neasc','cis'],
    establishedYear:2001,usp:'IB Trilingual EN/ZH/TH เดียวในไทย / IB avg 36 / NEASC+CIS / CP Group family founded',
    foreignPassportRatio:'~40%',chineseStudentRatio:'~30%',avgClassSize:18,
    teacherStudentRatio:'1:5',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'3-5 ปี',parentPraise:['IB Trilingual 3 ภาษาจริง','IB avg 36 สูงกว่า global','Campus ใหญ่สวย','Immersion Chinese ตั้งแต่เด็ก'],
    shadow:'มี Learning Support Centre + EAL',youtime:'Homeroom advisory, Counselor, Residential Life Skills (G8-12)',extra:'STEM lab, Robotics, กีฬา 20+ ชนิด, Swimming 50m, Art, Chinese cultural'},

  {id:18,name:'Traill International School',short:'Traill',flag:'\u{1F30D}',cur:'igcse',curL:'IGCSE',
    loc:'bangna',city:'bangkok',locL:'บางนา ตราด',lat:13.6500,lng:100.6600,
    tMin:200000,tMax:400000,ls:['visual','readwrite'],
    web:'https://www.traillschool.ac.th',mq:'Traill+International+School+Bangkok',
    efScore:6,efNote:'Small school + individual attention',phone:'+66 2 718 8779',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['Thai universities','UK universities'],src:'traillschool.ac.th'},
    desc:'IGCSE ค่าเทอมประหยัดที่สุด',
    pros:['ค่าเทอมต่ำมาก','IGCSE','ขนาดเล็กอบอุ่น'],tags:['igcse','budget-friendly'],
    establishedYear:1983,usp:'IGCSE ค่าเทอมประหยัดที่สุดในกลุ่มนานาชาติ',
    foreignPassportRatio:'~25%',chineseStudentRatio:'~10%',avgClassSize:15,
    teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'5-7 ปี',parentPraise:['ค่าเทอมถูกที่สุด','ขนาดเล็กอบอุ่น','ครูอยู่นาน'],
    shadow:'มี Individual support (ห้องเล็ก)',youtime:'Class teacher pastoral',extra:'กีฬา 10+ ชนิด, Art, Music'},

  {id:19,name:'Garden International School',short:'Garden',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'sathorn',city:'bangkok',locL:'สาทร',lat:13.7170,lng:100.5280,
    tMin:350000,tMax:600000,ls:['visual','kinesthetic'],
    web:'https://www.gardenbangkok.com',mq:'Garden+International+School+Bangkok',
    efScore:7,efNote:'British + Creative Arts = Well-rounded EF',phone:'+66 2 249 1880',
    parentFit:{authoritative:8,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['UK universities','Asian universities'],src:'gardenbangkok.com'},
    desc:'British IGCSE ย่านสาทร',
    pros:['ทำเลใจกลางเมือง','Creative Arts เด่น','Community ดี'],tags:['igcse','a-level','central'],
    establishedYear:2005,usp:'British IGCSE ย่านสาทร / Creative Arts โดดเด่น',
    foreignPassportRatio:'~40%',chineseStudentRatio:'~10%',avgClassSize:18,
    teacherStudentRatio:'1:9',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['ทำเลใจกลางเมือง','Creative Arts เด่น','Community ดี'],
    shadow:'มี Learning Support',youtime:'Pastoral care, House system',extra:'Creative Arts เด่น, กีฬา 15+ ชนิด, Music, Drama'},

  {id:20,name:'Shrewsbury International School Bangkok City Campus — Hanqing Bilingual Pathway',short:'Shrewsbury HQP',flag:'🇬🇧🇨🇳',cur:'bilingual',curL:'Bilingual (EN/CN)',
    loc:'huaikhwang',city:'bangkok',locL:'ห้วยขวาง (City Campus)',lat:13.7640,lng:100.5730,
    tMin:383400,tMax:812600,ls:['visual','kinesthetic','auditory'],
    web:'https://www.shrewsbury.ac.th/city-campus/hanqing-bilingual-pathway/',mq:'Shrewsbury+International+School+Bangkok+City+Campus',
    efScore:8,efNote:'Shrewsbury DNA + Bilingual EN/Mandarin = สร้าง EF แบบ 2 ภาษา + 2 วัฒนธรรม',phone:'+66 2 203 1222',
    parentFit:{authoritative:9,authoritarian:8,permissive:8,neglectful:6},
    track:{note:'เปิดใหม่ 2025 — Hanqing Bilingual Pathway ใช้ Shrewsbury DNA + 50/50 EN/Mandarin immersion',src:'shrewsbury.ac.th'},
    desc:'Shrewsbury City Campus — English/Mandarin Bilingual Pathway (50/50 immersion) เปิด EY1-Y6',
    pros:['Shrewsbury quality + Mandarin immersion','50/50 EN/CN language model','City Campus ทำเลสะดวก ห้วยขวาง'],tags:['bilingual','shrewsbury-dna','mandarin','en-cn'],
    establishedYear:2025,usp:'Shrewsbury DNA + 50/50 English/Mandarin Immersion — แห่งแรกในไทยจาก Shrewsbury',
    topUniAcceptance:'โปรแกรมใหม่ ยังไม่มีข้อมูล',
    foreignPassportRatio:'~40%+ (ประมาณการ)',chineseStudentRatio:'~30%+ (ประมาณการ)',avgClassSize:20,
    competitionRate:'ใหม่ ยังไม่สูง (ประมาณการ)',
    teacherStudentRatio:'1:8 (ประมาณการ)',nativeEnglishTeachers:true,teacherAccent:'British + Mandarin Native',
    avgTeacherTenure:'ใหม่ (2025)',parentPraise:['Shrewsbury quality + Mandarin immersion','City Campus ทำเลดี ห้วยขวาง','หลักสูตร 2 ภาษา EN/CN ที่ดีที่สุดในกรุงเทพ'],
    shadow:'มี SEN Support (Shrewsbury DNA)',youtime:'Pastoral Care + House System',extra:'กีฬา, Swimming, Music, Chinese cultural programme, Calligraphy, Martial Arts'},

  // ─── Upcoming / New Schools (21-26) ───
  {id:21,name:'Dulwich College International School Bangkok',short:'Dulwich',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'English National → IGCSE + IB/A-Level',
    loc:'bangna',city:'bangkok',locL:'บางนา',lat:13.6600,lng:100.6400,
    tMin:687000,tMax:1070000,ls:['visual','readwrite','auditory'],
    web:'https://bangkok.dulwich.org',mq:'Dulwich+College+International+School+Bangkok+Bangna',
    efScore:8,efNote:'Dulwich brand = Academic + Creative Arts excellence / DCI network IB avg 37.35',phone:'+66 2 118 2772',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{ibNote:'DCI network 2025 IB avg 37.35 (100% pass) / IGCSE 47% A* and above',topUni:['Oxford','Cambridge','Imperial','LSE','UCL'],note:'เปิด ส.ค. 2026 — Dulwich brand จาก London, มี campus ใน Shanghai/Singapore/Seoul/Beijing/Suzhou',src:'bangkok.dulwich.org'},
    desc:'เปิด ส.ค. 2026 — Premium British + IB/A-Level Dual pathway / LEED Gold campus',
    pros:['Dulwich London heritage 400+ ปี','IGCSE+IB/A-Level Dual pathway','LEED Gold + WELL Gold campus','DCI network IB avg 37.35'],tags:['upcoming','igcse','ib','a-level','premium'],upcoming:true,
    establishedYear:2026,usp:'Dulwich College London 400+ ปี + IGCSE/IB/A-Level Dual path + LEED Gold campus บางนา',
    topUniAcceptance:'DCI network: Oxbridge, Ivy League, G5 ทุกปี',
    foreignPassportRatio:'คาดว่า ~60%+',avgClassSize:20,teacherStudentRatio:'คาดว่า 1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    parentPraise:['Dulwich London brand ระดับโลก','Dual pathway IB/A-Level เลือกได้','Campus ใหม่ LEED Gold แห่งแรกของไทย'],
    shadow:'คาดว่ามี SEN + EAL',youtime:'คาดว่า House System + Arts programme',extra:'Performing Arts, Music, Drama, Sports, Swimming, DofE'},

  {id:22,name:"King's College International School Bangkok",short:"King's",flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'lad-prao',city:'bangkok',locL:'ลาดพร้าว (คาดการณ์)',lat:13.8100,lng:100.5800,
    tMin:500000,tMax:800000,ls:['visual','readwrite'],
    web:'https://www.kingsbangkok.ac.th',mq:'Kings+College+International+Bangkok',
    efScore:8,efNote:'British tradition + Wimbledon heritage',phone:'+66 2 481 9955',
    parentFit:{authoritative:9,authoritarian:9,permissive:7,neglectful:6},
    track:{note:"คาดว่าเปิด — King's College London heritage, มี campus ทั่วโลก",src:'kingscollegeschools.org'},
    desc:"คาดว่าเปิด — King's Wimbledon brand",
    pros:["King's College heritage 190+ ปี",'British A-Level','เครือข่ายทั่วโลก'],tags:['upcoming','igcse','a-level','premium'],upcoming:true,
    establishedYear:2024,usp:"King's College Wimbledon 190+ ปี / British tradition + Modern",
    shadow:'คาดว่ามี Learning Support',youtime:"คาดว่า House System แบบ King's Wimbledon",extra:'คาดว่า กีฬา, ดนตรี, Leadership'},

  {id:23,name:'Middleton International School Bangkok',short:'Middleton',flag:'\u{1F1F8}\u{1F1EC}',cur:'igcse',curL:'IPC + IGCSE + A-Level',
    loc:'bangphlat',city:'bangkok',locL:'บางพลัด (ปิ่นเกล้า)',lat:13.7700,lng:100.4800,
    tMin:396000,tMax:594000,ls:['visual','kinesthetic','readwrite'],
    web:'https://middleton.co.th',mq:'Middleton+International+School+Bangkok+Pinklao',
    efScore:8,efNote:'EtonHouse Singapore quality + IPC inquiry + Reggio Emilia + Trilingual EN/TH/ZH',phone:'',
    parentFit:{authoritative:9,authoritarian:7,permissive:8,neglectful:6},
    track:{note:'EtonHouse Group จาก Singapore — IPC + Singapore Maths + IGCSE + A-Level / Trilingual EN/TH/ZH',src:'middleton.co.th'},
    desc:'EtonHouse Singapore — IPC+IGCSE+A-Level / Trilingual 3 ภาษา ปิ่นเกล้า',
    pros:['EtonHouse Singapore quality','IPC + Singapore Maths','Trilingual EN/TH/ZH','Reggio Emilia inspired','ค่าเทอมเหมาะสม'],tags:['igcse','a-level','singapore-brand','trilingual','reggio'],
    establishedYear:2025,usp:'EtonHouse Singapore — IPC + IGCSE + A-Level + Trilingual EN/TH/ZH ย่านปิ่นเกล้า',
    avgClassSize:22,teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    parentPraise:['EtonHouse brand จาก Singapore','3 ภาษา EN/TH/ZH','Reggio Emilia + Singapore Maths'],
    shadow:'มี SEN + EAL Support',youtime:'Entrepreneurship + Inquiry programme',extra:'STEM, Robotics, Business Club, Swimming, Music, Art'},

  {id:24,name:'St. Mark\'s International School ศรีนครินทร์',short:'St. Mark\'s ศรีนครินทร์',flag:'\u{1F1EC}\u{1F1E7}\u{1F1E6}\u{1F1FA}',cur:'igcse',curL:'Australian + IGCSE + ATAR',
    loc:'srinakarin',city:'bangkok',locL:'ศรีนครินทร์',lat:13.6500,lng:100.6350,
    tMin:285000,tMax:453000,ls:['visual','readwrite','auditory'],
    web:'https://stmarks.ac.th',mq:'St+Marks+International+School+Srinakarin',
    efScore:7,efNote:'Australian + IGCSE + ATAR / Trilingual EN/ZH/TH / Top IGCSE Physics Thailand',phone:'',
    parentFit:{authoritative:8,authoritarian:8,permissive:7,neglectful:6},
    track:{ibNote:'Top in Thailand IGCSE Physics / Gold WIMO (World International Mathematics Olympiad)',topUni:['Australian universities','UK universities'],note:'Est. 1999 (Srinakarin campus 2022) — Australian + IGCSE + ATAR / Trilingual EN/ZH/TH',src:'stmarks.ac.th'},
    desc:'Australian + IGCSE + ATAR / Trilingual 3 ภาษา ศรีนครินทร์ / ค่าเทอมเข้าถึงได้',
    pros:['Australian + IGCSE + ATAR Dual pathway','Trilingual EN/ZH/TH','IGCSE Physics top Thailand','Gold WIMO','ค่าเทอมเข้าถึงได้'],tags:['igcse','australian','trilingual','affordable','east-bangkok','atar'],
    establishedYear:1999,usp:'Australian + IGCSE + ATAR / Trilingual / IGCSE Physics top Thailand / ค่าเทอมเข้าถึงได้',
    avgClassSize:22,teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    parentPraise:['IGCSE Physics top Thailand','Trilingual 3 ภาษา','ค่าเทอมเหมาะสม','ATAR pathway ไป Aussie ได้'],
    shadow:'มี SEN + EAL Support',youtime:'Pastoral Care + House System',extra:'IGCSE, ATAR, Chinese, Sports, Music, Art, WIMO'},

  {id:25,name:'Hej International School',short:'Hej',flag:'\u{1F1E9}\u{1F1F0}',cur:'ib',curL:'IB + Scandinavian',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท (คาดการณ์)',lat:13.7300,lng:100.5750,
    tMin:400000,tMax:700000,ls:['kinesthetic','visual'],
    web:'https://www.hejschool.com',mq:'Hej+International+School+Bangkok',
    efScore:9,efNote:'Scandinavian play-based + IB = EF สูงมาก',
    parentFit:{authoritative:10,authoritarian:5,permissive:9,neglectful:6},
    track:{note:'Scandinavian concept — เน้น play, ธรรมชาติ, well-being',src:'hejschool.com'},
    desc:'Scandinavian-IB — Play + Well-being',
    pros:['Scandinavian pedagogy','Nature-based learning','IB + well-being'],tags:['upcoming','ib','scandinavian','play-based'],upcoming:true,
    usp:'Scandinavian pedagogy + IB — Play + Well-being + Nature',
    shadow:'คาดว่ามี Inclusive support',youtime:'คาดว่า Well-being programme',extra:'Outdoor learning, Nature exploration, Creative arts'},

  {id:26,name:'Kensington International School Bangkok',short:'Kensington',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'rama9',city:'bangkok',locL:'พระราม 9 (คาดการณ์)',lat:13.7570,lng:100.5650,
    tMin:500000,tMax:850000,ls:['visual','readwrite'],
    web:'',mq:'Kensington+International+School+Bangkok',
    efScore:8,efNote:'British premium + London heritage',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{note:'คาดว่าเปิด — British premium brand',src:''},
    desc:'British Premium ย่านพระราม 9',
    pros:['British premium','ทำเลพระราม 9','IGCSE + A-Level'],tags:['upcoming','igcse','a-level','premium'],upcoming:true,
    usp:'British Premium ย่านพระราม 9',
    shadow:'คาดว่ามี SEN Support',youtime:'คาดว่า House System',extra:'คาดว่า กีฬา, ดนตรี, STEM'},

  // ─── Trilingual Schools (27-30) ───
  {id:27,name:'Berkeley International School',short:'Berkeley',flag:'\u{1F1EC}\u{1F1E7}\u{1F1E8}\u{1F1F3}',cur:'igcse',curL:'IGCSE + Trilingual (EN/ZH/TH)',
    loc:'bangna',city:'bangkok',locL:'บางนา',lat:13.6520,lng:100.6200,
    tMin:350000,tMax:550000,ls:['visual','readwrite','auditory'],
    web:'https://www.berkeley.ac.th',mq:'Berkeley+International+School+Bangkok',
    efScore:8,efNote:'Trilingual = Cognitive flexibility สูง, EF ดีจากการใช้ 3 ภาษา',phone:'+66 2 747 4788',
    parentFit:{authoritative:9,authoritarian:8,permissive:8,neglectful:6},
    track:{topUni:['UK universities','Chinese universities','Thai universities'],src:'berkeley.ac.th'},
    desc:'Trilingual EN/ZH/TH — 3 ภาษา ค่าเทอมดี',
    pros:['3 ภาษา EN/ZH/TH','ค่าเทอมเหมาะสม','IGCSE + Chinese pathway'],tags:['trilingual','igcse','chinese','affordable'],
    establishedYear:2003,usp:'Trilingual EN/ZH/TH + IGCSE ค่าเทอมเหมาะสม',
    foreignPassportRatio:'~30%',chineseStudentRatio:'~35%',avgClassSize:20,
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'3-5 ปี',parentPraise:['3 ภาษาจริง','ค่าเทอมคุ้มค่า','Chinese pathway แข็ง'],
    shadow:'มี SEN + EAL Support',youtime:'Pastoral Care + House System',extra:'Chinese calligraphy, Martial arts, Swimming, Music, STEM'},

  {id:28,name:'Singapore International School of Bangkok (SISB)',short:'SISB',flag:'\u{1F1F8}\u{1F1EC}\u{1F1E8}\u{1F1F3}',cur:'igcse',curL:'Cambridge + Trilingual (EN/ZH/TH)',
    loc:'pracha-uthit',city:'bangkok',locL:'ประชาอุทิศ / เอกมัย',lat:13.6650,lng:100.5850,
    tMin:300000,tMax:600000,ls:['visual','readwrite'],
    web:'https://www.sisb.ac.th',mq:'SISB+Singapore+International+School+Bangkok',
    efScore:8,efNote:'Singapore Math + Trilingual = Critical thinking + Language EF',phone:'+66 2 158 9090',
    parentFit:{authoritative:9,authoritarian:9,permissive:7,neglectful:6},
    track:{topUni:['NUS','NTU','Tsinghua','Peking U','จุฬา'],src:'sisb.ac.th'},
    desc:'Singapore system + Trilingual EN/ZH/TH',
    pros:['Singapore quality','3 ภาษา trilingual','คณิตศาสตร์เข้มข้น'],tags:['trilingual','singapore','chinese','math-strong'],
    establishedYear:2001,usp:'Singapore system + Trilingual EN/ZH/TH / คณิตศาสตร์เข้มข้น',
    foreignPassportRatio:'~30%',chineseStudentRatio:'~40%',avgClassSize:22,
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'3-5 ปี',parentPraise:['Singapore maths เด่น','3 ภาษาจริง','หลายสาขาเลือกได้'],
    shadow:'มี SEN + Language Support',youtime:'Pastoral Care + Singapore-style mentoring',extra:'Math Olympiad, Chinese debate, Robotics, Swimming, Music'},

  {id:29,name:'Pan-Asia International School (PAIS)',short:'PAIS',flag:'\u{1F1FA}\u{1F1F8}\u{1F1E8}\u{1F1F3}',cur:'us',curL:'American + Trilingual (EN/ZH/TH)',
    loc:'bangna',city:'bangkok',locL:'บางนา กม.12',lat:13.6270,lng:100.6700,
    tMin:250000,tMax:450000,ls:['visual','kinesthetic'],
    web:'https://www.pais.ac.th',mq:'Pan+Asia+International+School+Bangkok',
    efScore:7,efNote:'American + Chinese = Bilingual EF + Creative thinking',phone:'+66 2 347 2280',
    parentFit:{authoritative:8,authoritarian:8,permissive:7,neglectful:6},
    track:{topUni:['Chinese universities','Thai universities','US universities'],src:'pais.ac.th'},
    desc:'American + Trilingual ค่าเทอมย่อมเยา',
    pros:['3 ภาษา ค่าเทอมประหยัด','Chinese pathway แข็ง','American curriculum'],tags:['trilingual','american','chinese','budget-friendly'],
    establishedYear:2003,usp:'American + Trilingual ค่าเทอมย่อมเยาที่สุดในกลุ่ม 3 ภาษา',
    foreignPassportRatio:'~20%',chineseStudentRatio:'~40%',avgClassSize:22,
    teacherStudentRatio:'1:11',nativeEnglishTeachers:true,teacherAccent:'Mixed',
    avgTeacherTenure:'3-5 ปี',parentPraise:['ค่าเทอมถูกมาก 3 ภาษา','Chinese pathway แข็ง','American curriculum'],
    shadow:'มี EAL Support',youtime:'Advisory + Student council',extra:'Chinese cultural arts, Sports, Music, Technology'},

  {id:30,name:'Bromsgrove International School Thailand',short:'Bromsgrove',flag:'\u{1F1EC}\u{1F1E7}\u{1F1E8}\u{1F1F3}',cur:'igcse',curL:'IGCSE + A-Level + Chinese',
    loc:'minburi',city:'bangkok',locL:'มีนบุรี',lat:13.8100,lng:100.7200,
    tMin:300000,tMax:550000,ls:['visual','readwrite'],
    web:'https://www.bromsgrove.ac.th',mq:'Bromsgrove+International+School+Thailand',
    efScore:7,efNote:'British + Chinese intensive = structured bilingual EF',phone:'+66 2 989 4873',
    parentFit:{authoritative:8,authoritarian:9,permissive:6,neglectful:5},
    track:{topUni:['UK universities','Chinese universities','Thai universities'],src:'bromsgrove.ac.th'},
    desc:'British + Chinese intensive programme',
    pros:['Bromsgrove UK brand','Chinese intensive track','campus ใหญ่'],tags:['trilingual','igcse','chinese','british'],
    establishedYear:2016,usp:'Bromsgrove UK 500+ ปี + Chinese intensive / British + จีน',
    foreignPassportRatio:'~25%',chineseStudentRatio:'~35%',avgClassSize:20,
    teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'British',
    avgTeacherTenure:'3-5 ปี',parentPraise:['British + Chinese เข้มข้น','Bromsgrove UK brand','Campus ใหญ่'],
    shadow:'มี SEN + EAL Support',youtime:'House System + Pastoral Care',extra:'กีฬา 20+ ชนิด, Chinese cultural activities, Music, Drama'},

  // ─── New International Schools (161-165) ───

  {id:161,name:'The Newton International School',short:'Newton',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'pathumwan',city:'bangkok',locL:'ปทุมวัน (สยามสแควร์)',lat:13.7449,lng:100.5326,
    tMin:300000,tMax:350000,ls:['readwrite','visual'],
    web:'https://newton.ac.th',mq:'Newton+International+School+Siam+Square+Bangkok',
    efScore:6,efNote:'IGCSE + A-Level / Dual cert: Thai + Pearson HND / Partners: U of Essex, Oxford Brookes',phone:'',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['University of Essex','Oxford Brookes University'],note:'IGCSE + A-Level + BTEC HND / Dual cert Thai + UK / ใจกลางสยาม',src:'newton.ac.th'},
    desc:'IGCSE/A-Level ใจกลางสยาม ค่าเทอมเข้าถึงง่าย / Dual cert Thai + Pearson HND',
    pros:['ค่าเทอมเข้าถึงง่าย ~300K','ทำเลใจกลางสยามสแควร์','Dual cert Thai + Pearson HND','Partners มหาวิทยาลัย UK'],tags:['igcse','a-level','affordable','urban','btec'],
    usp:'IGCSE/A-Level ใจกลางสยาม + Dual cert Thai/UK + ค่าเทอมเริ่ม 300K',
    nativeEnglishTeachers:true,teacherAccent:'British',
    shadow:'มี EAL Support',youtime:'Pastoral Care',extra:'BTEC, Business, Computing, Art'},

  {id:162,name:'Kincaid International School of Bangkok',short:'Kincaid',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'US + IB DP',
    loc:'prawet',city:'bangkok',locL:'ประเวศ (พัฒนาการ)',lat:13.6920,lng:100.6450,
    tMin:190000,tMax:300000,ls:['visual','kinesthetic'],
    web:'https://kincaidbangkok.com',mq:'Kincaid+International+School+Bangkok',
    efScore:6,efNote:'US Common Core + NGSS (Primary/Middle) + IB DP (Years 11-12) / ค่าเทอมต่ำที่สุด',phone:'',
    parentFit:{authoritative:7,authoritarian:6,permissive:8,neglectful:6},
    track:{note:'Est. 2001 — US Common Core + NGSS + IB DP / ค่าเทอมต่ำสุดระดับนานาชาติ',src:'kincaidbangkok.com'},
    desc:'US + IB DP ค่าเทอมต่ำสุดระดับนานาชาติ ~190K',
    pros:['ค่าเทอมต่ำสุดระดับ IB ~190K','IB DP ม.ปลาย','US Common Core + NGSS','Est. 2001 ประสบการณ์ 24 ปี'],tags:['ib-dp','us-curriculum','affordable','east-bangkok'],
    establishedYear:2001,usp:'IB DP + US Common Core ค่าเทอมต่ำที่สุดในกลุ่ม International ~190K',
    avgClassSize:20,teacherStudentRatio:'1:10',nativeEnglishTeachers:true,teacherAccent:'American',
    shadow:'มี ESL Support',youtime:'Advisory + Student council',extra:'Sports, Music, Art, Technology, Community Service'},

  {id:163,name:'Crest School Bangkok',short:'Crest',flag:'\u{1F1E6}\u{1F1FA}',cur:'igcse',curL:'Australian Career-based',
    loc:'pathumwan',city:'bangkok',locL:'ปทุมวัน (MBK Tower)',lat:13.7445,lng:100.5298,
    tMin:355000,tMax:355000,ls:['readwrite','kinesthetic'],
    web:'https://www.crestschool.ac.th',mq:'Crest+School+Bangkok+MBK+Tower',
    efScore:6,efNote:'Australian secondary / 4 Career pathways: Medical/Engineering/Business/Social / Dual diploma Thai + Australian',phone:'',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{note:'Australian career-based / 4 สาย: Medical, Engineering, Business, Social Science / Dual diploma Thai + Australian',src:'crestschool.ac.th'},
    desc:'Australian career-based 4 สาย: แพทย์/วิศวะ/ธุรกิจ/สังคม / Dual diploma',
    pros:['4 Career pathways เลือกได้','Dual diploma Thai + Australian','ทำเลใจกลาง MBK','ค่าเทอม 355K flat'],tags:['australian','career-pathway','medical-track','dual-diploma'],
    usp:'Australian career-based 4 สาย + Dual diploma / ปทุมวัน MBK',
    nativeEnglishTeachers:true,teacherAccent:'Australian',
    shadow:'มี Learning Support',youtime:'Career Counselling + Pathway mentoring',extra:'Medical Science, Engineering, Business, Social Science, Sports'},

  {id:164,name:'Wycombe Abbey International School Bangkok',short:'Wycombe Abbey',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + A-Level',
    loc:'bangphli',city:'samut_prakan',locL:'บางพลี (ธนาซิตี้)',lat:13.6300,lng:100.6800,
    tMin:528000,tMax:764000,ls:['visual','readwrite'],
    web:'https://www.wasbkk.com',mq:'Wycombe+Abbey+International+School+Bangkok',
    efScore:8,efNote:'Wycombe Abbey UK heritage / 66-acre campus / Boarding option / Premium British',phone:'',
    parentFit:{authoritative:9,authoritarian:8,permissive:7,neglectful:6},
    track:{note:'เปิด ส.ค. 2026 — Wycombe Abbey UK 130+ ปี / 66-acre campus / Boarding / อดีต VERSO campus',src:'wasbkk.com'},
    desc:'เปิด ส.ค. 2026 — Wycombe Abbey UK 130+ ปี / IGCSE + A-Level + Boarding / 66-acre campus',
    pros:['Wycombe Abbey UK heritage 130+ ปี','66-acre campus','Boarding option','Premium British IGCSE + A-Level'],tags:['upcoming','igcse','a-level','premium','boarding'],upcoming:true,
    establishedYear:2026,usp:'Wycombe Abbey UK 130+ ปี + 66-acre campus + Boarding option / บางพลี',
    avgClassSize:20,teacherStudentRatio:'1:8',nativeEnglishTeachers:true,teacherAccent:'British',
    parentPraise:['Wycombe Abbey brand ระดับโลก','Campus 66 ไร่ ขนาดใหญ่','มี Boarding เลือกได้'],
    shadow:'คาดว่ามี SEN + EAL Support',youtime:'คาดว่า House System + Pastoral Care',extra:'Performing Arts, Music, Drama, Sports, Swimming, Boarding'},

  {id:165,name:'SPGS International School Bangkok',short:'SPGS',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'IGCSE + IB DP',
    loc:'riverside',city:'bangkok',locL:'พระราม 3 (ยานนาวา)',lat:13.6950,lng:100.5280,
    tMin:700000,tMax:1000000,ls:['visual','readwrite','auditory'],
    web:'https://www.spgsibangkok.com',mq:'SPGS+International+School+Bangkok+Rama+3',
    efScore:9,efNote:'St Paul\'s Girls\' School London — 53% Oxbridge/Ivy / Enhanced English + IGCSE + IB DP / Premium',phone:'',
    parentFit:{authoritative:10,authoritarian:8,permissive:7,neglectful:6},
    track:{ibNote:'St Paul\'s London: 53% Oxbridge/Ivy acceptance',topUni:['Oxford','Cambridge','Harvard','MIT','Stanford'],note:'เปิด ส.ค. 2026 — St Paul\'s Girls\' School London partnership / 53% Oxbridge/Ivy / 9.1-acre campus พระราม 3',src:'spgsibangkok.com'},
    desc:'เปิด ส.ค. 2026 — St Paul\'s Girls\' School London / 53% Oxbridge/Ivy / Premium IGCSE + IB DP',
    pros:['St Paul\'s Girls\' School London brand','53% Oxbridge/Ivy acceptance','Enhanced English + IGCSE + IB DP','9.1-acre campus พระราม 3'],tags:['upcoming','igcse','ib','premium','st-pauls'],upcoming:true,
    establishedYear:2026,usp:'St Paul\'s Girls\' School London — 53% Oxbridge/Ivy + IGCSE + IB DP / Premium',
    avgClassSize:18,teacherStudentRatio:'1:7',nativeEnglishTeachers:true,teacherAccent:'British',
    parentPraise:['St Paul\'s London brand ระดับสูงสุด','53% Oxbridge/Ivy','Campus พระราม 3 วิวแม่น้ำ'],
    shadow:'คาดว่ามี SEN + EAL Support',youtime:'คาดว่า House System + Well-being + Leadership',extra:'Performing Arts, Music, Drama, Sports, Swimming, DofE, Oxbridge Prep'},

  // ─── Affordable Sukhumvit + North Bangkok (166-170) ───

  {id:166,name:'KPIS International School',short:'KPIS',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'American + AP Capstone',
    loc:'ramintra',city:'bangkok',locL:'รามอินทรา (บางเขน)',lat:13.8588,lng:100.6098,
    tMin:348000,tMax:544000,ls:['visual','readwrite'],
    web:'https://kpis.ac.th',mq:'KPIS+International+School+Bangkok+Ramintra',
    efScore:7,efNote:'American + AP Capstone / WASC accredited since 2009 / Block scheduling 90-min classes',phone:'+66 2 943 7790',
    parentFit:{authoritative:8,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['US universities','Thai universities'],note:'American + AP Capstone Diploma (1 ใน 2 โรงเรียนในไทยที่มี) / WASC accredited / Est. 2005 / Block scheduling',src:'kpis.ac.th'},
    desc:'American + AP Capstone ย่านรามอินทรา / WASC / ค่าเทอม 348K-544K',
    pros:['AP Capstone Diploma (หายาก)','WASC accredited','Block scheduling 90 นาที','ค่าเทอมเหมาะสม','ย่านรามอินทรา'],tags:['american','ap','wasc','north-bangkok','ap-capstone'],
    establishedYear:2005,usp:'American + AP Capstone Diploma / WASC / Block scheduling / รามอินทรา',
    avgClassSize:20,nativeEnglishTeachers:true,teacherAccent:'American',
    parentPraise:['AP Capstone หายาก','WASC accredited','ครูใส่ใจ ห้องเรียนเล็ก'],
    shadow:'มี EAL + Learning Support',youtime:'Study Hall + Internship programme (ม.ปลาย)',extra:'AP Capstone, Music, Sports, Art, Technology'},

  {id:167,name:'Ekamai International School',short:'EIS',flag:'\u{1F1FA}\u{1F1F8}',cur:'us',curL:'American',
    loc:'sukhumvit',city:'bangkok',locL:'เอกมัย (สุขุมวิท 63)',lat:13.7198,lng:100.5853,
    tMin:180000,tMax:200000,ls:['visual','readwrite','kinesthetic'],
    web:'https://www.eis.ac.th',mq:'Ekamai+International+School+Bangkok',
    efScore:6,efNote:'American ค่าเทอมต่ำสุดย่านสุขุมวิท / WASC + AAA / Est. 1946 เก่าแก่ที่สุด / 30+ สัญชาติ',phone:'',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['US universities','Thai universities'],note:'Est. 1946 — International school เก่าแก่ที่สุดแห่งหนึ่งในไทย / WASC + AAA accredited / 30+ nationalities',src:'eis.ac.th'},
    desc:'American ค่าเทอมถูกสุดย่านสุขุมวิท ~180K / WASC / Est. 1946',
    pros:['ค่าเทอมต่ำสุด ~180K (K-G12)','WASC + AAA accredited','Est. 1946 เก่าแก่','30+ สัญชาติ','Non-profit Adventist Christian'],tags:['american','wasc','affordable','christian','sukhumvit','oldest'],
    establishedYear:1946,usp:'American ค่าเทอมถูกสุดย่านสุขุมวิท ~180K / Est. 1946 / WASC + AAA',
    avgClassSize:20,nativeEnglishTeachers:true,teacherAccent:'American',
    parentPraise:['ค่าเทอมถูกมาก','WASC accredited','บรรยากาศอบอุ่น'],
    shadow:'มี ESL Support',youtime:'Advisory + Character development',extra:'Sports, Music, Art, Community Service'},

  {id:168,name:'Modern International School Bangkok',short:'MISB',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'British IGCSE + A-Level',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท 39 (พร้อมพงษ์)',lat:13.7340,lng:100.5690,
    tMin:217000,tMax:307000,ls:['visual','readwrite'],
    web:'https://www.misb.ac.th',mq:'Modern+International+School+Bangkok+Sukhumvit+39',
    efScore:6,efNote:'British IGCSE/A-Level ค่าเทอมประหยัด ใจกลางพร้อมพงษ์ / Cambridge exam centre / CFBT UK accredited',phone:'',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{note:'British IGCSE + A-Level / Cambridge Exam Centre / CFBT Education Trust UK accredited / Est. 1997',src:'misb.ac.th'},
    desc:'British IGCSE/A-Level ค่าเทอม 217K-307K ใจกลางพร้อมพงษ์',
    pros:['ค่าเทอมต่ำสำหรับ British','Cambridge Exam Centre','ทำเลพร้อมพงษ์ BTS','ห้องเรียนเล็ก 20-25 คน','CFBT UK accredited'],tags:['igcse','a-level','british','affordable','small-class','sukhumvit'],
    establishedYear:1997,usp:'British IGCSE/A-Level ค่าเทอมประหยัดที่สุด ~217K / ใจกลางพร้อมพงษ์',
    avgClassSize:22,nativeEnglishTeachers:true,teacherAccent:'British',
    parentPraise:['ค่าเทอมถูกมากสำหรับ British','ทำเลดีมาก พร้อมพงษ์','ห้องเรียนเล็ก ครูดูแลทั่วถึง'],
    shadow:'มี EAL Support',youtime:'Homeroom + Pastoral Care',extra:'IGCSE, A-Level, Sports, Music, Art'},

  {id:169,name:'Bangkok International Preparatory & Secondary School',short:'Bangkok Prep',flag:'\u{1F1EC}\u{1F1E7}',cur:'igcse',curL:'British IGCSE + A-Level',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท 53 (ทองหล่อ) + สุขุมวิท 77',lat:13.7230,lng:100.5790,
    tMin:280000,tMax:490000,ls:['visual','readwrite','auditory'],
    web:'https://www.bangkokprep.ac.th',mq:'Bangkok+Prep+International+School+Thonglor',
    efScore:7,efNote:'British IGCSE/A-Level / CIS accredited / 2 campus สุขุมวิท / Pastoral care เด่น',phone:'',
    parentFit:{authoritative:8,authoritarian:7,permissive:7,neglectful:6},
    track:{topUni:['UK universities','US universities','Thai universities'],note:'British IGCSE + A-Level / CIS accredited / 2 campuses: Primary (Soi 53), Secondary (T77 Soi 77) / Est. 2003',src:'bangkokprep.ac.th'},
    desc:'British IGCSE/A-Level 2 campus สุขุมวิท / CIS accredited / ค่าเทอม 280K-490K',
    pros:['CIS accredited','2 campus สุขุมวิท (53+77)','British IGCSE + A-Level','Pastoral care เด่น','Sibling 5% discount'],tags:['igcse','a-level','british','thonglor','sukhumvit','cis'],
    establishedYear:2003,usp:'British IGCSE/A-Level 2 campus สุขุมวิท / CIS / Pastoral care',
    avgClassSize:22,nativeEnglishTeachers:true,teacherAccent:'British',
    parentPraise:['Pastoral care ดีมาก','British curriculum เข้มข้น','ทำเลทองหล่อ/อ่อนนุช'],
    shadow:'มี SEN + EAL Support',youtime:'Pastoral Care + House System',extra:'Sports, Swimming, Music, Drama, Art, DofE'},

  {id:170,name:'Australian International School Bangkok',short:'AISB',flag:'\u{1F1E6}\u{1F1FA}',cur:'igcse',curL:'Australian + IGCSE',
    loc:'sukhumvit',city:'bangkok',locL:'สุขุมวิท 20 (อโศก) + สุขุมวิท 31',lat:13.7330,lng:100.5620,
    tMin:295000,tMax:387000,ls:['visual','readwrite','kinesthetic'],
    web:'https://www.australianisb.ac.th',mq:'Australian+International+School+Bangkok',
    efScore:6,efNote:'Australian curriculum + IGCSE / French option / 2 campus Sukhumvit / Intimate school',phone:'',
    parentFit:{authoritative:7,authoritarian:7,permissive:7,neglectful:6},
    track:{note:'Australian + IGCSE / 2 campuses: Early Years (Soi 20), Primary+ (Soi 31) / French option',src:'australianisb.ac.th'},
    desc:'Australian + IGCSE สุขุมวิท 20+31 / French option / ค่าเทอม 295K-387K',
    pros:['Australian curriculum + IGCSE','French language option','2 campus สุขุมวิท 20+31','ค่าเทอมเหมาะสม','โรงเรียนเล็ก intimate'],tags:['australian','igcse','french','affordable','sukhumvit','asok'],
    avgClassSize:18,nativeEnglishTeachers:true,teacherAccent:'Australian',
    parentPraise:['โรงเรียนเล็ก ดูแลทั่วถึง','Australian curriculum ดี','ค่าเทอมเหมาะสม'],
    shadow:'มี Learning Support',youtime:'Pastoral Care',extra:'Sports, Music, Art, French, Swimming'},

  // ═══ THAI TOP SCHOOLS (31-61) ═══

  // สาธิต (Demonstration Schools)
  {id:31,name:'โรงเรียนสาธิตจุฬาลงกรณ์มหาวิทยาลัย',short:'สาธิตจุฬาฯ',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต)',
    loc:'pathumwan',city:'bangkok',locL:'ปทุมวัน',lat:13.7383,lng:100.5313,
    tMin:15000,tMax:25000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:9,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','satit'],desc:'สาธิตอันดับ 1 ของประเทศ สังกัดจุฬาฯ'},

  {id:32,name:'โรงเรียนสาธิต มศว ประสานมิตร',short:'สาธิตประสานมิตร',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต) + SPIP (IGCSE/A-Level)',
    loc:'watthana',city:'bangkok',locL:'วัฒนา (สุขุมวิท 23)',lat:13.7375,lng:100.5620,
    tMin:15000,tMax:528000,ls:['visual','auditory','readwrite','kinesthetic'],
    web:'https://www.spip.in.th',mq:'สาธิต+มศว+ประสานมิตร+Prasarnmit',
    efScore:9,efNote:'สาธิตชั้นนำ แข่งขันสูงสุด 23:1 / มี SPIP (IGCSE+A-Level) / PPiP (IPC British)',
    parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','UK universities'],note:'สาธิต Coed แห่งแรกของไทย / SPIP: Cambridge IGCSE+A-Level (est. 2010) / PPiP: IPC British / Trilingual Plus+ / แข่งขัน มัธยม 23:1',src:'spip.in.th'},
    desc:'สาธิตชื่อดัง มศว — มี SPIP (IGCSE+A-Level) + PPiP (IPC British) + Trilingual / แข่งขัน 23:1',
    pros:['สาธิตอันดับต้นๆ ของไทย','SPIP international (IGCSE+A-Level)','PPiP British primary (IPC)','Trilingual Plus+','ทำเลสุขุมวิท 23'],tags:['thai_top','satit','spip','igcse','competitive'],
    establishedYear:1953,usp:'สาธิต Coed แห่งแรกของไทย / SPIP IGCSE+A-Level + PPiP IPC + Trilingual / สุขุมวิท 23',
    competitionRate:'23:1',avgClassSize:30,
    parentPraise:['สาธิตชื่อดังที่สุด','SPIP international programme ดี','ทำเลสุขุมวิท'],
    shadow:'มี Learning Support',youtime:'Homeroom advisory',extra:'กีฬา, ดนตรี, ศิลปะ, STEM, 48 วิชาเอก'},

  {id:33,name:'โรงเรียนสาธิต มศว ปทุมวัน',short:'สาธิตปทุมวัน',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต)',
    loc:'pathumwan',city:'bangkok',locL:'ปทุมวัน',lat:13.7405,lng:100.5286,
    tMin:15000,tMax:20000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:9,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','satit'],desc:'สาธิตปทุมวัน ม.ปลายชื่อดัง'},

  {id:34,name:'โรงเรียนสาธิตเกษตร',short:'สาธิตเกษตร',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต)',
    loc:'chatuchak',city:'bangkok',locL:'จตุจักร',lat:13.8478,lng:100.5696,
    tMin:15000,tMax:20000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:9,authoritarian:8,permissive:6,neglectful:4},
    track:{topUni:['เกษตรศาสตร์','จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','satit'],desc:'สาธิต มก. บางเขน'},

  {id:35,name:'โรงเรียนสาธิต มธ. ลำปาง/รังสิต',short:'สาธิตธรรมศาสตร์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต)',
    loc:'klong_luang',city:'pathumthani',locL:'คลองหลวง ปทุมธานี',lat:14.0725,lng:100.5990,
    tMin:25000,tMax:40000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:9,authoritarian:7,permissive:6,neglectful:4},
    track:{topUni:['ธรรมศาสตร์','จุฬาฯ','มหิดล']},
    tags:['thai_top','satit'],desc:'สาธิตธรรมศาสตร์ เน้นคิดวิเคราะห์'},

  // รัฐบาลชั้นนำ (Top Government Schools)
  {id:36,name:'โรงเรียนเตรียมอุดมศึกษา',short:'เตรียมอุดม',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'pathumwan',city:'bangkok',locL:'ปทุมวัน',lat:13.7394,lng:100.5294,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:10,parentFit:{authoritative:9,authoritarian:9,permissive:4,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์'],medical:'สอบเข้าแพทย์สูงสุดในประเทศ ~200 คน/ปี (2024)'},
    tags:['thai_top','government','elite'],desc:'อันดับ 1 ม.ปลายรัฐบาล สอบเข้าแพทย์สูงสุด'},

  {id:37,name:'โรงเรียนสวนกุหลาบวิทยาลัย',short:'สวนกุหลาบ',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'phranakhon',city:'bangkok',locL:'พระนคร',lat:13.7527,lng:100.5012,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:9,parentFit:{authoritative:9,authoritarian:9,permissive:4,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government','boys'],desc:'ชายล้วนชื่อดัง เก่าแก่ที่สุดของไทย'},

  {id:38,name:'โรงเรียนบดินทรเดชา (สิงห์ สิงหเสนี)',short:'บดินทรเดชา',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'wangthonglang',city:'bangkok',locL:'วังทองหลาง',lat:13.7721,lng:100.6055,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:9,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์'],medical:'สอบเข้าแพทย์ ~30-50 คน/ปี (2024)'},
    tags:['thai_top','government'],desc:'ม.ปลายชั้นนำฝั่งตะวันออก'},

  {id:39,name:'โรงเรียนเทพศิรินทร์',short:'เทพศิรินทร์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'pomprap',city:'bangkok',locL:'ป้อมปราบฯ',lat:13.7512,lng:100.5134,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:9,authoritarian:9,permissive:4,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government','boys'],desc:'ชายล้วนชั้นนำ สังกัดกรมพระศึกษาธิการ'},

  {id:40,name:'โรงเรียนสามเสนวิทยาลัย',short:'สามเสน',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'dusit',city:'bangkok',locL:'ดุสิต',lat:13.7840,lng:100.5175,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:9,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์'],medical:true},
    tags:['thai_top','government'],desc:'ม.ปลาย สอบเข้าแพทย์สูง'},

  {id:41,name:'โรงเรียนหอวัง',short:'หอวัง',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'chatuchak',city:'bangkok',locL:'จตุจักร',lat:13.8148,lng:100.5650,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'สหศึกษา ย่านจตุจักร'},

  {id:42,name:'โรงเรียนสตรีวิทยา',short:'สตรีวิทยา',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'phranakhon',city:'bangkok',locL:'พระนคร',lat:13.7581,lng:100.5041,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:9,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์'],medical:true},
    tags:['thai_top','government','girls'],desc:'หญิงล้วนชั้นนำ สอบเข้าแพทย์สูง'},

  {id:43,name:'โรงเรียนโยธินบูรณะ',short:'โยธินบูรณะ',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'bangsue',city:'bangkok',locL:'บางซื่อ',lat:13.8165,lng:100.5335,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'สหศึกษา ย่านบางซื่อ'},

  {id:44,name:'โรงเรียนราชินี',short:'ราชินี',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'phranakhon',city:'bangkok',locL:'พระนคร',lat:13.7454,lng:100.4956,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government','girls'],desc:'หญิงล้วน ริมน้ำเจ้าพระยา เก่าแก่'},

  {id:45,name:'โรงเรียนเตรียมอุดมศึกษาพัฒนาการ',short:'เตรียมพัฒนาการ',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'srinakarin',city:'bangkok',locL:'ศรีนครินทร์',lat:13.6919,lng:100.6497,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government'],desc:'สาขาฝั่งศรีนครินทร์'},

  {id:46,name:'โรงเรียนมหิดลวิทยานุสรณ์',short:'มหิดลวิทยานุสรณ์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (วิทย์)',
    loc:'salaya',city:'nakhonpathom',locL:'ศาลายา นครปฐม',lat:13.7942,lng:100.3197,
    tMin:5000,tMax:10000,ls:['visual','readwrite','kinesthetic'],
    efScore:10,parentFit:{authoritative:10,authoritarian:7,permissive:4,neglectful:2},
    track:{topUni:['จุฬาฯ','มหิดล','MIT','Caltech','Stanford'],medical:true},
    tags:['thai_top','government','gifted','stem'],desc:'โรงเรียนวิทยาศาสตร์อันดับ 1 ระดับชาติ'},

  // เอกชนชั้นนำ (Top Private Schools)
  {id:47,name:'โรงเรียนอัสสัมชัญ',short:'อัสสัมชัญ (AC)',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'bangrak',city:'bangkok',locL:'บางรัก',lat:13.7201,lng:100.5233,
    tMin:80000,tMax:150000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:9,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private','boys'],desc:'เอกชนชายล้วนชื่อดัง ย่านบางรัก'},

  {id:48,name:'โรงเรียนกรุงเทพคริสเตียนวิทยาลัย',short:'กรุงเทพคริสเตียน (BCC)',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'sathorn',city:'bangkok',locL:'สาทร',lat:13.7157,lng:100.5259,
    tMin:80000,tMax:140000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:9,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private','boys'],desc:'BCC ชายล้วน ย่านสาทร'},

  {id:49,name:'โรงเรียนเซนต์คาเบรียล',short:'เซนต์คาเบรียล',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'dusit',city:'bangkok',locL:'ดุสิต',lat:13.7767,lng:100.5117,
    tMin:60000,tMax:120000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:9,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private','boys'],desc:'เอกชนชายล้วน สายคาทอลิก'},

  {id:50,name:'โรงเรียนมาแตร์เดอีวิทยาลัย',short:'มาแตร์เดอี',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'sathorn',city:'bangkok',locL:'สาทร',lat:13.7220,lng:100.5310,
    tMin:60000,tMax:120000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:9,authoritarian:8,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์'],medical:true},
    tags:['thai_top','private','girls'],desc:'หญิงล้วน เอกชนชั้นนำ สายคาทอลิก'},

  {id:51,name:'โรงเรียนอัสสัมชัญคอนแวนต์',short:'อัสสัมชัญคอนแวนต์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'silom',city:'bangkok',locL:'สีลม',lat:13.7255,lng:100.5230,
    tMin:60000,tMax:120000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private','girls'],desc:'หญิงล้วน ย่านสีลม สายคาทอลิก'},

  {id:52,name:'โรงเรียนสารสาสน์วิเทศร่มเกล้า',short:'สารสาสน์ร่มเกล้า',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'minburi',city:'bangkok',locL:'มีนบุรี',lat:13.7628,lng:100.7195,
    tMin:100000,tMax:200000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:7,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:5},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private'],desc:'เครือสารสาสน์ สาขาร่มเกล้า'},

  {id:53,name:'โรงเรียนสารสาสน์วิเทศสุวรรณภูมิ',short:'สารสาสน์สุวรรณภูมิ',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (เอกชน)',
    loc:'bangna',city:'bangkok',locL:'บางนา',lat:13.6457,lng:100.6872,
    tMin:100000,tMax:200000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:7,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:5},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','private'],desc:'เครือสารสาสน์ ย่านบางนา'},

  // ปริมณฑล (Surrounding Provinces)
  {id:54,name:'โรงเรียนสวนกุหลาบวิทยาลัย นนทบุรี',short:'สวนกุหลาบ นนท์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'nonthaburi',city:'nonthaburi',locL:'นนทบุรี',lat:13.8605,lng:100.4752,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'สวนกุหลาบ สาขานนทบุรี'},

  {id:55,name:'โรงเรียนนวมินทราชินูทิศ บดินทรเดชา',short:'นวมินทร์ บดินทร์',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'saphansung',city:'bangkok',locL:'สะพานสูง',lat:13.7695,lng:100.6776,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government'],desc:'สาขาบดินทร์ ฝั่งสะพานสูง'},

  {id:56,name:'โรงเรียนเบญจมราชรังสฤษฎิ์',short:'เบญจมราช ฉะเชิงเทรา',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'chachoengsao',city:'chachoengsao',locL:'ฉะเชิงเทรา',lat:13.6898,lng:101.0714,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:9,permissive:5,neglectful:3},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'รัฐบาลชั้นนำ ฉะเชิงเทรา'},

  {id:57,name:'โรงเรียนสาธิตนานาชาติ มหาวิทยาลัยมหิดล',short:'สาธิตนานาชาติ มหิดล',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (สาธิต)',
    loc:'salaya',city:'nakhonpathom',locL:'ศาลายา นครปฐม',lat:13.7945,lng:100.3213,
    tMin:200000,tMax:350000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:9,parentFit:{authoritative:9,authoritarian:7,permissive:6,neglectful:4},
    track:{topUni:['มหิดล','จุฬาฯ','UK','US'],medical:true},
    tags:['thai_top','satit','bilingual'],desc:'สาธิตนานาชาติ หลักสูตร 2 ภาษา สังกัดมหิดล'},

  {id:58,name:'โรงเรียนสตรีวิทยา ๒',short:'สตรีวิทยา ๒',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'ladprao',city:'bangkok',locL:'ลาดพร้าว',lat:13.8056,lng:100.6038,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์']},
    tags:['thai_top','government'],desc:'สหศึกษา ย่านลาดพร้าว'},

  {id:59,name:'โรงเรียนเทพลีลา',short:'เทพลีลา',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'bangkapi',city:'bangkok',locL:'บางกะปิ',lat:13.7653,lng:100.6243,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:7,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'ย่านบางกะปิ/รามคำแหง'},

  {id:60,name:'โรงเรียนสวนกุหลาบวิทยาลัย รังสิต',short:'สวนกุหลาบ รังสิต',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'thanyaburi',city:'pathumthani',locL:'ธัญบุรี ปทุมธานี',lat:14.0287,lng:100.6887,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:5,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','เกษตรศาสตร์']},
    tags:['thai_top','government'],desc:'สวนกุหลาบ สาขารังสิต'},

  {id:61,name:'โรงเรียนราชวินิตบางแก้ว',short:'ราชวินิตบางแก้ว',flag:'\u{1F1F9}\u{1F1ED}',cur:'thai',curL:'ไทยชั้นนำ (รัฐ)',
    loc:'bangphli',city:'samutprakan',locL:'บางพลี สมุทรปราการ',lat:13.6183,lng:100.6617,
    tMin:3000,tMax:6000,ls:['visual','auditory','readwrite','kinesthetic'],
    efScore:8,parentFit:{authoritative:8,authoritarian:8,permissive:6,neglectful:4},
    track:{topUni:['จุฬาฯ','มหิดล','ธรรมศาสตร์','ลาดกระบัง']},
    tags:['thai_top','government'],desc:'รัฐชั้นนำ ย่านบางพลี/สมุทรปราการ'},

  // ═══ GROUP 1-2: EP + Gifted/Science (62-95) ═══
  ...group1Schools,

  // ═══ GROUP 3: Private Bilingual/EP (96-130) ═══
  ...group3Schools,

  // ═══ GROUP 4-5: Trilingual + Alternative (131-160) ═══
  ...group45Schools,
];

// ─── Admission Calendar Data (researched Mar 2026) ───

export const admissionCalendar: AdmissionCalendarEntry[] = [
  {id:1,name:'Shrewsbury',events:[
    {m:0,label:'Open Day / Tour',note:'นัด tour ได้ตลอดปี'},
    {m:8,label:'Assessment เริ่ม',note:'Assessment ปีถัดไป เริ่ม ก.ย. สมัคร 12 เดือนล่วงหน้า',type:'exam'},
    {m:0,label:'สมัครได้ตลอดปี',note:'ค่าสมัคร 5,000 B / Assessment ตาม age group',type:'apply'}
  ],termStart:'31 ส.ค.',src:'shrewsbury.ac.th'},

  {id:2,name:'Harrow',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'Assessment เมื่อมีที่ว่าง ค่าสมัคร 5,000 B',type:'apply'},
    {m:0,label:'Assessment',note:'นัด assessment เมื่อมีที่ว่าง — Maths, English, Cognitive test, Interview',type:'exam'}
  ],termStart:'ส.ค.',src:'harrowschool.ac.th'},

  {id:3,name:'Bangkok Patana',events:[
    {m:8,label:'เปิดรับสมัคร',note:'Online application เปิด 1 ก.ย.',type:'apply'},
    {m:0,label:'ปิดรับสมัคร 15 ม.ค.',note:'Deadline 15 ม.ค. ปีถัดไป',type:'deadline'},
    {m:1,label:'Assessment + Interview',note:'ก.พ.-มี.ค. สัมภาษณ์ + ทดสอบ',type:'exam'},
    {m:3,label:'ประกาศผล',note:'เม.ย. แจ้งผล / Deposit 50,000 B',type:'result'}
  ],termStart:'ส.ค.',src:'patana.ac.th'},

  {id:4,name:'ISB',events:[
    {m:8,label:'เปิดรับสมัคร 15 ก.ย.',note:'Application opens Sep 15',type:'apply'},
    {m:0,label:'Deadline (Thai) 15 ม.ค.',note:'Thai passport holders: deadline 15 ม.ค.',type:'deadline'},
    {m:1,label:'Complete App Due 1 ก.พ.',note:'เอกสารครบ 1 ก.พ.',type:'deadline'},
    {m:1,label:'Assessment',note:'MAP test, English proficiency, Interview',type:'exam'},
    {m:3,label:'ประกาศผล (ก่อนสงกรานต์)',note:'Acceptance letter ก่อน Songkran',type:'result'},
    {m:0,label:'Expat/Dual: Rolling',note:'พาสปอร์ตต่างชาติ สมัครได้ตลอดปี',type:'apply'}
  ],termStart:'ส.ค.',src:'isb.ac.th'},

  {id:5,name:'KIS',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'รับนร.ตลอดปี ลำดับตามช่วงสมัคร',type:'apply'},
    {m:0,label:'Assessment + Interview',note:'1-2 สัปดาห์หลังสมัครได้ผล',type:'exam'},
    {m:0,label:'หมายเหตุ',note:'G11 late / G12 ไม่รับสมัคร (IB DP)',type:'info'}
  ],termStart:'ส.ค.',src:'kis.ac.th'},

  {id:6,name:'NIST',events:[
    {m:8,label:'เปิดรับสมัคร ก.ย.',note:'Online application เปิด ก.ย.',type:'apply'},
    {m:11,label:'Deadline กลาง ธ.ค.',note:'อยู่ในกรุงเทพ: ส่งก่อนกลาง ธ.ค.',type:'deadline'},
    {m:0,label:'ต่างประเทศ: ตลอดปี',note:'ย้ายจากต่างประเทศ / กลางปี สมัครได้',type:'apply'}
  ],termStart:'ส.ค.',src:'nist.ac.th'},

  {id:7,name:'Ruamrudee (RIS)',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'ค่าสมัคร 5,000 B',type:'apply'},
    {m:0,label:'Assessment',note:'Pre-K: Developmental screening / KG-G1: W-APT / G2-12: MAP Reading+Math + Writing',type:'exam'}
  ],termStart:'ส.ค.',src:'rism.ac.th'},

  {id:8,name:'St. Andrews 107',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'Non-selective school รับตลอดปี',type:'apply'},
    {m:0,label:'Assessment',note:'ตามระดับชั้น',type:'exam'}
  ],termStart:'ส.ค.',src:'standrewssukhumvit.com'},

  {id:9,name:'VERSO',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'Admissions Office จ.-ศ. 7:00-17:00, ส. 9:00-13:00',type:'apply'},
    {m:0,label:'Open House',note:'นัดเยี่ยมชมได้ตลอด (virtual/on-site)',type:'openday'},
    {m:0,label:'ผลภายใน 1 สัปดาห์',note:'แจ้งผลหลังส่ง application + assessment',type:'result'}
  ],termStart:'ส.ค.',src:'verso.ac.th'},

  {id:10,name:'Wellington',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'ค่าสมัคร 5,000 B',type:'apply'},
    {m:0,label:'Assessment',note:'KS2+: CAT4 Cognitive test + Creative writing + Interview',type:'exam'},
    {m:0,label:'Remote assessment',note:'ต่างประเทศสอบ online ได้',type:'exam'}
  ],termStart:'ส.ค.',src:'wellingtoncollege.ac.th'},

  {id:11,name:"Regent's",events:[
    {m:2,label:'Open Day มี.ค. 2026',note:'3, 6, 19 มี.ค. 2026',type:'openday'},
    {m:0,label:'สมัครได้ตลอดปี',note:'Non-selective / Assessment ตามระดับชั้น',type:'apply'}
  ],termStart:'ส.ค.',src:'regents.ac.th'},

  {id:12,name:'Brighton College',events:[
    {m:1,label:'Open House EY 28 ก.พ.',note:'Early Years Open House 28 ก.พ. 2026',type:'openday'},
    {m:2,label:'Open House Prep/Sr 14 มี.ค.',note:'Prep & Senior 14 มี.ค. 2026',type:'openday'},
    {m:2,label:'Open House 24 มี.ค.',note:'Prep & Senior 24 มี.ค. 2026',type:'openday'},
    {m:0,label:'Selective school',note:'ค่าสมัคร 5,000 B / Admission 200,000 B / Deposit 150,000 B',type:'exam'}
  ],termStart:'ส.ค.',src:'brightoncollege.ac.th'},

  {id:13,name:'Anglo Singapore',events:[
    {m:2,label:'Open House มี.ค.',note:'Open House ปีละ 2 ครั้ง (มี.ค. + พ.ย.)',type:'openday'},
    {m:10,label:'Open House พ.ย.',note:'Open House ครั้งที่ 2',type:'openday'},
    {m:0,label:'Assessment',note:'Entrance assessment + Trial lessons',type:'exam'}
  ],termStart:'ส.ค.',src:'anglosingapore.ac.th'},

  {id:14,name:'ICS',events:[
    {m:9,label:'เปิดรับสมัคร 1 ต.ค.',note:'Application เปิด 1 ต.ค.',type:'apply'},
    {m:11,label:'Deadline 1 ธ.ค.',note:'ปิดรับสมัคร 1 ธ.ค.',type:'deadline'},
    {m:0,label:'International: ตลอดปี',note:'ครอบครัวต่างชาติ email admissions@ics.ac.th',type:'apply'}
  ],termStart:'ส.ค.',src:'ics.ac.th'},

  {id:15,name:'Wells',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'ห้องเรียนเล็ก รับตลอดปี',type:'apply'}
  ],termStart:'ส.ค.',src:'wells.ac.th'},

  {id:16,name:'Lycee Francais',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'French Bac system / ติดต่อโรงเรียนโดยตรง',type:'apply'}
  ],termStart:'ก.ย.',src:'lfib.ac.th'},

  {id:17,name:'Concordian',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'American AP curriculum',type:'apply'}
  ],termStart:'ส.ค.',src:'concordian.ac.th'},

  {id:18,name:'Traill',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'All year round admissions / แนะนำ tour ก่อนสมัคร',type:'apply'},
    {m:0,label:'Assessment',note:'Reading + Writing + Interview / ผลใน 48 ชม.',type:'exam'}
  ],termStart:'ส.ค.',src:'traillschool.com'},

  {id:19,name:'Garden',events:[
    {m:0,label:'Open Day',note:'Open Day ต้นปี 2026',type:'openday'},
    {m:0,label:'Assessment',note:'EY: Readiness check / Y7+: Entrance exam + Interview',type:'exam'}
  ],termStart:'ส.ค.',src:'gardenbangkok.com'},

  {id:20,name:'Shrewsbury HQP',events:[
    {m:0,label:'สมัครได้ตลอดปี',note:'Bilingual EN/TH / ใกล้เต็ม (เปิด ส.ค. 2025)',type:'apply'},
    {m:0,label:'Assessment',note:'Shrewsbury DNA assessment process',type:'exam'}
  ],termStart:'ส.ค.',src:'shrewsbury.ac.th'},

  // Thai schools admission calendar
  {id:31,name:'สาธิตจุฬาฯ',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:9,label:'Open House',note:'Open House ต.ค.',type:'openday'}
  ],termStart:'พ.ค.',src:'satit.chula.ac.th'},

  {id:32,name:'สาธิตประสานมิตร',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'satit.prasarnmit.ac.th'},

  {id:33,name:'สาธิตปทุมวัน',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'}
  ],termStart:'พ.ค.',src:'satit.tu.ac.th'},

  {id:34,name:'สาธิตเกษตร',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'satit.kasetsart.ac.th'},

  {id:35,name:'สาธิตธรรมศาสตร์',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'satit.tu.ac.th'},

  {id:36,name:'เตรียมอุดม',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'},
    {m:1,label:'เปิดรับสมัคร',note:'เปิดรับสมัคร ก.พ.',type:'apply'}
  ],termStart:'พ.ค.',src:'triamudom.ac.th'},

  {id:37,name:'สวนกุหลาบ',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'sawasdee.ac.th'},

  {id:38,name:'บดินทรเดชา',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'boritpattana.ac.th'},

  {id:39,name:'เทพศิรินทร์',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'tepsirin.ac.th'},

  {id:40,name:'สามเสนวิทยาลัย',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'samsen.ac.th'},

  {id:41,name:'หอวัง',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'horwang.ac.th'},

  {id:42,name:'สตรีวิทยา',events:[
    {m:2,label:'สอบเข้า',note:'สอบเข้า มี.ค.',type:'exam'},
    {m:3,label:'ประกาศผล',note:'ประกาศผลสอบ เม.ย.',type:'result'}
  ],termStart:'พ.ค.',src:'striwitaya.ac.th'},

  {id:46,name:'มหิดลวิทยานุสรณ์',events:[
    {m:7,label:'สอบรอบ 1',note:'สอบเข้ารอบ 1 ส.ค.',type:'exam'},
    {m:9,label:'สอบรอบ 2',note:'สอบเข้ารอบ 2 ต.ค.',type:'exam'},
    {m:11,label:'ประกาศผล',note:'ประกาศผลสอบ ธ.ค.',type:'result'}
  ],termStart:'พ.ค.',src:'mahidol.ac.th'},

  {id:47,name:'อัสสัมชัญ',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'assumption.ac.th'},

  {id:48,name:'กรุงเทพคริสเตียน',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'bcc.ac.th'},

  {id:49,name:'เซนต์คาเบรียล',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'},
    {m:10,label:'Open House',note:'Open House พ.ย.',type:'openday'}
  ],termStart:'พ.ค.',src:'stgabriel.ac.th'},

  {id:50,name:'มาแตร์เดอี',events:[
    {m:1,label:'สอบเข้า',note:'สอบเข้า ก.พ.',type:'exam'},
    {m:2,label:'ประกาศผล',note:'ประกาศผลสอบ มี.ค.',type:'result'}
  ],termStart:'พ.ค.',src:'materdei.ac.th'},
];

// ─── Helper lookup maps ───

export const schoolById = new Map(schools.map(s => [s.id, s]));
export const admissionById = new Map(admissionCalendar.map(a => [a.id, a]));

// ─── Filter/option constants ───

export const schoolStyleOptions = [
  { val: 'international', label: 'นานาชาติ' },
  { val: 'bilingual', label: 'สองภาษา' },
  { val: 'trilingual', label: 'สามภาษา' },
  { val: 'montessori', label: 'Montessori / ทางเลือก' },
  { val: 'thai_top', label: 'ไทยชั้นนำ / สาธิต' },
] as const;

export const curriculumOptions = [
  { val: 'ib', label: 'IB (International Baccalaureate)' },
  { val: 'igcse', label: 'IGCSE / A-Level (British)' },
  { val: 'us', label: 'American (AP)' },
  { val: 'bilingual', label: 'Bilingual' },
  { val: 'french', label: 'French Bac' },
  { val: 'montessori', label: 'Montessori / Alternative' },
  { val: 'trilingual', label: 'Trilingual (3 ภาษา)' },
] as const;

export const learningStyleOptions = [
  { val: 'visual', label: 'Visual (เห็นภาพ)' },
  { val: 'auditory', label: 'Auditory (ฟัง)' },
  { val: 'readwrite', label: 'Read/Write (อ่าน-เขียน)' },
  { val: 'kinesthetic', label: 'Kinesthetic (ลงมือทำ)' },
] as const;

// ─── Grade naming systems ───

export const gradeNames: Record<string, { levels: string[]; ages: string[] }> = {
  british: {
    levels: ['Nursery','EY1','EY2','Y1','Y2','Y3','Y4','Y5','Y6','Y7','Y8','Y9','Y10','Y11','Y12','Y13'],
    ages:   ['2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18'],
  },
  american: {
    levels: ['Pre-K3','Pre-K4','KG','G1','G2','G3','G4','G5','G6','G7','G8','G9','G10','G11','G12'],
    ages:   ['2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17'],
  },
  ib: {
    levels: ['Nursery','KG1','KG2','G1','G2','G3','G4','G5','G6','G7','G8','G9','G10(MYP5)','G11(DP1)','G12(DP2)'],
    ages:   ['2-3','3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17'],
  },
  thai: {
    levels: ['อ.1','อ.2','อ.3','ป.1','ป.2','ป.3','ป.4','ป.5','ป.6','ม.1','ม.2','ม.3','ม.4','ม.5','ม.6'],
    ages:   ['3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18'],
  },
  french: {
    levels: ['PS','MS','GS','CP','CE1','CE2','CM1','CM2','6eme','5eme','4eme','3eme','2nde','1ere','Terminale'],
    ages:   ['3-4','4-5','5-6','6-7','7-8','8-9','9-10','10-11','11-12','12-13','13-14','14-15','15-16','16-17','17-18'],
  },
};

export const schoolGradeSystem: Record<number, string> = {
  1:'british',2:'british',3:'british',4:'american',5:'ib',6:'ib',
  7:'british',8:'british',9:'british',10:'british',11:'american',
  12:'american',13:'ib',14:'british',15:'american',16:'french',
  17:'american',18:'british',19:'british',20:'british',
  21:'british',22:'british',23:'ib',24:'british',25:'ib',26:'british',
  27:'british',28:'british',29:'american',30:'british',
};
