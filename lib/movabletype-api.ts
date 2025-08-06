// MovableType Data API の設定とユーティリティ

export interface MovableTypeConfig {
  baseUrl: string;
  apiKey: string;
  siteId: string;
}

export interface MovableTypeEntry {
  id: string;
  title: string;
  body: string;
  excerpt: string;
  createdDate: string;
  modifiedDate: string;
  status: string;
  author: {
    id: string;
    name: string;
  };
  categories: Array<{
    id: string;
    label: string;
  }>;
  tags: Array<{
    id: string;
    name: string;
  }>;
  customFields: Record<string, any>;
}

export interface MovableTypeListResponse {
  totalResults: number;
  items: MovableTypeEntry[];
}

export class MovableTypeAPI {
  private config: MovableTypeConfig;

  constructor(config: MovableTypeConfig) {
    this.config = config;
  }

  private getHeaders(): HeadersInit {
    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    const url = `${this.config.baseUrl}/sites/${this.config.siteId}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`MovableType API error: ${response.status} ${response.statusText}`);
    }

    return response;
  }

  // エントリー一覧を取得
  async getEntries(contentType: string, options: {
    limit?: number;
    offset?: number;
    status?: string;
    includeCategories?: boolean;
    includeTags?: boolean;
    includeCustomFields?: boolean;
  } = {}): Promise<MovableTypeListResponse> {
    const params = new URLSearchParams();
    
    if (options.limit) params.append('limit', options.limit.toString());
    if (options.offset) params.append('offset', options.offset.toString());
    if (options.status) params.append('status', options.status);
    if (options.includeCategories) params.append('includeCategories', 'true');
    if (options.includeTags) params.append('includeTags', 'true');
    if (options.includeCustomFields) params.append('includeCustomFields', 'true');

    const queryString = params.toString();
    const endpoint = `/content_types/${contentType}/entries${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest(endpoint);
    return response.json();
  }

  // 特定のエントリーを取得
  async getEntry(contentType: string, entryId: string, options: {
    includeCategories?: boolean;
    includeTags?: boolean;
    includeCustomFields?: boolean;
  } = {}): Promise<MovableTypeEntry> {
    const params = new URLSearchParams();
    
    if (options.includeCategories) params.append('includeCategories', 'true');
    if (options.includeTags) params.append('includeTags', 'true');
    if (options.includeCustomFields) params.append('includeCustomFields', 'true');

    const queryString = params.toString();
    const endpoint = `/content_types/${contentType}/entries/${entryId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest(endpoint);
    return response.json();
  }

  // コンテンツタイプの情報を取得
  async getContentType(contentType: string) {
    const endpoint = `/content_types/${contentType}`;
    const response = await this.makeRequest(endpoint);
    return response.json();
  }
}

// デフォルト設定（環境変数から取得）
export function createMovableTypeAPI(): MovableTypeAPI {
  const config: MovableTypeConfig = {
    baseUrl: process.env.MOVABLETYPE_API_BASE_URL || '',
    apiKey: process.env.MOVABLETYPE_API_KEY || '',
    siteId: process.env.MOVABLETYPE_SITE_ID || '',
  };

  if (!config.baseUrl || !config.apiKey || !config.siteId) {
    throw new Error('MovableType API configuration is incomplete. Please check environment variables.');
  }

  return new MovableTypeAPI(config);
} 