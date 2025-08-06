"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ChevronRight } from "lucide-react"
import PageHeader from "@/components/page-header"

// サンプル事例データ
const generateCases = () => {
  const cases = []
  const categories = ["製品開発", "アプリケーション開発", "事業運用サポート"]
  const industries = ["製造業", "IT", "小売", "金融", "医療", "教育", "物流"]

  for (let i = 1; i <= 20; i++) {
    const categoryIndex = i % 3
    const industryIndex = i % 7

    cases.push({
      id: i,
      title: `株式会社〇〇様の${categories[categoryIndex]}事例`,
      category: categories[categoryIndex],
      industry: industries[industryIndex],
      summary: `${industries[industryIndex]}の${categories[categoryIndex]}における課題を解決した事例です。お客様が抱えていた課題と、私たちがどのようにして解決したかについての説明がここに入ります。`,
      image: `/placeholder.svg?height=400&width=600&text=事例${i}`,
    })
  }
  return cases
}

const allCases = generateCases()

export default function CasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCases, setFilteredCases] = useState(allCases)

  // 検索を適用
  useEffect(() => {
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase()
      const results = allCases.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(lowercasedTerm) ||
          caseItem.category.toLowerCase().includes(lowercasedTerm) ||
          caseItem.industry.toLowerCase().includes(lowercasedTerm) ||
          caseItem.summary.toLowerCase().includes(lowercasedTerm),
      )
      setFilteredCases(results)
    } else {
      setFilteredCases(allCases)
    }
  }, [searchTerm])

  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader title="事例紹介" description="株式会社気づきのサービスを活用したお客様の成功事例をご紹介します。" />

      {/* 以下は変更なし */}
      {/* Search Section */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full py-2 pl-10 pr-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="キーワードで事例を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-12">
        <div className="container">
          {filteredCases.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredCases.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="overflow-hidden transition-shadow bg-white rounded-xl shadow-md hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={caseItem.image || "/placeholder.svg"}
                      alt={caseItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-medium text-white rounded-full bg-primary">
                        {caseItem.category}
                      </span>
                      <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                        {caseItem.industry}
                      </span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold">{caseItem.title}</h3>
                    <p className="mb-4 text-gray-600">{caseItem.summary}</p>
                    <Link href={`/cases/${caseItem.id}`} className="flex items-center font-medium text-primary">
                      詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-lg text-gray-600">検索条件に一致する事例が見つかりませんでした。</p>
              <button className="mt-4 btn-outline" onClick={() => setSearchTerm("")}>
                すべての事例を表示
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
