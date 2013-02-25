ig.module( 
	'game.waves'
)
.requires(
	'impact.game'
)
.defines(function(){

Wave = {
    getWave: function (simulCount, badGuyCount, delayBetween, lastWave, level){
        var self = this;
        var simulFunc = function (){
            for (var i = 0 ; i < simulCount ; i++){
                level.spawnBadGuy();
            }
        };

        level.spawnChain = new EventChain()
        .wait(delayBetween)
        .then(function () {
            simulFunc();
        })
        .repeat(badGuyCount);

        level.lastWave = lastWave;
    }
}

});
