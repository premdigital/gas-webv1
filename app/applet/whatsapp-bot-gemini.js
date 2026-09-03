// whatsapp-bot-gemini.js
// 
// File ini adalah referensi/contoh integrasi Gemini AI untuk Bot WhatsApp Anda 
// yang berjalan di panel Pterodactyl menggunakan @whiskeysockets/baileys.
// Anda dapat memasukkan kode ini ke dalam file bot Anda.

const { GoogleGenAI } = require("@google/genai");

// Inisialisasi Gemini API 
// (Pastikan Anda sudah menaruh GEMINI_API_KEY di environment variables panel Pterodactyl)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// System Instruction untuk membentuk persona AI sesuai keinginan Anda
const systemInstruction = `
Kamu adalah Customer Service Assistant untuk "PREMDIGITAL".
Gunakan bahasa Indonesia yang ramah, santai, dan profesional. 
Selalu panggil pelanggan dengan sebutan "Kak".
Gunakan kata ganti "kami" untuk merujuk pada PREMDIGITAL.

Layanan utama yang ditawarkan PREMDIGITAL:
1. Layanan VPN/SSH Tunneling (Bypass internet, akses server global berkecepatan tinggi).
2. Premium Apps (Netflix, Spotify, Canva, dll dengan harga hemat).

Panduan Troubleshooting & Jawaban:
- Jika pelanggan bertanya atau mengeluh tentang VPN/SSH yang bermasalah, lemot, atau tidak bisa connect: 
  Arahkan mereka untuk mencoba melakukan "Mode Pesawat (Airplane Mode)" pada HP mereka selama beberapa detik, lalu matikan kembali, dan coba connect ulang VPN-nya.
- Jika pelanggan bertanya tentang Aplikasi Premium yang bermasalah (error, layar hitam, akun ter-logout, atau minta PIN): 
  Minta mereka untuk mengirimkan "Screenshot error" beserta "Email akun" yang didaftarkan.
- Jika ada hal yang tidak bisa kamu jawab, keluhan kritis, atau pelanggan ingin melakukan konfirmasi pembayaran/pembelian:
  Arahkan mereka untuk chat Admin langsung di WhatsApp: 0831-8845-8876 (Atau berikan link wa.me/6283188458876).
- Jawab secara ringkas, informatif, dan tidak bertele-tele.
`;

// Fungsi untuk mendapatkan balasan dari Gemini
async function getGeminiReply(userMessage) {
    try {
        const response = await ai.models.generateContent({
            // Anda bisa menggunakan gemini-2.5-flash untuk respon yang sangat cepat
            model: "gemini-2.5-flash", 
            contents: userMessage,
            config: {
                systemInstruction: systemInstruction,
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "Maaf Kak, saat ini AI kami sedang sibuk atau ada gangguan sistem. Silakan hubungi Admin langsung di wa.me/6283188458876 ya Kak.";
    }
}

/* 
=========================================================
 CONTOH CARA MENGGABUNGKAN KE KODE BAILEYS ANDA:
=========================================================
Di dalam kode bot Anda (contohnya di index.js), cari bagian:
sock.ev.on('messages.upsert', async m => { ... })

Lalu Anda bisa menambahkan logika di bawah ini:

sock.ev.on('messages.upsert', async (m) => {
    const msg = m.messages[0];
    if (!msg.message || msg.key.fromMe) return; // Abaikan pesan dari diri sendiri atau yang kosong

    const sender = msg.key.remoteJid;
    // Abaikan jika pesan berasal dari grup (atau hapus ini jika bot juga membalas di grup)
    if (sender.endsWith('@g.us')) return; 

    // Ambil teks pesan
    const textMessage = msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    if (textMessage) {
        try {
            // (Opsional) Tampilkan status "sedang mengetik..."
            await sock.sendPresenceUpdate('composing', sender);

            // Panggil fungsi Gemini
            const reply = await getGeminiReply(textMessage);

            // Kirim balasan ke user
            await sock.sendMessage(sender, { text: reply }, { quoted: msg });
        } catch (err) {
            console.error(err);
        }
    }
});
*/

module.exports = { getGeminiReply };
