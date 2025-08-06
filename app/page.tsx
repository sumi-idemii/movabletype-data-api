import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Lightbulb, Code, Settings, ChevronRight } from "lucide-react"
import ScrollAnimation from "@/components/scroll-animation"
import NewsCard from "@/components/news/news-card"
import { getLatestNews } from "@/lib/news-data"

export default function Home() {
  // 最新のニュースを取得
  const latestNews = getLatestNews(3)

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
        {/* 背景の電球デザイン */}
        <div className="absolute inset-0 w-full h-full">
          {/* 大きな電球 - 右上 */}
          <div className="absolute -top-20 -right-20 text-white opacity-5">
            <Lightbulb size={240} strokeWidth={1} />
          </div>

          {/* 中くらいの電球 - 左下 */}
          <div className="absolute bottom-10 -left-10 text-white opacity-5">
            <Lightbulb size={180} strokeWidth={1} />
          </div>

          {/* 小さな電球 - 中央上 */}
          <div className="absolute top-10 left-1/3 text-white opacity-3">
            <Lightbulb size={100} strokeWidth={1} />
          </div>

          {/* 小さな電球 - 右下 */}
          <div className="absolute bottom-32 right-1/4 text-white opacity-4">
            <Lightbulb size={120} strokeWidth={1} />
          </div>

          {/* 小さな電球 - 左上 */}
          <div className="absolute top-20 left-1/5 text-white opacity-3">
            <Lightbulb size={80} strokeWidth={1} />
          </div>

          {/* 小さな電球 - 中央下 */}
          <div className="absolute bottom-20 left-1/2 text-white opacity-2">
            <Lightbulb size={60} strokeWidth={1} />
          </div>
        </div>

        <div className="container py-20 md:py-32 relative z-10">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-6 text-5xl font-bold leading-tight md:text-6xl lg:text-7xl opacity-0 animate-fade-in-up">
                業務と製品に
                <br />
                新たな「気づき」を
              </h1>
              <p className="mb-8 text-lg md:text-xl opacity-0 animate-fade-in-up delay-200">
                株式会社気づきは、企業の成長と革新をサポートする総合ソリューションカンパニーです。製品開発、アプリケーション開発、事業運用サポートを通じて、お客様のビジネスに新たな価値を提供します。
              </p>
              <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in-up delay-300">
                <Link href="/contact" className="btn-primary">
                  お問い合わせ
                </Link>
                <Link href="/services" className="flex items-center text-white">
                  事業紹介を見る <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 opacity-0 animate-fade-in delay-400">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="ビジネスミーティング"
                fill
                className="object-cover rounded-xl shadow-lg"
                priority
              />
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }}
        ></div>
      </section>

      {/* News Section - 新しく追加 */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <ScrollAnimation>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">最新ニュース</h2>
              <Link href="/news" className="flex items-center text-primary hover:underline">
                すべて見る <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay="100">
            <div className="bg-white p-4 rounded-xl">
              {latestNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Section */}
      <section className="section">
        <div className="container">
          <ScrollAnimation>
            <div className="section-title">
              <h2>事業紹介</h2>
              <p className="max-w-2xl mx-auto text-center text-gray-600">
                株式会社気づきは、3つの事業を柱に、お客様のビジネスに新たな価値を提供します。
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-3">
            <ScrollAnimation type="fade-up" delay="100">
              <div className="card">
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">製品開発</h3>
                <p className="text-gray-600">
                  お客様のニーズに合わせた製品開発を行います。市場調査から設計、製造、品質管理まで一貫したサポートを提供します。
                </p>
                <Link href="/services#product-development" className="flex items-center mt-4 font-medium text-primary">
                  詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </ScrollAnimation>

            <ScrollAnimation type="fade-up" delay="200">
              <div className="card">
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">アプリケーション開発</h3>
                <p className="text-gray-600">
                  ウェブアプリケーションからモバイルアプリまで、最新技術を活用した高品質なアプリケーション開発を行います。
                </p>
                <Link href="/services#app-development" className="flex items-center mt-4 font-medium text-primary">
                  詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </ScrollAnimation>

            <ScrollAnimation type="fade-up" delay="300">
              <div className="card">
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Settings className="w-6 h-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">事業運用サポート</h3>
                <p className="text-gray-600">
                  事業の立ち上げから運用まで、経験豊富なコンサルタントがお客様のビジネスをサポートします。
                </p>
                <Link href="/services#business-support" className="flex items-center mt-4 font-medium text-primary">
                  詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* 以下省略 - 残りのセクションは変更なし */}
    </>
  )
}
