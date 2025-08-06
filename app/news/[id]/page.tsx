"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { CalendarIcon, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { getNewsItem, getLatestNews } from "@/lib/news-data"
import type { NewsItem, ContentBlock } from "@/types/news"
import {
  TextBlock,
  HeadingBlock,
  ImageBlock,
  QuoteBlock,
  ListBlock,
  TableBlock,
  CalloutBlock,
  FileBlock,
} from "@/components/news/news-content-blocks"
import NewsCard from "@/components/news/news-card"
import ScrollAnimation from "@/components/scroll-animation"

export default function NewsDetailPage() {
  const params = useParams()
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null)
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const id = Number.parseInt(params.id as string)
      const item = getNewsItem(id)

      if (item) {
        setNewsItem(item)
        // 関連ニュースとして最新のニュースを取得（実際のアプリではカテゴリや内容に基づいて関連記事を取得）
        setRelatedNews(getLatestNews(3).filter((news) => news.id !== id))
      }

      setLoading(false)
    }
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
  }

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "text":
        return <TextBlock key={block.id} content={block.content} />
      case "heading":
        return <HeadingBlock key={block.id} content={block.content} level={block.level} />
      case "image":
        return (
          <ImageBlock key={block.id} src={block.src || "/placeholder.svg"} alt={block.alt} caption={block.caption} />
        )
      case "quote":
        return <QuoteBlock key={block.id} content={block.content} author={block.author} />
      case "list":
        return <ListBlock key={block.id} items={block.items} ordered={block.ordered} />
      case "table":
        return <TableBlock key={block.id} headers={block.headers} rows={block.rows} />
      case "callout":
        return <CalloutBlock key={block.id} content={block.content} type={block.calloutType} />
      case "file":
        return <FileBlock key={block.id} name={block.name} url={block.url} size={block.size} />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-primary animate-spin"></div>
      </div>
    )
  }

  if (!newsItem) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-6 text-2xl font-bold">ニュースが見つかりませんでした</h1>
        <Link href="/news" className="btn-primary">
          ニュース一覧に戻る
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
            <Link href="/news" className="hover:text-primary">
              ニュース
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{newsItem.title}</span>
          </div>
        </div>
      </div>

      {/* News Detail */}
      <article className="py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <ScrollAnimation>
              <Link href="/news" className="flex items-center mb-6 text-gray-600 hover:text-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ニュース一覧に戻る
              </Link>

              <div className="mb-8">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  <span>{formatDate(newsItem.date)}</span>
                  <span className="mx-2">|</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-sm text-xs">{newsItem.category}</span>
                </div>
                <h1 className="text-3xl font-bold mb-6 md:text-4xl">{newsItem.title}</h1>

                {newsItem.tags && newsItem.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <Tag className="w-4 h-4 text-gray-500" />
                    {newsItem.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Featured Image */}
                {newsItem.image && (
                  <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                    <Image
                      src={newsItem.image || "/placeholder.svg"}
                      alt={newsItem.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Social Share */}
                <div className="flex items-center mb-8 pb-6 border-b border-gray-200">
                  <span className="text-sm text-gray-600 mr-4 flex items-center">
                    <Share2 className="w-4 h-4 mr-1" /> シェア:
                  </span>
                  <div className="flex space-x-2">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        newsItem.title,
                      )}&url=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-primary transition-colors"
                      aria-label="Twitterでシェア"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-primary transition-colors"
                      aria-label="Facebookでシェア"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        window.location.href,
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 hover:text-primary transition-colors"
                      aria-label="LinkedInでシェア"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Content Blocks */}
            <ScrollAnimation delay="100">
              <div className="prose max-w-none">{newsItem.content.map((block) => renderContentBlock(block))}</div>
            </ScrollAnimation>
          </div>
        </div>
      </article>

      {/* Related News */}
      {relatedNews.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container">
            <ScrollAnimation>
              <h2 className="text-2xl font-bold mb-6">関連ニュース</h2>
              <div className="bg-white p-4 rounded-xl">
                {relatedNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </ScrollAnimation>
          </div>
        </section>
      )}
    </>
  )
}
