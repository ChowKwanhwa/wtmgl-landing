import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "我踏马归来 | WTMGL - BSC 战壕反击战",
  description: "BSC 战壕呼叫各位大兵！你们踏马来了吗？与 CZ 并肩作战，干翻 Solana 军团！$WTMGL 代币，USDT 自动分红，3.5% 交易税，555万总供应量。",
  keywords: ["WTMGL", "我踏马归来", "BSC", "BNB Chain", "Meme Token", "CZ", "Binance", "Crypto", "DeFi", "USDT 分红"],
  authors: [{ name: "WTMGL Team" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://wtmgl.io",
    title: "我踏马归来 | WTMGL - BSC Meme Token",
    description: "BSC 战壕呼叫各位大兵！再见CZ拉满弓，不惧岁月不惧风。弟兄们我踏马来了！",
    siteName: "WTMGL Token",
    images: [
      {
        url: "/cz-horse.jpg",
        width: 1200,
        height: 630,
        alt: "我踏马归来 - CZ 骑马归来",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "我踏马归来 | WTMGL - BSC Meme Token",
    description: "BSC 战壕呼叫各位大兵！你们踏马来了吗？",
    images: ["/cz-horse.jpg"],
  },
  icons: {
    icon: "/cz-horse.jpg",
    shortcut: "/cz-horse.jpg",
    apple: "/cz-horse.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="icon" href="/cz-horse.jpg" type="image/jpeg" />
        <meta name="theme-color" content="#f59e0b" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
