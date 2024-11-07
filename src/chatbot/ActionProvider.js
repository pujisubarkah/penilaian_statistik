import { supabase } from '../supabaseClient';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.missedCount = 0;
    this.currentStep = 0;
    this.steps = [
      "Langkah Pertama : Isikan Tambah Kegiatan Statistik, isikan kegiatan statistik di Unit Kerja Anda",
      "ok, kemudian pilih Lihat Isian, tombol yang berwarna hijau, Anda akan melihat halaman Penilaian Mandiri",
      "Sudah, isikan indikator yang sesuai dengan kondisi Unit Kerja Anda sesuai levelnya, masih Rintisan atau Optimum, isi penjelasannya sampai dengan upload bukti dukung yah",
      "ada 15 pernyataan, klik bohlamnya untuk melihat seperti apa indikatornya",
      "setelah selesai kembali ke ruang penilaian mandiri, Anda akan melihat hasilnya",
      "Selamat Anda mendapatkan skor penilaian mandiri statistik sektoral"
    ];
  }

  // Handle step-by-step guide with delay using setTimeout and user input trigger
  handleStepByStep = () => {
    console.log("Current Step:", this.currentStep);
    if (this.currentStep < this.steps.length) {
      const stepMessage = this.createChatBotMessage(this.steps[this.currentStep]);

      // Add a delay before sending the message
      setTimeout(() => {
        this.updateChatbotState(stepMessage);
        this.currentStep++; // Move to the next step
      }, 5000);
    } else {
      const endMessage = this.createChatBotMessage("Anda telah menyelesaikan semua langkah. Jika butuh bantuan lebih lanjut, beri tahu saya!");
      this.updateChatbotState(endMessage);
      this.currentStep = 0; // Reset for future use
    }
  };

  // Trigger next step when user types "sudah"
  handleUserInput = (input) => {
    if (input.toLowerCase().includes("sudah")) {
      this.handleStepByStep();
    } else {
      const message = this.createChatBotMessage("Tunggu sebentar, saya akan melanjutkan ke langkah berikutnya.");
      this.updateChatbotState(message);
    }
  };

  handleNextStep = () => {
    this.handleStepByStep();
  };

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

  handleDefaultResponse = () => {
    const message = this.createChatBotMessage("Saya disini untuk membantu soal statistik sektoral di LAN.");
    this.updateChatbotState(message);
  };

  isQuestionForSupabase = (question) => {
    const keywords = ['statistik', 'data', 'faq', 'pertanyaan'];
    return keywords.some(keyword => question.toLowerCase().includes(keyword));
  };

  handleQuestionFromSupabase = async (question) => {
    if (this.isQuestionForSupabase(question)) {
      const { data, error } = await supabase
        .from('faq')
        .select('jawaban')
        .ilike('pertanyaan', `%${question}%`);

      if (error) {
        console.error("Error fetching data:", error);
        const message = this.createChatBotMessage("Terjadi kesalahan saat mencoba menjawab pertanyaan Anda. Coba lagi nanti.");
        this.updateChatbotState(message);
      } else if (data.length > 0) {
        this.missedCount = 0;
        const message = this.createChatBotMessage(data[0].jawaban);
        this.updateChatbotState(message);
      } else {
        this.missedCount++;
        const message = this.createChatBotMessage(this.missedCount >= 2
          ? "Wah, yang ini juga belum ada nih. Bisa jadi pertanyaan Anda sangat unik. Coba tanya yang lain ya!"
          : "Waduh, pertanyaannya belum ada di database saya nih. Coba tanya yang lain ya!");
        this.updateChatbotState(message);
        if (this.missedCount >= 2) this.missedCount = 0;
      }
    } else {
      const message = this.createChatBotMessage("Saya disini untuk membantu penilaian statistik sektoral di unit kerja Anda.");
      this.updateChatbotState(message);
    }
  };
  

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...(prevState.messages || []), message],
    }));
  }
}

export default ActionProvider;
