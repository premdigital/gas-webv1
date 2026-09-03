'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, User, LogOut } from 'lucide-react';
import AdminDashboardClient from './AdminDashboardClient';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Mengecek apakah sudah ada sesi login aktif
    const authStatus = sessionStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsAuthenticated(true);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsChecking(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Pengecekan hardcoded sesuai permintaan
    if (username === '15082000' && password === 'Admin01') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      setError('');
    } else {
      setError('Username atau Password salah. Akses ditolak.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    setUsername('');
    setPassword('');
  };

  if (isChecking) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center"></div>;
  }

  // Jika belum login, tampilkan form login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center p-4">
        <Link href="/" className="mb-8 flex items-center justify-center font-[family-name:var(--font-nunito)] text-3xl font-black tracking-tight hover:opacity-80 transition-opacity">
          <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
        </Link>
        
        <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-500">
              <Lock className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Admin Login</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Masukkan kredensial Anda untuk mengakses panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="rounded-xl bg-red-50 dark:bg-red-900/30 p-4 text-sm font-bold text-red-600 dark:text-red-400 text-center animate-pulse">
                {error}
              </div>
            )}
            
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                No Admin / Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan No Admin" 
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password" 
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-3 pl-12 pr-4 text-slate-900 dark:text-white focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="mt-6 w-full rounded-xl bg-sky-500 py-4 text-center font-bold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 active:scale-[0.98] transition-all"
            >
              Masuk ke Panel
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-sky-500 transition-colors">
              &larr; Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Jika sudah login, tampilkan dashboard Client Component
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-20 animate-fade-in-up">
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ArrowLeft className="h-6 w-6 text-slate-700 dark:text-slate-300" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center font-[family-name:var(--font-nunito)] text-xl font-black tracking-tight">
                <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">ADMIN</span>
              </div>
              <span className="hidden sm:inline-block text-sm font-bold text-slate-400">/ Dashboard</span>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline-block">Logout</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pt-12">
        <AdminDashboardClient />
      </main>
    </div>
  );
}
