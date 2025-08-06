import Image from "next/image"
import Link from "next/link"

interface TextBlockProps {
  content: string
}

export function TextBlock({ content }: TextBlockProps) {
  return <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: content }} />
}

interface HeadingBlockProps {
  content: string
  level: 2 | 3 | 4
}

export function HeadingBlock({ content, level }: HeadingBlockProps) {
  switch (level) {
    case 2:
      return <h2 className="text-2xl font-bold mb-4 mt-8">{content}</h2>
    case 3:
      return <h3 className="text-xl font-bold mb-3 mt-6">{content}</h3>
    case 4:
      return <h4 className="text-lg font-bold mb-2 mt-4">{content}</h4>
    default:
      return <h2 className="text-2xl font-bold mb-4 mt-8">{content}</h2>
  }
}

interface ImageBlockProps {
  src: string
  alt: string
  caption?: string
}

export function ImageBlock({ src, alt, caption }: ImageBlockProps) {
  return (
    <figure className="mb-8">
      <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
        <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" />
      </div>
      {caption && <figcaption className="mt-2 text-sm text-center text-gray-500">{caption}</figcaption>}
    </figure>
  )
}

interface QuoteBlockProps {
  content: string
  author?: string
}

export function QuoteBlock({ content, author }: QuoteBlockProps) {
  return (
    <blockquote className="border-l-4 border-primary pl-4 py-2 mb-8 italic text-gray-700">
      <p>{content}</p>
      {author && <footer className="mt-2 text-sm text-gray-500">— {author}</footer>}
    </blockquote>
  )
}

interface ListBlockProps {
  items: string[]
  ordered?: boolean
}

export function ListBlock({ items, ordered = false }: ListBlockProps) {
  if (ordered) {
    return (
      <ol className="list-decimal pl-5 mb-8 space-y-2">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    )
  }

  return (
    <ul className="list-disc pl-5 mb-8 space-y-2">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

interface TableBlockProps {
  headers: string[]
  rows: string[][]
}

export function TableBlock({ headers, rows }: TableBlockProps) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-200 px-4 py-2 text-left">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border border-gray-200 px-4 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface CalloutBlockProps {
  content: string
  type?: "info" | "warning" | "success" | "error"
}

export function CalloutBlock({ content, type = "info" }: CalloutBlockProps) {
  const styles = {
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  }

  return (
    <div className={`p-4 border-l-4 rounded-r-md mb-8 ${styles[type]}`}>
      <p>{content}</p>
    </div>
  )
}

interface FileBlockProps {
  name: string
  url: string
  size?: string
}

export function FileBlock({ name, url, size }: FileBlockProps) {
  return (
    <div className="mb-8">
      <Link
        href={url}
        className="flex items-center p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <span className="flex-1">{name}</span>
        {size && <span className="text-sm text-gray-500">{size}</span>}
      </Link>
    </div>
  )
}
