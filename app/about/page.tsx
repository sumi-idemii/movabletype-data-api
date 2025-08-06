import Image from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function AboutPage() {
  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader
        title="「気づき」とは"
        description="私たちが提供する「気づき」の価値と、企業理念についてご紹介します。"
      />

      {/* Mission Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h2 className="mb-6">私たちの使命</h2>
              <p className="mb-4">
                株式会社気づきは、世の中の企業に対して、業務・製品に対して「気づき」を与えることを使命としています。
              </p>
              <p className="mb-4">
                日々の業務や製品開発の中で見落としがちな「気づき」を提供することで、企業の成長と革新をサポートします。私たちは、お客様と共に考え、共に成長することで、持続可能なビジネスの実現を目指します。
              </p>
              <p>
                「気づき」は、ビジネスの成長と革新の原動力です。私たちは、お客様のビジネスに新たな価値を提供し、社会全体の発展に貢献します。
              </p>
            </div>
            <div className="relative h-64 md:h-96">
              <Image
                src="/placeholder.svg?height=600&width=800&text=Mission"
                alt="私たちの使命"
                fill
                className="object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 以下は変更なし */}
      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4">私たちの価値観</h2>
            <p className="text-gray-600">株式会社気づきは、以下の価値観を大切にしています。</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">誠実さ</h3>
              <p className="text-gray-600">
                私たちは、お客様との信頼関係を最も重視します。誠実なコミュニケーションと透明性のある行動を心がけています。
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">革新性</h3>
              <p className="text-gray-600">
                常に新しい技術やアイデアを取り入れ、革新的なソリューションを提供します。変化を恐れず、挑戦し続けることが私たちの強みです。
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md">
              <div className="p-3 mb-4 text-white rounded-full w-fit bg-primary">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold">協働</h3>
              <p className="text-gray-600">
                私たちは、お客様との協働を通じて、最高の成果を生み出します。共に考え、共に成長することで、持続可能なビジネスを実現します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto mb-12 text-center">
            <h2 className="mb-4">沿革</h2>
            <p className="text-gray-600">株式会社気づきの歩みをご紹介します。</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative pl-8 ml-4 border-l-2 border-primary">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-[9px] border-2 border-primary"></div>
              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">2015年</h3>
                <p className="text-gray-600">株式会社気づき設立</p>
              </div>
            </div>

            <div className="relative pl-8 ml-4 border-l-2 border-primary">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-[9px] border-2 border-primary"></div>
              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">2017年</h3>
                <p className="text-gray-600">製品開発事業開始</p>
              </div>
            </div>

            <div className="relative pl-8 ml-4 border-l-2 border-primary">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-[9px] border-2 border-primary"></div>
              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">2019年</h3>
                <p className="text-gray-600">アプリケーション開発事業開始</p>
              </div>
            </div>

            <div className="relative pl-8 ml-4 border-l-2 border-primary">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-[9px] border-2 border-primary"></div>
              <div className="mb-8">
                <h3 className="mb-2 text-xl font-bold">2021年</h3>
                <p className="text-gray-600">事業運用サポート事業開始</p>
              </div>
            </div>

            <div className="relative pl-8 ml-4">
              <div className="absolute w-4 h-4 bg-white rounded-full -left-[9px] border-2 border-primary"></div>
              <div>
                <h3 className="mb-2 text-xl font-bold">2023年</h3>
                <p className="text-gray-600">東京本社移転、大阪支社開設</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">私たちと一緒に、新たな「気づき」を見つけませんか？</h2>
            <p className="mb-8">
              製品開発、アプリケーション開発、事業運用サポートについてのご質問やご相談は、お気軽にお問い合わせください。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="btn-outline bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                事業紹介を見る
              </Link>
              <Link
                href="/contact"
                className="flex items-center px-6 py-3 font-medium text-primary bg-white rounded-md hover:bg-gray-100"
              >
                お問い合わせ <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
