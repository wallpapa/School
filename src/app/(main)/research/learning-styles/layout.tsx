import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Learning Styles — ตำนานที่ยังไม่มีหลักฐานรองรับ | The Learning Styles Myth | SchoolFinder",
  description:
    "Coffield reviewed 71 learning style models. Pashler found NO evidence for meshing hypothesis. 90% of teachers still believe it. Gardner says MI ≠ Learning Styles. วิจัย VAK VARK debunked — สิ่งที่ได้ผลจริงคือ multiple representations",
  keywords: [
    "learning styles",
    "VAK",
    "VARK",
    "meshing hypothesis",
    "Pashler",
    "Coffield",
    "myths in education",
    "ตำนานการศึกษา",
    "learning styles myth",
    "visual auditory kinesthetic",
    "multiple intelligences",
    "Gardner",
    "Newton Miah 2017",
    "evidence-based teaching",
    "การสอนตามหลักฐาน",
    "สไตล์การเรียนรู้",
  ],
  openGraph: {
    title: "Learning Styles — ตำนานที่ยังไม่มีหลักฐานรองรับ",
    description:
      "Coffield (2004) reviewed 71 models. Pashler (2008) found NO meshing evidence. Newton & Miah (2017): 90% of teachers still believe the myth. What actually works instead?",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Learning Styles Myth — What the Evidence Really Says",
    description:
      "71 models reviewed, 0 evidence for meshing. VAK/VARK debunked by Pashler (2008). What works: multiple representations, not style matching.",
  },
  alternates: {
    canonical: "/research/learning-styles",
  },
};

export default function LearningStylesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
