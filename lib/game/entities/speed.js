ig.module( 
	'game.entities.speed' 
)
.requires(
	'impact.entity',
    'game.entities.basePowerup'
)
.defines(function(){

EntitySpeed = EntityBasePowerup.extend({
    animSheet: new ig.AnimationSheet('media/speed.png', 24, 24),
    // size: {x:25, y: 25},
    powerupName: "Speed",
    powerUpStartFunction: function () {
        this.parent();
        this.powerupActive = true;
        this.tightness = 50;
        this.powerUpTimer = new ig.Timer(1);
        this.timeOut = 5;
    },
    powerUpStopFunction: function () {
        this.powerupActive = false;
        this.tightness = 5;
        delete this.powerUpTimer;
        this.powerUpStartFunction = function () {};
        this.parent();
    },
    draw: function () {
        this.parent();
        this.font.draw('SPEED', this.pos.x + 12, this.pos.y-10, ig.Font.ALIGN.CENTER)
    }
});

});
