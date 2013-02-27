ig.module(
    'game.entities.levelOverEntity'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityLevelOverEntity = ig.Entity.extend({
    size: {x:270, y:255},
    dither: new ig.Image('media/dither.png'),
    animSheet: new ig.AnimationSheet('media/nextLevel.png', 270, 255),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.currentAnim = this.anims.idle;
        this.dither.draw(0,0);
        this.timer = new ig.Timer()
    },
    update: function () {
        this.parent();
        if (this.timer.delta() > 3){
            ig.game.lastWave = false;
            ig.game.gameTearDown(ig.game.nextLevel);
            delete this.timer;
        }
    },
    draw: function () {
        this.dither.draw(0,0);
        this.parent();
    }
});
});
