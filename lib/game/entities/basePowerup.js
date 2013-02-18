ig.module( 
	'game.entities.basePowerup' 
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBasePowerup = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/powerup.png', 24, 24),
    size: {x:24, y: 24},
    name: "",
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NONE,
    init: function(x, y, settings) {
	    this.powerUp = true;
        this.font = new ig.Font( 'media/04b03.font.png' );
        this.addAnim('idle', 1, [0])
        this.parent(x, y, settings);
	},
    powerUpStartFunction: function () {},
    powerUpStopFunction: function () {
        GLOBAL_STATE.hasPowerup = false;
    },
    attach: function () {
        var player = ig.game.getEntitiesByType(EntityCircle)[0];
        player.attach(this.powerUpStartFunction, this.powerUpStopFunction);
        this.kill();
    },
    check: function (other) {
        if (GLOBAL_STATE.dragging === true
            && GLOBAL_STATE.hasPowerup === false
            && !other.walkSequence){
            this.attach();
            GLOBAL_STATE.hasPowerup = true;
        }
    }
});

});
