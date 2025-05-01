
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { apiClient } from '@/api/apiClient';

interface ApiKeySetupProps {
  defaultApiKey?: string;
  onSetupComplete?: () => void;
}

export const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ 
  defaultApiKey,
  onSetupComplete 
}) => {
  const [open, setOpen] = useState(false);
  const [apiKey, setApiKey] = useState(defaultApiKey || '');
  const [hasStoredKey, setHasStoredKey] = useState(false);

  useEffect(() => {
    // Check if we already have an API key
    const storedKey = localStorage.getItem('api_key');
    setHasStoredKey(!!storedKey);
    
    // If no API key and no default, show the dialog
    if (!storedKey && !defaultApiKey) {
      setOpen(true);
    } else if (storedKey) {
      setApiKey(storedKey);
      apiClient.setApiKey(storedKey);
    }
  }, [defaultApiKey]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error('API key cannot be empty');
      return;
    }

    // Save the API key
    apiClient.setApiKey(apiKey);
    setHasStoredKey(true);
    setOpen(false);
    
    toast.success('API key saved successfully');
    
    if (onSetupComplete) {
      onSetupComplete();
    }
  };

  const handleOpenChange = (open: boolean) => {
    // Don't allow closing the dialog if we don't have a key yet and no default
    if (!hasStoredKey && !defaultApiKey && !open) {
      toast.info('Please enter an API key to continue');
      return;
    }
    setOpen(open);
  };

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-50"
      >
        {hasStoredKey ? 'Change API Key' : 'Set API Key'}
      </Button>
      
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Setup</DialogTitle>
            <DialogDescription>
              Enter your API key to connect to the backend services.
              {!hasStoredKey && !defaultApiKey && (
                <div className="mt-2 text-red-500">
                  An API key is required to use the application.
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                autoComplete="off"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Key</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
