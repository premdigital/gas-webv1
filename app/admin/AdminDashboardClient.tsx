'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Product } from '@/lib/types';
import { seedProducts } from '@/lib/seedData';
import { Plus, Search, Settings, Tag, Package, BarChart3, Edit, Trash, X, Save } from 'lucide-react';

export default function AdminDashboardClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  const defaultProduct: Product = {
    categoryName: 'premium-apps',
    title: '',
    category: '',
    price: '',
    originalPrice: '',
    icon: 'Star',
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    discount: '',
    features: ['']
  };

  const [formData, setFormData] = useState<Product>(defaultProduct);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const data: Product[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSeedData = async () => {
    setIsLoading(true);
    try {
      for (const prod of seedProducts) {
        await addDoc(collection(db, 'products'), prod);
      }
      await fetchProducts();
    } catch (error) {
      console.error('Error seeding data:', error);
      setIsLoading(false);
    }
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData(defaultProduct);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dataToSave = { ...formData };
      if (!dataToSave.originalPrice) dataToSave.originalPrice = null;
      
      if (editingProduct?.id) {
        await updateDoc(doc(db, 'products', editingProduct.id), dataToSave as any);
      } else {
        await addDoc(collection(db, 'products'), dataToSave);
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  return (
    <>
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
            Panel Admin
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Kelola katalog produk, harga, dan ketersediaan layanan Anda di sini.
          </p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-bold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          Tambah Produk
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-500">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Produk</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{products.length} Active</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30 text-green-500">
              <Tag className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Kategori</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">2 Tersedia</p>
            </div>
          </div>
        </div>
        
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-500">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Status Database</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">Tersinkron</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Daftar Produk</h2>
        </div>
        
        {isLoading ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4 animate-spin">
              <Settings className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Memuat Data...</h3>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mb-4">
              <Package className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Database Kosong</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-6">
              Tidak ada produk yang ditemukan di database. Anda dapat menambahkan produk satu per satu atau memigrasi data bawaan secara otomatis.
            </p>
            <button 
              onClick={handleSeedData}
              className="px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-sky-500/20"
            >
              Migrasi Data Statis Sekarang
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="p-4 font-bold text-slate-900 dark:text-white">Nama Produk</th>
                  <th className="p-4 font-bold text-slate-900 dark:text-white">Kategori</th>
                  <th className="p-4 font-bold text-slate-900 dark:text-white">Harga</th>
                  <th className="p-4 font-bold text-slate-900 dark:text-white text-right">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {products.map(prod => (
                  <tr key={prod.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900/50">
                    <td className="p-4">
                      <div className="font-bold text-slate-900 dark:text-white">{prod.title}</div>
                      <div className="text-xs text-slate-500">{prod.categoryName === 'premium-apps' ? 'Premium Apps' : 'VPN Tunnel'}</div>
                    </td>
                    <td className="p-4 text-slate-700 dark:text-slate-300">{prod.category}</td>
                    <td className="p-4 text-slate-900 dark:text-white font-bold">{prod.price}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => handleOpenModal(prod)}
                        className="inline-flex p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => prod.id && handleDelete(prod.id)}
                        className="inline-flex p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-950 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Produk</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Kategori Halaman</label>
                  <select required value={formData.categoryName} onChange={e => setFormData({...formData, categoryName: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white">
                    <option value="premium-apps">Premium Apps</option>
                    <option value="vpn-tunnel">VPN Tunnel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Sub Kategori</label>
                  <input required type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="Streaming, Design, VPN Tunnel..." className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Harga (ex: Rp 35.000)</label>
                  <input required type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Harga Asli (Coret) - Opsional</label>
                  <input type="text" value={formData.originalPrice || ''} onChange={e => setFormData({...formData, originalPrice: e.target.value})} placeholder="Biarkan kosong jika tidak ada" className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Teks Badge/Diskon</label>
                  <input type="text" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} placeholder="Diskon 80%, Terlaris..." className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Ikon (Star, Zap, Shield, Gift, dll)</label>
                <input required type="text" value={formData.icon} onChange={e => setFormData({...formData, icon: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Fitur (Pisahkan dengan koma)</label>
                <textarea 
                  required 
                  value={formData.features.join(', ')} 
                  onChange={e => setFormData({...formData, features: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white min-h-[100px]"
                  placeholder="Ultra HD (4K), Bisa 4 Layar, Tanpa Iklan..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Warna Teks (Tailwind class)</label>
                  <input required type="text" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" placeholder="text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Warna Bg (Tailwind class)</label>
                  <input required type="text" value={formData.bgColor} onChange={e => setFormData({...formData, bgColor: e.target.value})} className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white" placeholder="bg-red-500/10" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                  Batal
                </button>
                <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-sky-500 hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/20">
                  <Save className="h-5 w-5" />
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
