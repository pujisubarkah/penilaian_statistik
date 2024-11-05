// ActionProvider.js
import { createChatBotMessage } from "react-chatbot-kit";

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHelp = () => {
    const message = this.createChatBotMessage("Tentu saja! Apa yang bisa saya bantu?");
    this.updateChatbotState(message);
  };

  handleDefaultResponse = () => {
    const message = this.createChatBotMessage("saya disini untuk membantu soal statistik sektoral di LAN");
    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
