
import React from 'react';
import { MessageCircle, MessageSquare, Facebook, X, Linkedin, Send, PenLine, Instagram, Music } from 'lucide-react';

export const platformIcons = {
  messenger: <Facebook className="h-4 w-4 text-blue-600" />,
  zalo: <MessageCircle className="h-4 w-4 text-blue-500" />,
  website: <MessageSquare className="h-4 w-4 text-purple-600" />,
  linkedin: <Linkedin className="h-4 w-4 text-blue-700" />,
  twitter: <X className="h-4 w-4 text-black" />, // Changed from Twitter to X icon
  telegram: <Send className="h-4 w-4 text-blue-500" />,
  tiktok: <Music className="h-4 w-4 text-black" />, // Updated from Video to Music
  instagram: <Instagram className="h-4 w-4 text-pink-600" />,
  facebook: <Facebook className="h-4 w-4 text-blue-600" />
};
