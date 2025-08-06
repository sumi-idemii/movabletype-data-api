"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Calendar, Building, ChevronRight } from "lucide-react"
import { useParams } from "next/navigation"

// サンプル事例データを生成する関数
const getCaseData = (id: number) => {
  const categories = ["製品開発", "アプリケーション開発", "事業運用サポート"]
  const industries = ["製造業", "IT", "小売", "金融", "医療", "教育", "物流"]
  const categoryIndex = id % 3
  const industryIndex = id % 7
  const category = categories[categoryIndex]
  const industry = industries[industryIndex]

  return {
    id,
    title: `株式会社〇〇様の${category}事例`,
    category,
    industry,
    client: `株式会社〇〇（${industry}）`,
    date: `202${Math.floor(id / 10)}年${(id % 12) + 1}月`,
    summary: `${industry}の${category}における課題を解決した事例です。お客様が抱えていた課題と、私たちがどのようにして解決したかについての説明がここに入ります。`,
    background: `株式会社〇〇様は、${industry}において長年事業を展開されてきましたが、${category}に関する課題を抱えていました。具体的には、${
      category === "製品開発"
        ? "新製品の開発プロセスが非効率で、市場投入までに時間がかかっていた"
        : category === "アプリケーション開発"
          ? "既存のシステムが老朽化し、業務効率が低下していた"
          : "事業拡大に伴い、業務プロセスの最適化が必要だった"
    }ことが課題でした。`,
    challenges: [
      `課題1: ${
        category === "製品開発"
          ? "開発プロセスの非効率性"
          : category === "アプリケーション開発"
            ? "システムの老朽化"
            : "業務プロセスの複雑化"
      }`,
      `課題2: ${
        category === "製品開発"
          ? "市場ニーズの把握不足"
          : category === "アプリケーション開発"
            ? "データの分断"
            : "リソース配分の最適化"
      }`,
      `課題3: ${
        category === "製品開発"
          ? "品質管理の課題"
          : category === "アプリケーション開発"
            ? "セキュリティリスク"
            : "マーケティング戦略の不足"
      }`,
    ],
    solutions: [
      `解決策1: ${
        category === "製品開発"
          ? "開発プロセスの最適化"
          : category === "アプリケーション開発"
            ? "最新技術を活用したシステム刷新"
            : "業務プロセスの再設計"
      }`,
      `解決策2: ${
        category === "製品開発"
          ? "市場調査の強化"
          : category === "アプリケーション開発"
            ? "データ統合基盤の構築"
            : "リソース配分の最適化"
      }`,
      `解決策3: ${
        category === "製品開発"
          ? "品質管理システムの導入"
          : category === "アプリケーション開発"
            ? "セキュリティ対策の強化"
            : "マーケティング戦略の立案"
      }`,
    ],
    results: [
      `成果1: ${
        category === "製品開発"
          ? "開発期間を30%短縮"
          : category === "アプリケーション開発"
            ? "業務効率が40%向上"
            : "売上が25%増加"
      }`,
      `成果2: ${
        category === "製品開発"
          ? "製品品質の向上"
          : category === "アプリケーション開発"
            ? "データ活用による意思決定の迅速化"
            : "コスト削減"
      }`,
      `成果3: ${
        category === "製品開発"
          ? "顧客満足度の向上"
          : category === "アプリケーション開発"
            ? "セキュリティインシデントの減少"
            : "新規顧客の獲得"
      }`,
    ],
    testimonial: `株式会社気づきのサポートにより、${
      category === "製品開発"
        ? "製品開発プロセスが大幅に改善され、市場投入までの時間が短縮されました"
        : category === "アプリケーション開発"
          ? "最新のアプリケーションにより業務効率が向上し、データ活用が進みました"
          : "事業運営が効率化され、売上向上につながりました"
    }。今後も継続的なサポートをお願いしたいと考えています。`,
    image: `/placeholder.svg?height=600&width=800&text=事例${id}`,
    relatedCases: [(id % 20) + 1, (id % 20) + 2, (id % 20) + 3]
      .map((relId) => (relId > 20 ? relId - 20 : relId))
      .filter((relId) => relId !== id),
  }
}

export default function CaseDetailPage() {
  const params = useParams()
  const [caseData, setCaseData] = useState<any>(null)
  const [relatedCases, setRelatedCases] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const id = Number.parseInt(params.id as string)
      if (!isNaN(id)) {
        const data = getCaseData(id)
        setCaseData(data)

        // 関連事例データを取得
        const relatedCasesData = data.relatedCases.map((relId: number) => getCaseData(relId))
        setRelatedCases(relatedCasesData)
      }
      setLoading(false)
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      </div>
    )
  }

  if (!caseData) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-6 text-2xl font-bold">事例が見つかりませんでした</h1>
        <Link href="/cases" className="btn-primary">
          事例一覧に戻る
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-gray-50">
        <div className="container py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">
              ホーム
            </Link>
            <span className="mx-2">/</span>
            <Link href="/cases" className="hover:text-primary">
              事例紹介
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{caseData.title}</span>
          </div>
        </div>
      </div>

      {/* Case Detail */}
      <section className="py-12">
        <div className="container">
          <Link href="/cases" className="flex items-center mb-8 text-gray-600 hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            事例一覧に戻る
          </Link>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">
                    {caseData.category}
                  </span>
                  <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                    {caseData.industry}
                  </span>
                </div>
                <h1 className="mb-4">{caseData.title}</h1>
                <div className="flex flex-wrap gap-4 mb-6 text-gray-600">
                  <div className="flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    <span>{caseData.client}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{caseData.date}</span>
                  </div>
                </div>
              </div>

              <div className="relative h-64 mb-8 overflow-hidden rounded-xl shadow-md md:h-96">
                <Image src={caseData.image || "/placeholder.svg"} alt={caseData.title} fill className="object-cover" />
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">背景</h2>
                <p className="text-gray-600">{caseData.background}</p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">課題</h2>
                <ul className="space-y-3">
                  {caseData.challenges.map((challenge: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-gray-600">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">解決策</h2>
                <ul className="space-y-3">
                  {caseData.solutions.map((solution: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-gray-600">{solution}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">成果</h2>
                <ul className="space-y-3">
                  {caseData.results.map((result: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      <span className="text-gray-600">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 mb-8 bg-gray-50 rounded-lg">
                <h2 className="mb-4 text-xl font-bold">お客様の声</h2>
                <blockquote className="pl-4 italic text-gray-600 border-l-4 border-primary">
                  {caseData.testimonial}
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky p-6 bg-white rounded-xl shadow-md top-24">
                <h3 className="mb-4 text-xl font-bold">お問い合わせ</h3>
                <p className="mb-6 text-gray-600">
                  この事例に関するお問い合わせや、同様の課題でお悩みの方は、お気軽にご連絡ください。
                </p>
                <Link href="/contact" className="w-full btn-primary">
                  お問い合わせ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Cases */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold">関連事例</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedCases.map((relCase) => (
              <div
                key={relCase.id}
                className="overflow-hidden transition-shadow bg-white rounded-xl shadow-md hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image src={relCase.image || "/placeholder.svg"} alt={relCase.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">
                      {relCase.category}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                      {relCase.industry}
                    </span>
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{relCase.title}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-2">{relCase.summary}</p>
                  <Link href={`/cases/${relCase.id}`} className="flex items-center font-medium text-primary">
                    詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
