"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Send } from "lucide-react"
import PageHeader from "@/components/page-header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください"
    }

    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください"
    }

    if (!formData.category) {
      newErrors.category = "お問い合わせ種別を選択してください"
    }

    if (!formData.message.trim()) {
      newErrors.message = "お問い合わせ内容を入力してください"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // ここで実際のフォーム送信処理を行う
      // 今回はモックとして、1秒後に送信完了とする
      setTimeout(() => {
        setIsSubmitting(false)
        setIsSubmitted(true)
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          category: "",
          message: "",
        })
      }, 1000)
    }
  }

  return (
    <>
      {/* ヒーローセクションをPageHeaderコンポーネントに置き換え */}
      <PageHeader
        title="お問い合わせ"
        description="株式会社気づきへのお問い合わせは、以下のフォームからお願いいたします。"
      />

      {/* 以下は変更なし */}
      {/* Contact Info */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 text-center bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-primary">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">お電話</h3>
              <p className="text-gray-600">03-1234-5678</p>
              <p className="text-gray-600">（平日 9:00〜18:00）</p>
            </div>

            <div className="p-6 text-center bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-primary">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">メール</h3>
              <p className="text-gray-600">info@kigiduki.co.jp</p>
              <p className="text-gray-600">（24時間受付）</p>
            </div>

            <div className="p-6 text-center bg-white rounded-xl shadow-md">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-white rounded-full bg-primary">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">所在地</h3>
              <p className="text-gray-600">〒100-0001</p>
              <p className="text-gray-600">東京都千代田区千代田1-1</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-8 text-2xl font-bold text-center">お問い合わせフォーム</h2>

            {isSubmitted ? (
              <div className="p-8 text-center bg-white rounded-xl shadow-md">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 text-white rounded-full bg-primary">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="mb-4 text-xl font-bold">お問い合わせありがとうございます</h3>
                <p className="mb-6 text-gray-600">
                  お問い合わせを受け付けました。担当者より、2営業日以内にご連絡いたします。
                </p>
                <button className="btn-primary" onClick={() => setIsSubmitted(false)}>
                  新しいお問い合わせ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 bg-white rounded-xl shadow-md">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">
                      お名前 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block mb-2 font-medium">
                      会社名
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">
                      メールアドレス <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2 font-medium">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="category" className="block mb-2 font-medium">
                    お問い合わせ種別 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  >
                    <option value="">選択してください</option>
                    <option value="製品開発">製品開発について</option>
                    <option value="アプリケーション開発">アプリケーション開発について</option>
                    <option value="事業運用サポート">事業運用サポートについて</option>
                    <option value="その他">その他</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category}</p>}
                </div>

                <div className="mt-6">
                  <label htmlFor="message" className="block mb-2 font-medium">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
                  ></textarea>
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <div className="mt-8">
                  <button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 mr-3 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                        送信中...
                      </div>
                    ) : (
                      "送信する"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
