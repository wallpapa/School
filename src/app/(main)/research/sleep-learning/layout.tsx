import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "การนอน & การเรียนรู้ — นอนพอ = เรียนดี | Sleep & Learning | SchoolFinder",
  description:
    "การนอนส่งผลต่อผลการเรียนอย่างไร? Meta-analysis Dewald (2010), AAP แนะนำเริ่มเรียน 8:30+, Wahlstrom (2014) delayed start times, circadian rhythm วัยรุ่น, sleep hygiene สำหรับเด็ก และแนวทางเลือกโรงเรียนที่เหมาะกับการนอนของลูก",
  keywords: [
    "sleep",
    "academic performance",
    "school start times",
    "การนอน",
    "ผลการเรียน",
    "เวลาเข้าเรียน",
    "วัยรุ่น",
    "circadian rhythm",
    "sleep hygiene",
    "Dewald",
    "AAP",
    "Wahlstrom",
    "delayed start times",
    "National Sleep Foundation",
    "นอนพอเรียนดี",
  ],
  openGraph: {
    title: "การนอน & การเรียนรู้ — นอนพอ = เรียนดี",
    description:
      "Dewald (2010) meta-analysis: sleep quality strongly predicts academic performance. AAP (2014): schools should start at 8:30 AM+. Sleep needs by age, circadian rhythm & school selection.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sleep & Learning: How Sleep Shapes Academic Performance",
    description:
      "Meta-analysis: sleep quality predicts grades. AAP recommends 8:30 AM+ start. Dewald (2010), Wahlstrom (2014), circadian rhythm science & school selection guidance.",
  },
  alternates: {
    canonical: "/research/sleep-learning",
  },
};

export default function SleepLearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
