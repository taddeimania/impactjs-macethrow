ig.module( 
	'game.screens'
)
.requires(
	'impact.game',
	'impact.font'
)
.defines(function(){

PlayerDead = ig.Game.extend({});

LevelCompleted = ig.Game.extend({});

GameOver = ig.Game.extend({});

Credits = ig.Game.extend({});

StartScreen = ig.Game.extend({
    text: new ig.Image('media/instructions.png'),
    textClick: new ig.Image('media/instructions2.png'),
    majorImage: new ig.Image('media/majorImage.png', 1000, 357),	
    init: function () {
        this.setupBindings();
        this.logo = ig.game.spawnEntity('EntityLogo', -200, 10);
    },
    update: function(){
        if (ig.input.pressed('enter') || ig.input.pressed('click')){
            ig.system.setGame(Tutorial);
        }
        this.parent();
    },
    draw: function () {
        var x = ig.system.width/ 2,
            y = ig.system.height/ 2;
        this.parent();
        this.logo.tween({pos: {x: 60, y: 10}}, .2).start();
        this.majorImage.draw(0, ig.system.height - 357);
        this.text.draw(x, y-100);
        this.textClick.draw(x, y-65);
    },
    setupBindings: function () {
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.MOUSE2, 'rightclick');
        ig.input.bind(ig.KEY.SPACE, 'space');
        ig.input.bind(ig.KEY.ENTER, 'enter');
    }
});

});
