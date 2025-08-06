"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Filter, ChevronRight } from "lucide-react"
import PageHeader from "@/components/page-header"

// 製品カテゴリー
const categories = ["すべて", "製品開発", "アプリケーション開発", "事業運用サポート"]

// サンプル製品データ
const generateProducts = () => {
  const products = []
  for (let i = 1; i <= 30; i++) {
    const categoryIndex = i % 3
    const category = categories[categoryIndex + 1]

    products.push({
      id: i,
      name: `製品名 ${i}`,
      category: category,
      description: `製品${i}の簡単な説明がここに入ります。特徴や利点について簡潔に説明します。`,
      image: `/placeholder.svg?height=300&width=400&text=製品${i}`,
    })
  }
  return products
}

const allProducts = generateProducts()

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [filteredProducts, setFilteredProducts] = useState(allProducts)

  // 検索と絞り込みを適用
  useEffect(() => {
    let results = allProducts

    // カテゴリーで絞り込み
    if (selectedCategory !== "すべて") {
      results = results.filter((product) => product.category === selectedCategory)
    }

    // 検索語で絞り込み
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase()
      results = results.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercasedTerm) ||
          product.description.toLowerCase().includes(lowercasedTerm),
      )
    }

    setFilteredProducts(results)
  }, [searchTerm, selectedCategory])

  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader title="製品紹介" description="株式会社気づきが提供する製品をご紹介します。" />

      {/* 以下は変更なし */}
      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full py-2 pl-10 pr-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="製品を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-600">カテゴリー:</span>
              <select
                className="py-2 pl-3 pr-8 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 残りのコンテンツは変更なし */}
      {/* Products Grid */}
      <section className="py-12">
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden transition-shadow rounded-xl shadow-md hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="mb-2 text-sm font-medium text-primary">{product.category}</div>
                    <h3 className="mb-2 text-xl font-bold">{product.name}</h3>
                    <p className="mb-4 text-gray-600">{product.description}</p>
                    <Link href={`/products/${product.id}`} className="flex items-center font-medium text-primary">
                      詳細を見る <ChevronRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-lg text-gray-600">検索条件に一致する製品が見つかりませんでした。</p>
              <button
                className="mt-4 btn-outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                }}
              >
                すべての製品を表示
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
