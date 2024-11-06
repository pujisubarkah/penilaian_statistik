// ActionProvider.js
import { supabase } from '../supabaseClient';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.missedCount = 0; // Menambahkan missedCount untuk kontrol
  }

  greetUser = () => {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
      greeting = "Selamat pagi! Semoga kopi Anda lebih kuat dari rasa malas hari ini.";
    } else if (currentHour >= 12 && currentHour < 18) {
      greeting = "Selamat siang! Sudah siap menyelam di lautan data?";
    } else {
      greeting = "Selamat malam! Jangan khawatir, saya masih terjaga buat bantuin Anda!";
    }

    const introduction = "Saya AngkaMan, asisten data yang siap membantu Anda?";
    const greetingMessage = this.createChatBotMessage(`${greeting} ${introduction}`);
    this.updateChatbotState(greetingMessage);
  };

  handleHelp = () => {
    const message = this.createChatBotMessage("Tentu saja! Apa yang bisa saya bantu?");
    this.updateChatbotState(message);
  };

  // Default response jika tidak ada kecocokan
  handleDefaultResponse = () => {
    const message = this.createChatBotMessage("Saya disini untuk membantu soal statistik sektoral di LAN.");
    this.updateChatbotState(message);
  };

  // Fungsi untuk mengecek apakah pertanyaan memerlukan jawaban dari Supabase
  isQuestionForSupabase = (question) => {
    // Tentukan kata kunci yang menunjukkan bahwa pertanyaan mengarah ke Supabase
    const keywords = ['statistik', 'data', 'faq', 'pertanyaan'];
    return keywords.some(keyword => question.toLowerCase().includes(keyword));
  }

  // Fungsi untuk menangani pertanyaan yang mengarah ke Supabase
  handleQuestionFromSupabase = async (question) => {
    // Cek apakah pertanyaan memerlukan pencarian di Supabase
    if (this.isQuestionForSupabase(question)) {
      const { data, error } = await supabase
        .schema("simbatik")
        .from('faq')  // Ganti dengan nama tabel yang sesuai
        .select('jawaban')
        .ilike('pertanyaan', `%${question}%`);  // Mencocokkan pertanyaan dari input pengguna

      if (error) {
        console.error("Error fetching data:", error);
        const message = this.createChatBotMessage("Terjadi kesalahan saat mencoba menjawab pertanyaan Anda. Coba lagi nanti.");
        this.updateChatbotState(message);
      } else if (data.length > 0) {
        // Jika ditemukan jawaban
        this.missedCount = 0; // Reset missedCount jika ditemukan jawaban
        const message = this.createChatBotMessage(data[0].jawaban);
        this.updateChatbotState(message);
      } else {
        // Jika tidak ditemukan jawaban di Supabase
        this.missedCount++;
    
        if (this.missedCount >= 1) {
          // Setelah dua kali atau lebih gagal menemukan jawaban, memberikan alternatif
          const message = this.createChatBotMessage("Wah, yang ini juga belum ada nih. Bisa jadi pertanyaan Anda sangat unik. Coba tanya yang lain ya!");
          this.updateChatbotState(message);
          this.missedCount = 0; // Reset missedCount setelah memberikan pesan alternatif
        } else {
          const message = this.createChatBotMessage("Waduh, pertanyaannya belum ada di database saya nih. Coba tanya yang lain ya!");
          this.updateChatbotState(message);
        }
      }
    } else {
      // Jika pertanyaan tidak cocok, balas dengan default
      const message = this.createChatBotMessage("Saya disini untuk membantu penilaian statistik sektoral di unit kerja Anda.");
      this.updateChatbotState(message);
    }
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
