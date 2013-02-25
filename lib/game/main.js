ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
    'game.hud',
    'game.levels.level1',
    'plugins.preloader',
    'plugins.astar-for-entities',
    'plugins.tween',
    'game.entities.logo',
    'game.entities.badguy',
    'game.entities.circle',
    'game.entities.base',
    'game.baseLevel',
    'game.entities.waveOver',
    'game.waves'

)
.defines(function(){

GLOBAL_STATE = {
    dragging: false,
    hasPowerup: false
};

LastWave = {
    totalMobs: 1,
    chain: function(game) {
        Wave.getWave(1, 1, 2, true, game);
    },
    next: function () {}
};
SecondWave = {
    totalMobs: 1,
    chain: function(game) {
        Wave.getWave(1, 1, 2, false, game);
    },
    next: LastWave
};

FirstWave = {
    totalMobs: 20,
    chain: function(game) {
        Wave.getWave(2, 10, 2, false, game);
    },
    next: SecondWave
};
Tutorial = BaseLevel.extend({
    safeSpawns: [[385,177],[601,177],[797,377],[601,609],[385,609],[177,377]],
	init: function() {
        this.parent(FirstWave, LevelLevel1);
    },
});

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

ig.Sound.enabled = false;
ig.main( '#canvas', StartScreen, 60, 1024, 700,1, MyLoader );

});
