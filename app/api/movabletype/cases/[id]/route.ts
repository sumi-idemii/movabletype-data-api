import { NextRequest, NextResponse } from 'next/server';
import { createMovableTypeAPI } from '@/lib/movabletype-api';
import { getContentTypeId } from '@/lib/movabletype-config';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const api = createMovableTypeAPI();
    
    // caseのコンテンツタイプID: 3
    const caseItem = await api.getEntry(getContentTypeId('CASES'), params.id, {
      includeCategories: true,
      includeTags: true,
      includeCustomFields: true,
    });

    return NextResponse.json(caseItem);
  } catch (error) {
    console.error('Error fetching case:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case' },
      { status: 500 }
    );
  }
} 