import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "คู่มือเลือกโรงเรียนลูกคนแรก | SchoolFinder",
  description:
    "คู่มือฟรี สำหรับพ่อแม่มือใหม่ ลูกคนแรก — ทำความเข้าใจ EP, สองภาษา, สามภาษา, อินเตอร์, ไทยชั้นนำ, Montessori พร้อมเปรียบเทียบค่าเทอม ช่วยตัดสินใจเลือกโรงเรียนอย่างมั่นใจ",
  keywords: [
    "คู่มือเลือกโรงเรียน",
    "ลูกคนแรก",
    "EP คืออะไร",
    "โรงเรียนสองภาษา",
    "โรงเรียนสามภาษา",
    "โรงเรียนอินเตอร์",
    "ค่าเทอม",
    "เลือกโรงเรียนลูก",
  ],
};

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
