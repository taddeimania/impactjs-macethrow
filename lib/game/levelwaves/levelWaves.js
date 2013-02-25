ig.module( 
	'game.levelwaves.levelWaves'
)
.requires(
	'impact.game',
	'game.waves'
)
.defines(function(){

Level1 = {
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
                    Wave.getWave(1, 1, 2, true, game);
                },
                next: function () {}
            }
        }
    },
}

});
