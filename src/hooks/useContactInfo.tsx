import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ContactInfo {
  id: string;
  type: string;
  label?: string;
  value: string;
  icon?: string;
  is_primary: boolean;
  is_active: boolean;
  display_order?: number;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContactInfo(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch contact info');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();

    // Set up real-time subscription
    const channel = supabase
      .channel('contact_info_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_info'
        },
        () => {
          fetchContactInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { contactInfo, loading, error };
};