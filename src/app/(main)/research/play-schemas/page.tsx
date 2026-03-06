"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LangProvider";

/* ── Schema definitions ── */
const schemas = [
  {
    icon: "🫧",
    name_th: "Enveloping (ห่อหุ้ม)",
    name_en: "Enveloping",
    desc_th:
      "เด็กชอบห่อ ปิด ซ่อน หรือคลุมสิ่งของด้วยผ้า กระดาษ หรือวัสดุต่างๆ เป็นการเรียนรู้เรื่องขอบเขต การซ่อน-หา และความเข้าใจว่าสิ่งที่มองไม่เห็นยังคงอยู่ (object permanence)",
    desc_en:
      "Children wrap, cover, hide, or enclose objects with cloth, paper, or other materials. This develops understanding of boundaries, hiding/finding, and object permanence — knowing that things still exist even when hidden.",
    activities_th: "เล่นผ้าห่มสร้างบ้าน, ห่อของขวัญ, ทำ burrito ตุ๊กตา, ซ่อนของใต้ผ้า",
    activities_en: "Blanket forts, gift wrapping, doll burritos, hiding objects under cloth",
    color: "var(--color-accent)",
  },
  {
    icon: "⭕",
    name_th: "Enclosing (ล้อมรอบ)",
    name_en: "Enclosing",
    desc_th:
      "เด็กสร้างขอบเขตรอบสิ่งของ เช่น วาดวงกลมรอบรูป ใช้บล็อกล้อมตุ๊กตา หรือสร้างรั้ว ช่วยเรียนรู้เรื่องพื้นที่ ขอบเขต และการจัดหมวดหมู่",
    desc_en:
      "Children create boundaries around objects — drawing circles around pictures, building fences with blocks, or creating pens for toy animals. This develops spatial awareness and categorization skills.",
    activities_th: "ต่อรั้วบล็อก, วาดกรอบ, จัดของในกล่อง/ตะกร้า, สร้างคอกสัตว์",
    activities_en: "Block fences, drawing borders, sorting into baskets/boxes, animal pens",
    color: "var(--color-success)",
  },
  {
    icon: "🔗",
    name_th: "Connecting (เชื่อมต่อ)",
    name_en: "Connecting",
    desc_th:
      "เด็กชอบเชื่อมสิ่งของเข้าด้วยกัน เช่น ต่อราง ร้อยลูกปัด ผูกเชือก ต่อเลโก้ยาวๆ เป็นพื้นฐานของความเข้าใจเรื่องความสัมพันธ์ ลำดับ และโครงสร้าง",
    desc_en:
      "Children join objects together — linking train tracks, threading beads, tying strings, building long LEGO chains. This forms the foundation for understanding relationships, sequences, and structures.",
    activities_th: "ร้อยลูกปัด, ต่อรางรถไฟ, เล่นเลโก้ต่อยาว, ผูกเชือก/โบว์",
    activities_en: "Bead threading, train tracks, long LEGO builds, tying strings/bows",
    color: "#8B5CF6",
  },
  {
    icon: "🌀",
    name_th: "Rotating (หมุน)",
    name_en: "Rotating",
    desc_th:
      "เด็กหลงใหลกับการหมุน — หมุนตัว หมุนล้อ คนน้ำ บิดฝา สังเกตเครื่องซักผ้า การหมุนสอนเรื่องแรง ทิศทาง และวงจร",
    desc_en:
      "Children are fascinated by spinning — spinning themselves, turning wheels, stirring water, twisting lids, watching washing machines. Rotation teaches force, direction, and cycles.",
    activities_th: "คนน้ำ/ทราย, หมุนลูกข่าง, บิดเปิดฝา, ดูเครื่องซักผ้า, วาดวงกลม",
    activities_en: "Stirring water/sand, spinning tops, twisting lids, watching washers, drawing circles",
    color: "var(--color-warning)",
  },
  {
    icon: "🏹",
    name_th: "Trajectory (เส้นทาง/วิถี)",
    name_en: "Trajectory",
    desc_th:
      "เด็กทดลองการเคลื่อนที่ — ขว้าง โยน กลิ้ง เตะ ปล่อยของจากที่สูง เป็นการเรียนรู้ฟิสิกส์พื้นฐาน: แรงโน้มถ่วง ความเร็ว มุม และเหตุ-ผล",
    desc_en:
      "Children experiment with movement — throwing, dropping, rolling, kicking, launching objects from heights. This teaches fundamental physics: gravity, speed, angles, and cause-and-effect.",
    activities_th: "ปล่อยลูกบอลจากทางลาด, ขว้างถุงถั่ว, เตะบอล, เล่นสไลเดอร์",
    activities_en: "Ball ramps, beanbag tossing, kicking balls, slides, water play with tubes",
    color: "var(--color-error)",
  },
  {
    icon: "📐",
    name_th: "Positioning (จัดวาง)",
    name_en: "Positioning",
    desc_th:
      "เด็กจัดเรียงสิ่งของเป็นแถว เป็นรูปแบบ หรือจัดวางอย่างเป็นระเบียบ เป็นพื้นฐานของคณิตศาสตร์: pattern recognition, symmetry, และ spatial reasoning",
    desc_en:
      "Children arrange objects in lines, patterns, or orderly layouts. This is the foundation of mathematics: pattern recognition, symmetry, and spatial reasoning.",
    activities_th: "เรียงของเป็นแถว, จัดรูปแบบสี, Loose parts play, จัดเซ็ตชา/ครัว",
    activities_en: "Lining up objects, color patterns, loose parts play, setting up tea sets",
    color: "#EC4899",
  },
  {
    icon: "🚚",
    name_th: "Transporting (ขนย้าย)",
    name_en: "Transporting",
    desc_th:
      "เด็กขนย้ายสิ่งของจากที่หนึ่งไปอีกที่หนึ่ง — ใส่ตะกร้า เข็นรถ หิ้วถุง ใส่กระเป๋า เป็นการเรียนรู้เรื่องน้ำหนัก ปริมาตร และการวางแผน",
    desc_en:
      "Children move objects from one place to another — filling baskets, pushing carts, carrying bags. This teaches weight, volume, planning, and problem-solving.",
    activities_th: "รถเข็นขนทราย, ตักน้ำถัง, ใส่กระเป๋าเดินทาง, เล่นส่งของ",
    activities_en: "Sand wheelbarrows, water bucket filling, packing suitcases, delivery play",
    color: "#F97316",
  },
  {
    icon: "🎨",
    name_th: "Transformation (เปลี่ยนสภาพ)",
    name_en: "Transformation",
    desc_th:
      "เด็กสนใจกับการเปลี่ยนสภาพสิ่งของ — ผสมสี ผสมแป้งโดว์ ละลายน้ำแข็ง ปั้นดิน เป็นการเรียนรู้เรื่องเคมีพื้นฐาน สถานะของสาร และความเปลี่ยนแปลง",
    desc_en:
      "Children are fascinated by changing materials — mixing colors, kneading dough, melting ice, shaping clay. This teaches basic chemistry, states of matter, and change.",
    activities_th: "ผสมสี, เล่นแป้งโดว์, ละลายน้ำแข็ง, ทำขนม/อาหาร, sensory bin",
    activities_en: "Color mixing, play dough, melting ice, cooking/baking, sensory bins",
    color: "#06B6D4",
  },
];

/* ── FAQs ── */
const faqs = [
  {
    q_th: "Play Schema คืออะไร?",
    q_en: "What are Play Schemas?",
    a_th:
      "Play Schemas คือรูปแบบพฤติกรรมซ้ำๆ ที่เด็กแสดงออกผ่านการเล่น เป็นแรงขับตามธรรมชาติ (natural urges) ที่ช่วยให้เด็กสร้างความเข้าใจเกี่ยวกับโลกรอบตัว นักจิตวิทยาพัฒนาการ Jean Piaget เป็นผู้ริเริ่มทฤษฎีนี้ โดยเชื่อว่าเด็กสร้างความรู้ผ่านการลงมือทำซ้ำจนเชี่ยวชาญ",
    a_en:
      "Play schemas are repeated patterns of behavior that children demonstrate through play. They are natural developmental urges that help children construct understanding of the world. Developmental psychologist Jean Piaget pioneered this theory, believing children build knowledge through repeated hands-on actions until mastery.",
  },
  {
    q_th: "ทำไม Schema สำคัญกับพัฒนาการ?",
    q_en: "Why are schemas important for development?",
    a_th:
      "Schema ช่วยพัฒนา: 1) การคิดเชิงวิทยาศาสตร์ (สมมติฐาน → ทดลอง → สังเกต) 2) ทักษะกล้ามเนื้อมัดเล็ก-ใหญ่ 3) ความเข้าใจเชิงพื้นที่และคณิตศาสตร์ 4) ภาษาและการสื่อสาร 5) Executive Function (การวางแผน, ควบคุมตนเอง) เมื่อเข้าใจ Schema จะช่วยให้ผู้ปกครองสนับสนุนการเล่นได้ตรงจุด แทนที่จะห้ามพฤติกรรมที่ดูเหมือน 'ซน'",
    a_en:
      "Schemas develop: 1) Scientific thinking (hypothesis → experiment → observe) 2) Fine and gross motor skills 3) Spatial and mathematical understanding 4) Language and communication 5) Executive Function (planning, self-regulation). Understanding schemas helps parents support play effectively instead of discouraging behaviors that appear 'naughty'.",
  },
  {
    q_th: "ลูกชอบขว้างของ ควรห้ามไหม?",
    q_en: "My child keeps throwing things — should I stop them?",
    a_th:
      "ไม่ควรห้ามทั้งหมด! การขว้างเป็น Trajectory Schema ซึ่งสำคัญมาก ควร redirect ไปใช้ที่เหมาะสม: ขว้างถุงถั่วใส่ตะกร้า, กลิ้งลูกบอลลงทางลาด, เล่นบอลในสนาม แทนที่จะพูดว่า 'หยุดขว้าง!' ให้พูดว่า 'ไปขว้างที่นี่แทนนะ' (redirect, not restrict)",
    a_en:
      "Don't stop it entirely! Throwing is a Trajectory Schema, which is developmentally crucial. Redirect to appropriate outlets: beanbag tossing into baskets, rolling balls down ramps, playing catch outside. Instead of 'Stop throwing!', say 'Let's throw here instead!' (redirect, not restrict).",
  },
  {
    q_th: "เด็กแสดง Schema หลายอันพร้อมกันได้ไหม?",
    q_en: "Can children show multiple schemas at once?",
    a_th:
      "ได้! เด็กมักแสดง 2-3 Schema พร้อมกัน เช่น ขนบล็อกไปกองตรงมุมห้อง (Transporting + Positioning) หรือห่อตุ๊กตาแล้วหมุน (Enveloping + Rotating) Schema จะมีบางอันเด่นกว่าในช่วงเวลาหนึ่ง แล้วเปลี่ยนไปตามพัฒนาการ",
    a_en:
      "Yes! Children often display 2-3 schemas simultaneously. For example, carrying blocks to a corner and stacking them (Transporting + Positioning), or wrapping a doll and spinning (Enveloping + Rotating). Some schemas will be dominant during certain periods and shift with development.",
  },
];

export default function PlaySchemasPage() {
  const { lang } = useLang();
  const isThai = lang === "th";
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="mb-5 text-center">
        <div className="mb-2 text-[32px]">🧩</div>
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {isThai ? "Play Schemas — รูปแบบการเล่นของเด็ก" : "Play Schemas in Early Childhood"}
        </h2>
        <p className="mt-1 text-[13px] text-[var(--color-text-secondary)]">
          {isThai
            ? "เข้าใจพฤติกรรมซ้ำๆ ของลูก เพื่อสนับสนุนพัฒนาการอย่างตรงจุด"
            : "Understanding repetitive play behaviors to support child development effectively"}
        </p>
      </div>

      {/* Intro card */}
      <div className="mb-4 rounded-2xl bg-[var(--color-text)] p-4 text-white">
        <div className="text-[13px] font-bold">
          {isThai
            ? "💡 เมื่อลูกทำพฤติกรรมซ้ำๆ — นั่นไม่ใช่ 'ซน' แต่คือการเรียนรู้!"
            : "💡 When children repeat behaviors — it's not 'naughty', it's learning!"}
        </div>
        <p className="mt-2 text-[11px] text-white/70">
          {isThai
            ? "Jean Piaget นักจิตวิทยาพัฒนาการ ค้นพบว่าเด็กเรียนรู้โลกผ่าน 'Schema' — รูปแบบพฤติกรรมที่ทำซ้ำจนเข้าใจ เหมือนนักวิทยาศาสตร์ที่ทดลองซ้ำแล้วซ้ำเล่า"
            : "Developmental psychologist Jean Piaget discovered that children learn about the world through 'Schemas' — behavioral patterns repeated until understood, like scientists running experiments again and again."}
        </p>
      </div>

      {/* 8 Schemas */}
      <div className="space-y-3">
        {schemas.map((s, i) => (
          <div key={i} className="rounded-2xl bg-[var(--color-surface)] p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-[20px]"
                style={{ backgroundColor: `${s.color}15` }}
              >
                {s.icon}
              </div>
              <div className="flex-1">
                <div className="text-[14px] font-extrabold" style={{ color: s.color }}>
                  {isThai ? s.name_th : s.name_en}
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
              {isThai ? s.desc_th : s.desc_en}
            </p>
            <div className="mt-2 rounded-xl bg-white p-2.5">
              <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {isThai ? "🎮 กิจกรรมแนะนำ" : "🎮 Suggested Activities"}
              </div>
              <div className="mt-1 text-[11px] text-[var(--color-text)]">
                {isThai ? s.activities_th : s.activities_en}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Parenting tip */}
      <div className="mt-4 rounded-2xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4">
        <div className="text-[12px] font-bold text-[var(--color-accent)]">
          {isThai ? "🌟 เคล็ดลับสำหรับพ่อแม่" : "🌟 Tips for Parents"}
        </div>
        <ul className="mt-2 space-y-1.5 text-[11px] text-[var(--color-text-secondary)]">
          <li>
            •{" "}
            {isThai
              ? "สังเกตว่าลูกทำอะไรซ้ำๆ → นั่นคือ Schema ที่กำลังพัฒนา"
              : "Observe what your child does repeatedly → that's their active schema"}
          </li>
          <li>
            •{" "}
            {isThai
              ? "Redirect ไม่ใช่ Restrict — หาทางให้เล่นได้อย่างเหมาะสม"
              : "Redirect, don't restrict — find appropriate outlets for schema play"}
          </li>
          <li>
            •{" "}
            {isThai
              ? "เตรียมวัสดุที่หลากหลาย: กล่อง ผ้า ตะกร้า บล็อก ทราย น้ำ"
              : "Provide diverse materials: boxes, fabric, baskets, blocks, sand, water"}
          </li>
          <li>
            •{" "}
            {isThai
              ? "อย่ากังวลถ้าลูก 'เลอะ' — Transformation Schema ต้องการโอกาสทดลอง"
              : "Don't worry about mess — Transformation Schema needs experimentation opportunities"}
          </li>
          <li>
            •{" "}
            {isThai
              ? "แจ้งครูที่โรงเรียนด้วย — ครูที่เข้าใจ Schema จะสนับสนุนการเรียนรู้ได้ดีขึ้น"
              : "Share with your child's teacher — educators who understand schemas support learning better"}
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="mt-4 space-y-2">
        <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
          {isThai ? "❓ คำถามที่พบบ่อย" : "❓ Frequently Asked Questions"}
        </div>
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl bg-[var(--color-surface)] overflow-hidden">
            <button
              className="flex w-full items-center justify-between p-4 text-left"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span className="flex-1 text-[13px] font-bold pr-2">
                {isThai ? faq.q_th : faq.q_en}
              </span>
              <span className="text-[16px] text-[var(--color-text-secondary)]">
                {openFaq === i ? "−" : "+"}
              </span>
            </button>
            {openFaq === i && (
              <div className="px-4 pb-4">
                <p className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                  {isThai ? faq.a_th : faq.a_en}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Source */}
      <div className="mt-4 rounded-2xl bg-[var(--color-surface)] p-4 text-center">
        <div className="text-[10px] text-[var(--color-text-secondary)]">
          {isThai
            ? "อ้างอิง: ทฤษฎี Schema ของ Jean Piaget, Growing Kind (2021)"
            : "References: Jean Piaget's Schema Theory, Growing Kind (2021)"}
        </div>
      </div>

      {/* Back */}
      <Link
        href="/"
        className="mt-5 block w-full rounded-xl border border-[var(--color-border)] bg-transparent px-4 py-[15px] text-center text-sm text-[var(--color-text-secondary)] no-underline transition-all active:scale-[0.97]"
      >
        {isThai ? "← กลับหน้าหลัก" : "← Back to Home"}
      </Link>
    </div>
  );
}
