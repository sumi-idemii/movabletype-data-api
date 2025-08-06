import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // 環境変数から認証情報を取得
  const username = process.env.BASIC_AUTH_USERNAME
  const password = process.env.BASIC_AUTH_PASSWORD

  // デバッグ用ログ（本番環境では削除）
  console.log('Basic auth check:', {
    hasUsername: !!username,
    hasPassword: !!password,
    path: request.nextUrl.pathname
  })

  // 認証情報が設定されていない場合は認証をスキップ
  if (!username || !password) {
    console.log('Basic auth credentials not configured')
    return NextResponse.next()
  }

  // Authorization ヘッダーを取得
  const authHeader = request.headers.get('authorization')

  if (authHeader && authHeader.startsWith('Basic ')) {
    try {
      // Basic認証の値をデコード
      const encodedCredentials = authHeader.replace('Basic ', '')
      const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString('utf-8')
      const [providedUsername, providedPassword] = decodedCredentials.split(':')

      // 認証情報をチェック
      if (providedUsername === username && providedPassword === password) {
        return NextResponse.next()
      }
    } catch (error) {
      console.error('Error decoding basic auth:', error)
    }
  }

  // 認証が失敗した場合、401レスポンスを返す
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 