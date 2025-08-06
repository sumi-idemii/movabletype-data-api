import Image from "next/image"
import Link from "next/link"
import { Lightbulb, Code, Settings, CheckCircle, ArrowRight } from "lucide-react"
import PageHeader from "@/components/page-header"
import ScrollAnimation from "@/components/scroll-animation"

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="事業紹介"
        description="株式会社気づきは、製品開発・アプリケーション開発・事業運用サポートの3つの事業を通じて、お客様のビジネスに新たな価値を提供します。"
      />

      {/* Product Development */}
      <section id="product-development" className="py-16">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollAnimation type="fade-right">
              <div>
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Lightbulb className="w-6 h-6" />
                </div>
                <h2 className="mb-6">製品開発</h2>
                <p className="mb-4">
                  お客様のニーズに合わせた製品開発を行います。市場調査から設計、製造、品質管理まで一貫したサポートを提供します。
                </p>
                <p className="mb-6">
                  私たちの製品開発チームは、豊富な経験と専門知識を持ち、お客様の要望を的確に把握し、最適な製品を開発します。また、最新の技術や材料を活用し、高品質で競争力のある製品を提供します。
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>市場調査・競合分析</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>製品設計・プロトタイピング</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>製造・品質管理</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>製品改良・アップデート</span>
                  </li>
                </ul>
                <Link href="/products" className="btn-primary">
                  製品一覧を見る
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="relative h-64 md:h-96">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Product Development"
                  alt="製品開発"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* App Development */}
      <section id="app-development" className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollAnimation type="fade-right" className="order-2 md:order-1">
              <div className="relative h-64 md:h-96">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=App Development"
                  alt="アプリケーション開発"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left" className="order-1 md:order-2">
              <div>
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Code className="w-6 h-6" />
                </div>
                <h2 className="mb-6">アプリケーション開発</h2>
                <p className="mb-4">
                  ウェブアプリケーションからモバイルアプリまで、最新技術を活用した高品質なアプリケーション開発を行います。
                </p>
                <p className="mb-6">
                  私たちのアプリケーション開発チームは、最新のプログラミング言語やフレームワークを駆使し、使いやすく、セキュアで、パフォーマンスの高いアプリケーションを開発します。また、ユーザーエクスペリエンスを重視し、直感的で魅力的なインターフェースを設計します。
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>ウェブアプリケーション開発</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>モバイルアプリ開発（iOS/Android）</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>業務システム開発</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>UI/UXデザイン</span>
                  </li>
                </ul>
                <Link href="/cases?category=app-development" className="btn-primary">
                  開発事例を見る
                </Link>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Business Support */}
      <section id="business-support" className="py-16">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <ScrollAnimation type="fade-right">
              <div>
                <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                  <Settings className="w-6 h-6" />
                </div>
                <h2 className="mb-6">事業運用サポート</h2>
                <p className="mb-4">
                  事業の立ち上げから運用まで、経験豊富なコンサルタントがお客様のビジネスをサポートします。
                </p>
                <p className="mb-6">
                  私たちの事業運用サポートチームは、ビジネス戦略の策定から業務プロセスの最適化、マーケティング戦略の立案まで、お客様のビジネスを総合的にサポートします。また、データ分析や市場調査を通じて、お客様のビジネスに「気づき」を提供し、成長を促進します。
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>ビジネス戦略策定</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>業務プロセス最適化</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>マーケティング戦略立案</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                    <span>データ分析・市場調査</span>
                  </li>
                </ul>
                <Link href="/cases?category=business-support" className="btn-primary">
                  サポート事例を見る
                </Link>
              </div>
            </ScrollAnimation>
            <ScrollAnimation type="fade-left">
              <div className="relative h-64 md:h-96">
                <Image
                  src="/placeholder.svg?height=600&width=800&text=Business Support"
                  alt="事業運用サポート"
                  fill
                  className="object-cover rounded-xl shadow-lg"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto mb-12 text-center">
              <h2 className="mb-4">私たちの取り組み方</h2>
              <p className="text-gray-600">株式会社気づきは、以下のプロセスでお客様のビジネスをサポートします。</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <ScrollAnimation type="zoom-in" delay="100">
              <div className="relative p-6 bg-white rounded-xl shadow-md">
                <div className="absolute flex items-center justify-center w-10 h-10 text-white rounded-full -top-5 bg-primary">
                  1
                </div>
                <h3 className="mt-4 mb-3 text-xl font-bold">ヒアリング</h3>
                <p className="text-gray-600">
                  お客様のニーズや課題を詳細にヒアリングし、最適なソリューションを提案します。
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation type="zoom-in" delay="200">
              <div className="relative p-6 bg-white rounded-xl shadow-md">
                <div className="absolute flex items-center justify-center w-10 h-10 text-white rounded-full -top-5 bg-primary">
                  2
                </div>
                <h3 className="mt-4 mb-3 text-xl font-bold">企画・設計</h3>
                <p className="text-gray-600">
                  ヒアリングに基づき、具体的な企画・設計を行います。お客様と密に連携し、最適な解決策を設計します。
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation type="zoom-in" delay="300">
              <div className="relative p-6 bg-white rounded-xl shadow-md">
                <div className="absolute flex items-center justify-center w-10 h-10 text-white rounded-full -top-5 bg-primary">
                  3
                </div>
                <h3 className="mt-4 mb-3 text-xl font-bold">開発・実装</h3>
                <p className="text-gray-600">
                  設計に基づき、製品開発やアプリケーション開発、事業運用サポートを実施します。
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation type="zoom-in" delay="400">
              <div className="relative p-6 bg-white rounded-xl shadow-md">
                <div className="absolute flex items-center justify-center w-10 h-10 text-white rounded-full -top-5 bg-primary">
                  4
                </div>
                <h3 className="mt-4 mb-3 text-xl font-bold">評価・改善</h3>
                <p className="text-gray-600">
                  開発・実装後も継続的に評価・改善を行い、お客様のビジネスの成長をサポートします。
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-primary">
        <div className="container">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="mb-6">お客様のビジネスに「気づき」を</h2>
              <p className="mb-8">
                製品開発、アプリケーション開発、事業運用サポートについてのご質問やご相談は、お気軽にお問い合わせください。
              </p>
              <Link
                href="/contact"
                className="flex items-center justify-center px-6 py-3 mx-auto font-medium text-primary bg-white rounded-md w-fit hover:bg-gray-100"
              >
                お問い合わせ <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </>
  )
}
