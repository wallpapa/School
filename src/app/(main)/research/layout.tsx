import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Timeline — 129 Years of Education & Parenting Research | SchoolFinder",
  description:
    "29 landmark studies from 1897–2026 spanning education, parenting styles, learning science, and IQ research. Evidence-based insights with APA references. By Dr. Waleerat.",
  keywords: [
    "education research timeline",
    "parenting styles research",
    "evidence-based education",
    "Hattie visible learning",
    "Flynn effect",
    "attachment theory",
    "learning styles myth",
    "Montessori research",
    "PISA results",
    "child development research",
    "งานวิจัยการศึกษา",
    "สไตล์การเลี้ยงลูก",
    "พัฒนาการเด็ก",
  ],
  openGraph: {
    title: "Research Timeline — 129 Years of Education & Parenting Research",
    description:
      "29 landmark studies organized in 4 eras: Foundations (1897–1960), Golden Age (1961–1984), Challenges (1990–2010), Digital Debate (2005–2026).",
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Research Timeline — 129 Years of Education Research",
    description: "Evidence behind every school recommendation. 29 studies, 4 eras, 42+ countries.",
  },
  alternates: {
    canonical: "/research",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
