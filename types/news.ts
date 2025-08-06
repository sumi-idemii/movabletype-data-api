export interface NewsItem {
  id: number
  title: string
  date: string
  category: string
  summary: string
  content: ContentBlock[]
  tags?: string[]
  image?: string
}

export type ContentBlockType = "text" | "heading" | "image" | "quote" | "list" | "table" | "callout" | "file"

export interface BaseContentBlock {
  type: ContentBlockType
  id: string
}

export interface TextBlock extends BaseContentBlock {
  type: "text"
  content: string
}

export interface HeadingBlock extends BaseContentBlock {
  type: "heading"
  content: string
  level: 2 | 3 | 4
}

export interface ImageBlock extends BaseContentBlock {
  type: "image"
  src: string
  alt: string
  caption?: string
}

export interface QuoteBlock extends BaseContentBlock {
  type: "quote"
  content: string
  author?: string
}

export interface ListBlock extends BaseContentBlock {
  type: "list"
  items: string[]
  ordered: boolean
}

export interface TableBlock extends BaseContentBlock {
  type: "table"
  headers: string[]
  rows: string[][]
}

export interface CalloutBlock extends BaseContentBlock {
  type: "callout"
  content: string
  calloutType: "info" | "warning" | "success" | "error"
}

export interface FileBlock extends BaseContentBlock {
  type: "file"
  name: string
  url: string
  size?: string
}

export type ContentBlock =
  | TextBlock
  | HeadingBlock
  | ImageBlock
  | QuoteBlock
  | ListBlock
  | TableBlock
  | CalloutBlock
  | FileBlock
