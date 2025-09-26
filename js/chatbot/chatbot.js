// ===== CHATBOT KODYAN HQ - VERSIÓN ULTRA TOLERANTE =====

class KodyanChatbot {
    constructor() {
        this.isInitialized = false;
        this.retryCount = 0;
        this.maxRetries = 5;
    }

    init() {
        if (this.isInitialized) return;
        
        console.log('🚀 Iniciando chatbot en modo tolerante...');
        
        // Intentar inicialización con retry
        this._tryInitialize();
    }

    _tryInitialize() {
        try {
            // Verificación MUY básica de DOM
            const hasRequiredElements = 
                document.getElementById('chatbotToggle') &&
                document.getElementById('chatbotContainer') &&
                document.getElementById('chatbotMessages');

            if (!hasRequiredElements) {
                throw new Error('Elementos DOM básicos no encontrados');
            }

            // Intentar cargar dependencias de forma segura
            this._loadDependencies();
            
            this.isInitialized = true;
            console.log('✅ Chatbot inicializado en modo básico');
            
            // Mostrar interfaz aunque las dependencias fallen
            this._setupBasicUI();
            
        } catch (error) {
            this.retryCount++;
            console.warn(`Intento ${this.retryCount}/${this.maxRetries} fallido:`, error);
            
            if (this.retryCount < this.maxRetries) {
                setTimeout(() => this._tryInitialize(), 1000);
            } else {
                console.error('❌ Chatbot no pudo inicializarse después de varios intentos');
                this._showFriendlyError();
            }
        }
    }

    _loadDependencies() {
        // Intentar cargar config si existe
        if (typeof CHATBOT_CONFIG === 'undefined') {
            console.warn('CHATBOT_CONFIG no disponible - usando valores por defecto');
            window.CHATBOT_CONFIG = {
                ui: {
                    autoOpen: false,
                    autoOpenDelay: 2000
                }
            };
        }

        // Intentar inicializar UI básica si no existe
        if (typeof ChatbotUI === 'undefined') {
            console.warn('ChatbotUI no disponible - creando UI básica');
            this._createBasicUI();
        }

        // Intentar inicializar engine básico si no existe
        if (typeof ChatbotEngine === 'undefined') {
            console.warn('ChatbotEngine no disponible - creando engine básico');
            this._createBasicEngine();
        }
    }

    _createBasicUI() {
        // UI mínima funcional
        window.ChatbotUI = class BasicUI {
            constructor(engine) {
                this.engine = engine;
                this._setupEventListeners();
            }

            _setupEventListeners() {
                // Botón toggle
                const toggle = document.getElementById('chatbotToggle');
                const container = document.getElementById('chatbotContainer');
                
                if (toggle && container) {
                    toggle.addEventListener('click', () => {
                        container.classList.toggle('active');
                    });
                }

                // Botón cerrar
                const closeBtn = document.getElementById('chatbotClose');
                if (closeBtn) {
                    closeBtn.addEventListener('click', () => {
                        container.classList.remove('active');
                    });
                }

                // Botón enviar
                const sendBtn = document.getElementById('chatbotSend');
                const input = document.getElementById('chatbotInput');
                
                if (sendBtn && input) {
                    const sendMessage = () => {
                        const text = input.value.trim();
                        if (text) {
                            this._addUserMessage(text);
                            input.value = '';
                            this._addBotMessage('Gracias por tu mensaje. Estoy en modo básico ahora mismo.');
                        }
                    };

                    sendBtn.addEventListener('click', sendMessage);
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') sendMessage();
                    });
                }
            }

            _addUserMessage(text) {
                const messages = document.getElementById('chatbotMessages');
                if (messages) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message user-message';
                    messageDiv.innerHTML = `
                        <div class="message-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="message-content">
                            <p>${text}</p>
                            <div class="message-time">${new Date().toLocaleTimeString()}</div>
                        </div>
                    `;
                    messages.appendChild(messageDiv);
                    messages.scrollTop = messages.scrollHeight;
                }
            }

            _addBotMessage(text) {
                const messages = document.getElementById('chatbotMessages');
                if (messages) {
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'message bot-message';
                    messageDiv.innerHTML = `
                        <div class="message-avatar">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="message-content">
                            <p>${text}</p>
                            <div class="message-time">${new Date().toLocaleTimeString()}</div>
                        </div>
                    `;
                    messages.appendChild(messageDiv);
                    messages.scrollTop = messages.scrollHeight;
                }
            }

            openChat() {
                const container = document.getElementById('chatbotContainer');
                if (container) container.classList.add('active');
            }

            closeChat() {
                const container = document.getElementById('chatbotContainer');
                if (container) container.classList.remove('active');
            }
        };
    }

    _createBasicEngine() {
        // Engine mínimo funcional
        window.ChatbotEngine = class BasicEngine {
            constructor() {
                this.responses = {
                    'hola': '¡Hola! Soy el asistente de Kodyan HQ. Estoy en modo básico ahora mismo.',
                    'ayuda': 'Puedes preguntarme sobre Kodyan Operations, Commerce, Eco, Care, etc.',
                    'operations': 'Kodyan Operations se especializa en automatización de procesos y dashboards.',
                    'commerce': 'Kodyan Commerce desarrolla estrategias comerciales y planes de marketing.',
                    'eco': 'Kodyan Eco crea calculadoras de huella de carbono y soluciones sustentables.',
                    'care': 'Kodyan Care desarrolla herramientas de apoyo psicológico y emocional.'
                };
            }

            processInput(input) {
                const lowerInput = input.toLowerCase();
                let response = this.responses[lowerInput] || 
                    'Gracias por tu mensaje. Estoy aprendiendo todavía. ¿Puedes intentar con "hola", "ayuda", "operations", "commerce", "eco" o "care"?';
                
                return response;
            }

            displayWelcomeMessage() {
                // El mensaje de bienvenida ya está en el HTML
                console.log('Mensaje de bienvenida mostrado');
            }
        };
    }

    _setupBasicUI() {
        // Asegurar que el chatbot sea usable
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.style.display = 'flex';
        }

        // Remover el error fallback si existe
        const toggle = document.getElementById('chatbotToggle');
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-robot"></i>';
            toggle.style.background = '';
            toggle.title = 'Chat de Kodyan HQ';
        }

        console.log('🎉 Chatbot listo en modo básico');
    }

    _showFriendlyError() {
        const toggle = document.getElementById('chatbotToggle');
        if (toggle) {
            toggle.innerHTML = '<i class="fas fa-robot"></i>';
            toggle.onclick = () => {
                const container = document.getElementById('chatbotContainer');
                if (container) {
                    container.classList.toggle('active');
                }
            };
        }
    }

    // Métodos públicos simples
    open() {
        const container = document.getElementById('chatbotContainer');
        if (container) container.classList.add('active');
    }

    close() {
        const container = document.getElementById('chatbotContainer');
        if (container) container.classList.remove('active');
    }
}

// Inicialización automática ultra simple
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        window.kodyanChatbot = new KodyanChatbot();
        window.kodyanChatbot.init();
    }, 2000);
});

console.log('🤖 Chatbot cargado - Modo tolerante activado');
