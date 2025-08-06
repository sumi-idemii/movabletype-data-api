"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import ChatWindow from "./chat-window"

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  // スクロールしてから少し経ってからボタンを表示する
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  if (!isVisible) return null

  return (
    <>
      {/* チャットボタン */}
      <button
        onClick={toggleChat}
        className={`fixed z-50 flex items-center justify-center p-4 text-white rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bottom-[380px] right-6 bg-gray-600 hover:bg-gray-700"
            : "bottom-6 right-6 bg-primary hover:bg-primary-dark"
        }`}
        aria-label="オンラインチャット"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* チャットウィンドウ */}
      <div
        className={`fixed z-40 bottom-6 right-6 w-[350px] transition-all duration-300 transform ${
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        }`}
      >
        <ChatWindow onClose={() => setIsOpen(false)} />
      </div>
    </>
  )
}
