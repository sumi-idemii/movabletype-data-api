import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';
import { getContentTypeId } from '@/lib/movabletype-config';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type'); // 'products' or 'cases'
  
  try {
    if (!type || (type !== 'products' && type !== 'cases')) {
      return NextResponse.json({
        error: 'Invalid type parameter. Must be "products" or "cases"'
      }, { status: 400 });
    }

    // APIクライアントを作成
    const api = createMovableTypeAPI();
    
    // 認証を実行
    await api.authenticate();
    
    // コンテンツタイプIDを取得
    const contentTypeId = getContentTypeId(type.toUpperCase() as 'PRODUCTS' | 'CASES');
    
    // エントリーを取得
    const result = await api.getEntries(contentTypeId, {
      limit: 5,
      status: 'published',
      includeCategories: true,
      includeTags: true,
      includeCustomFields: true,
    });

    // エンドポイント情報を追加
    const siteId = process.env.MOVABLETYPE_SITE_ID || '3';
    const endpoint = `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`;

    return NextResponse.json({
      ...result,
      endpoint,
      status: 200,
    });

  } catch (error) {
    console.error(`${type} API error:`, error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const siteId = process.env.MOVABLETYPE_SITE_ID || '3';
    const contentTypeId = type === 'products' ? getContentTypeId('PRODUCTS') : getContentTypeId('CASES');
    
    return NextResponse.json({
      error: errorMessage,
      endpoint: `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`,
      status: 500,
    }, { status: 500 });
  }
} 