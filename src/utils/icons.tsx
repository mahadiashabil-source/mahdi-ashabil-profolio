import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Server, 
  ShoppingBag, 
  Terminal, 
  Briefcase,
  ChevronDown,
  Gift,
  ShieldCheck,
  Heart,
  Globe,
  MessageCircle,
  Music
} from 'lucide-react';

export const IconMap: Record<string, any> = {
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Server,
  ShoppingBag,
  Terminal,
  Briefcase,
  ChevronDown,
  Gift,
  ShieldCheck,
  Heart,
  Globe,
  WhatsApp: MessageCircle,
  TikTok: Music
};

export const getIcon = (name: string, props: any = {}) => {
  const Icon = IconMap[name] || Globe;
  return <Icon {...props} />;
};
