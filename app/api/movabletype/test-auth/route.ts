import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing MovableType authentication...');
    
    // 環境変数の確認（パスワードは隠す）
    const config = {
      baseUrl: process.env.MOVABLETYPE_API_BASE_URL,
      username: process.env.MOVABLETYPE_USERNAME,
      password: process.env.MOVABLETYPE_PASSWORD ? '***' : 'NOT_SET',
      clientId: process.env.MOVABLETYPE_CLIENT_ID,
      siteId: process.env.MOVABLETYPE_SITE_ID,
    };
    
    console.log('Configuration:', config);

    // 必須環境変数のチェック
    const missingVars = [];
    if (!process.env.MOVABLETYPE_API_BASE_URL) missingVars.push('MOVABLETYPE_API_BASE_URL');
    if (!process.env.MOVABLETYPE_USERNAME) missingVars.push('MOVABLETYPE_USERNAME');
    if (!process.env.MOVABLETYPE_PASSWORD) missingVars.push('MOVABLETYPE_PASSWORD');
    if (!process.env.MOVABLETYPE_SITE_ID) missingVars.push('MOVABLETYPE_SITE_ID');

    if (missingVars.length > 0) {
      return NextResponse.json({
        error: 'Missing environment variables',
        missing: missingVars,
        config: config
      }, { status: 400 });
    }

    // APIクライアントを作成
    const api = createMovableTypeAPI();
    
    // 認証をテスト
    console.log('Attempting authentication...');
    const authResult = await api.authenticate();
    
    console.log('Authentication successful:', {
      sessionId: authResult.sessionId ? '***' : 'NOT_SET',
      accessToken: authResult.accessToken ? '***' : 'NOT_SET',
      expiresIn: authResult.expiresIn,
    });

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      auth: {
        sessionId: authResult.sessionId ? '***' : 'NOT_SET',
        accessToken: authResult.accessToken ? '***' : 'NOT_SET',
        expiresIn: authResult.expiresIn,
        remember: authResult.remember,
      },
      config: config
    });

  } catch (error) {
    console.error('Authentication test failed:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json({
      error: 'Authentication test failed',
      details: errorMessage,
      timestamp: new Date().toISOString(),
      config: {
        baseUrl: process.env.MOVABLETYPE_API_BASE_URL,
        username: process.env.MOVABLETYPE_USERNAME,
        password: process.env.MOVABLETYPE_PASSWORD ? '***' : 'NOT_SET',
        clientId: process.env.MOVABLETYPE_CLIENT_ID,
        siteId: process.env.MOVABLETYPE_SITE_ID,
      }
    }, { status: 500 });
  }
} 