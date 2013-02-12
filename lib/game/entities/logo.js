ig.module(
    'game.entities.logo'
)
.requires(
    'impact.entity'
)
.defines(function(){
EntityLogo = ig.Entity.extend({
    size: {x:873, y:105},
    animSheet: new ig.AnimationSheet('media/logo.png', 873, 105),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
    },

});
});
