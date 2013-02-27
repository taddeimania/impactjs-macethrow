ig.module(
    'game.entities.levelOver'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityLevelOver = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/levelOver.png', 377, 35),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.timer = new ig.Timer()
    },
    draw: function () {
        if (this.timer.delta() < 2){
            this.tween({pos: {x: 324, y: 335}}, .2).start();
        }
        if (this.timer.delta() > 5){
            this.kill()
            ig.game.spawnEntity('EntityLevelOverEntity', 359, 223);
        }
        this.parent();
    }
});
});
