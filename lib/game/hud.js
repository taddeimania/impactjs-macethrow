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
	smallFont: new ig.Font( 'media/04b03.font.png' ),
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
        var accuracyModifier = (this.player.powerModifier * 10).round() - 10;
        accuracyModifier = accuracyModifier < 500 ? accuracyModifier : "OMG";
        this.font.draw('+ ' + accuracyModifier + '%', 215, 25, ig.Font.ALIGN.RIGHT);
        this.accuracyBorder.draw(10, 10);
        this.powerupBorder.draw(770, 10);
        if (this.player.currentPowerup){
            this.player.currentPowerup.bigIcon.draw(938, 38);
        }
        this.baseBorder.draw(282, 6);
        var baseHealthPercent = ((this.base.health / this.base.maxHealth) * 100).round();
        baseHealthPercent = baseHealthPercent > 0 ? baseHealthPercent : 0;
        this.font.draw(baseHealthPercent + '%', 512, 25, ig.Font.ALIGN.CENTER);
        this.font.draw('Score: ' + GLOBAL_STATE.score, 20, 150, ig.Font.ALIGN.LEFT);
    }
});

});
