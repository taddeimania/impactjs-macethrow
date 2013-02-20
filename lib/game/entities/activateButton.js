ig.module(
    'game.entities.activateButton'
).requires(
    'game.entities.baseButton'
).defines(function(){

EntityActivateButton = EntityBaseButton.extend({
    animSheet: new ig.AnimationSheet('media/activateButton.png', 105, 33),
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            if (ig.input.pressed('click')){
                this.getPlayer().powerUpStartFunction();
            }
        }
    }
});


});
