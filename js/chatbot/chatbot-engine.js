// Motor de procesamiento del chatbot
class ChatbotEngine {
    constructor() {
        this.conversationHistory = [];
        this.isProcessing = false;
    }

    // Procesar input del usuario
    async processInput(userInput) {
        if (this.isProcessing) return;
        
        this.isProcessing = true;
        
        try {
            // Agregar mensaje del usuario al historial
            this.addToHistory('user', userInput);
            
            // Mostrar indicador de typing
            if (CHATBOT_CONFIG.behavior.enableTypingIndicator) {
                this.showTypingIndicator();
            }
            
            // Simular delay de procesamiento
            await this.delay(CHATBOT_CONFIG.ui.typingDelay);
            
            // Obtener respuesta
            const response = this.generateResponse(userInput);
            
            // Ocultar indicador de typing
            this.hideTypingIndicator();
            
            // Agregar respuesta al historial
            this.addToHistory('bot', response);
            
            // Mostrar respuesta
            this.displayResponse(response);
            
            // Actualizar UI
            this.updateUI();
            
        } catch (error) {
            console.error('Error processing input:', error);
            this.displayError();
        } finally {
            this.isProcessing = false;
        }
    }

    // Generar respuesta basada en el input
    generateResponse(input) {
        // Limpiar y normalizar input
        const cleanInput = input.trim().toLowerCase();
        
        if (cleanInput.length === 0) {
            return "Por favor, escribe algo para que pueda ayudarte.";
        }
        
        // Buscar respuesta en la base de conocimiento
        return KnowledgeBase.getResponse(cleanInput);
    }

    // Manejar opciones rápidas
    handleQuickOption(topic) {
        const response = KnowledgeBase.generateTopicResponse(topic);
        this.processQuickResponse(response);
    }

    // Procesar respuesta rápida (sin typing indicator)
    async processQuickResponse(response) {
        this.addToHistory('bot', response);
        this.displayResponse(response);
        this.updateUI();
    }

    // Agregar mensaje al historial
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
        
        // Limitar historial
        if (this.conversationHistory.length > CHATBOT_CONFIG.ui.maxMessages) {
            this.conversationHistory = this.conversationHistory.slice(-CHATBOT_CONFIG.ui.maxMessages);
        }
        
        // Actualizar estado global
        CHATBOT_STATE.conversation = this.conversationHistory;
    }

    // Mostrar indicador de typing
    showTypingIndicator() {
        CHATBOT_STATE.isTyping = true;
        const messagesContainer = document.getElementById('chatbotMessages');
        
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

    // Ocultar indicador de typing
    hideTypingIndicator() {
        CHATBOT_STATE.isTyping = false;
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Mostrar respuesta en la UI
    displayResponse(response) {
        const messagesContainer = document.getElementById('chatbotMessages');
        
        // Formatear respuesta (markdown simple)
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
        
        // Habilitar input después de mostrar respuesta
        this.enableInput();
    }

    // Formatear respuesta (markdown simple)
    formatResponse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>')
            .replace(/- (.*?)(<br>|$)/g, '• $1<br>');
    }

    // Mostrar error
    displayError() {
        const errorResponse = "Lo siento, ha ocurrido un error. Por favor, intenta nuevamente.";
        this.displayResponse(errorResponse);
    }

    // Scroll al final del chat
    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Habilitar input
    enableInput() {
        const input = document.getElementById('chatbotInput');
        const sendButton = document.getElementById('chatbotSend');
        
        if (input && sendButton) {
            input.disabled = false;
            sendButton.disabled = false;
            input.focus();
        }
    }

    // Deshabilitar input
    disableInput() {
        const input = document.getElementById('chatbotInput');
        const sendButton = document.getElementById('chatbotSend');
        
        if (input && sendButton) {
            input.disabled = true;
            sendButton.disabled = true;
        }
    }

    // Delay helper
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Actualizar UI
    updateUI() {
        // Actualizar timestamp del footer
        const timeElement = document.getElementById('chatbotTime');
        if (timeElement) {
            timeElement.textContent = new Date().toLocaleTimeString('es-AR');
        }
        
        // Guardar conversación si está habilitado
        if (CHATBOT_CONFIG.behavior.saveConversation) {
            this.saveConversation();
        }
    }

    // Guardar conversación en localStorage
    saveConversation() {
        try {
            localStorage.setItem('kodyan_chatbot_conversation', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.warn('No se pudo guardar la conversación:', error);
        }
    }

    // Cargar conversación desde localStorage
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

    // Limpiar conversación
    clearConversation() {
        this.conversationHistory = [];
        CHATBOT_STATE.conversation = [];
        CHATBOT_STATE.firstInteraction = true;
        
        try {
            localStorage.removeItem('kodyan_chatbot_conversation');
        } catch (error) {
            console.warn('No se pudo limpiar la conversación:', error);
        }
        
        // Recargar mensajes iniciales
        this.displayWelcomeMessage();
    }

    // Mostrar mensaje de bienvenida
    displayWelcomeMessage() {
        const messagesContainer = document.getElementById('chatbotMessages');
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

    // Mostrar opciones rápidas
    displayQuickOptions() {
        const messagesContainer = document.getElementById('chatbotMessages');
        
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

    // Obtener icono para tema
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
