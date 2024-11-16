// config.js
import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";

const config = {
  botName: "Evalin",  
  initialMessages: [
    createChatBotMessage("Selamat datang! Saya Evalin, siap membantu Anda dengan penilaian statistik sektoral di Unit Kerja Anda. Untuk memulai, ketik 'start'.")
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
      <img 
        src="/Eva.png"  // Make sure the path is correct and in quotes
        alt="Bot Avatar" 
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
        }}
      />
    ),
  },
};

export default config;
