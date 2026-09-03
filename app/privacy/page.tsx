import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export const metadata = {
  title: 'Kebijakan Privasi - PREMDIGITAL',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-950 p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <Link href="/" className="inline-flex items-center text-sky-500 hover:text-sky-600 mb-8 font-medium transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Kembali ke Beranda
        </Link>
        
        <h1 className="text-3xl font-black mb-8 tracking-tight">Kebijakan Privasi</h1>
        
        <div className="space-y-8 leading-relaxed text-slate-600 dark:text-slate-400">
          <p className="text-sm font-medium text-slate-500">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          
          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Pengumpulan Data Informasi</h3>
            <p className="mb-2">PREMDIGITAL sangat menghargai privasi Anda. Kami dirancang untuk beroperasi dengan pengumpulan data yang seminimal mungkin. Kami hanya mengumpulkan informasi yang sangat krusial untuk transaksi, yaitu:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Alamat Email atau Nomor WhatsApp (digunakan untuk pengiriman nota dan kredensial akun SSH/VPN).</li>
              <li>Data histori transaksi dasar (ID Pesanan, Nominal) untuk pencatatan pembayaran dan verifikasi klaim garansi.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Kebijakan Tanpa Log (No-Log Policy)</h3>
            <p>Sebagai penyedia layanan privasi dan tunneling, <strong>kami menerapkan No-Log Policy secara ketat pada server kami</strong>. Kami tidak melacak, mencatat, mengumpulkan, maupun menyimpan histori browsing, destinasi traffic, konten data, atau pencarian DNS yang Anda lakukan saat terhubung ke jaringan server kami. Privasi lalu lintas Anda sepenuhnya terjaga.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Keamanan Data Pembayaran</h3>
            <p>Seluruh pemrosesan transaksi (seperti QRIS, E-Wallet, atau Transfer Bank) dilakukan secara otomatis melalui Payment Gateway pihak ketiga yang resmi, diawasi oleh Bank Indonesia, dan memiliki standar enkripsi tinggi. Kami tidak pernah meminta, melihat, ataupun menyimpan PIN, password bank, atau informasi sensitif keuangan Anda di database kami.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Penggunaan Informasi Kontak</h3>
            <p className="mb-2">Informasi kontak Anda (Email/WhatsApp) hanya akan digunakan secara internal untuk:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mengirimkan detail akun setelah pembelian berhasil.</li>
              <li>Memberikan notifikasi pengingat jika masa aktif layanan Anda hampir habis.</li>
              <li>Memberikan informasi darurat jika terjadi perubahan IP atau maintenance server mendadak.</li>
              <li>Merespons keluhan atau pertanyaan Anda ke layanan bantuan (Customer Support) kami.</li>
            </ul>
            <p className="mt-2 text-sm italic">Kami tidak akan pernah menjual atau menyewakan informasi kontak Anda kepada pihak ketiga untuk tujuan pemasaran/spam.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Perubahan Kebijakan</h3>
            <p>Kami berhak untuk mengubah atau memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk menyesuaikan dengan hukum yang berlaku. Perubahan yang ada akan langsung mengikat saat halaman ini diperbarui.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
