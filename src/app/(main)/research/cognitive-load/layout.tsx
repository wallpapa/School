import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Cognitive Load Theory — สมองมี 'ห้องเก็บชั่วคราว' จำกัด | SchoolFinder",
  description:
    "Sweller (1988) Cognitive Load Theory: working memory holds 7±2 items. 3 types of load — intrinsic, extraneous, germane. Worked example effect, expertise reversal, guidance fading. ทฤษฎีภาระทางปัญญากับการเลือกโรงเรียน",
  keywords: [
    "cognitive load theory",
    "working memory",
    "Sweller",
    "worked examples",
    "discovery learning",
    "ทฤษฎีภาระทางปัญญา",
    "CLT",
    "intrinsic load",
    "extraneous load",
    "germane load",
    "expertise reversal effect",
    "guidance fading",
    "Kirschner Sweller Clark",
    "Miller 7 plus minus 2",
    "minimal guidance",
    "หน่วยความจำใช้งาน",
  ],
  openGraph: {
    title: "Cognitive Load Theory — สมองมี 'ห้องเก็บชั่วคราว' จำกัด",
    description:
      "Sweller (1988): working memory = 7±2 items. Kirschner, Sweller & Clark (2006): minimal guidance does not work. Worked examples, expertise reversal, guidance fading — ทฤษฎี CLT กับการเลือกโรงเรียน",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cognitive Load Theory: Why Working Memory Matters for Learning",
    description:
      "Working memory holds 7±2 items. 3 types of cognitive load. Why pure discovery learning fails and worked examples succeed.",
  },
  alternates: {
    canonical: "/research/cognitive-load",
  },
};

export default function CognitiveLoadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
