ig.module(
    'game.entities.gameOver'
)
.requires(
    'impact.entity',
    'plugins.tween'
)
.defines(function(){
EntityGameOver = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/gameOver.png', 344, 35),	
    init: function(x, y, settings) {
        this.addAnim('idle', 1, [0]);
        this.parent(x, y, settings);
        this.timer = new ig.Timer();
        GLOBAL_STATE.gameOver = true;
    },
    draw: function () {
        if (this.timer.delta() < 2){
            this.tween({pos: {x: 340, y: 335}}, .2).start();
        }
        if (this.timer.delta() > 5){
            this.kill();
            // ig.game.gameTearDown(StartScreen);
            GLOBAL_STATE.dragging = false;
            ig.game.spawnEntity('EntityGameOverEntity', 368, 223);
        }
        this.parent();
    }
});
});
