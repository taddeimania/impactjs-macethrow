ig.module( 
	'game.entities.power' 
)
.requires(
	'impact.entity',
    'game.entities.basePowerup'
)
.defines(function(){

EntityPower = EntityBasePowerup.extend({
    animSheet: new ig.AnimationSheet('media/power.png', 24, 24),
    powerupName: "Power",
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        this.bigIcon = new ig.Image('media/powerIcon.png');
    },
    powerUpStartFunction: function () {
        this.parent();
        this.powerupActive = true;
        this.tempPowerModifier = this.powerModifier;
        this.powerModifier = 1000;
        this.powerUpTimer = new ig.Timer(1);
        this.timeOut = 2;
    },
    powerUpStopFunction: function () {
        this.powerupActive = false;
        if (this.tempPowerModifier){
            this.powerModifier = this.tempPowerModifier;
        }
        delete this.powerUpTimer;
        this.powerUpStartFunction = function () {};
        this.parent();
    },
    draw: function () {
        this.parent();
        this.font.draw('POWER', this.pos.x + 12, this.pos.y-10, ig.Font.ALIGN.CENTER)
    }
});

});
