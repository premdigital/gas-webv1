import { Star, Zap, Shield, Gift, Package, Monitor, Wifi, Activity } from 'lucide-react';

export const getIconComponent = (iconName: string) => {
  switch (iconName.toLowerCase()) {
    case 'star': return Star;
    case 'zap': return Zap;
    case 'shield': return Shield;
    case 'gift': return Gift;
    case 'monitor': return Monitor;
    case 'wifi': return Wifi;
    case 'activity': return Activity;
    default: return Package;
  }
};
