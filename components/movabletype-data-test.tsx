'use client';

import { useMovableTypeData, useMovableTypeEntry } from '@/hooks/use-movabletype-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MovableTypeDataTest() {
  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    refetch: refetchProducts,
  } = useMovableTypeData('products', { limit: 5 });

  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
    refetch: refetchCases,
  } = useMovableTypeData('cases', { limit: 5 });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">MovableType Data API Test</h1>
      
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cases">Cases</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Products</h2>
            <Button onClick={refetchProducts} disabled={productsLoading}>
              {productsLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
          
          {productsError && (
            <Alert>
              <AlertDescription>{productsError}</AlertDescription>
            </Alert>
          )}
          
          {productsLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {productsData?.items.map((product) => (
                <Card key={product.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                    <CardDescription>
                      {new Date(product.createdDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {product.excerpt || product.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {product.categories?.map((category) => (
                        <Badge key={category.id} variant="secondary">
                          {category.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {productsData && (
            <div className="text-center text-sm text-muted-foreground">
              Total: {productsData.totalResults} products
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="cases" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Cases</h2>
            <Button onClick={refetchCases} disabled={casesLoading}>
              {casesLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
          
          {casesError && (
            <Alert>
              <AlertDescription>{casesError}</AlertDescription>
            </Alert>
          )}
          
          {casesLoading ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {casesData?.items.map((caseItem) => (
                <Card key={caseItem.id}>
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{caseItem.title}</CardTitle>
                    <CardDescription>
                      {new Date(caseItem.createdDate).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {caseItem.excerpt || caseItem.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1">
                      {caseItem.categories?.map((category) => (
                        <Badge key={category.id} variant="secondary">
                          {category.label}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          {casesData && (
            <div className="text-center text-sm text-muted-foreground">
              Total: {casesData.totalResults} cases
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 