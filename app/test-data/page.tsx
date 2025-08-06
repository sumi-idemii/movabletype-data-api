'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createMovableTypeAPI } from '@/lib/movabletype-api';
import { getContentTypeId } from '@/lib/movabletype-config';

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
      const api = createMovableTypeAPI();
      const contentTypeId = getContentTypeId('PRODUCTS');
      
      console.log('Fetching products from MovableType Data API with ID:', contentTypeId);
      
      const data = await api.getEntries(contentTypeId, {
        limit: 5,
        status: 'published',
        includeCategories: true,
        includeTags: true,
        includeCustomFields: true,
      });

      const baseUrl = process.env.NEXT_PUBLIC_MOVABLETYPE_API_BASE_URL || process.env.MOVABLETYPE_API_BASE_URL || '';
      const siteId = process.env.NEXT_PUBLIC_MOVABLETYPE_SITE_ID || process.env.MOVABLETYPE_SITE_ID || '3';
      
      setProductsData({
        ...data,
        endpoint: `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`,
        status: 200,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      const baseUrl = process.env.NEXT_PUBLIC_MOVABLETYPE_API_BASE_URL || process.env.MOVABLETYPE_API_BASE_URL || '';
      const siteId = process.env.NEXT_PUBLIC_MOVABLETYPE_SITE_ID || process.env.MOVABLETYPE_SITE_ID || '3';
      const contentTypeId = getContentTypeId('PRODUCTS');
      
      // 環境変数の状況を確認
      const envStatus = {
        baseUrl: process.env.MOVABLETYPE_API_BASE_URL ? 'SET' : 'NOT_SET',
        username: process.env.MOVABLETYPE_USERNAME ? 'SET' : 'NOT_SET',
        password: process.env.MOVABLETYPE_PASSWORD ? 'SET' : 'NOT_SET',
        siteId: process.env.MOVABLETYPE_SITE_ID || '3',
      };
      
      setProductsData({
        error: errorMessage,
        endpoint: `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`,
        status: 500,
        envStatus,
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const testCases = async () => {
    setLoading(true);
    setError(null);
    setCasesData(null);

    try {
      const api = createMovableTypeAPI();
      const contentTypeId = getContentTypeId('CASES');
      
      console.log('Fetching cases from MovableType Data API with ID:', contentTypeId);
      
      const data = await api.getEntries(contentTypeId, {
        limit: 5,
        status: 'published',
        includeCategories: true,
        includeTags: true,
        includeCustomFields: true,
      });

      const baseUrl = process.env.NEXT_PUBLIC_MOVABLETYPE_API_BASE_URL || process.env.MOVABLETYPE_API_BASE_URL || '';
      const siteId = process.env.NEXT_PUBLIC_MOVABLETYPE_SITE_ID || process.env.MOVABLETYPE_SITE_ID || '3';
      
      setCasesData({
        ...data,
        endpoint: `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`,
        status: 200,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      const baseUrl = process.env.NEXT_PUBLIC_MOVABLETYPE_API_BASE_URL || process.env.MOVABLETYPE_API_BASE_URL || '';
      const siteId = process.env.NEXT_PUBLIC_MOVABLETYPE_SITE_ID || process.env.MOVABLETYPE_SITE_ID || '3';
      const contentTypeId = getContentTypeId('CASES');
      
      // 環境変数の状況を確認
      const envStatus = {
        baseUrl: process.env.MOVABLETYPE_API_BASE_URL ? 'SET' : 'NOT_SET',
        username: process.env.MOVABLETYPE_USERNAME ? 'SET' : 'NOT_SET',
        password: process.env.MOVABLETYPE_PASSWORD ? 'SET' : 'NOT_SET',
        siteId: process.env.MOVABLETYPE_SITE_ID || '3',
      };
      
      setCasesData({
        error: errorMessage,
        endpoint: `/v5/sites/${siteId}/content_types/${contentTypeId}/entries?limit=5`,
        status: 500,
        envStatus,
      });
      setError(errorMessage);
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

                  {productsData && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-sm">API エンドポイント情報</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">エンドポイント:</span>
                            <Badge variant="outline" className="text-xs">
                              {productsData.endpoint || 'N/A'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ステータス:</span>
                            <Badge variant={productsData.status === 200 ? "default" : "destructive"}>
                              {productsData.status || 'N/A'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">総件数:</span>
                            <Badge variant="secondary">
                              {productsData.totalResults || 0}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">取得件数:</span>
                            <Badge variant="secondary">
                              {productsData.items?.length || 0}
                            </Badge>
                          </div>
                          {productsData.error && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-red-600">エラー:</span>
                                <span className="text-sm text-red-600">{productsData.error}</span>
                              </div>
                              {productsData.debug && (
                                <details className="mt-2">
                                  <summary className="cursor-pointer text-sm font-medium text-blue-600">デバッグ情報を表示</summary>
                                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                                    <div><strong>設定情報:</strong></div>
                                    <pre className="mt-1">{JSON.stringify(productsData.debug.config, null, 2)}</pre>
                                    {productsData.debug.stack && (
                                      <>
                                        <div className="mt-2"><strong>スタックトレース:</strong></div>
                                        <pre className="mt-1 text-red-600">{productsData.debug.stack}</pre>
                                      </>
                                    )}
                                  </div>
                                </details>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
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

                  {casesData && (
                    <Card className="mt-4">
                      <CardHeader>
                        <CardTitle className="text-sm">API エンドポイント情報</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">エンドポイント:</span>
                            <Badge variant="outline" className="text-xs">
                              {casesData.endpoint || 'N/A'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">ステータス:</span>
                            <Badge variant={casesData.status === 200 ? "default" : "destructive"}>
                              {casesData.status || 'N/A'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">総件数:</span>
                            <Badge variant="secondary">
                              {casesData.totalResults || 0}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">取得件数:</span>
                            <Badge variant="secondary">
                              {casesData.items?.length || 0}
                            </Badge>
                          </div>
                          {casesData.error && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-red-600">エラー:</span>
                                <span className="text-sm text-red-600">{casesData.error}</span>
                              </div>
                              {casesData.debug && (
                                <details className="mt-2">
                                  <summary className="cursor-pointer text-sm font-medium text-blue-600">デバッグ情報を表示</summary>
                                  <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
                                    <div><strong>設定情報:</strong></div>
                                    <pre className="mt-1">{JSON.stringify(casesData.debug.config, null, 2)}</pre>
                                    {casesData.debug.stack && (
                                      <>
                                        <div className="mt-2"><strong>スタックトレース:</strong></div>
                                        <pre className="mt-1 text-red-600">{casesData.debug.stack}</pre>
                                      </>
                                    )}
                                  </div>
                                </details>
                              )}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
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