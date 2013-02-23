ig.module(
    'game.entities.waveOver'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityWaveOver = ig.Entity.extend({
    size: {x:873, y:105},
    animSheet: new ig.AnimationSheet('media/waveOver.png', 873, 105),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
    },
});
});
