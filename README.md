# MovableType Data API Integration

このプロジェクトはMovableType Data APIを使用してコンテンツを取得するNext.jsアプリケーションです。

## 環境変数の設定

Vercelダッシュボードで以下の環境変数を設定してください：

### MovableType Data API設定
```
MOVABLETYPE_API_BASE_URL = https://your-domain.com/mt/mt-data-api.cgi
MOVABLETYPE_USERNAME = your-username
MOVABLETYPE_PASSWORD = your-password
MOVABLETYPE_CLIENT_ID = movabletype-data-api
MOVABLETYPE_SITE_ID = 1
```

### ベーシック認証設定
```
BASIC_AUTH_USERNAME = movabletype-data-api
BASIC_AUTH_PASSWORD = Pnfeaswe@u342
```

## API エンドポイント

### Products
- `GET /api/movabletype/products` - 製品一覧を取得
- `GET /api/movabletype/products/[id]` - 特定の製品を取得

### Cases
- `GET /api/movabletype/cases` - 事例一覧を取得
- `GET /api/movabletype/cases/[id]` - 特定の事例を取得

## テストページ

- `/test-movabletype` - MovableType Data APIの動作確認ページ

## 使用方法

```typescript
import { useMovableTypeData } from '@/hooks/use-movabletype-data';

function MyComponent() {
  const { data, loading, error } = useMovableTypeData('products', {
    limit: 10,
    status: 'published'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.items.map(item => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
``` 