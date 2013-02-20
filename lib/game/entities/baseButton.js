ig.module(
    'game.entities.baseButton'
).requires(
    'impact.entity'
).defines(function(){

EntityBaseButton = ig.Entity.extend({
    size: {x: 105,y: 33},
    clickOnMe: function () {
        return (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },
    init: function (x, y, settings) {
        this.addAnim('active', 1, [0]);
        this.addAnim('clicked', 1, [1]);
        this.addAnim('inactive', 1, [2]);
        this.currentAnim = this.anims.inactive;
        this.parent(x, y, settings);
    },
    draw: function () {
        if (!this.player){
            this.player = ig.game.getEntitiesByType('EntityCircle')[0];
        }
        if (this.player.currentPowerup && !this.clickOnMe()){
            this.currentAnim = this.anims.active;
        } else if (this.player.currentPowerup && this.clickOnMe()){
            if (ig.input.pressed('click')){
                this.currentAnim = this.anims.clicked;
            } else if (ig.input.released('click')){
                this.currentAnim = this.anims.active;
            }
        }
        if (!this.player.currentPowerup){
            this.currentAnim = this.anims.inactive;
        }


        this.parent();
    },
    getPlayer: function () {
        return ig.game.getEntitiesByType('EntityCircle')[0];
    }
});


});
