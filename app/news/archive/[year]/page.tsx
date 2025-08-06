"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react"
import PageHeader from "@/components/page-header"
import ScrollAnimation from "@/components/scroll-animation"
import { getNewsByYear, getAvailableYears } from "@/lib/news-data"
import NewsCard from "@/components/news/news-card"
import NewsPagination from "@/components/news/news-pagination"

export default function NewsArchivePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")

  const year = Number.parseInt(params.year as string)
  const currentPage = pageParam ? Number.parseInt(pageParam) : 1

  const [availableYears, setAvailableYears] = useState<number[]>([])
  const [currentYearIndex, setCurrentYearIndex] = useState(0)

  const { items, totalPages } = getNewsByYear(year, currentPage, 9)

  useEffect(() => {
    // 利用可能な年度を取得
    const years = getAvailableYears()
    setAvailableYears(years)

    // 現在の年のインデックスを設定
    const index = years.findIndex((y) => y === year)
    if (index !== -1) {
      setCurrentYearIndex(index)
    }
  }, [year])

  // 前後の年を取得
  const prevYear = currentYearIndex < availableYears.length - 1 ? availableYears[currentYearIndex + 1] : null
  const nextYear = currentYearIndex > 0 ? availableYears[currentYearIndex - 1] : null

  return (
    <>
      <PageHeader
        title={`${year}年のニュース`}
        description={`${year}年に公開されたニュースやプレスリリースの一覧です。`}
      />

      <section className="py-12 bg-gray-50">
        <div className="container">
          <ScrollAnimation>
            <div className="flex items-center justify-between mb-8">
              <Link href="/news" className="flex items-center text-gray-600 hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-1" />
                ニュース一覧に戻る
              </Link>

              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                <span className="mr-3 text-gray-600">年度:</span>

                <div className="flex items-center">
                  {prevYear && (
                    <Link
                      href={`/news/archive/${prevYear}`}
                      className="flex items-center px-2 py-1 text-gray-600 hover:text-primary"
                    >
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      {prevYear}年
                    </Link>
                  )}

                  <span className="px-3 py-1 font-medium text-primary border border-primary rounded-md mx-2">
                    {year}年
                  </span>

                  {nextYear && (
                    <Link
                      href={`/news/archive/${nextYear}`}
                      className="flex items-center px-2 py-1 text-gray-600 hover:text-primary"
                    >
                      {nextYear}年
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {items.length > 0 ? (
            <ScrollAnimation delay="100">
              <div className="bg-white p-4 rounded-xl">
                {items.map((item) => (
                  <NewsCard key={item.id} news={item} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8">
                  <NewsPagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/news/archive/${year}`} />
                </div>
              )}
            </ScrollAnimation>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">この年のニュースはありません。</p>
              <Link href="/news" className="mt-4 inline-block btn-primary">
                ニュース一覧に戻る
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
