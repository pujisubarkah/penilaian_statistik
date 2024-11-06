// MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    // Mengecek apakah pesan berisi greeting atau "greet"
    if (lowerCaseMessage.includes("halo") || 
        lowerCaseMessage.includes("hai") || 
        lowerCaseMessage.includes("selamat pagi") ||
        lowerCaseMessage.includes("greet")) {
      this.actionProvider.greetUser(); // Memanggil greetUser jika ditemukan greeting atau kata "greet"
    } else if (lowerCaseMessage.includes("tolong")) {
      this.actionProvider.handleHelp(); // Memanggil handleHelp jika ditemukan kata "help"
    } else {
      // Memanggil fungsi untuk mengambil jawaban dari Supabase jika tidak ada greeting atau help
      this.actionProvider.handleQuestionFromSupabase(message);
    }
  }
}

export default MessageParser;
