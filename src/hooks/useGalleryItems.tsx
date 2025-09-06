import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface GalleryItem {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  before_image_url?: string;
  after_image_url?: string;
  category?: string;
  tags?: string[];
  is_active: boolean;
  display_order?: number;
}

export const useGalleryItems = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setItems(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch gallery items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();

    // Set up real-time subscription
    const channel = supabase
      .channel('gallery_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'gallery_items'
        },
        () => {
          fetchItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { items, loading, error };
};