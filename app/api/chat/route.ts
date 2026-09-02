import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini client (ensure GEMINI_API_KEY is available in your server environment)
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = `
Anda adalah Asisten Virtual resmi dari PREMDIGITAL.
Tugas Anda adalah membantu pengunjung website dengan ramah, profesional, dan menggunakan bahasa Indonesia yang baik.
PREMDIGITAL menyediakan layanan Aplikasi Premium dan Akses VPN Tunnel Premium.

Aturan penting:
1. Jawab pertanyaan seputar layanan dengan jelas dan singkat.
2. JIKA pengguna menanyakan harga spesifik, cara pembayaran, masalah teknis mendalam, ATAU Anda tidak tahu jawabannya, arahkan mereka untuk menghubungi Admin.
3. Berikan kontak admin berupa tautan WhatsApp ini: https://wa.me/6283188458876?text=menu atau Telegram ini: https://t.me/premdigital_bot (Tampilkan sebagai teks klik atau sebutkan).
4. Jangan pernah mengarang informasi yang tidak relevan dengan PREMDIGITAL.
5. Sapa pengguna dengan hangat jika ini adalah awal percakapan.
`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Convert history format to Gemini API format if needed, but for simplicity we can use system instruction
    // and pass recent context in the prompt, or use a chat session. Since this is standard GenAI SDK,
    // we can use a basic chat approach or just send everything as contents.
    
    // For @google/genai SDK v2.4.0, we can use ai.models.generateContent with systemInstruction
    const contents = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    
    // Append the new message
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    
    // Check if it's a permission/API key error
    if (error?.message?.includes("PERMISSION_DENIED") || error?.status === 403) {
      return NextResponse.json({ 
        text: "Maaf, fitur chat saat ini belum terkonfigurasi dengan API Key yang valid. Silakan langsung hubungi Admin via [WhatsApp](https://wa.me/6283188458876?text=menu) atau [Telegram](https://t.me/premdigital_bot)." 
      });
    }

    return NextResponse.json(
      { error: "Gagal memproses pesan. Silakan hubungi admin secara langsung.", details: error.message },
      { status: 500 }
    );
  }
}
