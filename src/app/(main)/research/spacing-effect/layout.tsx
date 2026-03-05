import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Spacing Effect — ทบทวนเว้นระยะ เรียนน้อยแต่จำนาน | SchoolFinder",
  description:
    "Spacing Effect & Spaced Repetition: Ebbinghaus Forgetting Curve, meta-analysis 254 งานวิจัย (Cepeda 2006), Dunlosky Ranking — เทคนิคทบทวนเว้นระยะที่วิทยาศาสตร์พิสูจน์แล้วว่าได้ผลที่สุด พร้อมแนวทางใช้จริงกับลูก",
  keywords: [
    "spacing effect",
    "distributed practice",
    "spaced repetition",
    "Ebbinghaus",
    "forgetting curve",
    "Dunlosky",
    "การทบทวน",
    "เว้นระยะ",
    "interleaving",
    "study techniques",
    "learning science",
    "เทคนิคการเรียน",
  ],
  openGraph: {
    title: "Spacing Effect — ทบทวนเว้นระยะ เรียนน้อยแต่จำนาน",
    description:
      "Ebbinghaus Forgetting Curve, Cepeda meta-analysis (254 studies), Dunlosky ranking — learn less, remember more.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Spacing Effect: Learn Less, Remember More",
    description:
      "Spacing Effect — ทบทวนเว้นระยะ: Ebbinghaus, Cepeda meta-analysis, Dunlosky ranking และแนวทางใช้จริง",
  },
  alternates: {
    canonical: "/research/spacing-effect",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
