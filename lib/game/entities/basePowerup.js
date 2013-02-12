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
    modifierTypes: ['dd', 'stun', 'power'],
	init: function(x, y, settings) {
        this.font = new ig.Font( 'media/04b03.font.png' );
        this.addAnim('idle', 1, [0])
        this.type = settings['powerupType']
        this.parent(x, y, settings);
	},
    update: function () {
        if (this.clickOnMe() && GLOBAL_STATE.dragging === true && GLOBAL_STATE.hasPowerup === false){
            this.attach();
            GLOBAL_STATE.hasPowerup = true;
        }
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
    clickOnMe: function () {
        return ig.input.pressed('click')
            && (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },
});

});
