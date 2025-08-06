import { useState, useEffect } from 'react';
import { MovableTypeEntry, MovableTypeListResponse } from '@/lib/movabletype-api';

interface UseMovableTypeDataOptions {
  limit?: number;
  offset?: number;
  status?: string;
}

interface UseMovableTypeDataReturn {
  data: MovableTypeListResponse | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMovableTypeData(
  contentType: 'products' | 'cases',
  options: UseMovableTypeDataOptions = {}
): UseMovableTypeDataReturn {
  const [data, setData] = useState<MovableTypeListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.limit) params.append('limit', options.limit.toString());
      if (options.offset) params.append('offset', options.offset.toString());
      if (options.status) params.append('status', options.status);

      const response = await fetch(`/api/movabletype/${contentType}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${contentType}: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [contentType, options.limit, options.offset, options.status]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

interface UseMovableTypeEntryOptions {
  includeCategories?: boolean;
  includeTags?: boolean;
  includeCustomFields?: boolean;
}

interface UseMovableTypeEntryReturn {
  data: MovableTypeEntry | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMovableTypeEntry(
  contentType: 'products' | 'cases',
  entryId: string,
  options: UseMovableTypeEntryOptions = {}
): UseMovableTypeEntryReturn {
  const [data, setData] = useState<MovableTypeEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.includeCategories) params.append('includeCategories', 'true');
      if (options.includeTags) params.append('includeTags', 'true');
      if (options.includeCustomFields) params.append('includeCustomFields', 'true');

      const response = await fetch(`/api/movabletype/${contentType}/${entryId}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${contentType} entry: ${response.statusText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (entryId) {
      fetchData();
    }
  }, [contentType, entryId, options.includeCategories, options.includeTags, options.includeCustomFields]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
} 