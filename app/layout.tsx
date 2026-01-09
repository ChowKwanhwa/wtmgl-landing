import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://wtmgl.com'),
  title: '我踏马归来 - BSC 战壕自动分红代币',
  description: 'BSC 战壕呼叫各位大兵！再见CZ拉满弓，不惧岁月不惧风。$我踏马归来 是一个基于 BNB Smart Chain 的自动 USDT 分红代币，持有即可获得被动收益。',
  keywords: ["我踏马归来", "BSC", "BNB Chain", "Meme Token", "CZ", "Binance", "Crypto", "DeFi", "USDT 分红"],
  authors: [{ name: "WTMGL Team" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://wtmgl.io",
    title: "我踏马归来 - BSC Meme Token",
    description: "BSC 战壕呼叫各位大兵！再见CZ拉满弓，不惧岁月不惧风。弟兄们我踏马来了！",
    siteName: "我踏马归来 Token",
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
    title: "我踏马归来 - BSC Meme Token",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
