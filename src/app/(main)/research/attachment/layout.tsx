import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Secure Attachment Theory & Child Development | ทฤษฎีความผูกพันที่มั่นคง — SchoolFinder",
  description:
    "ทฤษฎีความผูกพัน (Attachment Theory) ของ Bowlby & Ainsworth: 4 แบบความผูกพัน, Strange Situation, meta-analysis ผลต่อพัฒนาการ และแนวทางเลือกเนิร์สเซอรี่ที่ส่งเสริม secure attachment",
  keywords: [
    "ทฤษฎีความผูกพัน",
    "attachment theory",
    "secure attachment",
    "Bowlby",
    "Ainsworth",
    "พัฒนาการเด็ก",
    "เลือกเนิร์สเซอรี่",
    "ความสัมพันธ์แม่ลูก",
    "Strange Situation",
    "child development",
    "nursery selection",
  ],
  openGraph: {
    title: "Secure Attachment — ทฤษฎีความผูกพันที่มั่นคง",
    description:
      "Bowlby & Ainsworth attachment theory: 4 styles, meta-analysis evidence, and school selection guidance.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Attachment Theory & Child Development",
    description:
      "ทฤษฎี Bowlby & Ainsworth: 4 attachment styles, meta-analysis (Groh 2017, Fearon 2010) และแนวทางเลือกโรงเรียน",
  },
  alternates: {
    canonical: "/research/attachment",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
