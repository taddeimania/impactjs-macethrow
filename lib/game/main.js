ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.level1',
    'plugins.preloader',
    'plugins.astar-for-entities'

)
.defines(function(){

GLOBAL_STATE = {
    dragging: false,
    hasPowerup: false
}

MyGame = ig.Game.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
    topBorder: new ig.Image('media/topborder.png', 1024, 20),	
	init: function() {
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.MOUSE2, 'rightClick');
        ig.input.bind(ig.KEY.SPACE, 'space');
        this.loadLevel(LevelLevel1)
        // ig.music.add('media/dont_stop_me_now.mp3');
        // ig.music.volume = .5;
        // ig.music.play();
	},
	
	update: function() {
		this.parent();
		
	},
	
	draw: function() {
		this.parent();
        this.topBorder.draw(0, 120);
        this.font.draw('To activate your weapon. Click on it.', 200, 20, ig.Font.ALIGN.LEFT);
        this.font.draw('The pink dot is a power up.  Click on it to pick it up after you have begun dragging your sphere..  Space bar to activate it.', 200, 30, ig.Font.ALIGN.LEFT);

        // this.logo.draw(10, 10); // is this really causing a slowdown?
	}
});
StartScreen = ig.Game.extend({
    text: new ig.Image('media/instructions.png'),
    textClick: new ig.Image('media/instructions2.png'),
    background: new ig.Image('media/bgcolor.png', 1000, 700),	
    logo: new ig.Image('media/logo.png', 1000, 700),	
    majorImage: new ig.Image('media/majorImage.png', 1000, 357),	
    init: function () {
        ig.input.bind(ig.KEY.ENTER, 'start')
        ig.input.bind(ig.KEY.MOUSE1, 'click');
    },
    update: function(){
        if (ig.input.pressed('start') || ig.input.pressed('click')){
            ig.system.setGame(MyGame);
        }
        this.parent();
    },
    draw: function () {
        this.parent();
        var x = ig.system.width/ 2,
            y = ig.system.height/ 2;
        this.background.draw(0, 0);
        this.logo.draw(60, 10); 
        this.majorImage.draw(0, ig.system.height - 357);
        this.text.draw(x, y-100);
        this.textClick.draw(x, y-65);
    }
});

ig.Sound.enabled = false;
ig.main( '#canvas', StartScreen, 60, 1024, 700,1, MyLoader );

});
