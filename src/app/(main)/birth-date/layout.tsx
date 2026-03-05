import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "วันเกิดลูกกำหนดอนาคตการศึกษา — Cutoff Dates & Relative Age Effect | SchoolFinder",
  description:
    "วันเกิดลูกมีผลต่อการสมัครเรียน ซ้ำชั้น ย้ายหลักสูตร — เปรียบเทียบ cutoff dates UK US Singapore IB สาธิตจุฬา สาธิตเกษตร ไทย งานวิจัย Relative Age Effect สอบเข้าแพทย์ตามเดือนเกิด วางแผนคลอด",
  keywords: [
    "วันเกิดลูก เข้าเรียน",
    "cutoff date โรงเรียน",
    "relative age effect",
    "สาธิตจุฬา อายุเข้าเรียน",
    "สาธิตเกษตร สมัครสอบ",
    "birth date school admission Thailand",
    "ย้ายหลักสูตร ซ้ำชั้น",
    "สอบเข้าแพทย์ เดือนเกิด",
    "วางแผนคลอด โรงเรียน",
    "อายุเกณฑ์เข้าเรียน",
    "grade repetition curriculum transfer",
    "UK school cutoff September",
    "Singapore school age January",
    "IB cutoff date",
    "academic redshirting Thailand",
    "Bedard Dhuey 2006",
    "Crawford Dearden Meghir 2010",
  ],
  openGraph: {
    title: "วันเกิดลูกกำหนดอนาคตการศึกษา — Birth Date Effects on School Admission",
    description:
      "เปรียบเทียบ cutoff dates 6 หลักสูตร, Relative Age Effect จากงานวิจัย QJE & PLOS One, การย้ายหลักสูตรไม่ให้ซ้ำชั้น, สอบเข้าแพทย์ตามเดือนเกิด — คู่มือวางแผนการศึกษาจาก SchoolFinder",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "วันเกิดลูก = อนาคตการศึกษา? — Birth Date & School Admission",
    description:
      "Cutoff dates 6 หลักสูตร, Relative Age Effect, ย้ายหลักสูตร, สอบเข้าแพทย์ — วิจัยจาก QJE, IFS, PMC",
  },
  alternates: {
    canonical: "/birth-date",
  },
};

export default function BirthDateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
