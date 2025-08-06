import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const api = createMovableTypeAPI();
    
    const product = await api.getEntry('products', params.id, {
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