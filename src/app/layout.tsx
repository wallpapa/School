import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { LangProvider } from "@/i18n/LangProvider";
import { FinderProvider } from "@/context/FinderContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
  weight: ["300", "400", "600", "700"],
});

const baseUrl = "https://schoolfinder.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "SchoolFinder by Dr. Waleerat — ค้นหาโรงเรียน อินเตอร์ สาธิต รัฐบาล เอกชน",
    template: "%s | SchoolFinder",
  },
  description:
    "Thailand's #1 evidence-based school comparison platform. 61+ international, demonstration, government & private schools. EF scores, tuition fees, admission calendars, parenting style matching. By Dr. Waleerat (หมอกวาง).",
  keywords: [
    "โรงเรียนอินเตอร์",
    "โรงเรียนสาธิต",
    "international school Thailand",
    "school finder Bangkok",
    "IB school Thailand",
    "British school Bangkok",
    "ค่าเทอมโรงเรียนอินเตอร์",
    "admission calendar",
    "เปรียบเทียบโรงเรียน",
    "SchoolFinder",
    "Dr. Waleerat",
    "หมอกวาง",
    "parenting styles",
    "executive function",
    "education research Thailand",
  ],
  authors: [{ name: "Dr. Waleerat", url: "https://instagram.com/doctorwaleerat" }],
  creator: "Dr. Waleerat (หมอกวาง)",
  publisher: "SchoolFinder by Dr. Waleerat",
  openGraph: {
    type: "website",
    locale: "th_TH",
    alternateLocale: ["en_US", "zh_CN", "ja_JP"],
    siteName: "SchoolFinder by Dr. Waleerat",
    title: "SchoolFinder — ค้นหาโรงเรียนอินเตอร์ สาธิต รัฐบาล เอกชน",
    description:
      "61+ schools. EF scores. Tuition comparison. Evidence-based recommendations backed by 129 years of research. By Dr. Waleerat (หมอกวาง).",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SchoolFinder — Thailand's #1 School Comparison Platform",
    description:
      "61+ schools with EF scores, tuition fees, admission calendars & parenting style matching.",
    creator: "@doctorwaleerat",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    // AI crawler hints
    "ai-content-declaration": "original-research",
    "data-source": "primary",
    "citation-policy": "open-with-attribution",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        {/* ── AI Agent Discovery ── */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM Full Reference" />

        {/* ── Organization JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SchoolFinder by Dr. Waleerat",
              url: baseUrl,
              logo: `${baseUrl}/icon.png`,
              description:
                "Thailand's evidence-based school comparison platform covering 61+ international, demonstration, government & private schools.",
              founder: {
                "@type": "Person",
                name: "Dr. Waleerat",
                alternateName: "หมอกวาง",
                jobTitle: "Pediatrician & Education Researcher",
                sameAs: ["https://instagram.com/doctorwaleerat"],
              },
              sameAs: ["https://instagram.com/doctorwaleerat"],
              areaServed: {
                "@type": "Country",
                name: "Thailand",
              },
              knowsAbout: [
                "International Schools in Thailand",
                "Thai Demonstration Schools",
                "Education Research",
                "Parenting Styles",
                "Child Development",
                "Executive Function",
              ],
            }),
          }}
        />

        {/* ── WebSite + SearchAction JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "SchoolFinder",
              alternateName: "SchoolFinder by Dr. Waleerat",
              url: baseUrl,
              description:
                "Thailand's #1 school comparison platform with 61+ schools, EF scores, tuition fees, and evidence-based recommendations.",
              inLanguage: ["th", "en", "zh", "ja"],
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: `${baseUrl}/find?q={search_term_string}`,
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* ── BreadcrumbList JSON-LD ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
                { "@type": "ListItem", position: 2, name: "Find Schools", item: `${baseUrl}/find` },
                { "@type": "ListItem", position: 3, name: "Calendar", item: `${baseUrl}/calendar` },
                { "@type": "ListItem", position: 4, name: "Path", item: `${baseUrl}/path` },
                { "@type": "ListItem", position: 5, name: "Transfer", item: `${baseUrl}/transfer` },
                { "@type": "ListItem", position: 6, name: "Research", item: `${baseUrl}/research` },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSansThai.variable} antialiased`}
      >
        <LangProvider>
          <FinderProvider>{children}</FinderProvider>
        </LangProvider>
      </body>
    </html>
  );
}
