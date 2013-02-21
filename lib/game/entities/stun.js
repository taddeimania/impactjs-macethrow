ig.module( 
	'game.entities.stun' 
)
.requires(
	'impact.entity',
    'game.entities.basePowerup'
)
.defines(function(){

EntityStun = EntityBasePowerup.extend({
    animSheet: new ig.AnimationSheet('media/lovestun.png', 24, 24),
    // size: {x:25, y: 25},
    powerupName: "Stun",
    powerUpStartFunction: function () {
        this.parent();
        this.powerupActive = true;
        var myLoc = [this.pos.x.round(), this.pos.y.round()]
        var badGuys = ig.game.getEntitiesByType('EntityBadguy');
        if (typeof badGuys[0] === 'object'){
            this.tempCenter = badGuys[0].getTargetPath;
            this.stunned = [];
            for (var i = 0 ; i < badGuys.length ; i++){
                if (badGuys[i].pos.x > (myLoc[0] - 100) && badGuys[i].pos.x < (myLoc[0] + 100)
                 && badGuys[i].pos.y > (myLoc[1] - 100) && badGuys[i].pos.y < (myLoc[1] + 100)){
                    this.stunned.push(badGuys[i]);
                    var tempX = badGuys[i].pos.x;
                    var tempY = badGuys[i].pos.y;
                    var newPath = function () { return [tempX, tempY] };

                    badGuys[i].getTargetPath = newPath;
                }
            }
        }
        this.timeOut = 5;
        this.powerUpTimer = new ig.Timer(1);
        ig.game.spawnEntity(EntityStunBlast, myLoc[0]-100, myLoc[1]-100);
    },
    powerUpStopFunction: function () {
        this.powerupActive = false;
        if (this.stunned){
            for (var i = 0 ; i < this.stunned.length ; i++){
                this.stunned[i].getTargetPath = this.tempCenter;
            }
        }
        delete this.powerUpTimer;
        this.powerUpStartFunction = function () {};
        this.parent();
    },
    draw: function () {
        this.parent();
        this.font.draw('STUN', this.pos.x + 12, this.pos.y-10, ig.Font.ALIGN.CENTER)
    }
});
EntityStunBlast = ig.Entity.extend({
    lifetime: .16,
    animSheet: new ig.AnimationSheet('media/stunBlast.png', 200, 200),
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
