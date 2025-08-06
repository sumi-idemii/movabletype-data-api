import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface NewsPaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function NewsPagination({ currentPage, totalPages, baseUrl }: NewsPaginationProps) {
  // ページ番号の配列を生成（現在のページの前後2ページまで表示）
  const getPageNumbers = () => {
    const pages = []
    const delta = 2 // 現在のページの前後に表示するページ数

    for (let i = Math.max(1, currentPage - delta); i <= Math.min(totalPages, currentPage + delta); i++) {
      pages.push(i)
    }

    // 最初と最後のページを追加（必要な場合）
    if (currentPage - delta > 1) {
      pages.unshift(1)
      if (currentPage - delta > 2) {
        pages.unshift("ellipsis")
      }
    }

    if (currentPage + delta < totalPages) {
      if (currentPage + delta < totalPages - 1) {
        pages.push("ellipsis")
      }
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex justify-center items-center space-x-1">
      {/* 前のページへのリンク */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="前のページ"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <span className="px-3 py-2 text-gray-300 cursor-not-allowed">
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* ページ番号 */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis") {
          return (
            <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-600">
              ...
            </span>
          )
        }

        return (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`px-3 py-2 rounded-md ${
              currentPage === page ? "bg-primary text-white font-medium" : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            {page}
          </Link>
        )
      })}

      {/* 次のページへのリンク */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-3 py-2 rounded-md hover:bg-gray-100 text-gray-600"
          aria-label="次のページ"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <span className="px-3 py-2 text-gray-300 cursor-not-allowed">
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </div>
  )
}
