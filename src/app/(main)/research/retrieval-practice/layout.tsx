import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Retrieval Practice — ดึงความจำออกมาใช้ ยิ่งจำได้ดี | Testing Effect | SchoolFinder",
  description:
    "Retrieval Practice คือเทคนิคการเรียนที่ได้ผลสูงสุดจากงานวิจัย Roediger & Karpicke (2006) testing effect, Dunlosky (2013) high utility practice testing, flashcards, self-testing และแนวทางเลือกโรงเรียนที่ส่งเสริมการทดสอบเพื่อการเรียนรู้",
  keywords: [
    "retrieval practice",
    "testing effect",
    "Roediger",
    "Karpicke",
    "flashcards",
    "self-testing",
    "การทดสอบ",
    "ดึงความจำ",
    "เทคนิคการเรียน",
    "Dunlosky",
    "practice testing",
    "spaced retrieval",
    "evidence-based learning",
    "การเรียนรู้ตามหลักฐาน",
  ],
  openGraph: {
    title: "Retrieval Practice — ดึงความจำออกมาใช้ ยิ่งจำได้ดี",
    description:
      "Roediger & Karpicke (2006) testing effect: retrieval 56% vs re-study 42% after 1 week. Dunlosky (2013) rated practice testing as high utility. Evidence-based study techniques.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Retrieval Practice: The Testing Effect That Boosts Learning",
    description:
      "Roediger & Karpicke (2006): retrieval practice yields 56% vs 42% re-study after 1 week. Dunlosky (2013) rated it high utility. Flashcards, self-testing & school selection.",
  },
  alternates: {
    canonical: "/research/retrieval-practice",
  },
};

export default function RetrievalPracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
