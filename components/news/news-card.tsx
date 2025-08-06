import Link from "next/link"
import { CalendarIcon } from "lucide-react"
import type { NewsItem } from "@/types/news"

interface NewsCardProps {
  news: NewsItem
  variant?: "default" | "compact"
}

// NewsCardコンポーネントのデザインを変更し、枠とシャドウをなくしてボーダーで表現します

// defaultバリアントを変更
export default function NewsCard({ news, variant = "default" }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  if (variant === "compact") {
    return (
      <div className="border-b border-gray-200 last:border-b-0">
        <Link href={`/news/${news.id}`} className="block py-3 hover:bg-gray-50 transition-colors rounded-xl">
          <div className="flex items-center text-sm text-gray-500 mb-1">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{formatDate(news.date)}</span>
            <span className="mx-2">|</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-sm text-xs">{news.category}</span>
          </div>
          <h3 className="text-base font-medium line-clamp-1">{news.title}</h3>
        </Link>
      </div>
    )
  }

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-5 hover:bg-gray-50 transition-colors">
      <Link href={`/news/${news.id}`} className="block">
        <div className="px-1">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <CalendarIcon className="w-4 h-4 mr-1" />
            <span>{formatDate(news.date)}</span>
            <span className="mx-2">|</span>
            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-sm text-xs">{news.category}</span>
          </div>
          <h3 className="text-xl font-medium mb-2">{news.title}</h3>
          <p className="text-gray-600">{news.summary}</p>
        </div>
      </Link>
    </div>
  )
}
