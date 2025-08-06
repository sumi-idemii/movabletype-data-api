"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatWindowProps {
  onClose: () => void
}

// 自動応答メッセージのサンプル
const autoResponses = [
  "ありがとうございます。どのようなことでお困りですか？",
  "ご質問ありがとうございます。詳細を確認して回答いたします。",
  "株式会社気づきでは、製品開発、アプリケーション開発、事業運用サポートを提供しています。",
  "ご連絡ありがとうございます。担当者に確認して改めてご連絡いたします。",
  "お問い合わせいただきありがとうございます。詳細な情報をお送りいたします。",
]

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "こんにちは！株式会社気づきのオンラインチャットへようこそ。どのようなことでお手伝いできますか？",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // メッセージが追加されたときに自動スクロール
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return

    // ユーザーメッセージを追加
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // 「入力中...」の表示
    setIsTyping(true)

    // 自動応答（ランダムな遅延でより自然に）
    setTimeout(
      () => {
        setIsTyping(false)
        const botMessage: Message = {
          id: messages.length + 2,
          text: autoResponses[Math.floor(Math.random() * autoResponses.length)],
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      },
      1000 + Math.random() * 2000,
    ) // 1-3秒のランダムな遅延
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // 時刻のフォーマット
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-[350px] bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
      {/* チャットヘッダー */}
      <div className="flex items-center justify-between px-4 py-3 bg-primary text-white">
        <div className="flex items-center">
          <div className="w-2 h-2 mr-2 bg-green-400 rounded-full"></div>
          <h3 className="font-medium">オンラインチャット</h3>
        </div>
        <span className="text-xs">営業時間: 平日 9:00-18:00</span>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((message) => (
          <div key={message.id} className={`mb-4 flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-xl px-4 py-2 ${
                message.isUser
                  ? "bg-primary text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-200 rounded-tl-none"
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className={`text-xs mt-1 ${message.isUser ? "text-blue-100 text-right" : "text-gray-500"}`}>
                {formatTime(message.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex mb-4">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white text-gray-800 border border-gray-200 rounded-tl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 入力エリア */}
      <div className="p-3 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="メッセージを入力..."
            className="flex-1 h-10 px-3 py-2 text-sm border rounded-l-xl border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
            rows={1}
          />
          <button
            onClick={handleSendMessage}
            disabled={inputValue.trim() === ""}
            className="flex items-center justify-center h-10 px-4 text-white rounded-r-xl bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
