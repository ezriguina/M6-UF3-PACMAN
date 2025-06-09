/**
 * @class
 */
class User {
    #id;
    #name;
    #lastName;
    #email;
    #password;
    #birthDate;
    
    /**
     * @param {number} id - ID único del usuario
     * @param {string} name - Nombre del usuario
     * @param {string} lastName - Apellido del usuario
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña del usuario
     * @param {string} birthDate - Fecha de nacimiento (YYYY-MM-DD)
     */
    constructor(id, name, lastName, email, password, birthDate) {
        this.#id = id;
        this.#name = name;
        this.#lastName = lastName;
        this.#email = email;
        this.#password = password;
        this.#birthDate = birthDate;
    }
    
    // Getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get lastName() { return this.#lastName; }
    get email() { return this.#email; }
    get birthDate() { return this.#birthDate; }
    
    /**
     * @param {string} password - Contraseña a verificar
     * @returns {boolean}
     */
    checkPassword(password) {
        return this.#password === password;
    }
    
    /**
     * @param {object} data - Nuevos datos del usuario
     */
    update(data) {
        if (data.name) this.#name = data.name;
        if (data.lastName) this.#lastName = data.lastName;
        if (data.email) this.#email = data.email;
        if (data.birthDate) this.#birthDate = data.birthDate;
        if (data.password) this.#password = data.password;
    }
    
    /**
     * @returns {object}
     */
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            lastName: this.#lastName,
            email: this.#email,
            birthDate: this.#birthDate
        };
    }
}

/**
 * @returns {User|null} - Instancia de User o null si no hay sesión
 */
export function getCurrentUser() {
    const userData = JSON.parse(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
    return userData ? new User(
        userData.id,
        userData.name,
        userData.lastName,
        userData.email,
        userData.password,
        userData.birthDate
    ) : null;
}

/**
 * @param {number} userId - ID del usuario
 * @param {boolean} won - Indica si ganó la partida
 * @param {number} points - Puntos obtenidos
 */
export function updateUserStats(userId, won, points) {
    const stats = JSON.parse(localStorage.getItem('stats') || {});
    if (!stats[userId]) {
        stats[userId] = {
            gamesPlayed: 0,
            gamesWon: 0,
            gamesLost: 0,
            totalPoints: 0
        };
    }
    
    stats[userId].gamesPlayed++;
    if (won) {
        stats[userId].gamesWon++;
    } else {
        stats[userId].gamesLost++;
    }
    stats[userId].totalPoints += points;
    
    localStorage.setItem('stats', JSON.stringify(stats));
}