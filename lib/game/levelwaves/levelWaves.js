ig.module( 
	'game.levelwaves.levelWaves'
)
.requires(
	'impact.game',
	'game.waves'
)
.defines(function(){

TutorialWaves = ig.Class.extend({
    waveData: {
        totalMobs: 1,
        chain: function(game) {
            Wave.getWave(1, 1, 2, false, game);
        },
        next: {
            totalMobs: 1,
            chain: function(game) {
                Wave.getWave(1, 1, 2, false, game);
            },
            next: {
                totalMobs: 1,
                chain: function(game) {
                    Wave.getWave(1, 1, 2, false, game);
                },
                next: {
                    totalMobs: 1,
                    chain: function(game) {
                        Wave.getWave(1, 1, 1, true, game);
                    },
                    next: function () {}
                }
            }
        }
    },
});

});
