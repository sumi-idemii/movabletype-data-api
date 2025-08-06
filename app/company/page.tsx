import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function CompanyPage() {
  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader title="企業情報" description="株式会社気づきの企業情報をご紹介します。" />

      {/* 以下は変更なし */}
      {/* Company Overview */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-2xl font-bold text-center">会社概要</h2>

            <div className="overflow-hidden border rounded-xl">
              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">会社名</div>
                <div className="w-full p-4 sm:w-2/3">株式会社気づき</div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">設立</div>
                <div className="w-full p-4 sm:w-2/3">2015年4月1日</div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">資本金</div>
                <div className="w-full p-4 sm:w-2/3">5,000万円</div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">代表取締役</div>
                <div className="w-full p-4 sm:w-2/3">気づき 太郎</div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">従業員数</div>
                <div className="w-full p-4 sm:w-2/3">120名（2023年4月現在）</div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">事業内容</div>
                <div className="w-full p-4 sm:w-2/3">
                  <ul className="list-disc list-inside">
                    <li>製品開発</li>
                    <li>アプリケーション開発</li>
                    <li>事業運用サポート</li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col border-b sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">本社所在地</div>
                <div className="w-full p-4 sm:w-2/3">〒100-0001 東京都千代田区千代田1-1</div>
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="w-full p-4 font-medium bg-gray-50 sm:w-1/3">支社</div>
                <div className="w-full p-4 sm:w-2/3">大阪支社：〒530-0001 大阪府大阪市北区梅田1-1</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-center">オフィス所在地</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold">東京本社</h3>
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=東京本社地図"
                  alt="東京本社地図"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>〒100-0001 東京都千代田区千代田1-1</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  <span>03-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <span>tokyo@kigiduki.co.jp</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">大阪支社</h3>
              <div className="relative h-64 mb-4 overflow-hidden rounded-xl shadow-md">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=大阪支社地図"
                  alt="大阪支社地図"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-primary" />
                  <span>〒530-0001 大阪府大阪市北区梅田1-1</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-primary" />
                  <span>06-1234-5678</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 text-primary" />
                  <span>osaka@kigiduki.co.jp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Clients */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold text-center">主要取引先</h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div key={i} className="flex items-center justify-center p-4 bg-white border rounded-xl shadow-sm">
                <Image
                  src={`/placeholder.svg?height=100&width=150&text=取引先${i}`}
                  alt={`取引先${i}`}
                  width={150}
                  height={100}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-primary">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-6">お問い合わせ</h2>
            <p className="mb-8">株式会社気づきへのお問い合わせは、以下のフォームからお願いいたします。</p>
            <Link
              href="/contact"
              className="flex items-center justify-center px-6 py-3 mx-auto font-medium text-primary bg-white rounded-md w-fit hover:bg-gray-100"
            >
              お問い合わせフォームへ <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
