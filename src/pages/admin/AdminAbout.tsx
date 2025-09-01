import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface AboutContent {
  id: string;
  section_key: string;
  title: string;
  content: string;
  image_url: string;
  metadata: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const AdminAbout = () => {
  const [contents, setContents] = useState<AboutContent[]>([]);
  const [filteredContents, setFilteredContents] = useState<AboutContent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<AboutContent | null>(null);
  const [formData, setFormData] = useState({
    section_key: '',
    title: '',
    content: '',
    image_url: '',
    metadata: '',
    is_active: true,
  });

  const predefinedSections = [
    { key: 'hero', label: 'Hero Section' },
    { key: 'mission', label: 'Mission Statement' },
    { key: 'story', label: 'Our Story' },
    { key: 'team', label: 'Team Information' },
    { key: 'values', label: 'Core Values' },
    { key: 'certifications', label: 'Certifications' },
    { key: 'experience', label: 'Experience' },
    { key: 'awards', label: 'Awards & Recognition' }
  ];

  useEffect(() => {
    fetchContents();
  }, []);

  useEffect(() => {
    const filtered = contents.filter(content =>
      content.section_key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.content?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContents(filtered);
  }, [contents, searchQuery]);

  const fetchContents = async () => {
    try {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('section_key', { ascending: true });

      if (error) throw error;
      setContents(data || []);
    } catch (error) {
      console.error('Error fetching about content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch about content',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const contentData = {
      ...formData,
      metadata: formData.metadata ? JSON.parse(formData.metadata) : null,
    };

    try {
      if (editingContent) {
        const { error } = await supabase
          .from('about_content')
          .update(contentData)
          .eq('id', editingContent.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'About content updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('about_content')
          .insert(contentData);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'About content created successfully',
        });
      }

      setDialogOpen(false);
      setEditingContent(null);
      resetForm();
      fetchContents();
    } catch (error) {
      console.error('Error saving about content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save about content',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (content: AboutContent) => {
    setEditingContent(content);
    setFormData({
      section_key: content.section_key,
      title: content.title || '',
      content: content.content || '',
      image_url: content.image_url || '',
      metadata: content.metadata ? JSON.stringify(content.metadata, null, 2) : '',
      is_active: content.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content section?')) return;

    try {
      const { error } = await supabase
        .from('about_content')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'About content deleted successfully',
      });
      fetchContents();
    } catch (error) {
      console.error('Error deleting about content:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete about content',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      section_key: '',
      title: '',
      content: '',
      image_url: '',
      metadata: '',
      is_active: true,
    });
  };

  const handleNewContent = () => {
    setEditingContent(null);
    resetForm();
    setDialogOpen(true);
  };

  const getSectionLabel = (key: string) => {
    const section = predefinedSections.find(s => s.key === key);
    return section ? section.label : key;
  };

  if (isLoading && contents.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">About Page Management</h1>
          <p className="text-muted-foreground">Manage content sections for your about page</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewContent}>
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? 'Edit About Section' : 'Add New About Section'}
              </DialogTitle>
              <DialogDescription>
                {editingContent ? 'Update about page content' : 'Create a new content section for the about page'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="section_key">Section Key *</Label>
                  <Input
                    id="section_key"
                    value={formData.section_key}
                    onChange={(e) => setFormData({ ...formData, section_key: e.target.value })}
                    placeholder="e.g., hero, mission, story"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Use: {predefinedSections.map(s => s.key).join(', ')}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Section title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  placeholder="Section content..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="metadata">Metadata (JSON)</Label>
                <Textarea
                  id="metadata"
                  value={formData.metadata}
                  onChange={(e) => setFormData({ ...formData, metadata: e.target.value })}
                  rows={4}
                  placeholder='{"key": "value", "other": "data"}'
                />
                <p className="text-xs text-muted-foreground">
                  Optional JSON data for additional configuration
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingContent ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search content sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredContents.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getSectionLabel(content.section_key)}
                    <Badge variant="outline" className="text-xs">
                      {content.section_key}
                    </Badge>
                    <Badge variant={content.is_active ? 'default' : 'secondary'}>
                      {content.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{content.title}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(content)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(content.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.image_url && (
                  <div>
                    <p className="text-sm font-medium mb-2">Image</p>
                    <img 
                      src={content.image_url} 
                      alt={content.title || content.section_key}
                      className="w-full h-20 object-cover rounded"
                    />
                  </div>
                )}
                <div className={content.image_url ? "md:col-span-2" : "md:col-span-3"}>
                  <p className="text-sm font-medium mb-2">Content Preview</p>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {content.content || 'No content'}
                  </p>
                </div>
              </div>
              {content.metadata && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Metadata</p>
                  <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                    {JSON.stringify(content.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content sections found</p>
        </div>
      )}
    </div>
  );
};

export default AdminAbout;