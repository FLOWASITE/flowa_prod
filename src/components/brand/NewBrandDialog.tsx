
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { defaultThemeCategories } from '@/data/defaultThemeTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

export function NewBrandDialog() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('brand');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    primaryColor: '#2563eb',
    secondaryColor: '#0d9488',
  });

  const [themeTypes, setThemeTypes] = useState(defaultThemeCategories.map(category => ({
    name: category.name,
    description: category.description,
    keywords: category.keywords.join(', '),
  })));

  const [newThemeType, setNewThemeType] = useState({
    name: '',
    description: '',
    keywords: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleThemeTypeChange = (index: number, field: string, value: string) => {
    setThemeTypes(prev => prev.map((theme, i) => 
      i === index ? { ...theme, [field]: value } : theme
    ));
  };

  const addNewThemeType = () => {
    if (newThemeType.name && newThemeType.description) {
      setThemeTypes(prev => [...prev, { ...newThemeType }]);
      setNewThemeType({ name: '', description: '', keywords: '' });
    }
  };

  const removeThemeType = (index: number) => {
    setThemeTypes(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating brand:', {
      ...formData,
      themeTypes: themeTypes.map(theme => ({
        ...theme,
        keywords: theme.keywords.split(',').map(k => k.trim()),
      })),
    });
    
    setFormData({
      name: '',
      description: '',
      primaryColor: '#2563eb',
      secondaryColor: '#0d9488',
    });
    setThemeTypes(defaultThemeCategories.map(category => ({
      name: category.name,
      description: category.description,
      keywords: category.keywords.join(', '),
    })));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Brand
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Brand</DialogTitle>
          </DialogHeader>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="brand">Brand Information</TabsTrigger>
              <TabsTrigger value="themes">Theme Types</TabsTrigger>
            </TabsList>

            <TabsContent value="brand" className="mt-4">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Brand Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter brand name"
                    required
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter brand description"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex items-center">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        type="color"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.primaryColor}
                        onChange={handleChange}
                        name="primaryColor"
                        className="ml-2"
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex items-center">
                      <Input
                        id="secondaryColor"
                        name="secondaryColor"
                        type="color"
                        value={formData.secondaryColor}
                        onChange={handleChange}
                        className="w-10 h-10 p-1"
                      />
                      <Input
                        type="text"
                        value={formData.secondaryColor}
                        onChange={handleChange}
                        name="secondaryColor"
                        className="ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="themes" className="mt-4">
              <ScrollArea className="h-[400px] pr-4">
                <div className="grid gap-6">
                  {themeTypes.map((theme, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => removeThemeType(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      
                      <div className="grid gap-2">
                        <Label>Theme Name</Label>
                        <Input
                          value={theme.name}
                          onChange={(e) => handleThemeTypeChange(index, 'name', e.target.value)}
                          placeholder="Theme name"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Description</Label>
                        <Input
                          value={theme.description}
                          onChange={(e) => handleThemeTypeChange(index, 'description', e.target.value)}
                          placeholder="Theme description"
                          required
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Keywords (comma-separated)</Label>
                        <Input
                          value={theme.keywords}
                          onChange={(e) => handleThemeTypeChange(index, 'keywords', e.target.value)}
                          placeholder="keyword1, keyword2, keyword3"
                        />
                      </div>
                    </div>
                  ))}

                  <div className="grid gap-4 p-4 border rounded-lg border-dashed">
                    <div className="grid gap-2">
                      <Label>New Theme Name</Label>
                      <Input
                        value={newThemeType.name}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter new theme name"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Description</Label>
                      <Input
                        value={newThemeType.description}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter theme description"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Keywords (comma-separated)</Label>
                      <Input
                        value={newThemeType.keywords}
                        onChange={(e) => setNewThemeType(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addNewThemeType}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Theme Type
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Brand</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
