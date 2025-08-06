import type { NewsItem } from "@/types/news"
import NewsCard from "./news-card"
import NewsPagination from "./news-pagination"

interface NewsListProps {
  news: NewsItem[]
  currentPage: number
  totalPages: number
  baseUrl: string
  variant?: "default" | "compact"
}

export default function NewsList({ news, currentPage, totalPages, baseUrl, variant = "default" }: NewsListProps) {
  return (
    <div>
      {variant === "compact" ? (
        <div className="divide-y divide-gray-200">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} variant="compact" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item) => (
            <NewsCard key={item.id} news={item} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8">
          <NewsPagination currentPage={currentPage} totalPages={totalPages} baseUrl={baseUrl} />
        </div>
      )}
    </div>
  )
}
