'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function TestAuthPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testAuth = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/movabletype/test-auth');
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.details || data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>MovableType 認証テスト</CardTitle>
          <CardDescription>
            MovableType Data APIの認証設定をテストします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testAuth} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'テスト中...' : '認証テストを実行'}
          </Button>

          {loading && (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                <strong>エラー:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="space-y-4">
              <Alert variant={result.success ? "default" : "destructive"}>
                <AlertDescription>
                  <strong>結果:</strong> {result.message || result.error}
                </AlertDescription>
              </Alert>

              {result.config && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">環境変数設定</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">MOVABLETYPE_API_BASE_URL:</span>
                        <Badge variant={result.config.baseUrl ? "default" : "destructive"}>
                          {result.config.baseUrl || 'NOT_SET'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">MOVABLETYPE_USERNAME:</span>
                        <Badge variant={result.config.username ? "default" : "destructive"}>
                          {result.config.username || 'NOT_SET'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">MOVABLETYPE_PASSWORD:</span>
                        <Badge variant={result.config.password ? "default" : "destructive"}>
                          {result.config.password}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">MOVABLETYPE_CLIENT_ID:</span>
                        <Badge variant={result.config.clientId ? "default" : "destructive"}>
                          {result.config.clientId || 'NOT_SET'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">MOVABLETYPE_SITE_ID:</span>
                        <Badge variant={result.config.siteId ? "default" : "destructive"}>
                          {result.config.siteId || 'NOT_SET'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.auth && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">認証情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(result.auth, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {result.missing && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm text-red-600">不足している環境変数</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {result.missing.map((varName: string) => (
                        <li key={varName}>{varName}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>環境変数の確認方法</CardTitle>
          <CardDescription>
            Vercelダッシュボードで以下の環境変数が設定されているか確認してください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="bg-gray-100 p-3 rounded">
              <strong>MOVABLETYPE_API_BASE_URL</strong><br/>
              <span className="text-gray-600">例: https://your-domain.com/mt/mt-data-api.cgi</span>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>MOVABLETYPE_USERNAME</strong><br/>
              <span className="text-gray-600">MovableTypeのユーザー名</span>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>MOVABLETYPE_PASSWORD</strong><br/>
              <span className="text-gray-600">Webサービスパスワード（通常のログインパスワードとは異なります）</span>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>MOVABLETYPE_CLIENT_ID</strong><br/>
              <span className="text-gray-600">任意の文字列（例: movabletype-data-api）</span>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <strong>MOVABLETYPE_SITE_ID</strong><br/>
              <span className="text-gray-600">サイトID（通常は1）</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 