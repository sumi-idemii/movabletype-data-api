// MovableType Data API の設定とユーティリティ

export interface MovableTypeConfig {
  baseUrl: string;
  username: string;
  password: string;
  clientId: string;
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
  // Content Data用の追加フィールド
  label?: string;
  data?: Array<{
    id: number;
    label: string;
    type: string;
    data: any;
    format?: string;
  }>;
  permalink?: string;
  basename?: string;
  blog?: {
    id: string;
  };
  date?: string;
  unpublishedDate?: string | null;
  updatable?: boolean;
}

export interface MovableTypeListResponse {
  totalResults: number;
  items: MovableTypeEntry[];
}

export interface MovableTypeContentType {
  id: string;
  name: string;
  label: string;
  description?: string;
}

export interface MovableTypeContentTypeListResponse {
  totalResults: number;
  items: MovableTypeContentType[];
}

export interface AuthenticationResponse {
  accessToken: string;
  sessionId: string;
  expiresIn: number;
  remember: boolean;
}

export interface TokenResponse {
  accessToken: string;
  expiresIn: number;
}

export class MovableTypeAPI {
  private config: MovableTypeConfig;
  private sessionId: string | null = null;
  private accessToken: string | null = null;

  constructor(config: MovableTypeConfig) {
    this.config = config;
  }

  // 認証を行う
  async authenticate(): Promise<AuthenticationResponse> {
    const formData = new URLSearchParams();
    formData.append('username', this.config.username);
    formData.append('password', this.config.password);
    formData.append('clientId', this.config.clientId);
    formData.append('remember', '1');

    const authUrl = `${this.config.baseUrl}/v6/authentication`;

    try {
      const response = await fetch(authUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Authentication failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          url: authUrl,
        });
        throw new Error(`Authentication failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const authData = await response.json();
      this.sessionId = authData.sessionId;
      this.accessToken = authData.accessToken;
      
      return authData;
    } catch (error) {
      console.error('Authentication error details:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        config: {
          baseUrl: this.config.baseUrl,
          username: this.config.username,
          clientId: this.config.clientId,
          siteId: this.config.siteId,
          passwordSet: !!this.config.password,
        }
      });
      throw error;
    }
  }

  // アクセストークンを取得
  async getAccessToken(): Promise<TokenResponse> {
    if (!this.sessionId) {
      await this.authenticate();
    }

    const formData = new URLSearchParams();
    formData.append('clientId', this.config.clientId);

    const response = await fetch(`${this.config.baseUrl}/v6/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-MT-Authorization': this.sessionId!,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Token request failed: ${response.status} ${response.statusText}`);
    }

    const tokenData = await response.json();
    this.accessToken = tokenData.accessToken;
    
    return tokenData;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.accessToken) {
      headers['X-MT-Authorization'] = `MTAuth accessToken=${this.accessToken}`;
    }

    return headers;
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<Response> {
    // アクセストークンがない場合は取得
    if (!this.accessToken) {
      await this.getAccessToken();
    }

    const url = `${this.config.baseUrl}/v6/sites/${this.config.siteId}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', {
        url,
        status: response.status,
        statusText: response.statusText,
        errorText,
      });
      throw new Error(`MovableType API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response;
  }

  // エントリー一覧を取得
  async getEntries(contentTypeId: string | number, options: {
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
    
    // MovableType Data API v6の正しいエンドポイント構造
    // コンテンツタイプのデータは /contentTypes/{id}/data エンドポイントを使用
    const endpoint = `/contentTypes/${contentTypeId.toString()}/data${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest(endpoint);
    const data = await response.json();
    
    // Content Dataのレスポンス構造をMovableTypeListResponseに変換
    if (data.items && Array.isArray(data.items)) {
      const transformedItems = data.items.map((item: any) => ({
        id: item.id.toString(),
        title: item.label || item.title || '',
        body: item.data?.find((field: any) => field.label === '本文')?.data || '',
        excerpt: item.data?.find((field: any) => field.label === '概要文')?.data || '',
        createdDate: item.createdDate,
        modifiedDate: item.modifiedDate,
        status: item.status,
        author: {
          id: item.author?.id || '',
          name: item.author?.displayName || '',
        },
        categories: [],
        tags: [],
        customFields: {},
        // Content Data用の追加フィールド
        label: item.label,
        data: item.data,
        permalink: item.permalink,
        basename: item.basename,
        blog: item.blog,
        date: item.date,
        unpublishedDate: item.unpublishedDate,
        updatable: item.updatable,
      }));
      
      return {
        totalResults: data.totalResults,
        items: transformedItems,
      };
    }
    
    return data;
  }

  // 特定のエントリーを取得
  async getEntry(contentTypeId: string | number, entryId: string, options: {
    includeCategories?: boolean;
    includeTags?: boolean;
    includeCustomFields?: boolean;
  } = {}): Promise<MovableTypeEntry> {
    const params = new URLSearchParams();
    
    if (options.includeCategories) params.append('includeCategories', 'true');
    if (options.includeTags) params.append('includeTags', 'true');
    if (options.includeCustomFields) params.append('includeCustomFields', 'true');

    const queryString = params.toString();
    const endpoint = `/content_types/${contentTypeId.toString()}/entries/${entryId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.makeRequest(endpoint);
    return response.json();
  }

  // コンテンツタイプの情報を取得
  async getContentType(contentTypeId: string | number) {
    const endpoint = `/content_types/${contentTypeId.toString()}`;
    const response = await this.makeRequest(endpoint);
    return response.json();
  }

  // コンテンツタイプ一覧を取得
  async getContentTypes(): Promise<MovableTypeContentTypeListResponse> {
    const endpoint = `/content_types`;
    const response = await this.makeRequest(endpoint);
    return response.json();
  }

  // コンテンツタイプ名からIDを取得
  async getContentTypeIdByName(name: string): Promise<string | null> {
    try {
      const contentTypes = await this.getContentTypes();
      const contentType = contentTypes.items.find(ct => ct.name === name || ct.label === name);
      return contentType ? contentType.id : null;
    } catch (error) {
      console.error('Error getting content type ID by name:', error);
      return null;
    }
  }
}

// デフォルト設定（環境変数から取得）
export function createMovableTypeAPI(): MovableTypeAPI {
  const config: MovableTypeConfig = {
    baseUrl: process.env.MOVABLETYPE_API_BASE_URL || '',
    username: process.env.MOVABLETYPE_USERNAME || '',
    password: process.env.MOVABLETYPE_PASSWORD || '',
    clientId: process.env.MOVABLETYPE_CLIENT_ID || 'movabletype-data-api',
    siteId: process.env.MOVABLETYPE_SITE_ID || '3', // デフォルトサイトID
  };

  if (!config.baseUrl || !config.username || !config.password) {
    const missingVars = [];
    if (!config.baseUrl) missingVars.push('MOVABLETYPE_API_BASE_URL');
    if (!config.username) missingVars.push('MOVABLETYPE_USERNAME');
    if (!config.password) missingVars.push('MOVABLETYPE_PASSWORD');
    
    throw new Error(`MovableType API configuration is incomplete. Missing environment variables: ${missingVars.join(', ')}. Current config: baseUrl=${config.baseUrl ? 'SET' : 'NOT_SET'}, username=${config.username ? 'SET' : 'NOT_SET'}, password=${config.password ? 'SET' : 'NOT_SET'}, siteId=${config.siteId}`);
  }

  return new MovableTypeAPI(config);
} 