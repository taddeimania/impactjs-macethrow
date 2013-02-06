ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.levels.level1',
    'plugins.preloader'

)
.defines(function(){

MyGame = ig.Game.extend({
	
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
        ig.input.bind(ig.KEY.MOUSE1, 'click');
        ig.input.bind(ig.KEY.MOUSE2, 'rightClick');
        this.loadLevel(LevelLevel1)
	},
	
	update: function() {
		this.parent();
		
	},
	
	draw: function() {
		this.parent();
	}
});

ig.main( '#canvas', MyGame, 60, 800, 600,1, MyLoader );

});
