ig.module(
    'game.entities.waveOver'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityWaveOver = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/waveOver.png', 344, 35),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.timer = new ig.Timer()
    },
    draw: function () {
        if (this.timer.delta() < 2){
            this.tween({pos: {x: 340, y: 335}}, .2).start();
        } else {
            this.tween({pos: {x: 340, y: 800}}, .2).start();
        }
        if (this.timer.delta() > 3){
            this.kill()
        }
        this.parent();
    }
});
});
