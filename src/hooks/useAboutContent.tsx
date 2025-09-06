import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AboutContent {
  id: string;
  section_key: string;
  title?: string;
  content?: string;
  image_url?: string;
  metadata?: any;
  is_active: boolean;
  display_order?: number;
}

export const useAboutContent = () => {
  const [content, setContent] = useState<AboutContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch about content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('about_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'about_content'
        },
        () => {
          fetchContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { content, loading, error };
};