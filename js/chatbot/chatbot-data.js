// Base de conocimiento del chatbot para Kodyan HQ
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
            target: "Médicos, clínicas, profesionales de la salud.",
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

// Funciones de utilidad para el conocimiento
const KnowledgeBase = {
    // Encontrar tema por patrón
    findTopicByPattern(input) {
        const cleanInput = input.toLowerCase().trim();
        
        for (const [topicKey, topicData] of Object.entries(CHATBOT_KNOWLEDGE.topics)) {
            if (cleanInput.includes(topicKey) || cleanInput.includes(topicData.name.toLowerCase())) {
                return topicKey;
            }
        }
        
        return null;
    },

    // Obtener respuesta para input
    getResponse(input) {
        const cleanInput = input.toLowerCase().trim();
        
        // Buscar en categorías específicas
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
        
        // Respuesta por defecto
        return this.getRandomResponse(CHATBOT_KNOWLEDGE.unknown.responses);
    },

    // Generar respuesta detallada para un tema
    generateTopicResponse(topicKey) {
        const topic = CHATBOT_KNOWLEDGE.topics[topicKey];
        if (!topic) return "No tengo información sobre ese tema.";
        
        return `**${topic.name}**\n\n${topic.description}\n\n${topic.details}\n\n**Para quién es:** ${topic.target}\n**Características:** ${topic.features.join(", ")}\n**Precio:** ${topic.price}`;
    },

    // Obtener respuesta aleatoria de un array
    getRandomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
};
