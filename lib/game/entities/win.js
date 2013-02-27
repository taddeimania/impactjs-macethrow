ig.module(
    'game.entities.win'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityWin = ig.Entity.extend({
    size: {x:270, y:255},
    dither: new ig.Image('media/dither.png'),
    animSheet: new ig.AnimationSheet('media/thanks.png', 270, 255),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.currentAnim = this.anims.idle;
        this.dither.draw(0,0);
    },
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            ig.game.gameTearDown(StartScreen);
        }
    },
    draw: function () {
        this.dither.draw(0,0);
        this.parent();
    },
    clickOnMe: function () {
        return ig.input.released('click')
            && (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },
});
});
