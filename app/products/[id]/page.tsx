"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ChevronRight } from "lucide-react"
import { useParams } from "next/navigation"

// サンプル製品データを生成する関数
const getProductData = (id: number) => {
  const categories = ["製品開発", "アプリケーション開発", "事業運用サポート"]
  const categoryIndex = id % 3
  const category = categories[categoryIndex]

  return {
    id,
    name: `製品名 ${id}`,
    category,
    description: `製品${id}の詳細な説明がここに入ります。この製品は、お客様のビジネスに新たな「気づき」を提供し、業務効率化や売上向上に貢献します。最新の技術と豊富な経験を活かし、お客様のニーズに合わせたカスタマイズも可能です。`,
    features: [
      "特徴1: 高い信頼性と安定性",
      "特徴2: 直感的な操作性",
      "特徴3: 柔軟なカスタマイズ",
      "特徴4: 迅速なサポート体制",
    ],
    specifications: [
      { name: "サイズ", value: "W100 × H50 × D20 mm" },
      { name: "重量", value: "150g" },
      { name: "対応OS", value: "Windows 10/11, macOS 10.15以降" },
      { name: "消費電力", value: "5W" },
      { name: "保証期間", value: "1年間" },
    ],
    image: `/placeholder.svg?height=600&width=800&text=製品${id}`,
    relatedProducts: [(id % 30) + 1, (id % 30) + 2, (id % 30) + 3].map((relId) => (relId > 30 ? relId - 30 : relId)),
  }
}

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const id = Number.parseInt(params.id as string)
      if (!isNaN(id)) {
        const productData = getProductData(id)
        setProduct(productData)

        // 関連製品データを取得
        const relatedProductsData = productData.relatedProducts.map((relId: number) => getProductData(relId))
        setRelatedProducts(relatedProductsData)
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

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="mb-6 text-2xl font-bold">製品が見つかりませんでした</h1>
        <Link href="/products" className="btn-primary">
          製品一覧に戻る
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
            <Link href="/products" className="hover:text-primary">
              製品紹介
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container">
          <Link href="/products" className="flex items-center mb-8 text-gray-600 hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            製品一覧に戻る
          </Link>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="relative h-64 overflow-hidden rounded-xl shadow-md md:h-96">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>

            <div>
              <div className="mb-2 text-sm font-medium text-primary">{product.category}</div>
              <h1 className="mb-4">{product.name}</h1>
              <p className="mb-6 text-gray-600">{product.description}</p>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-bold">製品の特徴</h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="mb-3 text-lg font-bold">製品仕様</h3>
                <div className="overflow-hidden border rounded-xl">
                  {product.specifications.map((spec: any, index: number) => (
                    <div
                      key={index}
                      className={`flex border-b ${index === product.specifications.length - 1 ? "border-b-0" : ""}`}
                    >
                      <div className="w-1/3 p-3 font-medium bg-gray-50">{spec.name}</div>
                      <div className="w-2/3 p-3">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/contact" className="btn-primary">
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <h2 className="mb-8 text-2xl font-bold">関連製品</h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((relProduct) => (
              <div
                key={relProduct.id}
                className="overflow-hidden transition-shadow bg-white rounded-xl shadow-md hover:shadow-lg"
              >
                <div className="relative h-48">
                  <Image
                    src={relProduct.image || "/placeholder.svg"}
                    alt={relProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 text-sm font-medium text-primary">{relProduct.category}</div>
                  <h3 className="mb-2 text-xl font-bold">{relProduct.name}</h3>
                  <p className="mb-4 text-gray-600 line-clamp-2">{relProduct.description}</p>
                  <Link href={`/products/${relProduct.id}`} className="flex items-center font-medium text-primary">
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
