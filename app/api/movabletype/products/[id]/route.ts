import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';
import { getContentTypeId } from '@/lib/movabletype-config';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const api = createMovableTypeAPI();
    
    // productsのコンテンツタイプID: 2
    const product = await api.getEntry(getContentTypeId('PRODUCTS'), params.id, {
      includeCategories: true,
      includeTags: true,
      includeCustomFields: true,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 