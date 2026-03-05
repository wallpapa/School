import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Authoritative Parenting — เลี้ยงลูกแบบอบอุ่น+มีกรอบ | SchoolFinder",
  description:
    "สไตล์การเลี้ยงลูก 4 แบบของ Baumrind & Maccoby-Martin: Authoritative, Authoritarian, Permissive, Uninvolved — meta-analysis จาก Pinquart (2017) 1,435 งานวิจัย และมุมมองข้ามวัฒนธรรมเอเชีย",
  keywords: [
    "สไตล์การเลี้ยงลูก",
    "authoritative parenting",
    "Baumrind",
    "วินัยเชิงบวก",
    "ผู้ปกครอง",
    "พัฒนาการเด็ก",
    "สไตล์เอเชีย",
    "parenting styles",
    "Maccoby Martin",
    "warmth",
    "behavioral control",
    "discipline",
  ],
  openGraph: {
    title: "Authoritative Parenting — เลี้ยงลูกแบบอบอุ่น+มีกรอบ",
    description:
      "Baumrind parenting styles: 2x2 model, Pinquart meta-analysis of 1,435 studies, and cross-cultural Asian context.",
    type: "article",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Authoritative Parenting: The Evidence-Based Approach",
    description:
      "4 สไตล์การเลี้ยงลูก Baumrind, meta-analysis Pinquart (2017), และบริบทเอเชีย — SchoolFinder",
  },
  alternates: {
    canonical: "/research/authoritative-parenting",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
