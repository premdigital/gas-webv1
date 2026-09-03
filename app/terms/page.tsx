import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Syarat & Ketentuan - PREMDIGITAL',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Link href="/" className="inline-flex items-center text-sky-500 hover:text-sky-600 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl font-black mb-8 tracking-tight">Syarat & Ketentuan Layanan</h1>
        
        <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-400">
          <p className="text-sm font-medium text-slate-500">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Penggunaan Layanan</h3>
            <p className="mb-2">Dengan membeli dan menggunakan layanan SSH/VPN dari PREMDIGITAL, Anda setuju untuk tidak menggunakan layanan kami untuk aktivitas ilegal atau merugikan, termasuk namun tidak terbatas pada:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Hacking, Cracking, atau aktivitas eksploitasi keamanan lainnya.</li>
              <li>Carding, penipuan finansial, atau pencurian data.</li>
              <li>Spamming, phising, atau penyebaran malware/virus.</li>
              <li>Melakukan serangan DDoS (Distributed Denial of Service).</li>
              <li>Torrenting atau aktivitas P2P pada server yang secara spesifik melarangnya (untuk menghindari teguran DMCA).</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Batas Multi-Login (Device)</h3>
            <p>Setiap akun SSH/VPN memiliki batas maksimal perangkat (device) yang dapat terhubung secara bersamaan sesuai dengan paket yang Anda beli. Melanggar batas (overshare) ini dapat menyebabkan akun Anda otomatis terputus, dikunci, atau dihapus oleh sistem pengamanan server kami.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Kebijakan Pengembalian Dana (Refund)</h3>
            <p>Semua transaksi bersifat final. Kami tidak melayani pengembalian dana (refund) untuk layanan yang sudah berstatus aktif dan detail login telah diberikan kepada pembeli. Refund hanya berlaku jika terdapat kendala sistem dari pihak kami yang menyebabkan akun gagal dibuat setelah pembayaran terkonfirmasi.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Penangguhan Akun (Banned)</h3>
            <p>PREMDIGITAL berhak menangguhkan (suspend) atau menghapus akun pengguna tanpa pemberitahuan dan tanpa pengembalian dana jika sistem kami atau provider datacenter mendeteksi adanya pelanggaran serius terhadap Syarat & Ketentuan ini.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Ketersediaan Layanan (Uptime)</h3>
            <p>Kami berkomitmen untuk memberikan garansi uptime server terbaik. Namun, gangguan teknis di luar kendali (force majeure), masalah rute jaringan ISP lokal, atau pemeliharaan server (maintenance) berkala dapat terjadi. Kami akan mengupayakan penyelesaian kendala secepat mungkin jika terjadi gangguan.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
