
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Send } from 'lucide-react';
import { mockBrands, mockProductTypes, mockThemeTypes } from '@/data/mockData';

export function TopicRequestForm() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [promptText, setPromptText] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  const filteredProductTypes = mockProductTypes.filter(
    product => product.brandId === selectedBrand
  );
  
  const filteredThemeTypes = mockThemeTypes.filter(
    theme => theme.brandId === selectedBrand
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Sending request:', {
        brand: selectedBrand,
        prompt: promptText
      });
      setIsSending(false);
      // Reset form
      setPromptText("");
    }, 2000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request New Topics</CardTitle>
        <CardDescription>
          Describe the topics you need and our AI will generate suggestions for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="brand">Select Brand</Label>
              <Select 
                value={selectedBrand} 
                onValueChange={setSelectedBrand}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {mockBrands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="prompt">Your Request</Label>
              <Textarea
                id="prompt"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Example: 'Create 5 topics about organic snacks for health-conscious parents'"
                className="min-h-[120px]"
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label>Example Requests</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPromptText("Create 5 topics about seasonal product trends")}
                >
                  Seasonal Trends
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPromptText("Generate 3 educational topics about our technology")}
                >
                  Educational Content
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPromptText("Suggest 4 topics comparing our products with competitors")}
                >
                  Comparison Content
                </Button>
              </div>
            </div>
          </div>
          
          <CardFooter className="px-0 pt-6">
            <Button type="submit" className="w-full" disabled={!selectedBrand || !promptText || isSending}>
              {isSending ? (
                <>
                  <span className="animate-pulse">Generating Topics...</span>
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Generate Topics
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
