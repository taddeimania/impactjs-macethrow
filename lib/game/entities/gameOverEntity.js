ig.module(
    'game.entities.gameOverEntity'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityGameOverEntity = ig.Entity.extend({
    size: {x:288, y:255},
    dither: new ig.Image('media/dither.png'),
    animSheet: new ig.AnimationSheet('media/gameOverScreen.png', 288, 255),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.currentAnim = this.anims.idle;
        this.dither.draw(0,0);
    },
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            GLOBAL_STATE.score = 0;
            GLOBAL_STATE.dragging = false;
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
