// ===== CHATBOT KODYAN HQ - VERSIÓN MINIMALISTA FUNCIONAL =====

class KodyanChatbot {
    constructor() {
        this.isOpen = false;
    }

    init() {
        console.log('🚀 Iniciando chatbot minimalista...');
        
        // Configuración básica
        this._setupConfig();
        
        // Event listeners simples
        this._setupEvents();
        
        console.log('✅ Chatbot minimalista listo');
    }

    _setupConfig() {
        // Configuración mínima
        window.CHATBOT_CONFIG = {
            ui: {
                autoOpen: false,
                autoOpenDelay: 2000
            }
        };
    }

    _setupEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const container = document.getElementById('chatbotContainer');
        const closeBtn = document.getElementById('chatbotClose');
        const sendBtn = document.getElementById('chatbotSend');
        const input = document.getElementById('chatbotInput');

        // Abrir/cerrar chat
        if (toggle && container) {
            toggle.addEventListener('click', () => {
                this.isOpen = !this.isOpen;
                container.classList.toggle('active');
            });
        }

        // Botón cerrar
        if (closeBtn && container) {
            closeBtn.addEventListener('click', () => {
                this.isOpen = false;
                container.classList.remove('active');
            });
        }

        // Enviar mensaje
        if (sendBtn && input) {
            const sendMessage = () => {
                const text = input.value.trim();
                if (text) {
                    this._addMessage('user', text);
                    input.value = '';
                    
                    // Respuesta automática simple
                    setTimeout(() => {
                        this._addMessage('bot', this._getResponse(text));
                    }, 500);
                }
            };

            sendBtn.addEventListener('click', sendMessage);
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage();
            });
        }

        // Botones de opciones rápidas
        document.querySelectorAll('.quick-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const topic = btn.getAttribute('data-topic');
                this._addMessage('user', `Me interesa ${topic}`);
                setTimeout(() => {
                    this._addMessage('bot', this._getQuickResponse(topic));
                }, 500);
            });
        });
    }

    _addMessage(type, text) {
        const messages = document.getElementById('chatbotMessages');
        if (!messages) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = type === 'user' ? 
            '<i class="fas fa-user"></i>' : 
            '<i class="fas fa-code"></i>';
            
        const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <p>${text}</p>
                <div class="message-time">${time}</div>
            </div>
        `;

        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    }

    _getResponse(input) {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('hola') || lowerInput.includes('holis')) {
            return '¡Hola! Soy el asistente de Kodyan HQ. ¿En qué puedo ayudarte?';
        }
        else if (lowerInput.includes('operat')) {
            return 'Kodyan Operations se especializa en automatización de procesos, dashboards y sistemas inteligentes.';
        }
        else if (lowerInput.includes('commer')) {
            return 'Kodyan Commerce desarrolla estrategias comerciales, planes de marketing y bundles ganadores.';
        }
        else if (lowerInput.includes('eco')) {
            return 'Kodyan Eco crea calculadoras de huella de carbono y soluciones sustentables.';
        }
        else if (lowerInput.includes('care')) {
            return 'Kodyan Care desarrolla herramientas de apoyo psicológico y emocional.';
        }
        else if (lowerInput.includes('ayuda')) {
            return 'Puedes preguntarme sobre: Operations, Commerce, Eco, Care, Juri, Med. También usar los botones de abajo.';
        }
        else {
            return 'Gracias por tu mensaje. ¿Te interesa saber sobre Operations, Commerce, Eco o Care?';
        }
    }

    _getQuickResponse(topic) {
        const responses = {
            'operations': 'Kodyan Operations transforma datos en decisiones claras con automatización y dashboards en tiempo real.',
            'commerce': 'Kodyan Commerce activa tu potencial de crecimiento con estrategias comerciales innovadoras.',
            'juri': 'Kodyan Juri desarrolla soluciones legales inteligentes (próximamente).',
            'med': 'Kodyan Med crea herramientas para el sector salud (próximamente).',
            'eco': 'Kodyan Eco diseña calculadoras de huella de carbono y soluciones ambientales.',
            'care': 'Kodyan Care desarrolla plataformas de apoyo psicológico accesibles.'
        };
        
        return responses[topic] || '¡Interesante tema! Pronto tendré más información sobre esto.';
    }

    // Métodos públicos
    open() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            this.isOpen = true;
            container.classList.add('active');
        }
    }

    close() {
        const container = document.getElementById('chatbotContainer');
        if (container) {
            this.isOpen = false;
            container.classList.remove('active');
        }
    }
}

// Inicialización simple
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (!window.kodyanChatbot) {
            window.kodyanChatbot = new KodyanChatbot();
            window.kodyanChatbot.init();
        }
    }, 1000);
});

console.log('🤖 Chatbot minimalista cargado');
