'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TestDataPage() {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<any>(null);
  const [casesData, setCasesData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testProducts = async () => {
    setLoading(true);
    setError(null);
    setProductsData(null);

    try {
      const response = await fetch('/api/movabletype/products?limit=5');
      const data = await response.json();

      if (response.ok) {
        setProductsData(data);
      } else {
        setError(data.details || data.error || 'Unknown error');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  };

  const testCases = async () => {
    setLoading(true);
    setError(null);
    setCasesData(null);

    try {
      const response = await fetch('/api/movabletype/cases?limit=5');
      const data = await response.json();

      if (response.ok) {
        setCasesData(data);
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
          <CardTitle>MovableType データ取得テスト</CardTitle>
          <CardDescription>
            認証が成功したので、実際のデータ取得をテストします
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={testProducts} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? '取得中...' : 'Products データ取得'}
            </Button>
            <Button 
              onClick={testCases} 
              disabled={loading}
              className="flex-1"
            >
              {loading ? '取得中...' : 'Cases データ取得'}
            </Button>
          </div>

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
        </CardContent>
      </Card>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Products データ</CardTitle>
              <CardDescription>
                MovableTypeから取得したProductsデータ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {productsData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      総件数: {productsData.totalResults || 0}
                    </Badge>
                    <Badge variant="secondary">
                      取得件数: {productsData.items?.length || 0}
                    </Badge>
                  </div>
                  
                  {productsData.items && productsData.items.length > 0 ? (
                    <div className="space-y-3">
                      {productsData.items.map((item: any, index: number) => (
                        <Card key={item.id || index} className="p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.excerpt}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{item.status}</Badge>
                              <Badge variant="outline">{item.createdDate}</Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        データが見つかりませんでした。MovableTypeに「products」コンテンツタイプのエントリーが存在するか確認してください。
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium">生データを表示</summary>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto mt-2">
                      {JSON.stringify(productsData, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    データを取得するには「Products データ取得」ボタンをクリックしてください。
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>Cases データ</CardTitle>
              <CardDescription>
                MovableTypeから取得したCasesデータ
              </CardDescription>
            </CardHeader>
            <CardContent>
              {casesData ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">
                      総件数: {casesData.totalResults || 0}
                    </Badge>
                    <Badge variant="secondary">
                      取得件数: {casesData.items?.length || 0}
                    </Badge>
                  </div>
                  
                  {casesData.items && casesData.items.length > 0 ? (
                    <div className="space-y-3">
                      {casesData.items.map((item: any, index: number) => (
                        <Card key={item.id || index} className="p-4">
                          <div className="space-y-2">
                            <h4 className="font-semibold">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.excerpt}</p>
                            <div className="flex gap-2">
                              <Badge variant="outline">{item.status}</Badge>
                              <Badge variant="outline">{item.createdDate}</Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Alert>
                      <AlertDescription>
                        データが見つかりませんでした。MovableTypeに「case」コンテンツタイプのエントリーが存在するか確認してください。
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <details className="mt-4">
                    <summary className="cursor-pointer text-sm font-medium">生データを表示</summary>
                    <pre className="text-xs bg-gray-100 p-2 rounded overflow-auto mt-2">
                      {JSON.stringify(casesData, null, 2)}
                    </pre>
                  </details>
                </div>
              ) : (
                <Alert>
                  <AlertDescription>
                    データを取得するには「Cases データ取得」ボタンをクリックしてください。
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 