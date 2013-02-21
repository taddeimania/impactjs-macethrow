ig.module( 
	'game.entities.bomb' 
)
.requires(
	'impact.entity',
    'game.entities.basePowerup'
)
.defines(function(){

EntityBomb = EntityBasePowerup.extend({
    animSheet: new ig.AnimationSheet('media/bomb.png', 24, 24),
    powerupName: "Bomb",
    powerUpStartFunction: function () {
        this.parent();
        this.powerupActive = true;
        var myLoc = [this.pos.x.round(), this.pos.y.round()]
        var badGuys = ig.game.getEntitiesByType('EntityBadguy');
        var killCount = 0;
        for (var x = 0 ; x < badGuys.length ; x++){
            if (badGuys[x].pos.x > (myLoc[0] - 100) && badGuys[x].pos.x < (myLoc[0] + 100)
             && badGuys[x].pos.y > (myLoc[1] - 100) && badGuys[x].pos.y < (myLoc[1] + 100)
             && killCount < 3){
                badGuys[x].health = 0;
                badGuys[x].kill();
                killCount++;
            }
        }
        this.timeOut = .01;
        this.powerUpTimer = new ig.Timer(1);
        ig.game.spawnEntity(EntityBombBlast, myLoc[0]-100, myLoc[1]-100);

    },
    powerUpStopFunction: function () {
        this.powerupActive = false;
        delete this.powerUpTimer;
        this.powerUpStartFunction = function () {};
        this.parent();
    },
    draw: function () {
        this.parent();
        this.font.draw('BOMB', this.pos.x + 12, this.pos.y-10, ig.Font.ALIGN.CENTER)
    }
});


EntityBombBlast = ig.Entity.extend({
    lifetime: .16,
    animSheet: new ig.AnimationSheet('media/bombBlast.png', 200, 200),
    init: function (x, y, settings){
        this.parent(x, y, settings);
        this.addAnim('boom', .04, [0, 1, 2, 3]);
        this.currentAnim = this.anims.boom;
        this.blastTimer = new ig.Timer();
    },
    update: function () {
        if (this.blastTimer.delta() > this.lifetime){
            this.kill();
            return;
        }
        this.parent();
    },
});

});
