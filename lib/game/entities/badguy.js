ig.module( 
	'game.entities.badguy' 
)
.requires(
	'impact.entity',
    'game.entities.healthBar'
)
.defines(function(){

EntityBadguy = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/badguy.png', 48, 48),
    size: {x: 18, y: 12},
    offset: {x: 25, y: 25},
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.FIXED,
    health: 1000,
    maxHealth: 1000,
    curHealth: 1000,
    speed: 5,
    check: function () {
        if (this.health !== this.curHealth){
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y+8, {colorOffset: 1, type: 'hit'})
            this.curHealth = this.health;
        }
    },
	init: function(x, y, settings) {
        this.parent(x, y, settings);
        this.centerOfScreen = [ig.system.realWidth/2,  ig.system.realHeight/2];

        if( !ig.global.wm ){  // what is this
            ig.game.spawnEntity(EntityHealthBar,this.pos.x+200 , this.pos.y,{ Unit: this });
        }
        this.addAnim('walk', .08, [0,1,2,3,4,5,6,7,6,5,4,3,2,1])
        this.currentAnim = this.anims.walk;
	},
    update: function () {
        this.getPath(this.centerOfScreen[0], this.centerOfScreen[1], true);
        this.followPath(this.speed);
        var angle = Math.atan2(this.centerOfScreen[1]-this.pos.y, this.centerOfScreen[0]-this.pos.x);
        // console.log("angle " + (angle * 10).round() + " - heading " + this.headingDirection);

        // HEADING   -    ANGLE
        //     8            6   
        //     7     -      3, 4, 5 
        //     6     -      0, 1, 2

        this.currentAnim = this.anims.walk;
        this.currentAnim.angle = angle + 1.2;
        this.parent();
    },
    kill: function (){
        this.parent();
        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y+8, {colorOffset: 0, type: 'kill'})
    }
});

EntityDeathExplosion = ig.Entity.extend({
    lifetime: 1,
    callBack: null,
    particles: 75,
    init: function (x, y, settings) {
        if (settings.type == "hit"){
            this.particles = 5;
        }
        this.parent(x, y, settings);
        for(var i = 0 ; i < this.particles ; i++){
            ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, {colorOffset: settings.colorOffset ? settings.colorOffset: 0});
        }
        this.idleTimer = new ig.Timer();
    },

    update: function () {
        if (this.idleTimer.delta() > this.lifetime){
            this.kill();
            if(this.callBack)
                this.callBack();
            return;
        }
    }

});

EntityDeathExplosionParticle = ig.Entity.extend({
    size: {x: 2, y: 2},
    maxVel: {x: 160, y: 200},
    lifetime: .75,
    fadetime: .5,
    bounciness: 0,
    vel: {x: 100, y: 100},
    collides: ig.Entity.COLLIDES.NONE,
    colorOffset: 0,
    totalColors: 7,
    animSheet: new ig.AnimationSheet('media/blood.png', 2, 2),

    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var frameID = Math.round(Math.random()*this.totalColors) + (this.colorOffset * (this.totalColors + 1));
        this.addAnim('idle', 0.2, [frameID]);
        this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
        this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
        this.idleTimer = new ig.Timer();
    },

    update: function (){
        if (this.idleTimer.delta() > this.lifetime){
            this.kill();
            return;
        }
        this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
        this.parent();
    }
});
});
