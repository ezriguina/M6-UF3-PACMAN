/**
 * Módulo principal de la aplicación
 * @module main
 */

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay usuario logueado
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    if (currentUser && window.location.pathname.includes('index.html')) {
        window.location.href = 'game.html';
    }

    // Manejar modales
    const infoModal = document.getElementById('info-modal');
    const creditsModal = document.getElementById('credits-modal');
    const helpModal = document.getElementById('help-modal');
    
    // Mostrar información del navegador
    document.getElementById('info-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('user-agent').textContent = `Navegador: ${window.navigator.userAgent}`;
        document.getElementById('app-version').textContent = `Versió: ${window.navigator.appVersion}`;
        infoModal.style.display = 'block';
    });
    
    // Mostrar créditos
    document.getElementById('credits-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        creditsModal.style.display = 'block';
    });
    
    // Mostrar ayuda
    document.getElementById('help-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        helpModal.style.display = 'block';
    });
    
    // Cerrar modales
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            infoModal.style.display = 'none';
            creditsModal.style.display = 'none';
            helpModal.style.display = 'none';
        });
    });
    
    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === infoModal) infoModal.style.display = 'none';
        if (e.target === creditsModal) creditsModal.style.display = 'none';
        if (e.target === helpModal) helpModal.style.display = 'none';
    });
});

/**
 * Muestra un mensaje de error en el formulario
 * @param {string} elementId - ID del elemento donde mostrar el error
 * @param {string} message - Mensaje de error a mostrar
 */
export function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
    }
}

/**
 * Limpia todos los mensajes de error
 */
export function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.textContent = '';
    });
}