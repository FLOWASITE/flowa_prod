
import React, { useState } from 'react';
import { Content } from '@/types';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogClose,
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bold, 
  Italic, 
  Underline, 
  Hash, 
  Smile, 
  Save 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { PlatformIcon } from '@/components/content/table/PlatformIcon';

interface ContentEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  content: Content | null;
  onSave?: (content: Content) => void;
}

export function ContentEditorDialog({ 
  open, 
  onOpenChange, 
  content, 
  onSave 
}: ContentEditorDialogProps) {
  const [text, setText] = useState(content?.text || '');
  const [scheduleDate, setScheduleDate] = useState<boolean>(false);
  const isEditing = !!content;

  const handleSave = () => {
    if (content && onSave) {
      onSave({
        ...content,
        text,
        status: scheduleDate ? 'scheduled' : content.status
      });
    }
    onOpenChange(false);
  };

  if (!content) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] h-[80vh] p-0 gap-0">
        <div className="grid grid-cols-[1fr_350px] h-full divide-x">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 py-4 border-b">
              <DialogTitle>{isEditing ? 'Edit your post' : 'Create your post'}</DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      <span className="mr-1">+</span> Select All
                    </Button>
                    <Button variant="outline" size="sm">
                      <span className="mr-1">□</span> Select None
                    </Button>
                  </div>
                  <div>
                    <Badge variant="outline" className="ml-2">
                      Variation 1
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {['facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'].map((platform) => (
                    <div 
                      key={platform} 
                      className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <PlatformIcon platform={platform as Content['platform']} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="border rounded-md p-4 mb-4">
                  <textarea 
                    className="w-full resize-none border-0 focus:outline-none" 
                    rows={6} 
                    placeholder="What do you want to share?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  
                  <Separator className="my-4" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <span>📷</span> Add a photo or video
                      </Button>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <div className="rounded-md border flex items-center p-1">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Underline className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Hash className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Smile className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Badge variant="outline" className="bg-yellow-500 text-white border-0">
                        AI
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="bg-yellow-400 border-yellow-500 hover:bg-yellow-500">
                    <span className="mr-1">+</span> Add Variation
                  </Button>
                  <Button variant="outline" className="border-yellow-500 text-yellow-700">
                    <span className="mr-1">✏️</span> Customize for each profile
                  </Button>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">When to post</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-now">Post now (when saving)</Label>
                    <Switch 
                      id="post-now" 
                      checked={!scheduleDate} 
                      onCheckedChange={val => setScheduleDate(!val)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="schedule">Post at a specific time</Label>
                    <Switch 
                      id="schedule" 
                      checked={scheduleDate} 
                      onCheckedChange={val => setScheduleDate(val)} 
                    />
                  </div>
                  
                  {scheduleDate && (
                    <Button variant="outline" className="w-full mt-2">
                      <span className="mr-1">+</span> Add a posting time
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="px-6 py-4 border-t">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </DialogFooter>
          </div>
          
          <div className="flex flex-col h-full">
            <div className="p-4 border-b bg-gray-100">
              <h2 className="font-semibold">Post preview</h2>
              <p className="text-sm text-gray-500 mt-1">
                *Social networks tweak their design all the time. This is our best estimate of how this will look like once published.
              </p>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {text && (
                <div className="bg-white p-4 border rounded-md">
                  <p className="text-sm">{text}</p>
                </div>
              )}
              {!text && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">Enter your content to see a preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
