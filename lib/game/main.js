ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.hud',
    'game.levels.level1',
    'game.levels.level2',
    'game.levels.level3',
    'plugins.preloader',
    'plugins.astar-for-entities',
    'plugins.tween',
    'game.entities.logo',
    'game.entities.badguy',
    'game.entities.circle',
    'game.entities.base',
    'game.baseLevel',
    'game.entities.waveOver',
    'game.entities.gameOver',
    'game.entities.gameOverEntity',
    'game.entities.levelOver',
    'game.entities.levelOverEntity',
    'game.entities.win',
    'game.waves',
    'game.screens',
    'game.globalState',
    'game.levelwaves.levelWaves'

)
.defines(function(){

Level2 = BaseLevel.extend({
    safeSpawns: [[165, 257], [849, 641]],
	init: function() {
        var wave = new LevelThreeWaves().waveData();
        this.parent(wave, LevelLevel3);
    },
    nextLevel: StartScreen
})
;
Level1 = BaseLevel.extend({
    safeSpawns: [[509, 201], [229, 461], [437, 629], [581, 529], [793, 461]],
	init: function() {
        var wave = new LevelTwoWaves().waveData();
        this.parent(wave, LevelLevel2);
    },
    nextLevel: Level2
});

Tutorial = BaseLevel.extend({
    safeSpawns: [[385,177],[601,177],[797,377],[601,609],[385,609],[177,377]],
	init: function() {
        var wave = new LevelOneWaves().waveData();
        this.parent(wave, LevelLevel1);
    },
    nextLevel: Level1
});

ig.Sound.enabled = false;
ig.main( '#canvas', StartScreen, 60, 1024, 700,1, MyLoader );

});
