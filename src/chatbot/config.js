// config.js
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "HelpBot",
  initialMessages: [
    createChatBotMessage("Hallo apa yang bisa saya bantu?"),
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  }
};

export default config;
