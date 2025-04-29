
import React from 'react';
import { MessageCircle, MessageSquare, Facebook, Twitter, Linkedin, Send, PenLine, Instagram, Video } from 'lucide-react';

export const platformIcons = {
  messenger: <Facebook className="h-4 w-4 text-blue-600" />,
  zalo: <MessageCircle className="h-4 w-4 text-blue-500" />,
  website: <MessageSquare className="h-4 w-4 text-purple-600" />,
  linkedin: <Linkedin className="h-4 w-4 text-blue-700" />,
  twitter: <Twitter className="h-4 w-4 text-blue-400" />,
  telegram: <Send className="h-4 w-4 text-blue-500" />,
  tiktok: <Video className="h-4 w-4 text-black" />,
  instagram: <Instagram className="h-4 w-4 text-pink-600" />,
  facebook: <Facebook className="h-4 w-4 text-blue-600" />
};
