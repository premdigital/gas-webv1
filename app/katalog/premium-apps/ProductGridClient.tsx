'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Product } from '@/lib/types';
import { getIconComponent } from '@/lib/icons';
import { Tag, ChevronRight, Check } from 'lucide-react';
import { CatalogSkeleton } from '@/components/ui/catalog-skeleton';

export default function ProductGridClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where("categoryName", "==", "premium-apps"));
        const querySnapshot = await getDocs(q);
        const data: Product[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as Product);
        });
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
      setIsLoading(false);
    };
    
    fetchProducts();
  }, []);

  if (isLoading) {
    return <CatalogSkeleton />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500 dark:text-slate-400">Belum ada produk di kategori ini.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      {products.map((product, idx) => {
        const IconComponent = getIconComponent(product.icon);
        
        return (
          <div 
            key={product.id} 
            className="flex flex-col rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm transition-all hover:shadow-xl hover:border-sky-500/50 animate-fade-in-up"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="mb-4 flex items-start justify-between">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${product.bgColor} ${product.color}`}>
                <IconComponent className="h-6 w-6" />
              </div>
              {product.discount && (
                <div className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  <Tag className="h-3 w-3" />
                  {product.discount}
                </div>
              )}
            </div>
            
            <h3 className="mb-1 text-xl font-bold text-slate-900 dark:text-white">{product.title}</h3>
            <p className="mb-6 text-sm font-bold text-slate-500 dark:text-slate-400">{product.category}</p>
            
            <div className="mb-6 flex-1 space-y-3">
              {product.features?.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto border-t border-slate-100 pt-6 dark:border-slate-800">
              <div className="mb-4 flex items-end justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400">Harga Spesial</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm font-bold text-slate-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
              
              <a 
                href={`https://wa.me/6283188458876?text=Halo%20Admin,%20saya%20mau%20pesan%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 font-bold text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                Order Sekarang
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
