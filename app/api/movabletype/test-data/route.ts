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
    
    // 直接MovableType Data APIを呼び出してデータを取得
    const directUrl = `https://movabletype.idemii.work/mt/mt-data-api.cgi/v6/sites/3/contentTypes/${contentTypeId}/data?limit=5`;
    
    const directResponse = await fetch(directUrl, {
      headers: {
        'X-MT-Authorization': `MTAuth accessToken=${api['accessToken']}`,
        'Content-Type': 'application/json',
      },
    });
    
    const directData = await directResponse.json();
    
    // データを適切な形式に変換
    const transformedItems = directData.items?.map((item: any) => ({
      id: item.id.toString(),
      title: item.label || '',
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
    })) || [];

    // エンドポイント情報を追加
    const siteId = process.env.MOVABLETYPE_SITE_ID || '3';
    const endpoint = `/v6/sites/${siteId}/contentTypes/${contentTypeId}/data?limit=5`;

    return NextResponse.json({
      totalResults: directData.totalResults,
      items: transformedItems,
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
      endpoint: `/v6/sites/${siteId}/contentTypes/${contentTypeId.toString()}/data?limit=5`,
      status: 500,
    }, { status: 500 });
  }
} 