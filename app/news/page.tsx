"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Calendar, Filter } from "lucide-react"
import PageHeader from "@/components/page-header"
import ScrollAnimation from "@/components/scroll-animation"
import { getNewsItems, getAvailableYears } from "@/lib/news-data"
import NewsCard from "@/components/news/news-card"
import NewsPagination from "@/components/news/news-pagination"

export default function NewsPage() {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1

  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [availableYears, setAvailableYears] = useState<number[]>([])

  const { items, totalPages } = getNewsItems(currentPage, 9)

  // カテゴリーの一覧を取得
  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  useEffect(() => {
    // 利用可能な年度を取得
    setAvailableYears(getAvailableYears())
  }, [])

  return (
    <>
      <PageHeader
        title="ニュース"
        description="株式会社気づきからの最新のお知らせやプレスリリースをご覧いただけます。"
      />

      <section className="py-12 bg-gray-50">
        <div className="container">
          <ScrollAnimation>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              {/* カテゴリーフィルター */}
              <div className="flex items-center mb-4 md:mb-0">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                <span className="mr-3 text-gray-600">カテゴリー:</span>
                <select
                  className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "すべて" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* 年度アーカイブリンク */}
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="mr-3 text-gray-600">年度別:</span>
                <div className="flex flex-wrap gap-2">
                  {availableYears.map((year) => (
                    <Link
                      key={year}
                      href={`/news/archive/${year}`}
                      className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      {year}年
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation delay="100">
            <div className="bg-white p-4 rounded-xl">
              {items
                .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
                .map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
            </div>

            {/* ページネーション */}
            {totalPages > 1 && (
              <div className="mt-8">
                <NewsPagination currentPage={currentPage} totalPages={totalPages} baseUrl="/news" />
              </div>
            )}
          </ScrollAnimation>
        </div>
      </section>
    </>
  )
}
