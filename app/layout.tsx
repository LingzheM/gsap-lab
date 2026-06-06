import { Metadata } from "next";
import './globals.css';

export const metadata: Metadata = {
  title: 'GSAP Lab',
  description: 'GSAP 动效',
}

export default function RootLayout({
  children
}: {
  chilren: React.ReactNode
}) {
  return (
    <html>
      <head>
        {/* 字体用 link 引入，避免 build 时强依赖 next/font 的网络拉取 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,500&family=Hanken+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}