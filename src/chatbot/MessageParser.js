// MessageParser.js
class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("help")) {
        this.actionProvider.handleHelp();
      } else {
        this.actionProvider.handleDefaultResponse();
      }
    }
  }
  
  export default MessageParser;
  