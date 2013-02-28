ig.module( 
	'game.levelwaves.levelWaves'
)
.requires(
	'impact.game',
	'game.waves'
)
.defines(function(){
LevelThreeWaves = ig.Class.extend({
    waveData: function () {
        return {
            totalMobs: 4,
            chain: function(game) {
                Wave.getWave(2, 2, 2, false, game);
            },
            next: this.secondWave()
        }
    },
    secondWave: function () {
        return {
            totalMobs: 4,
            chain: function(game) {
                Wave.getWave(1, 4, 3, false, game);
            },
            next: this.thirdWave()
        }
    },
    thirdWave: function () {
        return {
            totalMobs: 8,
            chain: function(game) {
                Wave.getWave(4, 2, 3, false, game);
            },
            next: this.fourthWave()
        }
    },
    fourthWave: function () {
        return {
            totalMobs: 16,
            chain: function(game) {
                Wave.getWave(4, 4, 3, false, game);
            },
            next: this.lastWave()
        }
    },
    lastWave: function () {
        return {
            totalMobs: 18,
            chain: function(game) {
                Wave.getWave(2, 9, 2, false, game);
            },
            next: {chain: function (){}},
            lastLevel: true
        }
    }
});

LevelTwoWaves = ig.Class.extend({
    waveData: function () {
        return {
            totalMobs: 2,
            chain: function(game) {
                Wave.getWave(1, 2, 1, false, game);
            },
            next: this.secondWave()
        }
    },
    secondWave: function () {
        return {
            totalMobs: 6,
            chain: function(game) {
                Wave.getWave(3, 2, 3, false, game);
            },
            next: this.thirdWave()
        }
    },
    thirdWave: function () {
        return {
            totalMobs: 12,
            chain: function(game) {
                Wave.getWave(4, 3, 3, false, game);
            },
            next: {chain: function (){}},
            lastLevel: true
        }
    }
});

LevelOneWaves = ig.Class.extend({
    waveData: function () {
        return {
            totalMobs: 2,
            chain: function(game) {
                Wave.getWave(1, 2, 2, false, game);
            },
            next: this.secondWave()
        }
    },
    secondWave: function () {
        return {
            totalMobs: 4,
            chain: function(game) {
                Wave.getWave(2, 2, 4, false, game);
            },
            next: this.thirdWave()
        }
    },
    thirdWave: function () {
        return {
            totalMobs: 6,
            chain: function(game) {
                Wave.getWave(3, 2, 1, false, game);
            },
            next: this.lastWave()
        }
    },
    lastWave: function () {
        return {
            totalMobs: 6,
            chain: function(game) {
                Wave.getWave(6, 1, 4, true, game);
            },
            next: {chain: function (){}}
        }
    }
});

});
