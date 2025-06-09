/**
 * Módulo de autenticación
 * @module auth
 */

import { validateEmail, validatePassword } from './utils.js';

// Predefinir 3 usuarios para pruebas 
const predefinedUsers = [
    {
        id: 1,
        name: "Pere",
        lastName: "Garcia",
        email: "pere@example.com",
        password: "pere123",
        birthDate: "1990-05-15"
    },
    {
        id: 2,
        name: "Joan",
        lastName: "Martí",
        email: "joan@example.com",
        password: "joan123",
        birthDate: "1985-10-22"
    },
    {
        id: 3,
        name: "Laia",
        lastName: "Soler",
        email: "laia@example.com",
        password: "laia123",
        birthDate: "1995-03-08"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Cargar usuarios en localStorage si no existen
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(predefinedUsers));
    }

    // Manejar formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;
            
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Guardar sesión
                if (remember) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                } else {
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                }
                
                // Redirigir al juego
                window.location.href = 'game.html';
            } else {
                alert('Email o contrasenya incorrectes');
            }
        });
    }
});

/**
 * Función para cerrar sesión
 */
export function logout() {
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

/**
 * Verifica si hay un usuario logueado
 * @returns {boolean}
 */
export function isAuthenticated() {
    return !!(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
}

/**
 * Protege rutas que requieren autenticación
 * @param {string} redirectPath - Ruta a redirigir si no está autenticado
 */
export function protectRoute(redirectPath = 'login.html') {
    if (!isAuthenticated()) {
        window.location.href = redirectPath;
    }
}