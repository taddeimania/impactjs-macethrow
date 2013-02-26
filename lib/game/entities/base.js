ig.module(
    'game.entities.base'
)
.requires(
    'impact.entity'
)
.defines(function(){
EntityBase = ig.Entity.extend({
    size: {x:72, y:72},
    offset: {x:1, y:1},
    health: 10000,
    curHealth: 10000,
    maxHealth: 10000,
    type: ig.Entity.TYPE.B,
    checkAgainst: ig.Entity.TYPE.A,
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet( 'media/base.png', 72, 72),
    init: function(x, y, settings) {
        this.addAnim('ten', 1, [0]);
        this.addAnim('eight', 1, [1]);
        this.addAnim('six', 1, [2]);
        this.addAnim('four', 1, [3]);
        this.addAnim('two', 1, [4]);

        this.parent(x, y, settings);
    },
    check: function (other) {
    },
    draw: function (){
        this.parent();
        if (this.health === this.maxHealth){
            this.currentAnim = this.anims.ten;
        } else if (this.health > 8000 && this.health < 9000){
            this.currentAnim = this.anims.eight;
        } else if (this.health > 6000 && this.health < 8000){
            this.currentAnim = this.anims.six;
        } else if (this.health > 4000 && this.health < 6000){
            this.currentAnim = this.anims.four;
        } else if (this.health > 2000 && this.health < 4000) {
            this.currentAnim = this.anims.two;
        }
        this.zIndex = -10;
    },
    kill: function () {
        this.parent();
        ig.game.spawnEntity('EntityGameOver', 340, -30);
        // GAME OVER DUDE!!!!
        // change screen to game over screen - start over from beginning?
    }
});
});
