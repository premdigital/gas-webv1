export interface Product {
  id?: string;
  categoryName: string; // "premium-apps" | "vpn-tunnel"
  title: string;
  category: string; 
  price: string;
  originalPrice: string | null;
  icon: string;
  color: string;
  bgColor: string;
  discount: string;
  features: string[];
}
