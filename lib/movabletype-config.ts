// MovableType Data API の設定

export const MOVABLETYPE_CONFIG = {
  // コンテンツタイプID
  CONTENT_TYPES: {
    PRODUCTS: 2,  // 製品詳細のID
    CASES: 3,     // 事例紹介詳細のID
  },
  
  // サイトID
  SITE_ID: 3,  // 正しいサイトID
  
  // デフォルト設定
  DEFAULTS: {
    LIMIT: 10,
    OFFSET: 0,
    STATUS: 'published',
  },
  
  // API設定
  API: {
    VERSION: 'v5',
    CLIENT_ID: 'movabletype-data-api',
  },
} as const;

// コンテンツタイプ名からIDを取得するヘルパー関数
export function getContentTypeId(name: keyof typeof MOVABLETYPE_CONFIG.CONTENT_TYPES): number {
  return MOVABLETYPE_CONFIG.CONTENT_TYPES[name];
}

// コンテンツタイプIDから名前を取得するヘルパー関数
export function getContentTypeName(id: number): string | null {
  const entries = Object.entries(MOVABLETYPE_CONFIG.CONTENT_TYPES);
  const entry = entries.find(([_, value]) => value === id);
  return entry ? entry[0].toLowerCase() : null;
} 