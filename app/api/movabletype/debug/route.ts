import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';

export async function GET(request: NextRequest) {
  try {
    console.log('Debugging MovableType API endpoints...');
    
    const api = createMovableTypeAPI();
    
    // 認証を実行
    console.log('Starting authentication...');
    const authResult = await api.authenticate();
    console.log('Authentication result:', {
      sessionId: authResult.sessionId ? '***' : 'NOT_SET',
      accessToken: authResult.accessToken ? '***' : 'NOT_SET',
      expiresIn: authResult.expiresIn,
    });
    
    // 1. サイト情報を取得
    console.log('1. Testing site information...');
    const siteUrl = `${process.env.MOVABLETYPE_API_BASE_URL}/v6/sites/${process.env.MOVABLETYPE_SITE_ID}`;
    console.log('Site URL:', siteUrl);
    
    const siteResponse = await fetch(siteUrl, {
      headers: {
        'X-MT-Authorization': `MTAuth accessToken=${api['accessToken']}`,
      },
    });
    
    const siteInfo: any = siteResponse.ok ? await siteResponse.json() : null;
    console.log('Site info:', siteInfo);

    // 2. コンテンツタイプ一覧を取得
    console.log('2. Testing content types...');
    const contentTypesUrl = `${process.env.MOVABLETYPE_API_BASE_URL}/v6/sites/${process.env.MOVABLETYPE_SITE_ID}/contentTypes`;
    console.log('Content types URL:', contentTypesUrl);
    
    const contentTypesResponse = await fetch(contentTypesUrl, {
      headers: {
        'X-MT-Authorization': `MTAuth accessToken=${api['accessToken']}`,
      },
    });
    
    const contentTypes: any = contentTypesResponse.ok ? await contentTypesResponse.json() : null;
    console.log('Content types:', contentTypes);

    // 3. 各コンテンツタイプのエントリーをテスト
    const testResults = [];
    
    if (contentTypes && contentTypes.items) {
      for (const contentType of contentTypes.items.slice(0, 5)) { // 最初の5つをテスト
        console.log(`3. Testing content type: ${contentType.name}`);
        
        try {
          const entriesUrl = `${process.env.MOVABLETYPE_API_BASE_URL}/v6/sites/${process.env.MOVABLETYPE_SITE_ID}/contentTypes/${contentType.name}/data?limit=1`;
          console.log('Entries URL:', entriesUrl);
          
          const entriesResponse = await fetch(entriesUrl, {
            headers: {
              'X-MT-Authorization': `MTAuth accessToken=${api['accessToken']}`,
            },
          });
          
          const entries: any = entriesResponse.ok ? await entriesResponse.json() : null;
          
          testResults.push({
            contentType: contentType.name,
            label: contentType.label,
            success: entriesResponse.ok,
            status: entriesResponse.status,
            totalResults: entries?.totalResults || 0,
            itemsCount: entries?.items?.length || 0,
            url: entriesUrl,
          });
          
          console.log(`Content type ${contentType.name} test result:`, {
            success: entriesResponse.ok,
            status: entriesResponse.status,
            totalResults: entries?.totalResults || 0,
          });
        } catch (error) {
          testResults.push({
            contentType: contentType.name,
            label: contentType.label,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            url: `${process.env.MOVABLETYPE_API_BASE_URL}/v6/sites/${process.env.MOVABLETYPE_SITE_ID}/contentTypes/${contentType.name}/data?limit=1`,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      auth: {
        sessionId: authResult.sessionId ? '***' : 'NOT_SET',
        accessToken: authResult.accessToken ? '***' : 'NOT_SET',
        expiresIn: authResult.expiresIn,
      },
      siteInfo,
      contentTypes: contentTypes?.items || [],
      testResults,
      config: {
        baseUrl: process.env.MOVABLETYPE_API_BASE_URL,
        siteId: process.env.MOVABLETYPE_SITE_ID,
        username: process.env.MOVABLETYPE_USERNAME ? '***' : 'NOT_SET',
      },
      endpoints: {
        site: siteUrl,
        contentTypes: contentTypesUrl,
      }
    });

  } catch (error) {
    console.error('Debug failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      error: 'Debug failed',
      details: errorMessage,
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 