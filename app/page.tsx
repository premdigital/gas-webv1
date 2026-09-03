'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Activity, CheckCircle, Server, Shield } from 'lucide-react';

const LiveServerChart = () => {
  const [data, setData] = useState<number[]>(Array.from({ length: 40 }, () => 23));

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1)];
        const last = next[next.length - 1];
        const change = (Math.random() - 0.5) * 8; // Random fluctuation
        let newValue = last + change;
        if (newValue > 55) newValue = 55;
        if (newValue < 15) newValue = 15; 
        next.push(newValue);
        return next;
      });
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const width = 800;
  const height = 100;
  const step = width / (data.length - 1);
  
  const pathData = data.map((val, i) => {
    const x = i * step;
    // Map 10ms-60ms to 0-100 height (higher ping = higher on chart)
    const normalized = (val - 10) / 50; 
    const y = height - (normalized * height);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const currentPing = Math.round(data[data.length - 1]);
  const currentYPercentage = 100 - (((data[data.length - 1] - 10) / 50) * 100);

  return (
    <>
      <div className="relative w-full h-[120px] mt-6 mb-2">
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${pathData} L ${width} ${height} L 0 ${height} Z`} fill="url(#blueGradient)" className="transition-all duration-[800ms] ease-linear" />
          <path d={pathData} fill="none" stroke="#0ea5e9" strokeWidth="2.5" className="transition-all duration-[800ms] ease-linear" />
        </svg>
        {/* Live Blinking Dot at the rightmost edge */}
        <div 
          className="absolute w-3 h-3 bg-white border-2 border-sky-500 rounded-full shadow-[0_0_15px_#0ea5e9] transition-all duration-[800ms] ease-linear"
          style={{ 
            right: '-4px', 
            top: `${currentYPercentage}%`, 
            transform: 'translateY(-50%)' 
          }} 
        >
          <div className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-75"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4 text-xs font-bold text-slate-400 dark:text-slate-500">
        <div className="flex items-center gap-2">
          <span>Ping</span>
          <span className="text-slate-700 dark:text-slate-300 tabular-nums">{currentPing} ms</span>
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </div>
        </div>
        <span className="text-sky-600 dark:text-sky-400/80 hidden sm:inline-block">Real-time Latency</span>
        <span>Live</span>
      </div>
    </>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900" id="app-root">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md" id="navbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="flex items-center justify-center font-[family-name:var(--font-nunito)] text-2xl font-black tracking-tight hover:opacity-80 transition-opacity">
              <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
            </Link>
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
                <Image src="/premium-apps.png" alt="Aplikasi Premium" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <h2 className="mt-10 text-3xl font-bold text-slate-900 dark:text-white">Pusat Layanan Aplikasi Premium</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Nikmati akses penuh ke berbagai platform hiburan dan produktivitas terpopuler. Mulai dari streaming film, mendengarkan musik tanpa iklan, hingga software desain profesional dengan harga yang jauh lebih hemat.
              </p>
              
              {/* Arrow Button for Premium Apps Catalog */}
              <Link 
                href="/katalog/premium-apps" 
                className="group mt-8 flex flex-col items-center justify-center gap-3 transition-transform"
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-sky-400 opacity-20 animate-ping group-hover:opacity-40"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-sky-500 text-sky-500 shadow-md shadow-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                  Lihat Katalog App Premium
                </span>
              </Link>
            </section>

            {/* Card 2: VPN & Tunneling */}
            <section className="flex flex-col items-center text-center">
              <div className="w-full aspect-video md:aspect-[21/9] bg-slate-200 dark:bg-slate-800 rounded-3xl overflow-hidden shadow-xl relative border border-slate-200 dark:border-slate-800">
                {/* Image placeholder: You must upload the images to the /public folder */}
                <Image src="/vpn-tunnel.png" alt="VPN Tunneling" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <h2 className="mt-10 text-3xl font-bold text-slate-900 dark:text-white">Akses Tunnel Premium</h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                Privasi dan keamanan terjamin saat berselancar di dunia maya. Bypass batasan internet dengan server global berkecepatan tinggi yang mendukung protokol OpenVPN, WireGuard, Trojan, Shadowsocks, dan SSH.
              </p>

              {/* Arrow Button for VPN Tunnel Catalog */}
              <Link 
                href="/katalog/vpn-tunnel" 
                className="group mt-8 flex flex-col items-center justify-center gap-3 transition-transform"
              >
                <div className="relative flex h-16 w-16 items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-sky-400 opacity-20 animate-ping group-hover:opacity-40"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-slate-950 border-2 border-sky-500 text-sky-500 shadow-md shadow-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all duration-300">
                    <ChevronRight className="h-8 w-8 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <span className="text-sm font-bold text-sky-600 dark:text-sky-400">
                  Lihat Katalog VPN & Config
                </span>
              </Link>
            </section>
          </div>

          {/* New Section: Server Status */}
          <div className="mt-32 border-t border-slate-200 dark:border-slate-800 pt-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-3">
                <Server className="h-8 w-8 text-sky-500" />
                Status Server Web
              </h2>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Monitoring uptime server website secara live.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 md:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-500">
                      <Activity className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">Web Server Utama</h3>
                      <p className="text-sm font-medium text-slate-500">Node asia-southeast1</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg self-start sm:self-auto border border-green-200/50 dark:border-green-800/50">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-bold text-green-700 dark:text-green-400">All Systems Operational</span>
                  </div>
                </div>

                {/* Live Animated Line */}
                <LiveServerChart />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12" id="footer">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 font-[family-name:var(--font-nunito)] text-lg font-black tracking-tight">
              <span className="text-[#ff99cc]">PREM</span><span className="text-[#66ccff]">DIGITAL</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-500 text-center md:text-left">
              &copy; {new Date().getFullYear()} PREMDIGITAL. All rights reserved.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
