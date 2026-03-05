import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School News & Updates — ข่าวอัปเดตโรงเรียน",
  description:
    "Latest school news: acceptance rates, tuition updates, open house dates, exam schedules, result announcements from 61+ schools in Thailand. อัปเดตข่าวโรงเรียนอินเตอร์ สาธิต รัฐบาล เอกชน",
  openGraph: {
    title: "School News & Updates — SchoolFinder",
    description:
      "Live updates on acceptance rates, tuition fees, exam dates, and results from 61+ schools. ข่าวอัปเดตโรงเรียนล่าสุด",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
