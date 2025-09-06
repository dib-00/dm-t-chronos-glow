import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  display_order?: number;
}

export const usePricingPlans = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('pricing_plans')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setPlans(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch pricing plans');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();

    // Set up real-time subscription
    const channel = supabase
      .channel('pricing_plans_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'pricing_plans'
        },
        () => {
          fetchPlans();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return { plans, loading, error };
};