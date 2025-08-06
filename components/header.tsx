"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Globe, Check } from "lucide-react"

// 言語オプション
const languages = [
  { code: "ja", name: "日本語" },
  { code: "en", name: "English" },
  { code: "ko", name: "한국어" },
  { code: "zh-CN", name: "简体中文" },
  { code: "zh-TW", name: "繁體中文" },
]

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState("ja")
  const langMenuRef = useRef<HTMLDivElement>(null)

  // 言語メニュー外のクリックを検知して閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleLangMenu = () => {
    setIsLangMenuOpen(!isLangMenuOpen)
  }

  const changeLang = (langCode: string) => {
    setCurrentLang(langCode)
    setIsLangMenuOpen(false)
    // 実際の言語切り替え処理はここに実装
    console.log(`言語を${langCode}に変更しました`)
  }

  // メインメニュー項目
  const mainNavItems = [
    { name: "ホーム", href: "/" },
    { name: "「気づき」とは", href: "/about" },
    { name: "事業紹介", href: "/services" },
    { name: "製品紹介", href: "/products" },
    { name: "事例紹介", href: "/cases" },
    { name: "よくあるご質問", href: "/faq" },
  ]

  // サブメニュー項目
  const subNavItems = [
    { name: "企業情報", href: "/company" },
    { name: "お問い合わせ", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* 上段サブメニュー */}
      <div className="bg-gray-100">
        <div className="container flex items-center justify-end py-2">
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6 mr-6">
              {subNavItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-gray-600 transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* 言語選択メニュー */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={toggleLangMenu}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary"
                aria-label="言語選択"
              >
                <Globe className="w-4 h-4 mr-1" />
                <span className="hidden sm:inline">
                  {languages.find((lang) => lang.code === currentLang)?.name || "日本語"}
                </span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-1 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLang(lang.code)}
                      className="flex items-center w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      {currentLang === lang.code && <Check className="w-4 h-4 mr-2 text-primary" />}
                      {currentLang !== lang.code && <span className="w-4 h-4 mr-2" />}
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>

      {/* 下段メインメニュー */}
      <div className="bg-white">
        <div className="container flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-primary">
            株式会社気づき
          </Link>

          {/* デスクトップナビゲーション */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {mainNavItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="font-medium transition-colors hover:text-primary">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* モバイルメニューボタン */}
          <button className="p-2 md:hidden" onClick={toggleMenu} aria-label="メニューを開く">
            {isMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
          </button>
        </div>
      </div>

      {/* モバイルナビゲーション */}
      {isMenuOpen && (
        <nav className="md:hidden">
          <ul className="flex flex-col py-4 border-t">
            {mainNavItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block px-4 py-2 font-medium transition-colors hover:bg-gray-100 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-gray-200 pt-2">
              {subNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* モバイル用言語選択 */}
              <div className="px-4 py-2 mt-2 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-600 mb-2">言語選択</p>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      changeLang(lang.code)
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center w-full py-1 text-sm text-left hover:text-primary"
                  >
                    {currentLang === lang.code ? (
                      <Check className="w-4 h-4 mr-2 text-primary" />
                    ) : (
                      <span className="w-4 h-4 mr-2" />
                    )}
                    {lang.name}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Header
