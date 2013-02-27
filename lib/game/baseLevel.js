ig.module( 
	'game.baseLevel' 
)
.requires(
	'impact.game',
    'game.hud',
    'plugins.tween'

)
.defines(function(){

BaseLevel = ig.Game.extend({
    lastWave: false,
	init: function(wave, level) {
        this.setNextWave(wave);
        this.loadLevel(level);
        this.base = ig.game.spawnEntity('EntityBase', 473, 385);
        this.player = ig.game.spawnEntity('EntityCircle', 616, 448);
        this.hud = new Hud(this.player, this.base);
        this.gameTearDown = function (nextLevel) {
            GLOBAL_STATE.hasPowerup = false;
            this.base.kill();
            this.player.kill();
            if (nextLevel){
                ig.system.setGame(nextLevel);
            }
        }
    },
    update: function() {
		this.parent();
        this.spawnChain();
        if (this.waveDone() && !this.lastWave){
            this.setNextWave(this.wave.next);
            ig.game.spawnEntity('EntityWaveOver', 340, -30);
        } else if (this.waveDone() && this.lastWave){
            this.levelOverTimer = new ig.Timer();
            this.lastWave = false;
            ig.game.spawnEntity('EntityLevelOver', 324, -30);
        } else {
            if (this.levelOverTimer && this.levelOverTimer.delta() > 5){
                this.gameTearDown(this.nextLevel);
            }
        }
	},
    setNextWave: function (wave){
        this.activeMobs = 0;
        this.wave = wave;
        this.wave.totalMobs = wave.totalMobs;
        this.wave.chain(this);
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
        return this.activeMobs === 0 && this.wave.totalMobs === 0;
    },
    levelDone: function (){
        return true;
    },

});
});
