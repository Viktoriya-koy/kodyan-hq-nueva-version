// Configuración global del chatbot
const CHATBOT_CONFIG = {
    name: "Kodyan Assistant",
    version: "1.0.0",
    developer: "Kodyan HQ",
    
    // Configuración de UI
    ui: {
        maxMessages: 100,
        typingDelay: 800, // ms
        messageDelay: 300, // ms
        autoOpen: true,
        showTimestamps: true
    },
    
    // Configuración de comportamiento
    behavior: {
        enableQuickReplies: true,
        enableTypingIndicator: true,
        saveConversation: true,
        maxInputLength: 500
    },
    
    // Estilos
    styles: {
        primaryColor: "#00FFD1",
        secondaryColor: "#38B2AC",
        botAvatar: "fas fa-code",
        userAvatar: "fas fa-user"
    }
};

// Estado global del chatbot
let CHATBOT_STATE = {
    isOpen: false,
    isMinimized: false,
    isTyping: false,
    conversation: [],
    currentTopic: null,
    firstInteraction: true
};
