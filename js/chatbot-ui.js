// Manejo de la interfaz de usuario del chatbot
class ChatbotUI {
    constructor(engine) {
        this.engine = engine;
        this.isDragging = false;
        this.dragOffset = { x: 0, y: 0 };
        this.init();
    }

    // Inicializar UI
    init() {
        this.bindEvents();
        this.loadSavedState();
        this.updateUI();
    }

    // Vincular eventos
    bindEvents() {
        // Toggle del chatbot
        const toggle = document.getElementById('chatbotToggle');
        const closeBtn = document.getElementById('chatbotClose');
        const minimizeBtn = document.getElementById('chatbotMinimize');
        const clearBtn = document.getElementById('chatbotClear');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        // Eventos de toggle
        if (toggle) toggle.addEventListener('click', () => this.toggleChat());
        if (closeBtn) closeBtn.addEventListener('click', () => this.closeChat());
        if (minimizeBtn) minimizeBtn.addEventListener('click', () => this.minimizeChat());
        if (clearBtn) clearBtn.addEventListener('click', () => this.clearChat());

        // Eventos de input
        if (sendBtn) sendBtn.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
            
            input.addEventListener('input', (e) => {
                this.validateInput(e.target);
            });
        }

        // Opciones rápidas (delegation)
        document.addEventListener('click', (e) => {
            if (e.target.closest('.quick-option')) {
                const topic = e.target.closest('.quick-option').dataset.topic;
                this.handleQuickOption(topic);
            }
        });

        // Drag del header
        const header = document.querySelector('.chatbot-header');
        if (header) {
            header.addEventListener('mousedown', (e) => this.startDrag(e));
            document.addEventListener('mousemove', (e) => this.drag(e));
            document.addEventListener('mouseup', () => this.stopDrag());
        }

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chatbot-container') && 
                !e.target.closest('.chatbot-toggle') && 
                CHATBOT_STATE.isOpen) {
                this.minimizeChat();
            }
        });

        // Tecla Escape para cerrar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && CHATBOT_STATE.isOpen) {
                this.minimizeChat();
            }
        });
    }

    // Alternar visibilidad del chat
    toggleChat() {
        if (CHATBOT_STATE.isOpen) {
            this.minimizeChat();
        } else {
            this.openChat();
        }
    }

    // Abrir chat
    openChat() {
        CHATBOT_STATE.isOpen = true;
        CHATBOT_STATE.isMinimized = false;
        
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.add('active');
            container.classList.remove('minimized');
        }
        
        this.hideNotification();
        this.focusInput();
        this.updateUI();
        
        // Primera interacción
        if (CHATBOT_STATE.firstInteraction) {
            CHATBOT_STATE.firstInteraction = false;
        }
    }

    // Minimizar chat
    minimizeChat() {
        CHATBOT_STATE.isMinimized = true;
        
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.add('minimized');
        }
        
        this.updateUI();
    }

    // Cerrar chat
    closeChat() {
        CHATBOT_STATE.isOpen = false;
        CHATBOT_STATE.isMinimized = false;
        
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.classList.remove('active', 'minimized');
        }
        
        this.updateUI();
    }

    // Manejar opción rápida
    handleQuickOption(topic) {
        this.engine.handleQuickOption(topic);
    }

    // Enviar mensaje
    sendMessage() {
        const input = document.getElementById('chatbotInput');
        if (!input) return;

        const message = input.value.trim();
        if (message.length === 0) return;

        // Limpiar input
        input.value = '';
        this.validateInput(input);

        // Deshabilitar input temporalmente
        this.engine.disableInput();

        // Procesar mensaje
        this.engine.processInput(message);
    }

    // Validar input
    validateInput(input) {
        const sendButton = document.getElementById('chatbotSend');
        if (!sendButton) return;

        const isValid = input.value.trim().length > 0;
        sendButton.disabled = !isValid;
        
        // Contador de caracteres
        this.updateCharCounter(input.value.length);
    }

    // Actualizar contador de caracteres
    updateCharCounter(length) {
        // Puedes implementar un contador visual si lo deseas
        if (length > CHATBOT_CONFIG.behavior.maxInputLength * 0.8) {
            console.log(`Caracteres: ${length}/${CHATBOT_CONFIG.behavior.maxInputLength}`);
        }
    }

    // Limpiar chat
    clearChat() {
        if (confirm('¿Estás seguro de que quieres limpiar la conversación?')) {
            this.engine.clearConversation();
        }
    }

    // Focus en input
    focusInput() {
        const input = document.getElementById('chatbotInput');
        if (input) {
            input.focus();
        }
    }

    // Ocultar notificación
    hideNotification() {
        const dot = document.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'none';
        }
    }

    // Mostrar notificación
    showNotification() {
        const dot = document.querySelector('.notification-dot');
        if (dot) {
            dot.style.display = 'block';
        }
    }

    // Drag and drop
    startDrag(e) {
        if (!e.target.closest('.chatbot-actions')) {
            this.isDragging = true;
            const container = document.getElementById('chatbotContainer');
            const rect = container.getBoundingClientRect();
            
            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;
            
            container.style.transition = 'none';
        }
    }

    drag(e) {
        if (!this.isDragging) return;
        
        const container = document.getElementById('chatbotContainer');
        if (!container) return;

        const x = e.clientX - this.dragOffset.x;
        const y = e.clientY - this.dragOffset.y;

        // Limitar a los bordes de la ventana
        const maxX = window.innerWidth - container.offsetWidth;
        const maxY = window.innerHeight - container.offsetHeight;

        container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
        container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
        container.style.right = 'auto';
        container.style.bottom = 'auto';
    }

    stopDrag() {
        this.isDragging = false;
        const container = document.getElementById('chatbotContainer');
        if (container) {
            container.style.transition = '';
        }
    }

    // Cargar estado guardado
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

        // Cargar conversación
        this.engine.loadConversation();
    }

    // Guardar estado
    saveState() {
        try {
            localStorage.setItem('kodyan_chatbot_state', JSON.stringify(CHATBOT_STATE));
        } catch (error) {
            console.warn('Error saving chatbot state:', error);
        }
    }

    // Actualizar UI
    updateUI() {
        this.saveState();
        
        // Actualizar visibilidad basada en el estado
        const container = document.getElementById('chatbotContainer');
        const toggle = document.getElementById('chatbotToggle');
        
        if (container && toggle) {
            if (CHATBOT_STATE.isOpen) {
                container.style.display = 'flex';
                setTimeout(() => {
                    container.classList.add('active');
                }, 10);
            } else {
                container.classList.remove('active');
            }
        }
    }
}
