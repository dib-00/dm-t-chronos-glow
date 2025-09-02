import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Save, Home, Eye } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface HomeContent {
  id: string;
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_secondary_text: string;
  image_url?: string;
  background_url?: string;
  is_active: boolean;
  metadata?: any;
}

const AdminHome = () => {
  const [content, setContent] = useState<HomeContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchHomeContent();
    setupRealtimeSubscription();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const { data, error } = await supabase
        .from('home_content')
        .select('*')
        .eq('section_key', 'hero')
        .maybeSingle();

      if (error) throw error;
      setContent(data);
    } catch (error) {
      console.error('Error fetching home content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch home content',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('home_content_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'home_content'
        },
        () => {
          fetchHomeContent();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('home_content')
        .upsert({
          section_key: 'hero',
          title: content.title,
          subtitle: content.subtitle,
          description: content.description,
          cta_primary_text: content.cta_primary_text,
          cta_secondary_text: content.cta_secondary_text,
          image_url: content.image_url,
          background_url: content.background_url,
          is_active: content.is_active,
          metadata: content.metadata || {}
        }, {
          onConflict: 'section_key'
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Home content updated successfully',
      });
    } catch (error) {
      console.error('Error saving home content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save home content',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof HomeContent, value: string | boolean) => {
    if (content) {
      setContent({ ...content, [field]: value });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Home className="h-8 w-8" />
          Home Page Management
        </h1>
        <p className="text-muted-foreground">Manage hero section content and settings</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Hero Section Content
            </CardTitle>
            <CardDescription>
              Update the main hero section displayed on the homepage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {content && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Main Title</Label>
                    <Input
                      id="title"
                      value={content.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter main title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={content.subtitle || ''}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      placeholder="Enter subtitle"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={content.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description text"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cta_primary">Primary Button Text</Label>
                    <Input
                      id="cta_primary"
                      value={content.cta_primary_text || ''}
                      onChange={(e) => handleInputChange('cta_primary_text', e.target.value)}
                      placeholder="e.g., Book a Repair"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cta_secondary">Secondary Button Text</Label>
                    <Input
                      id="cta_secondary"
                      value={content.cta_secondary_text || ''}
                      onChange={(e) => handleInputChange('cta_secondary_text', e.target.value)}
                      placeholder="e.g., Call Now"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="image_url">Hero Image URL</Label>
                    <Input
                      id="image_url"
                      value={content.image_url || ''}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="background_url">Background Image URL</Label>
                    <Input
                      id="background_url"
                      value={content.background_url || ''}
                      onChange={(e) => handleInputChange('background_url', e.target.value)}
                      placeholder="Enter background image URL"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={content.is_active}
                    onCheckedChange={(checked) => handleInputChange('is_active', checked)}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSave} disabled={isSaving}>
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminHome;