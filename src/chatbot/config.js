// config.js
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "AngkaMan",
  initialMessages: [
    createChatBotMessage("Selamat datang! Saya AngkaMan, siap membantu Anda dengan penilaian statistik sektoral di Unit Kerja Anda")
  ],
  actionProvider: ActionProvider,
  messageParser: MessageParser,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    userMessageBox: {
      backgroundColor: "#5ccc9d",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
  customComponents: {
    botAvatar: () => (
      <div 
        style={{
          backgroundColor: "#376B7E", 
          color: "#fff", 
          fontSize: "24px", 
          width: "40px", 
          height: "40px", 
          borderRadius: "50%", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center"
        }}
      >
        A
      </div>
    ),
  },
};

export default config;
