ig.module( 
	'game.entities.badguy' 
)
.requires(
	'impact.entity',
    'plugins.eventChain',
    'impact.sound',
    'game.entities.healthBar'
)
.defines(function(){

EntityBadguy = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/badguy.png', 48, 48),
    safeSpawns: [[385,177],[601,177],[797,377],[601,609],[385,609],[177,377]],
    size: {x: 18, y: 12},
    offset: {x: 25, y: 25},
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.FIXED,
    health: 100,
    maxHealth: 100,
    curHealth: 100,
    speed: 30,
    walkSequence: [0,1,2,3,4,5,6,7,6,5,4,3,2,1],
    deathSound: new ig.Sound('media/crunch.mp3'),
    hitSound: new ig.Sound('media/thud.mp3'),
    attacking: false,
	init: function(x, y, settings) {
        var spawnLoc = this.safeSpawns[this.getRandom(0, this.safeSpawns.length + 2)]
        this.parent(spawnLoc[0], spawnLoc[1], settings);

        this.getRandomWalkOrder();
        this.centerOfScreen = [ig.system.realWidth/2,  ig.system.realHeight/2];

        if( !ig.global.wm ){  // what is this
            ig.game.spawnEntity(EntityHealthBar,this.pos.x+200 , this.pos.y,{ Unit: this });
        }
        this.addAnim('walk', .08, this.walkSequence)
        this.currentAnim = this.anims.walk;
	},
    check: function (other) {
        if (!other){
            if (this.health !== this.curHealth){
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y+8, {colorOffset: 1, type: 'hit'})
                this.curHealth = this.health;
                if (this.curHealth > 0){
                    this.hitSound.play();
                }
            }
        } else if (!this.timer){
            this.timer = new ig.Timer(1);
        }
        if (this.timer.delta() > 1){
            other.receiveDamage(300);
            this.timer.reset();
        }
    },
    getRandomWalkOrder: function () {
        var startLoc = this.getRandom(1, this.walkSequence.length);
        var firstHalf = this.walkSequence.slice(0, startLoc);
        var secondHalf = this.walkSequence.slice(startLoc, this.walkSequence.length);
        this.walkSequence = secondHalf.concat(firstHalf);
    },
    update: function () {
        var targetPath = this.getTargetPath()
        this.maxMovementActive = false;
        this.getPath(targetPath[0], targetPath[1], true);
        this.followPath(this.speed);

        var headingToRadian = {
            1: 5.25,
            2: 4.5,
            3: 3.75,
            4: 0,
            5: 3,
            6: .75,
            7: 1.5,
            8: 2.25,
            0: 0
        }
        this.currentAnim = this.anims.walk;
        this.currentAnim.angle = headingToRadian[this.headingDirection];
        this.parent();
    },
    getTargetPath: function (){
        return [this.centerOfScreen[0], this.centerOfScreen[1] + 60]
    },
    kill: function (){
        this.parent();
        this.deathSound.play();
        ig.game.spawnEntity(EntityDeathSplat, this.pos.x - (this.size.x/2), this.pos.y - 14)
        var randomSpawnSeed = Math.floor(Math.random()*this.safeSpawns.length)//this.getRandom(0, this.safeSpawns.length);
        ig.game.spawnEntity(EntityBadguy, this.safeSpawns[randomSpawnSeed][0], this.safeSpawns[randomSpawnSeed][1])
    },
    getRandom: function (min, max) {
        var random = Math.floor(Math.random() * ((max - 1) - (min + 1)));
        return random;
    }
});

EntityDeathSplat = ig.Entity.extend({
    lifetime: 3,
    fadetime: 1,
    animSheet: new ig.AnimationSheet('media/splatter.png', 32, 32),
    init: function (x, y, settings) {
        this.parent(x, y, settings);
        var randomSplat = this.getRandom(0, 2);
        this.addAnim('splat', 1, [randomSplat])
        this.splatTimer = new ig.Timer();
    },
    update: function () {
        if (this.splatTimer.delta() > this.lifetime){
            this.kill();
            return;
        }
        this.currentAnim.alpha = this.splatTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
        this.parent();
    },
    draw: function () {
        this.parent();
        this.zIndex = -1;
        ig.game.sortEntitiesDeferred();
    },
    getRandom: function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1)) + min;
        return random;
    }

});

});
