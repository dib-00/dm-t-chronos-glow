import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface ContactInfo {
  id: string;
  type: string;
  label: string;
  value: string;
  icon: string;
  is_primary: boolean;
  is_active: boolean;
  display_order: number;
  map_embed_url?: string;
  map_coordinates?: string;
  map_address?: string;
  created_at: string;
  updated_at: string;
}

const AdminContact = () => {
  const [contacts, setContacts] = useState<ContactInfo[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    type: '',
    label: '',
    value: '',
    icon: '',
    is_primary: false,
    is_active: true,
    display_order: 0,
    map_embed_url: '',
    map_coordinates: '',
    map_address: '',
  });

  const contactTypes = [
    { value: 'phone', label: 'Phone Number', icon: 'Phone' },
    { value: 'email', label: 'Email Address', icon: 'Mail' },
    { value: 'whatsapp', label: 'WhatsApp', icon: 'Phone' },
    { value: 'address', label: 'Address', icon: 'MapPin' },
    { value: 'hours', label: 'Business Hours', icon: 'Clock' },
    { value: 'website', label: 'Website', icon: 'Globe' },
    { value: 'social', label: 'Social Media', icon: 'Share' },
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.label?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.value?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [contacts, searchQuery]);

  const fetchContacts = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_info')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contact info:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch contact information',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editingContact) {
        const { error } = await supabase
          .from('contact_info')
          .update(formData)
          .eq('id', editingContact.id);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Contact information updated successfully',
        });
      } else {
        const { error } = await supabase
          .from('contact_info')
          .insert(formData);

        if (error) throw error;
        toast({
          title: 'Success',
          description: 'Contact information created successfully',
        });
      }

      setDialogOpen(false);
      setEditingContact(null);
      resetForm();
      fetchContacts();
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save contact information',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (contact: ContactInfo) => {
    setEditingContact(contact);
    setFormData({
      type: contact.type,
      label: contact.label || '',
      value: contact.value,
      icon: contact.icon || '',
      is_primary: contact.is_primary,
      is_active: contact.is_active,
      display_order: contact.display_order,
      map_embed_url: contact.map_embed_url || '',
      map_coordinates: contact.map_coordinates || '',
      map_address: contact.map_address || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact information?')) return;

    try {
      const { error } = await supabase
        .from('contact_info')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({
        title: 'Success',
        description: 'Contact information deleted successfully',
      });
      fetchContacts();
    } catch (error) {
      console.error('Error deleting contact info:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete contact information',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      type: '',
      label: '',
      value: '',
      icon: '',
      is_primary: false,
      is_active: true,
      display_order: 0,
      map_embed_url: '',
      map_coordinates: '',
      map_address: '',
    });
  };

  const handleNewContact = () => {
    setEditingContact(null);
    resetForm();
    setDialogOpen(true);
  };

  const handleTypeChange = (type: string) => {
    const contactType = contactTypes.find(ct => ct.value === type);
    setFormData({
      ...formData,
      type,
      icon: contactType?.icon || '',
      label: contactType?.label || '',
    });
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Phone': return <Phone className="h-4 w-4" />;
      case 'Mail': return <Mail className="h-4 w-4" />;
      case 'MapPin': return <MapPin className="h-4 w-4" />;
      case 'Clock': return <Clock className="h-4 w-4" />;
      default: return <Phone className="h-4 w-4" />;
    }
  };

  if (isLoading && contacts.length === 0) {
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
          <h1 className="text-3xl font-bold">Contact Information</h1>
          <p className="text-muted-foreground">Manage your business contact details and information</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleNewContact}>
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingContact ? 'Edit Contact Information' : 'Add New Contact Information'}
              </DialogTitle>
              <DialogDescription>
                {editingContact ? 'Update contact details' : 'Create new contact information'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Contact Type *</Label>
                  <Select value={formData.type} onValueChange={handleTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select contact type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="label">Label</Label>
                  <Input
                    id="label"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., Main Office, Support Email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="value">Value *</Label>
                <Input
                  id="value"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="Enter contact value"
                  required
                />
              </div>

              {formData.type === 'address' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="map_address">Map Address</Label>
                    <Input
                      id="map_address"
                      value={formData.map_address}
                      onChange={(e) => setFormData({ ...formData, map_address: e.target.value })}
                      placeholder="Address to display on map"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="map_embed_url">Google Maps Embed URL</Label>
                    <Input
                      id="map_embed_url"
                      value={formData.map_embed_url}
                      onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="map_coordinates">Map Coordinates (Lat,Lng)</Label>
                    <Input
                      id="map_coordinates"
                      value={formData.map_coordinates}
                      onChange={(e) => setFormData({ ...formData, map_coordinates: e.target.value })}
                      placeholder="22.4734, 88.3963"
                    />
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  placeholder="Icon name (e.g., Phone, Mail)"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_primary"
                    checked={formData.is_primary}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_primary: checked })}
                  />
                  <Label htmlFor="is_primary">Primary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="display_order">Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Saving...' : editingContact ? 'Update' : 'Create'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search contact information..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="grid gap-4">
        {filteredContacts.map((contact) => (
          <Card key={contact.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getIconComponent(contact.icon)}
                    {contact.label || contact.type}
                    <Badge variant={contact.is_active ? 'default' : 'secondary'}>
                      {contact.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                    {contact.is_primary && (
                      <Badge variant="outline" className="bg-primary/10">
                        Primary
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="capitalize">{contact.type}</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(contact)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(contact.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Contact Value</p>
                  <p className="text-muted-foreground">{contact.value}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Display Order</p>
                  <p className="text-muted-foreground">{contact.display_order}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contact information found</p>
        </div>
      )}
    </div>
  );
};

export default AdminContact;