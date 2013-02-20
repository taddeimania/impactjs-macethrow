ig.module(
    'game.entities.dismissButton'
).requires(
    'game.entities.baseButton'
).defines(function(){

EntityDismissButton = EntityBaseButton.extend({
    animSheet: new ig.AnimationSheet('media/dismissButton.png', 105, 33),
    update: function () {
        this.parent();
        if (this.clickOnMe()){
            if (ig.input.pressed('click')){
                this.getPlayer().powerUpStopFunction();
            }
        }
    }
});


});
