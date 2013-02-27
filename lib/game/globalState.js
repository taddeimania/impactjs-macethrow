ig.module( 
	'game.globalState'
)
.requires(
	'impact.game'
)
.defines(function(){
GLOBAL_STATE = {
    dragging: false,
    hasPowerup: false,
    score: 0,
    gameOver: false,
}
});
