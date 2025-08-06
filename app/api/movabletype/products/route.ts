import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0;
    const status = searchParams.get('status') || 'published';

    console.log('Fetching products with params:', { limit, offset, status });

    const api = createMovableTypeAPI();
    
    // コンテンツタイプIDを取得（名前から）
    const contentTypeId = await api.getContentTypeIdByName('products');
    if (!contentTypeId) {
      return NextResponse.json(
        { error: 'Content type "products" not found' },
        { status: 404 }
      );
    }
    
    const products = await api.getEntries(contentTypeId, {
      limit,
      offset,
      status,
      includeCategories: true,
      includeTags: true,
      includeCustomFields: true,
    });

    console.log('Products fetched successfully:', products);
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    
    // より詳細なエラー情報を返す
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : '';
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      config: {
        baseUrl: process.env.MOVABLETYPE_API_BASE_URL,
        username: process.env.MOVABLETYPE_USERNAME ? '***' : 'NOT_SET',
        password: process.env.MOVABLETYPE_PASSWORD ? '***' : 'NOT_SET',
        clientId: process.env.MOVABLETYPE_CLIENT_ID,
        siteId: process.env.MOVABLETYPE_SITE_ID,
      }
    });

    return NextResponse.json(
      { 
        error: 'Failed to fetch products',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 