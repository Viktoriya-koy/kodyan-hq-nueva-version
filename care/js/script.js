// js/script.js - VERSIÓN SUPER SIMPLE PARA HTML PLANO
console.log('🐙 Kodyan Care cargado - Todo está bien');

// ===== FUNCIONES PRINCIPALES =====

// 1. Función para el menú mobile (hamburger)
function toggleMobileMenu() {
    console.log('🍔 Menú mobile toggleado');
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.getElementById('hamburger');
    
    if (navLinks && hamburger) {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Cambiar icono hamburger a X
        const icon = hamburger.querySelector('i');
        if (hamburger.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
}

// 2. Cerrar menú al hacer clic fuera
function setupClickOutsideMenu() {
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.getElementById('hamburger');
        
        if (navLinks?.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('#hamburger')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            // Volver icono a hamburger
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 3. Smooth scroll para enlaces internos (#section)
function setupSmoothScroll() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]') && 
            !e.target.matches('a[href="#"]') &&
            !e.target.matches('a[href^="#0"]')) {
            e.preventDefault();
            
            const targetId = e.target.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Calcular posición considerando header fixed
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cerrar menú mobile si está abierto
                const navLinks = document.querySelector('.nav-links');
                const hamburger = document.getElementById('hamburger');
                if (navLinks?.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
}

// 4. Efectos de animación al hacer scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observar elementos para animar
    const elementsToAnimate = document.querySelectorAll('.tool-item, .regulacion-item, .section-title');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// 5. Preloader suave (opcional)
function setupPreloader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.add('loaded');
            console.log('✅ Página completamente cargada');
        }, 500);
    });
}

// 6. Validación de formularios (si hay forms)
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'var(--color-emergency)';
                    
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                console.log('⚠️ Por favor completa todos los campos requeridos');
            }
        });
    });
}

// 7. Tooltips para elementos interactivos
function setupTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltipText = e.target.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'var(--color-text)';
            tooltip.style.color = 'white';
            tooltip.style.padding = '0.5rem 1rem';
            tooltip.style.borderRadius = '6px';
            tooltip.style.fontSize = '0.9rem';
            tooltip.style.zIndex = '10000';
            tooltip.style.whiteSpace = 'nowrap';
            
            document.body.appendChild(tooltip);
            
            const rect = e.target.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width/2 - tooltip.offsetWidth/2) + 'px';
            
            e.target.addEventListener('mouseleave', () => {
                tooltip.remove();
            }, { once: true });
        });
    });
}

// ===== INICIALIZACIÓN =====
function initKodyanCare() {
    console.log('🚀 Inicializando Kodyan Care...');
    
    // Setup de todas las funcionalidades
    setupClickOutsideMenu();
    setupSmoothScroll();
    setupScrollAnimations();
    setupPreloader();
    setupFormValidation();
    setupTooltips();
    
    // Event listeners
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    // Añadir clase loaded al body cuando todo esté listo
    document.addEventListener('DOMContentLoaded', () => {
        document.body.classList.add('loaded');
        console.log('✅ DOM completamente cargado y parseado');
    });
    
    // Manejar errores de imágenes
    document.addEventListener('error', (e) => {
        if (e.target.tagName === 'IMG') {
            console.warn('⚠️ Imagen no encontrada:', e.target.src);
            e.target.style.border = '3px solid var(--color-emergency)';
            e.target.style.padding = '1rem';
            e.target.style.background = 'var(--color-emergency-light)';
        }
    }, true);
}

// ===== EJECUCIÓN INMEDIATA =====
// Versión segura para evitar errores si el DOM no está listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKodyanCare);
} else {
    initKodyanCare();
}

// Inicializar cuando cargue la página
document.addEventListener('DOMContentLoaded', inicializarTema);
// ===== FUNCIONES GLOBALES (para usar en otros HTML) =====
// Estas funciones pueden ser llamadas desde onclick en los HTMLs

// Para la página de descarga emocional
function liberarTexto(tipo) {
    const textoArea = document.getElementById('texto-descarga');
    const botones = document.querySelectorAll('.btn-destruir');
    const mensajeExito = document.getElementById('mensaje-exito');
    
    if (textoArea.value.trim() === '') {
        alert('Escribí algo primero para poder liberarlo 💙');
        return;
    }

    // Deshabilitar botones durante la animación
    botones.forEach(boton => {
        boton.disabled = true;
        boton.style.opacity = '0.6';
    });

    // Aplicar animación según el tipo
    textoArea.classList.add(tipo);
    
    // Mensajes personalizados según el tipo
    const mensajes = {
        desvanecer: "💨 Tu carga se desvaneció en el aire...",
        estallar: "🔥 ¡Pum! Tu carga emocional estalló en mil pedazos.",
        desintegrar: "🌪️ Tu carga se desintegró en el viento..."
    };
    
    mensajeExito.textContent = mensajes[tipo] || "💨 Tu carga emocional se ha liberado.";

    // Esperar a que termine la animación
    setTimeout(() => {
        // Ocultar textarea
        textoArea.classList.add('oculto');
        
        // Mostrar mensaje de éxito
        mensajeExito.classList.add('mostrar');
        
        // Opcional: Resetear después de un tiempo
        setTimeout(() => {
            textoArea.value = '';
            textoArea.classList.remove(tipo, 'oculto');
            textoArea.style.opacity = '1';
            textoArea.style.transform = 'none';
            
            botones.forEach(boton => {
                boton.disabled = false;
                boton.style.opacity = '1';
            });
            
            mensajeExito.classList.remove('mostrar');
        }, 5000); // Reset después de 5 segundos
        
    }, 2000); // Tiempo de la animación
}

// Para la página sensorial
function toggleRespirar() {
    const pelota = document.getElementById('pelota');
    pelota.classList.toggle('inflar');
    
    if (pelota.classList.contains('inflar')) {
        pelota.textContent = "Inhalar...";
        setTimeout(() => {
            pelota.textContent = "Exhalar...";
            setTimeout(() => {
                pelota.classList.remove('inflar');
                pelota.textContent = "Click para respirar";
            }, 4000);
        }, 4000);
    }
}

function crearBurbujas() {
    const contenedor = document.getElementById('burbujas');
    contenedor.innerHTML = '';
    
    for (let i = 0; i < 15; i++) {
        const burbuja = document.createElement('div');
        burbuja.className = 'burbuja';
        burbuja.style.width = (20 + Math.random() * 30) + 'px';
        burbuja.style.height = burbuja.style.width;
        burbuja.style.left = Math.random() * 100 + '%';
        burbuja.style.animationDelay = (Math.random() * 5) + 's';
        burbuja.style.animationDuration = (3 + Math.random() * 4) + 's';
        contenedor.appendChild(burbuja);
    }
}

function moverGatito(gatito) {
    gatito.style.transform = 'translateY(-15px) rotate(8deg)';
    setTimeout(() => {
        gatito.style.transform = 'none';
    }, 1000);
}

// Para el chat
function enviarMensaje() {
    const input = document.getElementById('input-mensaje');
    const mensajes = document.getElementById('mensajes');
    const typing = document.getElementById('typing');
    
    if (input.value.trim() === '') return;

    // Mensaje del usuario
    const userMsg = document.createElement('div');
    userMsg.className = 'mensaje usuario';
    userMsg.textContent = input.value;
    mensajes.appendChild(userMsg);

    // Limpiar input
    const userMessage = input.value;
    input.value = '';

    // Scroll al final
    mensajes.scrollTop = mensajes.scrollHeight;

    // Mostrar "escribiendo..."
    typing.classList.add('active');
    mensajes.scrollTop = mensajes.scrollHeight;

    // Respuesta de Kody después de un delay
    setTimeout(() => {
        typing.classList.remove('active');
        
        const kodyMsg = document.createElement('div');
        kodyMsg.className = 'mensaje kody';
        
        // Respuesta inteligente basada en el mensaje del usuario
        let response;
        if (userMessage.toLowerCase().includes('ansiedad') || userMessage.toLowerCase().includes('nervioso')) {
            response = "Entiendo que sentís ansiedad. ¿Probamos la respiración cuadrada? Inhalá 4 segundos, mantené 4, exhalá 4.";
        } else if (userMessage.toLowerCase().includes('triste') || userMessage.toLowerCase().includes('deprimido')) {
            response = "Lamento que te sientas así. A veces ayuda nombrar 3 cosas que puedas ver y oír ahora mismo. ¿Probamos?";
        } else if (userMessage.toLowerCase().includes('soledad')) {
            response = "Aunque estés físicamente solo, no estás solo en esto. Estoy acá para acompañarte. 💙";
        } else {
            // Respuestas aleatorias predefinidas
            const kodyResponses = [
                "Te entiendo. ¿Querés que hagamos juntos una técnica de respiración?",
                "Gracias por compartirlo. ¿Necesitás ayuda para groundear?",
                "Parece que estás pasando por un momento difícil. ¿Querés probar una técnica de anclaje?",
                "Estoy aquí para vos. ¿Te gustaría hablar de lo que sentís?",
                "Podemos intentar la técnica 5-4-3-2-1 juntos, ¿te parece?",
                "Respirá conmigo: inhalá... mantene... exhalá... ¿Mejor?",
                "No estás solo en esto. ¿Qué necesitás en este momento?",
                "A veces escribir ayuda. ¿Querés probar la descarga emocional?"
            ];
            response = kodyResponses[Math.floor(Math.random() * kodyResponses.length)];
        }
        
        kodyMsg.textContent = response;
        mensajes.appendChild(kodyMsg);
        mensajes.scrollTop = mensajes.scrollHeight;

    }, 2000); // 2 segundos de delay
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        enviarMensaje();
    }
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
// Hacer las funciones disponibles globalmente para onclick
window.liberarTexto = liberarTexto;
window.toggleRespirar = toggleRespirar;
window.crearBurbujas = crearBurbujas;
window.moverGatito = moverGatito;
window.enviarMensaje = enviarMensaje;
window.handleKeyPress = handleKeyPress;

console.log('🌊 Kodyan Care JS listo para ayudar');
