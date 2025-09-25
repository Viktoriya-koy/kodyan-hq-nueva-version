// Archivo principal de inicialización del chatbot
class KodyanChatbot {
    constructor() {
        this.engine = new ChatbotEngine();
        this.ui = null;
        this.isInitialized = false;
    }

    // Inicializar chatbot
    init() {
        if (this.isInitialized) return;
        
        try {
            // Verificar que existan los elementos DOM necesarios
            if (!this.checkDOM()) {
                console.warn('Chatbot: Elementos DOM no encontrados');
                return;
            }

            // Inicializar motor y UI
            this.ui = new ChatbotUI(this.engine);
            
            // Mostrar mensaje de bienvenida
            this.engine.displayWelcomeMessage();
            
            // Auto-abrir si está configurado
            if (CHATBOT_CONFIG.ui.autoOpen) {
                setTimeout(() => {
                    this.ui.openChat();
                }, 2000);
            }
            
            this.isInitialized = true;
            console.log('Kodyan Chatbot inicializado correctamente');
            
        } catch (error) {
            console.error('Error inicializando chatbot:', error);
        }
    }

    // Verificar elementos DOM
    checkDOM() {
        const requiredElements = [
            'chatbotToggle',
            'chatbotContainer', 
            'chatbotMessages',
            'chatbotInput',
            'chatbotSend'
        ];
        
        return requiredElements.every(id => document.getElementById(id));
    }

    // Métodos públicos
    open() {
        if (this.ui) this.ui.openChat();
    }

    close() {
        if (this.ui) this.ui.closeChat();
    }

    sendMessage(message) {
        if (this.engine) this.engine.processInput(message);
    }

    clear() {
        if (this.engine) this.engine.clearConversation();
    }

    // Destruir instancia
    destroy() {
        this.ui = null;
        this.engine = null;
        this.isInitialized = false;
    }
}

// Instancia global
window.KodyanChatbot = KodyanChatbot;

// Auto-inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para asegurar que todo esté cargado
    setTimeout(() => {
        window.kodyanChatbot = new KodyanChatbot();
        window.kodyanChatbot.init();
    }, 100);
});

// Exportar para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KodyanChatbot;
}
