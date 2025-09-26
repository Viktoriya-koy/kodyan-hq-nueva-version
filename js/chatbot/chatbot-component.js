// =============================================
// KODYAN CHATBOT COMPONENT - VERSION COMPLETA
// Componente web autocontenido para Kodyan HQ
// =============================================

// Configuración global
const CHATBOT_CONFIG = {
    name: "Kodyan Assistant",
    version: "1.0.0",
    developer: "Kodyan HQ",
    
    ui: {
        maxMessages: 100,
        typingDelay: 800,
        messageDelay: 300,
        autoOpen: false,
        showTimestamps: true
    },
    
    behavior: {
        enableQuickReplies: true,
        enableTypingIndicator: true,
        saveConversation: true,
        maxInputLength: 500
    },
    
    styles: {
        primaryColor: "#00FFD1",
        secondaryColor: "#38B2AC",
        botAvatar: "fas fa-code",
        userAvatar: "fas fa-user"
    }
};

// Estado global
let CHATBOT_STATE = {
    isOpen: false,
    isMinimized: false,
    isTyping: false,
    conversation: [],
    currentTopic: null,
    firstInteraction: true
};

// Base de conocimiento COMPLETA
const CHATBOT_KNOWLEDGE = {
    greetings: {
        patterns: ["hola", "hi", "hey", "buenas", "saludos"],
        responses: [
            "¡Hola! Soy el asistente de Kodyan HQ. ¿En qué puedo ayudarte?",
            "¡Hola! ¿Qué te gustaría saber sobre Kodyan HQ?",
            "¡Buen día! Estoy aquí para ayudarte con información sobre nuestros servicios y productos."
        ]
    },

    farewells: {
        patterns: ["chau", "adiós", "bye", "hasta luego", "nos vemos"],
        responses: [
            "¡Hasta luego! Recuerda que puedes volver cuando quieras.",
            "¡Fue un gusto ayudarte! Que tengas un excelente día.",
            "¡Chau! Si necesitas más información, aquí estaré."
        ]
    },

    help: {
        patterns: ["ayuda", "help", "qué puedes hacer", "opciones"],
        responses: [
            "Puedo ayudarte con información sobre: Kodyan Operations, Kodyan Commerce, Kodyan Juri, Kodyan Med, Kodyan Eco, Kodyan Care. ¿Qué te interesa?",
            "Pregúntame sobre nuestros servicios, productos o proyectos comunitarios. También puedes usar los botones rápidos."
        ]
    },

    topics: {
        "operations": {
            name: "Kodyan Operations",
            description: "Transformá tus datos en decisiones claras.",
            details: "Liberá a tu equipo de las tareas repetitivas. Convertimos tus procesos operativos en sistemas automatizados, dashboards en tiempo real y alertas inteligentes.",
            features: ["Automatización de Reportes", "Dashboards Interactivos", "Alertas Personalizadas", "Integraciones"],
            target: "Equipos que dependen de datos, startups escalando, empresas buscando una única fuente de verdad.",
            price: "Consultar según proyecto"
        },
        
        "commerce": {
            name: "Kodyan Commerce", 
            description: "Activá tu potencial de crecimiento.",
            details: "Diseñamos la estrategia comercial que tu producto o servicio merece. Desarrollamos bundles ganadores, planes de marketing ágiles y roadmaps comerciales.",
            features: ["Estrategia Comercial", "Diseño de Bundles", "Planes de Marketing", "Análisis de Mercado"],
            target: "Emprendedores, feriantes, marcas emergentes, pymes.",
            price: "Consultar según necesidades"
        },
        
        "juri": {
            name: "Kodyan Juri",
            description: "Despacho virtual integral para abogados.",
            details: "Centraliza la gestión de expedientes, clientes, agenda jurídica y facturación en una plataforma segura con interfaz intuitiva.",
            features: ["Gestión de Expedientes", "Agenda Jurídica", "Facturación Automática", "Cálculo de Plazos"],
            target: "Abogados, estudios jurídicos, despachos.",
            price: "Suscripción mensual - Consultar planes"
        },
        
        "med": {
            name: "Kodyan Med", 
            description: "Gestión integral para profesionales de la salud.",
            details: "Sistema completo para gestión de pacientes, historiales médicos, agenda de turnos y facturación.",
            features: ["Fichas de Pacientes", "Historial Médico", "Agenda de Turnos", "Facturación"],
            target: "Médicos, clínicas, professionals de la salud.",
            price: "Suscripción mensual - Consultar planes"
        },
        
        "eco": {
            name: "Kodyan Eco",
            description: "Calculadoras de huella de carbono educativas.",
            details: "Herramientas digitales para calcular huella de carbono adaptadas por edad (niños, jóvenes, adultos) con enfoques específicos para cada público.",
            features: ["Calculadoras Segmentadas", "Informes Educativos", "Base para Políticas Públicas"],
            target: "Escuelas, municipios, organizaciones ambientales.",
            price: "Gratuito para instituciones educativas"
        },
        
        "care": {
            name: "Kodyan Care",
            description: "Apoyo psicológico y emocional accesible.",
            details: "Plataforma de apoyo psicológico emocional para personas neurodivergentes y comunidad en general.",
            features: ["Recursos de Autoayuda", "Acceso a Profesionales", "Comunidad de Apoyo", "Contenido Educativo"],
            target: "Personas neurodivergentes, comunidad en general.",
            price: "Acceso gratuito y opciones premium"
        }
    },

    general: {
        patterns: ["quién eres", "qué es kodyan", "empresa", "quién sos"],
        responses: [
            "Soy el asistente virtual de Kodyan HQ. Somos especialistas en transformar desafíos operativos y comerciales en soluciones digitales elegantes y efectivas.",
            "Kodyan HQ diseña soluciones a medida para transformar la manera en que operas y vendes. Nacimos de la convicción de que las herramientas tecnológicas deberían ser accesibles, intuitivas y poderosas."
        ]
    },

    contact: {
        patterns: ["contacto", "email", "teléfono", "whatsapp", "linkedin"],
        responses: [
            "📧 Email: contacto@kodyanhq.com\n📱 WhatsApp: +54 9 266 468 7313\n💼 LinkedIn: Kodyan HQ\n📸 Instagram: @kodyanhq",
            "Puedes contactarnos por:\n• Email: contacto@kodyanhq.com\n• WhatsApp: +54 9 266 468 7313\n• Redes sociales: @kodyanhq"
        ]
    },

    unknown: {
        responses: [
            "No estoy seguro de entender. ¿Podrías reformular tu pregunta?",
            "Todavía estoy aprendiendo. ¿Te importaría preguntarme de otra manera?",
            "No tengo información sobre eso aún. ¿Quieres saber sobre nuestros servicios, productos o proyectos comunitarios?"
        ]
    }
};

// Motor del chatbot
class ChatbotEngine {
    constructor() {
        this.conversationHistory = [];
        this.isProcessing = false;
    }

    async processInput(userInput) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        
        try {
            this.addToHistory('user', userInput);
            
            if (CHATBOT_CONFIG.behavior.enableTypingIndicator) {
                this.showTypingIndicator();
            }
            
            await this.delay(CHATBOT_CONFIG.ui.typingDelay);
            
            const response = this.generateResponse(userInput);
            this.hideTypingIndicator();
            this.addToHistory('bot', response);
            this.displayResponse(response);
            this.updateUI();
            
        } catch (error) {
            console.error('Error processing input:', error);
            this.displayError();
        } finally {
            this.isProcessing = false;
        }
    }

    generateResponse(input) {
        const cleanInput = input.trim().toLowerCase();
        
        if (cleanInput.length === 0) {
            return "Por favor, escribe algo para que pueda ayudarte.";
        }
        
        // Buscar en categorías
        for (const [category, data] of Object.entries(CHATBOT_KNOWLEDGE)) {
            if (data.patterns) {
                for (const pattern of data.patterns) {
                    if (cleanInput.includes(pattern)) {
                        return this.getRandomResponse(data.responses);
                    }
                }
            }
        }
        
        // Buscar tema específico
        const topic = this.findTopicByPattern(cleanInput);
        if (topic) {
            return this.generateTopicResponse(topic);
        }
        
        return this.getRandomResponse(CHATBOT_KNOWLEDGE.unknown.responses);
    }

    findTopicByPattern(input) {
        const cleanInput = input.toLowerCase().trim();
        
        for (const [topicKey, topicData] of Object.entries(CHATBOT_KNOWLEDGE.topics)) {
            if (cleanInput.includes(topicKey) || cleanInput.includes(topicData.name.toLowerCase())) {
                return topicKey;
            }
        }
        
        return null;
    }

    generateTopicResponse(topicKey) {
        const topic = CHATBOT_KNOWLEDGE.topics[topicKey];
        if (!topic) return "No tengo información sobre ese tema.";
        
        return `**${topic.name}**\n\n${topic.description}\n\n${topic.details}\n\n**Para quién es:** ${topic.target}\n**Características:** ${topic.features.join(", ")}\n**Precio:** ${topic.price}`;
    }

    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }

    handleQuickOption(topic) {
        const response = this.generateTopicResponse(topic);
        this.processQuickResponse(response);
    }

    async processQuickResponse(response) {
        this.addToHistory('bot', response);
        this.displayResponse(response);
        this.updateUI();
    }

    addToHistory(sender, message) {
        const messageObj = {
            id: Date.now() + Math.random(),
            sender: sender,
            message: message,
            timestamp: new Date().toLocaleTimeString('es-AR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
            date: new Date().toISOString()
        };
        
        this.conversationHistory.push(messageObj);
        
        if (this.conversationHistory.length > CHATBOT_CONFIG.ui.maxMessages) {
            this.conversationHistory = this.conversationHistory.slice(-CHATBOT_CONFIG.ui.maxMessages);
        }
        
        CHATBOT_STATE.conversation = this.conversationHistory;
    }

    showTypingIndicator() {
        CHATBOT_STATE.isTyping = true;
        const messagesContainer = this.shadowRoot.getElementById('chatbotMessages');
        
        const typingHtml = `
            <div class="message bot-message typing-indicator">
                <div class="message-avatar">
                    <i class="${CHATBOT_CONFIG.styles.botAvatar}"></i>
                </div>
                <div class="message-content">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', typingHtml);
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        CHATBOT_STATE.isTyping = false;
        const typingIndicator = this.shadowRoot.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    displayResponse(response) {
        const messagesContainer = this.shadowRoot.getElementById('chatbotMessages');
        const formattedResponse = this.formatResponse(response);
        
        const messageHtml = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="${CHATBOT_CONFIG.styles.botAvatar}"></i>
                </div>
                <div class="message-content">
                    <p>${formattedResponse}</p>
                    <div class="message-time">${new Date().toLocaleTimeString('es-AR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}</div>
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', messageHtml);
        this.scrollToBottom();
        this.enableInput();
    }

    formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/- (.*?)(<br>|$)/g, '• $1<br>');
    }

    displayError() {
        this.displayResponse("Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.");
    }

    scrollToBottom() {
        const messagesContainer = this.shadowRoot.getElementById('chatbotMessages');
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    enableInput() {
        const input = this.shadowRoot.getElementById('chatbotInput');
        const sendButton = this.shadowRoot.getElementById('chatbotSend');
        
        if (input && sendButton) {
            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }

    disableInput() {
        const input = this.shadowRoot.getElementById('chatbotInput');
        const sendButton = this.shadowRoot.getElementById('chatbotSend');
        
        if (input && sendButton) {
            input.disabled = true;
            sendButton.disabled = true;
        }
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateUI() {
        const timeElement = this.shadowRoot.getElementById('chatbotTime');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString('es-AR');
        }
        
        if (CHATBOT_CONFIG.behavior.saveConversation) {
            this.saveConversation();
        }
    }

    saveConversation() {
        try {
            localStorage.setItem('kodyan_chatbot_conversation', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.warn('No se pudo guardar la conversación:', error);
        }
    }

    loadConversation() {
        try {
            const saved = localStorage.getItem('kodyan_chatbot_conversation');
            if (saved) {
                this.conversationHistory = JSON.parse(saved);
                return true;
            }
        } catch (error) {
            console.warn('No se pudo cargar la conversación:', error);
        }
        return false;
    }

    clearConversation() {
        this.conversationHistory = [];
        CHATBOT_STATE.conversation = [];
        CHATBOT_STATE.firstInteraction = true;
        
        try {
            localStorage.removeItem('kodyan_chatbot_conversation');
        } catch (error) {
            console.warn('No se pudo limpiar la conversación:', error);
        }
        
        this.displayWelcomeMessage();
    }

    displayWelcomeMessage() {
        const messagesContainer = this.shadowRoot.getElementById('chatbotMessages');
        messagesContainer.innerHTML = '';
        
        const welcomeHtml = `
            <div class="message bot-message">
                <div class="message-avatar">
                    <i class="${CHATBOT_CONFIG.styles.botAvatar}"></i>
                </div>
                <div class="message-content">
                    <p>¡Hola! Soy el asistente de <strong>Kodyan HQ</strong>. ¿En qué puedo ayudarte hoy?</p>
                    <div class="message-time">${new Date().toLocaleTimeString('es-AR', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                    })}</div>
                </div>
            </div>
        `;
        
        messagesContainer.innerHTML = welcomeHtml;
        this.displayQuickOptions();
    }

    displayQuickOptions() {
        const messagesContainer = this.shadowRoot.getElementById('chatbotMessages');
        
        const quickOptionsHtml = `
            <div class="quick-options">
                <div class="quick-options-title">¿Qué te interesa conocer?</div>
                <div class="quick-options-grid">
                    ${Object.entries(CHATBOT_KNOWLEDGE.topics).map(([key, topic]) => `
                        <button class="quick-option" data-topic="${key}">
                            <i class="${this.getTopicIcon(key)}"></i>
                            <span>${topic.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
        
        messagesContainer.insertAdjacentHTML('beforeend', quickOptionsHtml);
        this.scrollToBottom();
    }

    getTopicIcon(topicKey) {
        const icons = {
            'operations': 'fas fa-chart-line',
            'commerce': 'fas fa-shopping-cart',
            'juri': 'fas fa-gavel',
            'med': 'fas fa-stethoscope',
            'eco': 'fas fa-leaf',
            'care': 'fas fa-heart'
        };
        return icons[topicKey] || 'fas fa-question';
    }
}

// Manejo de UI
class ChatbotUI {
    constructor(engine, shadowRoot) {
        this.engine = engine;
        this.shadowRoot = shadowRoot;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.engine.shadowRoot = shadowRoot;
    }

    init() {
        this.bindEvents();
        this.loadSavedState();
        this.updateUI();
        this.engine.loadConversation();
    }

    bindEvents() {
        const toggle = this.shadowRoot.getElementById('chatbotToggle');
        const closeBtn = this.shadowRoot.getElementById('chatbotClose');
        const minimizeBtn = this.shadowRoot.getElementById('chatbotMinimize');
        const clearBtn = this.shadowRoot.getElementById('chatbotClear');
        const sendBtn = this.shadowRoot.getElementById('chatbotSend');
        const input = this.shadowRoot.getElementById('chatbotInput');

        if (toggle) toggle.addEventListener('click', () => this.toggleChat());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeChat());
        if (minimizeBtn) minimizeBtn.addEventListener('click', () => this.minimizeChat());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearChat());

        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
            
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        }

        // Delegación de eventos para opciones rápidas
        this.shadowRoot.addEventListener('click', (e) => {
            if (e.target.closest('.quick-option')) {
                const topic = e.target.closest('.quick-option').dataset.topic;
                this.handleQuickOption(topic);
            }
        });

        // Drag del header
        const header = this.shadowRoot.querySelector('.chatbot-header');
        if (header) {
            header.addEventListener('mousedown', (e) => this.startDrag(e));
            document.addEventListener('mousemove', (e) => this.drag(e));
            document.addEventListener('mouseup', () => this.stopDrag());
        }

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('kodyan-chatbot') && CHATBOT_STATE.isOpen) {
                this.minimizeChat();
            }
        });

        // Tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && CHATBOT_STATE.isOpen) {
                this.minimizeChat();
            }
        });
    }

    toggleChat() {
        if (CHATBOT_STATE.isOpen) {
            this.minimizeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        CHATBOT_STATE.isOpen = true;
        CHATBOT_STATE.isMinimized = false;
        
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (container) {
            container.classList.add('active');
            container.classList.remove('minimized');
        }
        
        this.hideNotification();
        this.focusInput();
        this.updateUI();
        
        if (CHATBOT_STATE.firstInteraction) {
            CHATBOT_STATE.firstInteraction = false;
        }
    }

    minimizeChat() {
        CHATBOT_STATE.isMinimized = true;
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (container) {
            container.classList.add('minimized');
        }
        this.updateUI();
    }

    closeChat() {
        CHATBOT_STATE.isOpen = false;
        CHATBOT_STATE.isMinimized = false;
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (container) {
            container.classList.remove('active', 'minimized');
        }
        this.updateUI();
    }

    handleQuickOption(topic) {
        this.engine.handleQuickOption(topic);
    }

    sendMessage() {
        const input = this.shadowRoot.getElementById('chatbotInput');
        if (!input) return;

        const message = input.value.trim();
        if (message.length === 0) return;

        input.value = '';
        this.validateInput(input);
        this.engine.disableInput();
        this.engine.processInput(message);
    }

    validateInput(input) {
        const sendButton = this.shadowRoot.getElementById('chatbotSend');
        if (!sendButton) return;

        const isValid = input.value.trim().length > 0;
        sendButton.disabled = !isValid;
    }

    clearChat() {
        if (confirm('¿Estás seguro de que quieres limpiar la conversación?')) {
            this.engine.clearConversation();
        }
    }

    focusInput() {
        const input = this.shadowRoot.getElementById('chatbotInput');
        if (input) {
            input.focus();
        }
    }

    hideNotification() {
        const dot = this.shadowRoot.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'none';
        }
    }

    showNotification() {
        const dot = this.shadowRoot.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'block';
        }
    }

    startDrag(e) {
        if (!e.target.closest('.chatbot-actions')) {
            this.isDragging = true;
            const container = this.shadowRoot.getElementById('chatbotContainer');
            const rect = container.getBoundingClientRect();
            
            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;
            
            container.style.transition = 'none';
        }
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (!container) return;

        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;

        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;

        container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        container.style.right = 'auto';
        container.style.bottom = 'auto';
    }

    stopDrag() {
        this.isDragging = false;
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (container) {
            container.style.transition = '';
        }
    }

    loadSavedState() {
        const savedState = localStorage.getItem('kodyan_chatbot_state');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                Object.assign(CHATBOT_STATE, state);
            } catch (error) {
                console.warn('Error loading chatbot state:', error);
            }
        }
    }

    saveState() {
        try {
            localStorage.setItem('kodyan_chatbot_state', JSON.stringify(CHATBOT_STATE));
        } catch (error) {
            console.warn('Error saving chatbot state:', error);
        }
    }

    updateUI() {
        this.saveState();
        const container = this.shadowRoot.getElementById('chatbotContainer');
        if (container && CHATBOT_STATE.isOpen) {
            container.style.display = 'flex';
            setTimeout(() => {
                container.classList.add('active');
            }, 10);
        }
    }
}

// COMPONENTE WEB PRINCIPAL
class KodyanChatbotComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.engine = null;
        this.ui = null;
    }

    connectedCallback() {
        this.render();
        this.initChatbot();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this.getChatbotStyles()}
            </style>
            <div class="chatbot-wrapper">
                <div class="chatbot-toggle" id="chatbotToggle" title="Chat de Kodyan HQ">
                    <i class="fas fa-robot"></i>
                    <span class="notification-dot"></span>
                </div>

                <div class="chatbot-container" id="chatbotContainer">
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">
                            <i class="fas fa-code"></i>
                        </div>
                        <div class="chatbot-info">
                            <h3>Kodyan Assistant</h3>
                            <span class="status"><i class="fas fa-circle"></i> En línea</span>
                        </div>
                        <div class="chatbot-actions">
                            <button class="chatbot-minimize" id="chatbotMinimize" title="Minimizar">
                                <i class="fas fa-minus"></i>
                            </button>
                            <button class="chatbot-close" id="chatbotClose" title="Cerrar">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>

                    <div class="chatbot-messages" id="chatbotMessages">
                        <div class="message bot-message">
                            <div class="message-avatar">
                                <i class="fas fa-code"></i>
                            </div>
                            <div class="message-content">
                                <p>¡Hola! Soy el asistente de <strong>Kodyan HQ</strong>. ¿En qué puedo ayudarte hoy?</p>
                                <div class="message-time">${this.getCurrentTime()}</div>
                            </div>
                        </div>
                    </div>

                    <div class="chatbot-input">
                        <div class="input-container">
                            <button class="input-action" id="chatbotClear" title="Limpiar conversación">
                                <i class="fas fa-trash"></i>
                            </button>
                            <input type="text" id="chatbotInput" placeholder="Escribe tu pregunta sobre Kodyan HQ..." maxlength="500">
                            <button id="chatbotSend" class="send-button">
                                <i class="fas fa-paper-plane"></i>
                            </button>
                        </div>
                        <div class="input-hint">
                            <small>Presiona Enter para enviar • Escribe "ayuda" para ver opciones</small>
                        </div>
                    </div>

                    <div class="chatbot-footer">
                        <small>Powered by Kodyan HQ • <span id="chatbotTime">Conectado</span></small>
                    </div>
                </div>
            </div>
        `;
    }

    getChatbotStyles() {
        return `
            :host {
                display: block;
                position: fixed;
                bottom: 0;
                right: 0;
                z-index: 10000;
                font-family: 'Roboto Mono', monospace;
            }

            /* ===== VARIABLES ===== */
            :host {
                --bg-chat-primary: #1C2129;
                --bg-chat-secondary: #161B22;
                --text-chat-primary: #E6EDF3;
                --text-chat-secondary: #9DA7B6;
                --accent-chat: #00FFD1;
                --accent-secondary: #38B2AC;
                --bot-message-bg: rgba(40, 115, 110, 0.3);
                --user-message-bg: rgba(33, 76, 79, 0.3);
                --success-color: #00FFD1;
                --warning-color: #FFB300;
            }

            /* ===== BOTÓN FLOTANTE ===== */
            .chatbot-toggle {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, var(--accent-chat), var(--accent-secondary));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0, 255, 209, 0.4);
                z-index: 10001;
                transition: all 0.3s ease;
                border: none;
            }

            .chatbot-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 8px 25px rgba(0, 255, 209, 0.6);
            }

            .chatbot-toggle i {
                font-size: 1.5rem;
                color: white;
            }

            .notification-dot {
                position: absolute;
                top: -5px;
                right: -5px;
                width: 12px;
                height: 12px;
                background: var(--accent-chat);
                border-radius: 50%;
                border: 2px solid var(--bg-chat-primary);
                animation: pulseDot 2s infinite;
            }

            @keyframes pulseDot {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.7; transform: scale(1.1); }
            }

            /* ===== CONTENEDOR PRINCIPAL ===== */
            .chatbot-container {
                position: fixed;
                bottom: 100px;
                right: 30px;
                width: 380px;
                height: 600px;
                background: var(--bg-chat-primary);
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                border: 1px solid rgba(0, 255, 209, 0.2);
                display: none;
                flex-direction: column;
                z-index: 10000;
                overflow: hidden;
                transform: translateY(20px);
                opacity: 0;
                transition: all 0.3s ease;
            }

            .chatbot-container.active {
                display: flex;
                transform: translateY(0);
                opacity: 1;
            }

            .chatbot-container.minimized {
                height: 60px;
                width: 300px;
            }

            /* ===== HEADER ===== */
            .chatbot-header {
                background: var(--bg-chat-secondary);
                padding: 1rem;
                display: flex;
                align-items: center;
                border-bottom: 1px solid rgba(0, 255, 209, 0.1);
                cursor: move;
                user-select: none;
            }

            .chatbot-avatar {
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, var(--accent-chat), var(--accent-secondary));
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 1rem;
                flex-shrink: 0;
            }

            .chatbot-avatar i {
                color: white;
                font-size: 1.2rem;
            }

            .chatbot-info {
                flex: 1;
            }

            .chatbot-info h3 {
                margin: 0 0 0.2rem 0;
                font-size: 1.1rem;
                color: var(--text-chat-primary);
                font-family: 'Montserrat', sans-serif;
            }

            .status {
                font-size: 0.8rem;
                color: var(--accent-chat);
                display: flex;
                align-items: center;
                gap: 0.3rem;
            }

            .status i {
                font-size: 0.6rem;
                animation: blink 2s infinite;
            }

            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0.3; }
            }

            .chatbot-actions {
                display: flex;
                gap: 0.5rem;
            }

            .chatbot-minimize,
            .chatbot-close {
                background: none;
                border: none;
                color: var(--text-chat-secondary);
                cursor: pointer;
                font-size: 1rem;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
            }

            .chatbot-minimize:hover,
            .chatbot-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--accent-chat);
            }

            /* ===== MENSAJES ===== */
            .chatbot-messages {
                flex: 1;
                padding: 1rem;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                scroll-behavior: smooth;
            }

            .chatbot-messages::-webkit-scrollbar {
                width: 6px;
            }

            .chatbot-messages::-webkit-scrollbar-track {
                background: var(--bg-chat-secondary);
            }

            .chatbot-messages::-webkit-scrollbar-thumb {
                background: var(--accent-secondary);
                border-radius: 3px;
            }

            .message {
                display: flex;
                gap: 0.8rem;
                max-width: 85%;
                animation: messageSlide 0.3s ease;
            }

            @keyframes messageSlide {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .bot-message {
                align-self: flex-start;
            }

            .user-message {
                align-self: flex-end;
                flex-direction: row-reverse;
            }

            .message-avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                font-size: 0.8rem;
            }

            .bot-message .message-avatar {
                background: var(--bot-message-bg);
            }

            .user-message .message-avatar {
                background: var(--user-message-bg);
            }

            .message-content {
                background: var(--bot-message-bg);
                padding: 0.8rem 1rem;
                border-radius: 15px;
                border-bottom-left-radius: 5px;
            }

            .user-message .message-content {
                background: var(--user-message-bg);
                border-bottom-left-radius: 15px;
                border-bottom-right-radius: 5px;
            }

            .message-content p {
                margin: 0;
                color: var(--text-chat-primary);
                line-height: 1.4;
                font-size: 0.9rem;
            }

            .message-time {
                font-size: 0.7rem;
                color: var(--text-chat-secondary);
                margin-top: 0.3rem;
                text-align: right;
            }

            .user-message .message-time {
                text-align: left;
            }

            /* ===== OPCIONES RÁPIDAS ===== */
            .quick-options {
                margin: 0.5rem 0;
            }

            .quick-options-title {
                font-size: 0.8rem;
                color: var(--text-chat-secondary);
                margin-bottom: 0.8rem;
                text-align: center;
            }

            .quick-options-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
            }

            .quick-option {
                background: rgba(56, 178, 172, 0.1);
                border: 1px solid var(--accent-secondary);
                color: var(--accent-chat);
                padding: 0.6rem 0.5rem;
                border-radius: 8px;
                font-size: 0.75rem;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.4rem;
                text-align: left;
                font-family: 'Roboto Mono', monospace;
            }

            .quick-option:hover {
                background: var(--accent-secondary);
                color: white;
                transform: translateY(-2px);
            }

            .quick-option i {
                font-size: 0.9rem;
                flex-shrink: 0;
            }

            /* ===== TYPING INDICATOR ===== */
            .typing-indicator {
                align-items: center;
            }

            .typing-dots {
                display: flex;
                gap: 0.3rem;
                align-items: center;
            }

            .typing-dot {
                width: 6px;
                height: 6px;
                background: var(--accent-chat);
                border-radius: 50%;
                animation: typingBounce 1.4s infinite;
            }

            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }

            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-5px); }
            }

            /* ===== ÁREA DE INPUT ===== */
            .chatbot-input {
                padding: 1rem;
                background: var(--bg-chat-secondary);
                border-top: 1px solid rgba(0, 255, 209, 0.1);
            }

            .input-container {
                display: flex;
                gap: 0.5rem;
                align-items: center;
            }

            .input-action {
                background: rgba(255, 255, 255, 0.1);
                border: none;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                color: var(--text-chat-secondary);
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }

            .input-action:hover {
                background: var(--warning-color);
                color: white;
            }

            #chatbotInput {
                flex: 1;
                padding: 0.8rem 1.2rem;
                background: var(--bg-chat-primary);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 25px;
                color: var(--text-chat-primary);
                font-family: 'Roboto Mono', monospace;
                font-size: 0.9rem;
                transition: all 0.3s ease;
            }

            #chatbotInput:focus {
                outline: none;
                border-color: var(--accent-chat);
                box-shadow: 0 0 0 2px rgba(0, 255, 209, 0.1);
            }

            #chatbotInput::placeholder {
                color: var(--text-chat-secondary);
            }

            .send-button {
                background: var(--accent-chat);
                border: none;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                color: var(--bg-chat-primary);
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }

            .send-button:hover:not(:disabled) {
                background: var(--accent-secondary);
                transform: scale(1.1);
            }

            .send-button:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }

            .input-hint {
                text-align: center;
                margin-top: 0.5rem;
            }

            .input-hint small {
                color: var(--text-chat-secondary);
                font-size: 0.7rem;
            }

            /* ===== FOOTER ===== */
            .chatbot-footer {
                padding: 0.5rem 1rem;
                background: var(--bg-chat-secondary);
                border-top: 1px solid rgba(0, 255, 209, 0.1);
                text-align: center;
            }

            .chatbot-footer small {
                color: var(--text-chat-secondary);
                font-size: 0.7rem;
            }

            /* ===== RESPONSIVE ===== */
            @media (max-width: 768px) {
                .chatbot-container {
                    width: 95vw;
                    height: 70vh;
                    right: 2.5vw;
                    bottom: 90px;
                }
                
                .chatbot-toggle {
                    bottom: 20px;
                    right: 20px;
                }
                
                .quick-options-grid {
                    grid-template-columns: 1fr;
                }
                
                .message {
                    max-width: 95%;
                }
            }

            @media (max-width: 480px) {
                .chatbot-container {
                    height: 80vh;
                    bottom: 70px;
                }
                
                .chatbot-header {
                    padding: 0.8rem;
                }
                
                .chatbot-messages {
                    padding: 0.8rem;
                }
            }
        `;
    }

    getCurrentTime() {
        return new Date().toLocaleTimeString('es-AR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    initChatbot() {
        this.engine = new ChatbotEngine();
        this.ui = new ChatbotUI(this.engine, this.shadowRoot);
        this.ui.init();
        
        // Cargar Font Awesome dinámicamente
        this.loadFontAwesome();
    }

    loadFontAwesome() {
        if (!document.querySelector('link[href*="font-awesome"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
            document.head.appendChild(link);
        }
    }
}

// Registrar el componente
customElements.define('kodyan-chatbot', KodyanChatbotComponent);

// Auto-inicialización segura
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kodyan Chatbot Component cargado correctamente');
});
