import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ProductGridClient from './ProductGridClient';

export default function PremiumAppsCatalog() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center px-4 py-4">
          <Link href="/" className="p-2 mr-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <ArrowLeft className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center font-[family-name:var(--font-nunito)] text-xl font-black tracking-tight">
              <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
            </div>
            <span className="text-sm font-bold text-slate-400">/ Katalog</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Premium Apps
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
            Tingkatkan produktivitas dan hiburan Anda dengan aplikasi premium original bergaransi. Harga jauh lebih murah dari harga resmi.
          </p>
        </div>

        <ProductGridClient />
      </main>
    </div>
  );
}
