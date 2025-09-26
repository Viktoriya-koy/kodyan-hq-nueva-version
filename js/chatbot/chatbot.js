// ===== CHATBOT KODYAN HQ - ARCHIVO PRINCIPAL CORREGIDO =====

// Archivo principal de inicialización del chatbot
class KodyanChatbot {
    constructor() {
        this.engine = null;
        this.ui = null;
        this.isInitialized = false;
        this.initTimeout = null;
    }

    // Inicializar chatbot con verificación robusta
    init() {
        if (this.isInitialized) {
            console.log('Chatbot: Ya estaba inicializado');
            return;
        }
        
        // Limpiar timeout anterior si existe
        if (this.initTimeout) {
            clearTimeout(this.initTimeout);
        }

        this.initTimeout = setTimeout(() => {
            this._initialize();
        }, 500); // Dar más tiempo para que el DOM cargue
    }

    // Inicialización interna
    _initialize() {
        try {
            console.log('Chatbot: Iniciando inicialización...');
            
            // Verificar que existan los elementos DOM necesarios
            if (!this._checkDOM()) {
                console.warn('Chatbot: Elementos DOM no encontrados, reintentando...');
                // Reintentar después de 1 segundo
                setTimeout(() => this._initialize(), 1000);
                return;
            }

            // Verificar que las dependencias estén cargadas
            if (typeof ChatbotEngine === 'undefined') {
                console.error('Chatbot: ChatbotEngine no está definido');
                return;
            }

            if (typeof ChatbotUI === 'undefined') {
                console.error('Chatbot: ChatbotUI no está definido');
                return;
            }

            if (typeof CHATBOT_CONFIG === 'undefined') {
                console.error('Chatbot: CHATBOT_CONFIG no está definido');
                return;
            }

            // Inicializar motor y UI
            this.engine = new ChatbotEngine();
            this.ui = new ChatbotUI(this.engine);
            
            // Verificar que la UI se inicializó correctamente
            if (!this.ui.isInitialized) {
                throw new Error('La interfaz de usuario no se pudo inicializar');
            }
            
            // Mostrar mensaje de bienvenida
            this.engine.displayWelcomeMessage();
            
            // Configurar auto-apertura
            this._setupAutoOpen();
            
            this.isInitialized = true;
            console.log('✅ Kodyan Chatbot inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error inicializando chatbot:', error);
            this._showErrorFallback();
        }
    }

    // Verificación robusta de elementos DOM
    _checkDOM() {
        const requiredElements = {
            'chatbotToggle': 'Botón toggle del chatbot',
            'chatbotContainer': 'Contenedor principal', 
            'chatbotMessages': 'Área de mensajes',
            'chatbotInput': 'Campo de entrada',
            'chatbotSend': 'Botón enviar'
        };
        
        let allFound = true;
        
        for (const [id, description] of Object.entries(requiredElements)) {
            const element = document.getElementById(id);
            if (!element) {
                console.warn(`Chatbot: Elemento no encontrado - ${description} (ID: ${id})`);
                allFound = false;
            }
        }
        
        if (allFound) {
            console.log('✅ Todos los elementos DOM encontrados');
        }
        
        return allFound;
    }

    // Configurar auto-apertura
    _setupAutoOpen() {
        if (CHATBOT_CONFIG.ui.autoOpen) {
            console.log('Chatbot: Auto-apertura configurada');
            setTimeout(() => {
                if (this.ui && typeof this.ui.openChat === 'function') {
                    this.ui.openChat();
                }
            }, CHATBOT_CONFIG.ui.autoOpenDelay || 2000);
        }
    }

    // Mostrar fallback en caso de error
    _showErrorFallback() {
        const toggleBtn = document.getElementById('chatbotToggle');
        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            toggleBtn.title = 'Chatbot no disponible';
            toggleBtn.style.background = '#ff4444';
            toggleBtn.onclick = () => {
                alert('El chatbot no está disponible en este momento. Por favor, intenta más tarde.');
            };
        }
    }

    // ===== MÉTODOS PÚBLICOS =====

    open() {
        if (this.ui && typeof this.ui.openChat === 'function') {
            this.ui.openChat();
        } else {
            console.warn('Chatbot: UI no disponible para abrir');
        }
    }

    close() {
        if (this.ui && typeof this.ui.closeChat === 'function') {
            this.ui.closeChat();
        }
    }

    sendMessage(message) {
        if (this.engine && typeof this.engine.processInput === 'function') {
            this.engine.processInput(message);
        } else {
            console.warn('Chatbot: Motor no disponible para procesar mensaje');
        }
    }

    clear() {
        if (this.engine && typeof this.engine.clearConversation === 'function') {
            this.engine.clearConversation();
        }
    }

    // Verificar estado
    getStatus() {
        return {
            initialized: this.isInitialized,
            engine: !!this.engine,
            ui: !!this.ui,
            config: typeof CHATBOT_CONFIG !== 'undefined'
        };
    }

    // Destruir instancia
    destroy() {
        if (this.initTimeout) {
            clearTimeout(this.initTimeout);
        }
        
        if (this.ui && typeof this.ui.destroy === 'function') {
            this.ui.destroy();
        }
        
        this.ui = null;
        this.engine = null;
        this.isInitialized = false;
        
        console.log('Chatbot: Instancia destruida');
    }
}

// ===== INICIALIZACIÓN SEGURA =====

// Esperar a que TODO esté listo
function initializeChatbotSafely() {
    console.log('🚀 Iniciando carga segura del chatbot...');
    
    // Crear instancia global
    window.kodyanChatbot = new KodyanChatbot();
    
    // Esperar a que las dependencias estén cargadas
    const checkDependencies = setInterval(() => {
        if (typeof ChatbotEngine !== 'undefined' && 
            typeof ChatbotUI !== 'undefined' && 
            typeof CHATBOT_CONFIG !== 'undefined') {
            
            clearInterval(checkDependencies);
            console.log('✅ Dependencias del chatbot cargadas');
            
            // Inicializar con retraso adicional
            setTimeout(() => {
                window.kodyanChatbot.init();
            }, 300);
            
        } else {
            console.log('⏳ Esperando dependencias del chatbot...');
        }
    }, 100);
    
    // Timeout de seguridad
    setTimeout(() => {
        clearInterval(checkDependencies);
        if (!window.kodyanChatbot.isInitialized) {
            console.warn('⚠️ Timeout en la carga de dependencias del chatbot');
            window.kodyanChatbot.init(); // Intentar igualmente
        }
    }, 5000);
}

// ===== EVENT LISTENERS SEGUROS =====

// Esperar a que el DOM esté completamente listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado, preparando chatbot...');
    
    // Pequeño delay para asegurar que los scripts estén cargados
    setTimeout(initializeChatbotSafely, 200);
});

// También inicializar cuando la ventana termine de cargar
window.addEventListener('load', function() {
    console.log('🖼️ Página completamente cargada');
    
    // Si no se inicializó todavía, forzar inicialización
    if (!window.kodyanChatbot || !window.kodyanChatbot.isInitialized) {
        console.log('🔧 Reiniciando inicialización del chatbot...');
        initializeChatbotSafely();
    }
});

// ===== INTERFAZ GLOBAL =====

// Hacer métodos disponibles globalmente
window.KodyanChatbot = KodyanChatbot;

// Métodos globales de acceso rápido
window.openChatbot = function() {
    if (window.kodyanChatbot) {
        window.kodyanChatbot.open();
    }
};

window.closeChatbot = function() {
    if (window.kodyanChatbot) {
        window.kodyanChatbot.close();
    }
};

// Exportar para módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KodyanChatbot;
}

console.log('🤖 Script chatbot.js cargado - Esperando inicialización...');
