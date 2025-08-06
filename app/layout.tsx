import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatButton from "@/components/chat/chat-button" // チャットボタンをインポート

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
})

export const metadata: Metadata = {
  title: "株式会社気づき | 業務・製品に対して「気づき」を与える",
  description:
    "株式会社気づきは、製品開発・アプリケーション開発・事業運用サポートを通じて、企業に「気づき」を提供します。",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${noto.variable} font-sans`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <ChatButton /> {/* チャットボタンを追加 */}
      </body>
    </html>
  )
}
