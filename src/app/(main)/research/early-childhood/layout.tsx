import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Early Childhood Investment: The Highest ROI in Your Child's Life | ลงทุนปฐมวัย — SchoolFinder",
  description:
    "ลงทุนปฐมวัย ผลตอบแทนสูงที่สุดในชีวิตลูก: Perry Preschool ROI 7-10%, Heckman Curve, ABC/CARE program — งานวิจัย 40+ ปี พิสูจน์ว่าการศึกษาปฐมวัยคุ้มค่าที่สุด พร้อมแนวทางเลือกเนิร์สเซอรี่และอนุบาลในไทย",
  keywords: [
    "early childhood",
    "Heckman",
    "Perry Preschool",
    "ROI",
    "ปฐมวัย",
    "เนิร์สเซอรี่",
    "อนุบาล",
    "ลงทุนการศึกษา",
    "Heckman Curve",
    "ABC CARE program",
    "child development",
    "preschool investment",
  ],
  openGraph: {
    title: "ลงทุนปฐมวัย — ผลตอบแทนสูงที่สุดในชีวิตลูก",
    description:
      "Perry Preschool ROI 7-10%, Heckman Curve, ABC/CARE — 40+ years of evidence for early childhood investment.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Early Childhood Investment: The Highest ROI in Your Child's Life",
    description:
      "Perry Preschool ROI 7-10%, Heckman Curve, ABC/CARE program — ลงทุนปฐมวัย ผลตอบแทนสูงที่สุด",
  },
  alternates: {
    canonical: "/research/early-childhood",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
