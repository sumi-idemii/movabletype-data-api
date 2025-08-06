import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-blue-50 text-gray-700">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">株式会社気づき</h3>
            <p className="text-gray-600">
              世の中の企業に対して、業務・製品に対して「気づき」を与えることを使命としています。
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-primary">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">サイトマップ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-primary">
                  「気づき」とは
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-600 hover:text-primary">
                  事業紹介
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-primary">
                  製品紹介
                </Link>
              </li>
              <li>
                <Link href="/cases" className="text-gray-600 hover:text-primary">
                  事例紹介
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">リソース</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-primary">
                  よくあるご質問
                </Link>
              </li>
              <li>
                <Link href="/company" className="text-gray-600 hover:text-primary">
                  企業情報
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary">
                  お問い合わせ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-primary">
                  プライバシーポリシー
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-gray-800">お問い合わせ</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-600">〒100-0001 東京都千代田区千代田1-1</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-600">03-1234-5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary" />
                <span className="text-gray-600">info@kigiduki.co.jp</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-200">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} 株式会社気づき All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
