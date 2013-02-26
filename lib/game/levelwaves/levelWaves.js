ig.module( 
	'game.levelwaves.levelWaves'
)
.requires(
	'impact.game',
	'game.waves'
)
.defines(function(){
TutorialWaves = ig.Class.extend({
    waveData: function () {
        return {
            totalMobs: 4,
            chain: function(game) {
                Wave.getWave(1, 4, 2, false, game);
            },
            next: this.secondWave()
        }
    },
    secondWave: function () {
        return {
            totalMobs: 8,
            chain: function(game) {
                Wave.getWave(2, 4, 4, false, game);
            },
            next: this.thirdWave()
        }
    },
    thirdWave: function () {
        return {
            totalMobs: 16,
            chain: function(game) {
                Wave.getWave(4, 4, 4, true, game);
            },
            next: function () {}
        }
    }
});

});
