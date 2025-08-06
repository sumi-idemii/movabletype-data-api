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
}

export interface MovableTypeListResponse {
  totalResults: number;
  items: MovableTypeEntry[];
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

    const response = await fetch(`${this.config.baseUrl}/v5/authentication`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const authData = await response.json();
    this.sessionId = authData.sessionId;
    this.accessToken = authData.accessToken;
    
    return authData;
  }

  // アクセストークンを取得
  async getAccessToken(): Promise<TokenResponse> {
    if (!this.sessionId) {
      await this.authenticate();
    }

    const formData = new URLSearchParams();
    formData.append('clientId', this.config.clientId);

    const response = await fetch(`${this.config.baseUrl}/v5/token`, {
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

    const url = `${this.config.baseUrl}/v5/sites/${this.config.siteId}${endpoint}`;
    
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
    username: process.env.MOVABLETYPE_USERNAME || '',
    password: process.env.MOVABLETYPE_PASSWORD || '',
    clientId: process.env.MOVABLETYPE_CLIENT_ID || 'movabletype-data-api',
    siteId: process.env.MOVABLETYPE_SITE_ID || '',
  };

  if (!config.baseUrl || !config.username || !config.password || !config.siteId) {
    throw new Error('MovableType API configuration is incomplete. Please check environment variables.');
  }

  return new MovableTypeAPI(config);
} 