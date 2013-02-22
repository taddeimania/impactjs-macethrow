ig.module( 
	'game.hud'
)
.requires(
	'impact.game',
	'impact.font',
    'game.entities.activateButton',
    'game.entities.dismissButton'
)
.defines(function(){

Hud = ig.Class.extend({
	font: new ig.Font( 'media/accuracyfont.png' ),
    accuracyBorder: new ig.Image('media/accuracyBorder.png'),
    powerupBorder: new ig.Image('media/powerupBorder.png'),
    baseBorder: new ig.Image('media/baseBorder.png'),
    topBorder: new ig.Image('media/topborder.png', 1024, 20),	
	init: function(player, base) {
        this.base = base;
        this.player = player;
        this.drawHud();
        ig.game.spawnEntity('EntityActivateButton', 789, 35);
        ig.game.spawnEntity('EntityDismissButton', 789, 72);
	},
    drawHud: function () {
        this.topBorder.draw(0, 120);
        // ACCURACY MODIFIER STUFF
        var accuracyModifier = (this.player.powerModifier * 10).round() - 10;
        accuracyModifier = accuracyModifier < 500 ? accuracyModifier : "OMG";
        this.font.draw('+ ' + accuracyModifier + '%', 215, 25, ig.Font.ALIGN.RIGHT);
        this.accuracyBorder.draw(10, 10);

        // powerup stuff here
        this.powerupBorder.draw(770, 10);
        if (this.player.currentPowerup){
            this.player.currentPowerup.bigIcon.draw(938, 38);
        }
        // console.log(this.player.currentPowerup);

        // base stuff her
        this.baseBorder.draw(282, 6);
        var baseHealthPercent = ((this.base.health / this.base.maxHealth) * 100).round();
        baseHealthPercent = baseHealthPercent > 0 ? baseHealthPercent : 0;
        this.font.draw(baseHealthPercent + '%', 512, 25, ig.Font.ALIGN.CENTER);
    }
});

});
