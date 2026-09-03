"use client";

import { MessageCircle } from "lucide-react";

export default function LiveChat() {
  const adminWhatsApp = "6283188458876"; // Nomor admin (sesuai yang ada sebelumnya)
  const defaultMessage = encodeURIComponent("Halo Admin PREMDIGITAL, saya ingin bertanya seputar layanan VPN/SSH.");

  return (
    <a
      href={`https://wa.me/${adminWhatsApp}?text=${defaultMessage}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 p-4 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/20 z-50 transition-all flex items-center justify-center group hover:scale-110 active:scale-95 animate-in fade-in zoom-in duration-500"
      aria-label="Chat WhatsApp Admin"
    >
      <MessageCircle size={28} />
      {/* Tooltip */}
      <span className="absolute right-full mr-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat Admin
      </span>
    </a>
  );
}
