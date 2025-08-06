"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import PageHeader from "@/components/page-header"

// サンプルFAQデータ
const generateFaqs = () => {
  const faqs = []
  const categories = ["製品開発", "アプリケーション開発", "事業運用サポート", "その他"]

  for (let i = 1; i <= 30; i++) {
    const categoryIndex = i % 4
    const category = categories[categoryIndex]

    faqs.push({
      id: i,
      question: `Q${i}. ${category}に関するよくある質問です。`,
      answer: `${category}に関する質問の回答がここに入ります。株式会社気づきでは、お客様のニーズに合わせたサービスを提供しています。詳細については、お気軽にお問い合わせください。`,
      category: category,
    })
  }
  return faqs
}

const allFaqs = generateFaqs()

export default function FaqPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("すべて")
  const [filteredFaqs, setFilteredFaqs] = useState(allFaqs)
  const [openFaqId, setOpenFaqId] = useState<number | null>(null)

  const categories = ["すべて", "製品開発", "アプリケーション開発", "事業運用サポート", "その他"]

  // 検索と絞り込みを適用
  useEffect(() => {
    let results = allFaqs

    // カテゴリーで絞り込み
    if (selectedCategory !== "すべて") {
      results = results.filter((faq) => faq.category === selectedCategory)
    }

    // 検索語で絞り込み
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase()
      results = results.filter(
        (faq) =>
          faq.question.toLowerCase().includes(lowercasedTerm) || faq.answer.toLowerCase().includes(lowercasedTerm),
      )
    }

    setFilteredFaqs(results)
  }, [searchTerm, selectedCategory])

  const toggleFaq = (id: number) => {
    if (openFaqId === id) {
      setOpenFaqId(null)
    } else {
      setOpenFaqId(id)
    }
  }

  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader title="よくあるご質問" description="株式会社気づきのサービスに関するよくあるご質問をまとめました。" />

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
                placeholder="質問を検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
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

      {/* FAQ List */}
      <section className="py-12">
        <div className="container">
          {filteredFaqs.length > 0 ? (
            <div className="max-w-3xl mx-auto">
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="overflow-hidden border rounded-xl">
                    <button
                      className="flex items-center justify-between w-full p-4 text-left bg-white"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      {openFaqId === faq.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    {openFaqId === faq.id && (
                      <div className="p-4 bg-gray-50 border-t">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-lg text-gray-600">検索条件に一致する質問が見つかりませんでした。</p>
              <button
                className="mt-4 btn-outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("すべて")
                }}
              >
                すべての質問を表示
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 text-white bg-primary">
        <div className="container text-center">
          <h2 className="mb-6">お探しの回答が見つかりませんか？</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            ご質問やご相談は、お気軽にお問い合わせください。専門スタッフが丁寧にお答えします。
          </p>
          <Link href="/contact" className="px-8 py-3 text-primary bg-white rounded-md hover:bg-gray-100">
            お問い合わせフォームへ
          </Link>
        </div>
      </section>
    </>
  )
}
