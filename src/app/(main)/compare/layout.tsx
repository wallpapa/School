import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เปรียบเทียบโรงเรียน & คำนวณค่าเทอม | SchoolFinder",
  description:
    "เปรียบเทียบโรงเรียนแบบ side-by-side พร้อมคำนวณค่าเทอมรวมตลอดการศึกษา K-12 ฟรี ไม่มีค่าใช้จ่าย",
  keywords: "เปรียบเทียบโรงเรียน, ค่าเทอม, คำนวณค่าเรียน, school comparison Thailand",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
