import type React from "react"

interface PageHeaderProps {
  title: string
  description?: string
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description }) => {
  return (
    <section className="relative py-20 text-white page-header-gradient overflow-hidden">
      {/* 装飾的な線のパターン */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-px bg-white"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-white"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-white"
            style={{
              left: `${i * 5}%`,
              top: 0,
              bottom: 0,
              width: "1px",
              opacity: 0.3 + Math.random() * 0.7,
            }}
          ></div>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-full h-px bg-white"
            style={{
              top: `${(i + 1) * 10}%`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          ></div>
        ))}
      </div>

      {/* 装飾的な円 */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white opacity-5"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white opacity-5"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl opacity-0 animate-fade-in-up">{title}</h1>
          {description && <p className="text-lg md:text-xl opacity-0 animate-fade-in-up delay-200">{description}</p>}
        </div>
      </div>
    </section>
  )
}

export default PageHeader
