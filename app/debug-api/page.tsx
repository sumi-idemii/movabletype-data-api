'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function DebugApiPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runDebug = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/movabletype/debug');
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
          <CardTitle>MovableType Data API デバッグ</CardTitle>
          <CardDescription>
            MovableType Data APIのエンドポイント構造とコンテンツタイプを確認します
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={runDebug} 
            disabled={loading}
            className="w-full"
          >
            {loading ? 'デバッグ中...' : 'API デバッグを実行'}
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
                  <strong>結果:</strong> {result.success ? 'デバッグ完了' : 'デバッグ失敗'}
                </AlertDescription>
              </Alert>

              {result.config && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">設定情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Base URL:</span>
                        <Badge variant="default">
                          {result.config.baseUrl || 'NOT_SET'}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Site ID:</span>
                        <Badge variant="default">
                          {result.config.siteId || 'NOT_SET'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.siteInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">サイト情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(result.siteInfo, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}

              {result.contentTypes && result.contentTypes.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">コンテンツタイプ一覧</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.contentTypes.map((contentType: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <span className="font-medium">{contentType.name}</span>
                            <span className="text-sm text-gray-600 ml-2">({contentType.label})</span>
                          </div>
                          <Badge variant="outline">{contentType.id}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.endpoints && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">エンドポイント情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">サイト情報:</span>
                        <Badge variant="outline" className="text-xs">
                          {result.endpoints.site}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">コンテンツタイプ一覧:</span>
                        <Badge variant="outline" className="text-xs">
                          {result.endpoints.contentTypes}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {result.testResults && result.testResults.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">エンドポイントテスト結果</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {result.testResults.map((test: any, index: number) => (
                        <div key={index} className="p-2 border rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{test.contentType}</span>
                            <Badge variant={test.success ? "default" : "destructive"}>
                              {test.success ? '成功' : '失敗'}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <div>ラベル: {test.label}</div>
                            <div>ステータス: {test.status}</div>
                            <div>総件数: {test.totalResults}</div>
                            <div>取得件数: {test.itemsCount}</div>
                            {test.url && (
                              <div className="text-xs text-blue-600 break-all">
                                URL: {test.url}
                              </div>
                            )}
                            {test.error && <div className="text-red-600">エラー: {test.error}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <details className="mt-4">
                <summary className="cursor-pointer text-sm font-medium">生データを表示</summary>
                <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto mt-2">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 