ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.hud',
    'game.levels.level1',
    'plugins.preloader',
    'plugins.astar-for-entities',
    'plugins.tween',
    'game.entities.logo',
    'game.entities.badguy',
    'game.entities.circle',
    'game.entities.base',
    'game.baseLevel',
    'game.entities.waveOver',
    'game.waves',
    'game.screens',
    'game.levelwaves.levelWaves'

)
.defines(function(){

GLOBAL_STATE = {
    dragging: false,
    hasPowerup: false
};

Level1 = BaseLevel.extend({
    safeSpawns: [[385,177],[601,177],[797,377],[601,609],[385,609],[177,377]],
	init: function() {
        var wave = new TutorialWaves().waveData;
        this.parent(wave, LevelLevel1);
    },
});

Tutorial = BaseLevel.extend({
    safeSpawns: [[385,177],[601,177],[797,377],[601,609],[385,609],[177,377]],
	init: function() {
        var wave = new TutorialWaves().waveData;
        this.parent(wave, LevelLevel1);
    },
    nextLevel: Level1
});

ig.Sound.enabled = false;
ig.main( '#canvas', StartScreen, 60, 1024, 700,1, MyLoader );

});
