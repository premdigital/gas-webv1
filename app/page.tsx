'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Zap, Globe, Lock, CheckCircle, ChevronRight, Server, Smartphone, X, Activity, Wifi, MessageCircle, Send } from 'lucide-react';

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900" id="app-root">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md" id="navbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center font-[family-name:var(--font-nunito)] text-2xl font-black tracking-tight">
              <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Navigasi / Header Kanan Kosong */}
          </div>
        </div>
      </header>

      <main className="flex-1 pb-32 pt-16">
        <div className="mx-auto max-w-5xl px-6">
          {/* Header simple */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
              Selamat Datang di PREMDIGITAL
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Solusi lengkap dan terpercaya untuk kebutuhan akses digital tanpa batas Anda.
            </p>
          </div>

          <div className="space-y-32">
            {/* Card 1: Premium Apps */}
            <section className="flex flex-col items-center text-center">
              <div className="w-full aspect-video md:aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl relative border border-slate-200 dark:border-slate-800">
                {/* Image placeholder: You must upload the images to the /public folder */}
                <img src="/premium-apps.png" alt="Aplikasi Premium" className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-10 text-3xl font-bold text-slate-900 dark:text-white">Pusat Layanan Aplikasi Premium</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Nikmati akses penuh ke berbagai platform hiburan dan produktivitas terpopuler. Mulai dari streaming film, mendengarkan musik tanpa iklan, hingga software desain profesional dengan harga yang jauh lebih hemat.
              </p>
            </section>

            {/* Card 2: VPN & Tunneling */}
            <section className="flex flex-col items-center text-center">
              <div className="w-full aspect-video md:aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl relative border border-slate-200 dark:border-slate-800">
                {/* Image placeholder: You must upload the images to the /public folder */}
                <img src="/vpn-tunnel.png" alt="VPN Tunneling" className="w-full h-full object-cover" />
              </div>
              <h2 className="mt-10 text-3xl font-bold text-slate-900 dark:text-white">Akses Tunnel Premium</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Privasi dan keamanan terjamin saat berselancar di dunia maya. Bypass batasan internet dengan server global berkecepatan tinggi yang mendukung protokol OpenVPN, WireGuard, Trojan, Shadowsocks, dan SSH.
              </p>
            </section>
          </div>

          {/* CTA Order Now */}
          <div className="mt-24 flex justify-center">
            <button 
              onClick={() => setIsLoginOpen(true)} 
              className="flex items-center gap-2 rounded-full bg-sky-500 px-10 py-5 text-xl font-bold text-slate-950 hover:bg-sky-400 hover:scale-105 transition-all shadow-xl shadow-sky-500/20"
            >
              Pesan Sekarang
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12" id="footer">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-lg font-black tracking-tight">
            <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            &copy; {new Date().getFullYear()} PREMDIGITAL. All rights reserved.
          </p>
          <div className="hidden">
          </div>
        </div>
      </footer>
      {/* Login Modal Overlay */}
      <AnimatePresence>
        {isLoginOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginOpen(false)}
              className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-6"
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center font-[family-name:var(--font-nunito)] text-xl font-black tracking-tight">
                        <span className="text-[#ff99cc]">PILIH</span><span className="text-[#66ccff]"> KONTAK</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsLoginOpen(false)}
                      className="rounded-md p-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      Pilih platform di bawah ini untuk menghubungi admin kami dan melakukan pemesanan:
                    </p>
                    
                    <a 
                      href="https://wa.me/6283188458876?text=menu" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                        <MessageCircle className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-bold text-slate-900 dark:text-white">WhatsApp</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Pesan langsung via chat</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-green-500" />
                    </a>
                    
                    <a 
                      href="https://t.me/premdigital_bot" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-all group"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 dark:bg-sky-900/50 text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                        <Send className="h-6 w-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <h4 className="font-bold text-slate-900 dark:text-white">Telegram</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Bergabung / chat di Telegram</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-sky-500" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
