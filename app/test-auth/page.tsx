'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

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
    <div className="container mx-auto py-8">
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
                    <CardTitle className="text-sm">設定情報</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto">
                      {JSON.stringify(result.config, null, 2)}
                    </pre>
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
    </div>
  );
} 