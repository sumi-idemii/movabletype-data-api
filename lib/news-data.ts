import type { NewsItem } from "@/types/news"

// サンプルニュースデータ
export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "株式会社気づきが新サービス「インサイトアナライザー」をリリース",
    date: "2023-05-15",
    category: "プレスリリース",
    summary: "データ分析と人工知能を組み合わせた新サービス「インサイトアナライザー」の提供を開始しました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2023年5月15日より、データ分析と人工知能を組み合わせた新サービス「インサイトアナライザー」の提供を開始しました。</p><p>このサービスは、企業が保有する大量のデータから有益な洞察を自動的に抽出し、ビジネス戦略の立案や意思決定をサポートします。</p>",
      },
      {
        type: "heading",
        id: "service-overview",
        content: "サービス概要",
        level: 2,
      },
      {
        type: "text",
        id: "overview-text",
        content: "<p>「インサイトアナライザー」は、以下の特徴を持つデータ分析サービスです。</p>",
      },
      {
        type: "list",
        id: "features",
        items: [
          "高度な機械学習アルゴリズムによるデータ分析",
          "直感的なダッシュボードでの分析結果の可視化",
          "自然言語処理による洞察のレポート生成",
          "リアルタイムデータ連携と分析の自動化",
        ],
        ordered: false,
      },
      {
        type: "image",
        id: "service-image",
        src: "/placeholder.svg?height=400&width=600&text=インサイトアナライザー",
        alt: "インサイトアナライザーのダッシュボード画面",
        caption: "インサイトアナライザーのダッシュボード画面",
      },
      {
        type: "heading",
        id: "target",
        content: "対象ユーザー",
        level: 2,
      },
      {
        type: "text",
        id: "target-text",
        content: "<p>本サービスは、以下のようなニーズを持つ企業や組織を対象としています。</p>",
      },
      {
        type: "list",
        id: "target-list",
        items: [
          "大量のデータから有益な情報を抽出したい企業",
          "データドリブンな意思決定を強化したい経営者",
          "マーケティング戦略の効果を定量的に測定したい担当者",
          "顧客行動の傾向を把握し、サービス改善に活かしたい事業部門",
        ],
        ordered: false,
      },
      {
        type: "quote",
        id: "ceo-quote",
        content:
          "「インサイトアナライザー」は、データの海から真の「気づき」を見つけ出し、企業の成長を加速させるパートナーとなります。",
        author: "株式会社気づき 代表取締役 気づき太郎",
      },
      {
        type: "heading",
        id: "price",
        content: "料金プラン",
        level: 2,
      },
      {
        type: "table",
        id: "price-table",
        headers: ["プラン", "月額料金", "分析可能データ量", "主な機能"],
        rows: [
          ["スタンダード", "98,000円〜", "月間100GB", "基本分析機能、ダッシュボード"],
          ["プロフェッショナル", "198,000円〜", "月間500GB", "高度な分析機能、API連携、優先サポート"],
          ["エンタープライズ", "要問合せ", "無制限", "カスタム分析モデル、専任コンサルタント"],
        ],
      },
      {
        type: "callout",
        id: "campaign",
        content: "2023年6月末までのお申し込みで、初期設定費用が無料になるキャンペーンを実施中です。",
        calloutType: "info",
      },
      {
        type: "heading",
        id: "contact",
        content: "お問い合わせ",
        level: 2,
      },
      {
        type: "text",
        id: "contact-text",
        content: "<p>サービスの詳細や導入に関するご相談は、以下のお問い合わせフォームよりお願いいたします。</p>",
      },
      {
        type: "file",
        id: "brochure",
        name: "インサイトアナライザー サービス資料.pdf",
        url: "#",
        size: "2.4MB",
      },
    ],
    tags: ["新サービス", "データ分析", "AI", "DX"],
  },
  {
    id: 2,
    title: "東京本社オフィスを移転しました",
    date: "2023-04-03",
    category: "お知らせ",
    summary:
      "2023年4月より、東京本社を千代田区神田に移転しました。新オフィスでは、より創造的な環境でサービス提供を行ってまいります。",
    content: [
      {
        type: "text",
        id: "intro",
        content: "<p>株式会社気づきは、2023年4月3日より、東京本社を千代田区神田に移転しました。</p>",
      },
    ],
    tags: ["オフィス移転", "東京本社"],
  },
  {
    id: 3,
    title: "大阪支社を新設しました",
    date: "2023-03-01",
    category: "お知らせ",
    summary: "関西地域のお客様へのサービス強化のため、大阪市中央区に新たに支社を開設しました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、関西地域のお客様へのサービス強化のため、2023年3月1日に大阪市中央区に支社を開設しました。</p>",
      },
    ],
    tags: ["大阪支社", "関西", "拠点拡大"],
  },
  {
    id: 4,
    title: "製品開発部門の責任者に山田健太が就任",
    date: "2023-02-15",
    category: "人事",
    summary: "2023年2月より、製品開発部門の新責任者として山田健太が就任しました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2023年2月15日付で、製品開発部門の新責任者として山田健太が就任したことをお知らせします。</p>",
      },
    ],
    tags: ["人事異動", "製品開発"],
  },
  {
    id: 5,
    title: "「気づきアプリ」のバージョン2.0をリリース",
    date: "2023-01-20",
    category: "製品情報",
    summary:
      "当社の主力製品「気づきアプリ」の最新バージョンをリリースしました。UI/UXの刷新と新機能の追加により、より使いやすくなりました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2023年1月20日に、主力製品「気づきアプリ」のバージョン2.0をリリースしました。</p>",
      },
    ],
    tags: ["アプリ", "アップデート", "新機能"],
  },
  {
    id: 6,
    title: "年末年始の営業日のお知らせ",
    date: "2022-12-15",
    category: "お知らせ",
    summary: "2022年12月29日から2023年1月4日まで年末年始休業とさせていただきます。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>平素は格別のご高配を賜り、厚く御礼申し上げます。</p><p>弊社の年末年始休業期間について、下記の通りお知らせいたします。</p>",
      },
    ],
    tags: ["営業日", "年末年始"],
  },
  {
    id: 7,
    title: "「第10回ビジネスイノベーションアワード」で最優秀賞を受賞",
    date: "2022-11-30",
    category: "受賞",
    summary: "当社の「気づきエンジン」が、革新的なビジネスソリューションとして評価され、最優秀賞を受賞しました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2022年11月30日に開催された「第10回ビジネスイノベーションアワード」において、当社の「気づきエンジン」が最優秀賞を受賞したことをお知らせします。</p>",
      },
    ],
    tags: ["受賞", "イノベーション", "気づきエンジン"],
  },
  {
    id: 8,
    title: "「ビジネス変革セミナー」を開催します",
    date: "2022-10-25",
    category: "イベント",
    summary: "2022年11月15日に、DXによるビジネス変革をテーマにしたセミナーを東京で開催します。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2022年11月15日に、「DXによるビジネス変革」をテーマにしたセミナーを東京で開催します。</p>",
      },
    ],
    tags: ["セミナー", "DX", "ビジネス変革"],
  },
  {
    id: 9,
    title: "採用情報を更新しました",
    date: "2022-09-20",
    category: "採用",
    summary:
      "2023年度新卒採用および中途採用の情報を更新しました。エンジニアやコンサルタントなど複数のポジションで募集を行っています。",
    content: [
      {
        type: "text",
        id: "intro",
        content: "<p>株式会社気づきは、2023年度新卒採用および中途採用の情報を更新しました。</p>",
      },
    ],
    tags: ["採用", "キャリア", "求人"],
  },
  {
    id: 10,
    title: "「気づきクラウド」のサービス提供を開始",
    date: "2022-08-10",
    category: "プレスリリース",
    summary: "企業のデータ活用を支援するクラウドサービス「気づきクラウド」の提供を開始しました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2022年8月10日より、企業のデータ活用を支援するクラウドサービス「気づきクラウド」の提供を開始しました。</p>",
      },
    ],
    tags: ["クラウド", "新サービス", "データ活用"],
  },
  {
    id: 11,
    title: "夏季休業のお知らせ",
    date: "2022-07-25",
    category: "お知らせ",
    summary: "2022年8月11日から8月16日まで夏季休業とさせていただきます。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>平素は格別のご高配を賜り、厚く御礼申し上げます。</p><p>弊社の夏季休業期間について、下記の通りお知らせいたします。</p>",
      },
    ],
    tags: ["営業日", "夏季休業"],
  },
  {
    id: 12,
    title: "「気づきコンサルティング」サービスをリニューアル",
    date: "2022-06-15",
    category: "サービス",
    summary: "お客様のニーズに合わせて、「気づきコンサルティング」サービスを全面的にリニューアルしました。",
    content: [
      {
        type: "text",
        id: "intro",
        content:
          "<p>株式会社気づきは、2022年6月15日より、お客様のニーズに合わせて「気づきコンサルティング」サービスを全面的にリニューアルしました。</p>",
      },
    ],
    tags: ["コンサルティング", "サービス改善"],
  },
]

// ニュースデータを取得する関数
export function getNewsItems(page = 1, pageSize = 10) {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = newsData.slice(startIndex, endIndex)

  return {
    items: paginatedItems,
    totalItems: newsData.length,
    totalPages: Math.ceil(newsData.length / pageSize),
    currentPage: page,
  }
}

// 特定のニュース記事を取得する関数
export function getNewsItem(id: number) {
  return newsData.find((item) => item.id === id)
}

// 年度別のニュース記事を取得する関数
export function getNewsByYear(year: number, page = 1, pageSize = 10) {
  const yearItems = newsData.filter((item) => {
    const itemYear = new Date(item.date).getFullYear()
    return itemYear === year
  })

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedItems = yearItems.slice(startIndex, endIndex)

  return {
    items: paginatedItems,
    totalItems: yearItems.length,
    totalPages: Math.ceil(yearItems.length / pageSize),
    currentPage: page,
    year,
  }
}

// 利用可能な年度の一覧を取得する関数
export function getAvailableYears() {
  const years = new Set<number>()

  newsData.forEach((item) => {
    const year = new Date(item.date).getFullYear()
    years.add(year)
  })

  return Array.from(years).sort((a, b) => b - a) // 降順にソート
}

// 最新のニュース記事を取得する関数
export function getLatestNews(count = 3) {
  return newsData.slice(0, count)
}
