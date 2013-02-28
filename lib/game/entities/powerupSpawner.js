ig.module(
    'game.entities.powerupSpawner'
)
.requires(
    'impact.entity',
    'game.entities.stun',
    'game.entities.bomb',
    'game.entities.speed',
    'game.entities.power'
)
.defines(function(){
EntityPowerupSpawner = ig.Entity.extend({
    size: {x:20, y:20},
    minX: 404,
    maxX: 600,
    minY: 260,
    maxY: 536,
    powerups: ['EntityBomb', 'EntityPower', 'EntityStun', 'EntitySpeed'],
    init: function(x, y, settings) {
        this.parent(x, y, settings);
        var self = this;
        this.chain = new EventChain()
        .wait(10)
        .then(function() {
            self.spawnPowerup();
        })
        .repeat()
    },
    update: function () {
        this.chain()
    },
    spawnPowerup: function () {
        if (!this.otherPowerups()){
            this.spawnRandomPowerup();
        }
    },
    otherPowerups: function () {
        var powerups = ig.game.entities;
        for (var i = 0 ; i < powerups.length ; i++){
            if (powerups[i].powerUp){
                return true;
            }
        }
    },
    spawnRandomPowerup: function () {
        var randomPowerup = this.powerups[this.getRandom(0, 3)]
        var randomLocation = [this.getRandom(this.minX, this.maxX), this.getRandom(this.minY, this.maxY)]
        ig.game.spawnEntity(randomPowerup, randomLocation[0], randomLocation[1])
    },
    getRandom: function (min, max) {
        var random = Math.floor(Math.random() * (max - min + 1))+ min;
        return random;
    }

});
});
