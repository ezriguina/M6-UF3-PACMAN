class ConfigGame {
    #rows;
    #cols;
    #cellSize;
    #levels;
    #currentLevel;
    
    constructor() {
        this.#rows = 20;
        this.#cols = 20;
        this.#cellSize = 30;
        this.#currentLevel = 1;
        this.#levels = [
            {
                id: 1,
                name: "Fàcil",
                pointsToWin: 100,
                timeLimit: 180,
                ghostSpeed: 1,
                pacmanSpeed: 2
            },
            {
                id: 2,
                name: "Mitjà",
                pointsToWin: 200,
                timeLimit: 150,
                ghostSpeed: 1.5,
                pacmanSpeed: 2
            },
            {
                id: 3,
                name: "Difícil",
                pointsToWin: 300,
                timeLimit: 120,
                ghostSpeed: 2,
                pacmanSpeed: 1.5
            }
        ];
    }
    
    get rows() {
        return this.#rows;
    }
    
    get cols() {
        return this.#cols;
    }
    
    get cellSize() {
        return this.#cellSize;
    }
    
    get currentLevel() {
        return this.#currentLevel;
    }
    
    set currentLevel(level) {
        if (level >= 1 && level <= this.#levels.length) {
            this.#currentLevel = level;
        } else {
            throw new Error("Nivell no vàlid");
        }
    }
    
    get currentLevelConfig() {
        return this.#levels[this.#currentLevel - 1];
    }
    
    get levels() {
        return this.#levels;
    }
}