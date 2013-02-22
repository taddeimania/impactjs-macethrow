ig.module( 
	'game.baseLevel' 
)
.requires(
	'impact.game',
    'game.hud',
    'plugins.preloader',
    'plugins.astar-for-entities',
    'plugins.tween',
    'game.entities.logo',
    'game.entities.badguy',
    'game.entities.circle',
    'game.entities.base'

)
.defines(function(){

BaseLevel = ig.Game.extend({
	init: function(wave, currentLevel) {
        this.currentWave = wave;
        this.totalMobs = wave.totalMobs;
        this.activeMobs = 0;
        this.loadLevel(currentLevel);
        this.base = ig.game.spawnEntity('EntityBase', 473, 385);
        this.player = ig.game.spawnEntity('EntityCircle', 616, 448);
        this.hud = new Hud(this.player, this.base);
	    this.createChain();
    },
	update: function() {
		this.parent();
        this.spawnChain();
        if (this.waveDone()){
            console.log('in here');
            this.nextWave(this.currentWave.nextWave);
            this.createChain();
        }
	},
	draw: function() {
		this.parent();
        this.hud.drawHud();	
	},
    spawnBadGuy: function (){
        ig.game.spawnEntity('EntityBadguy',0, 0, {safeSpawns: this.safeSpawns});
        this.activeMobs++;
    },
    waveDone: function () {
        return this.activeMobs === 0 && this.totalMobs === 0;
    },
    nextWave: function (nextWave){
        this.nextWave = nextWave;
    },
    levelDone: true
});

});
