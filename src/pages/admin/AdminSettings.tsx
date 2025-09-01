import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  label: string;
  description: string;
  created_at: string;
  updated_at: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [filteredSettings, setFilteredSettings] = useState<SiteSetting[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSetting, setEditingSetting] = useState<SiteSetting | null>(null);
  const [formData, setFormData] = useState({
    key: '',
    value: '',
    type: 'text',
    label: '',
    description: '',
  });

  const settingTypes = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'boolean', label: 'Boolean (true/false)' },
    { value: 'url', label: 'URL' },
    { value: 'email', label: 'Email' },
    { value: 'color', label: 'Color' },
    { value: 'json', label: 'JSON Object' },
  ];

  const predefinedSettings = [
    { key: 'site_name', label: 'Site Name', type: 'text', description: 'Name of your repair business' },
    { key: 'site_tagline', label: 'Site Tagline', type: 'text', description: 'Business tagline or slogan' },
    { key: 'contact_phone', label: 'Main Phone', type: 'text', description: 'Primary contact phone number' },
    { key: 'contact_email', label: 'Main Email', type: 'email', description: 'Primary contact email address' },
    { key: 'business_hours', label: 'Business Hours', type: 'text', description: 'Operating hours' },
    { key: 'address', label: 'Business Address', type: 'text', description: 'Physical business address' },
    { key: 'google_analytics_id', label: 'Google Analytics ID', type: 'text', description: 'GA tracking ID' },
    { key: 'facebook_url', label: 'Facebook URL', type: 'url', description: 'Facebook page URL' },
    { key: 'instagram_url', label: 'Instagram URL', type: 'url', description: 'Instagram profile URL' },
    { key: 'twitter_url', label: 'Twitter URL', type: 'url', description: 'Twitter profile URL' },
    { key: 'primary_color', label: 'Primary Color', type: 'color', description: 'Main brand color' },
    { key: 'secondary_color', label: 'Secondary Color', type: 'color', description: 'Secondary brand color' },
    { key: 'enable_online_booking', label: 'Enable Online Booking', type: 'boolean', description: 'Allow online appointment booking' },
    { key: 'maintenance_mode', label: 'Maintenance Mode', type: 'boolean', description: 'Enable maintenance mode' },
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  useEffect(() => {
    const filtered = settings.filter(setting =>
      setting.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      setting.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSettings(filtered);
  }, [settings, searchQuery]);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (error) {
      console.error('Error fetching site settings:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch site settings',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingSetting) {
        const { error } = await supabase
          .from('site_settings')
          .update(formData)
          .eq('id', editingSetting.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Site setting updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert(formData);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Site setting created successfully',
        });
      }

      setDialogOpen(false);
      setEditingSetting(null);
      resetForm();
      fetchSettings();
    } catch (error) {
      console.error('Error saving site setting:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save site setting',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (setting: SiteSetting) => {
    setEditingSetting(setting);
    setFormData({
      key: setting.key,
      value: setting.value || '',
      type: setting.type,
      label: setting.label || '',
      description: setting.description || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this setting?')) return;

    try {
      const { error } = await supabase
        .from('site_settings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Site setting deleted successfully',
      });
      fetchSettings();
    } catch (error) {
      console.error('Error deleting site setting:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete site setting',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      key: '',
      value: '',
      type: 'text',
      label: '',
      description: '',
    });
  };

  const handleNewSetting = () => {
    setEditingSetting(null);
    resetForm();
    setDialogOpen(true);
  };

  const renderValueInput = () => {
    switch (formData.type) {
      case 'boolean':
        return (
          <Select value={formData.value} onValueChange={(value) => setFormData({ ...formData, value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select true or false" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );
      case 'json':
        return (
          <Textarea
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            rows={4}
            placeholder='{"key": "value"}'
          />
        );
      case 'color':
        return (
          <div className="flex gap-2">
            <Input
              type="color"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-20 h-10"
            />
            <Input
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              placeholder="#000000"
            />
          </div>
        );
      default:
        return (
          <Input
            type={formData.type === 'number' ? 'number' : formData.type === 'email' ? 'email' : formData.type === 'url' ? 'url' : 'text'}
            value={formData.value}
            onChange={(e) => setFormData({ ...formData, value: e.target.value })}
            placeholder="Enter setting value"
          />
        );
    }
  };

  const formatValue = (value: string, type: string) => {
    if (!value) return 'Not set';
    
    switch (type) {
      case 'boolean':
        return value === 'true' ? '✓ True' : '✗ False';
      case 'color':
        return (
          <div className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded border"
              style={{ backgroundColor: value }}
            />
            {value}
          </div>
        );
      case 'json':
        try {
          JSON.parse(value);
          return 'Valid JSON';
        } catch {
          return 'Invalid JSON';
        }
      case 'url':
        return (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            {value}
          </a>
        );
      default:
        return value;
    }
  };

  if (isLoading && settings.length === 0) {
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
          <h1 className="text-3xl font-bold">Site Settings</h1>
          <p className="text-muted-foreground">Manage global site configuration and preferences</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewSetting}>
              <Plus className="h-4 w-4 mr-2" />
              Add Setting
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSetting ? 'Edit Site Setting' : 'Add New Site Setting'}
              </DialogTitle>
              <DialogDescription>
                {editingSetting ? 'Update site configuration' : 'Create a new site setting'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="key">Setting Key *</Label>
                  <Input
                    id="key"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g., site_name, contact_phone"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {settingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="Human-readable label"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                {renderValueInput()}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe what this setting controls"
                  rows={2}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingSetting ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search settings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Quick Actions for Common Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Setup
          </CardTitle>
          <CardDescription>
            Common settings to get your site configured quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedSettings.slice(0, 6).map((setting) => {
              const existingSetting = settings.find(s => s.key === setting.key);
              return (
                <Card key={setting.key} className="cursor-pointer hover:bg-muted/50" 
                      onClick={() => existingSetting ? handleEdit(existingSetting) : setFormData({
                        ...formData,
                        key: setting.key,
                        label: setting.label,
                        type: setting.type,
                        description: setting.description
                      })}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{setting.label}</h4>
                      <Badge variant={existingSetting ? 'default' : 'outline'}>
                        {existingSetting ? 'Set' : 'New'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredSettings.map((setting) => (
          <Card key={setting.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {setting.label || setting.key}
                    <Badge variant="outline" className="text-xs">
                      {setting.type}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    Key: <code className="text-xs bg-muted px-1 rounded">{setting.key}</code>
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(setting)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(setting.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Current Value</p>
                  <div className="text-muted-foreground">
                    {formatValue(setting.value, setting.type)}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-muted-foreground text-sm">
                    {setting.description || 'No description'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSettings.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No site settings found</p>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;