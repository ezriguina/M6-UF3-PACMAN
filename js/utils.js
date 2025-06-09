/**
 * Módulo de utilidades generales
 * @module utils
 */

/**
 * Valida un email según formato estándar
 * @param {string} email - Email a validar
 * @returns {boolean} - True si el email es válido
 */
export function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Valida una contraseña (mínimo 6 caracteres)
 * @param {string} password - Contraseña a validar
 * @returns {boolean} - True si la contraseña es válida
 */
export function validatePassword(password) {
    return password.length >= 6;
}

/**
 * Valida una fecha de nacimiento (debe ser anterior a hoy)
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {boolean} - True si la fecha es válida
 */
export function validateBirthDate(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    return birthDate < today;
}

/**
 * Crea una tabla HTML dinámicamente a partir de datos
 * @param {Array} data - Array de objetos con los datos
 * @param {Array} columns - Array con nombres de columnas
 * @returns {HTMLTableElement} - Tabla creada
 */
export function createDynamicTable(data, columns) {
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Crear encabezados
    const headerRow = document.createElement('tr');
    columns.forEach(col => {
        const th = document.createElement('th');
        th.textContent = col;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    
    // Crear filas de datos
    data.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(col => {
            const td = document.createElement('td');
            td.textContent = item[col.toLowerCase()] || '';
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });
    
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
}

/**
 * Formatea una fecha a formato local
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ca-ES', options);
}

/**
 * Muestra una notificación al usuario
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, error, warning)
 * @param {number} duration - Duración en milisegundos (opcional)
 */
export function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = 1000;
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = '5px';
    notification.style.backgroundColor = 
        type === 'success' ? '#4caf50' :
        type === 'error' ? '#f44336' :
        type === 'warning' ? '#ff9800' : '#2196f3';
    notification.style.color = '#fff';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, duration);
}