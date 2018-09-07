
new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        hasDamage: false,
        isHealed: false,
        song: document.getElementById('song'),
    },
    methods: {
        startGame: function() {
            this.song.load();
            this.song.volume = 0.3;
            this.song.play();
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack: function() {
            this.attackAnimation();

            this.monsterHealth -= this.calculateDamage(3, 10);
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks(5, 12);

        },
        specialAttack: function() {
            this.attackAnimation();

            this.monsterHealth -= this.calculateDamage(10, 20);
            if (this.checkWin()) {
                return;
            }

            this.monsterAttacks(5, 12);

        },
        heal: function() {
            if (this.playerHealth <=90) {
            this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.healAnimation();
            this.monsterAttacks(5, 12);
        },
        giveUp: function() {
            this.gameIsRunning = false;
            this.song.pause();
        },
        attackAnimation: function() {
            this.hasDamage = true;
            setTimeout(() => {
                this.hasDamage = false;
            }, 800);
        },
        healAnimation: function() {
            this.isHealed = true;
            setTimeout(() => {
                this.isHealed = false;
            }, 1000);
        },
        monsterAttacks: function(min, max) {
            this.playerHealth -= this.calculateDamage(min, max);
            this.checkWin();
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }            
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }            
                return true;
            }
        }
    }
});