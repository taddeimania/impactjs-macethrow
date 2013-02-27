ig.module( 
	'game.entities.circle' 
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCircle = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/circle.png', 45, 45),
    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.A,
    size: {x: 45, y: 45},
    clicked: undefined,
    rightClickCount: 0,
    bounciness: .4,
    tightness: 7,
    powerUpStartFunction: function () {},
    powerUpStopFunction: function () {},
    font: new ig.Font( 'media/04b03.font.png' ),
	init: function(x, y, settings) {
        this.powerModifier = 1;
        this.currentPowerup = "";
        this.maxVel.x = 2000;
        this.maxVel.y = 2000;
        this.addAnim('idle', 1, [0])
        this.addAnim('yellow', 1, [1])
        this.addAnim('red', 1, [2])
        this.parent(x, y, settings);
	},
    attach: function (start, finish){
        this.powerUpStartFunction = start;
        this.powerUpStopFunction = finish;
    },
    check: function (other) {
        var force = ((Math.abs(this.vel.x.round()) + Math.abs(this.vel.y.round())) * .55) / 10;
        var damage = force * this.powerModifier;
        if (damage > 20 && !GLOBAL_STATE.gameOver){
            if (this.powerModifier < 2.5){
                GLOBAL_STATE.score += 10;
                this.powerModifier += .1;
            }
            other.receiveDamage(damage);
        }
    },
    update: function () {
        if (this.clickOnMe()){
            this.clicked = true;
            GLOBAL_STATE.dragging = true;
        }

        if (ig.input.pressed('click') && !this.powerupActive){
            this.powerUpStartFunction();
        }

        if ((this.powerupActive
            && (this.powerUpTimer.delta() > this.timeOut))
            || ig.input.pressed('rightclick')){
            this.powerUpStopFunction();
        }

        if (GLOBAL_STATE.dragging){
            this.setVelocity();
        }

        this.parent();
    },
    draw: function () {
        if (GLOBAL_STATE.dragging){
            if (!this.mouseOverHud()) {
                var centerOfCircle = [this.pos.x+((this.size.x)/2), this.pos.y+((this.size.y)/2)];
                var centerOfMouse = [ig.input.mouse.x,  this.getMouseY()];
                var angle = Math.atan2(centerOfMouse[1]-this.pos.y, centerOfMouse[0]-this.pos.x);
                ig.system.context.strokeStyle = "grey";
                ig.system.context.beginPath();
                ig.system.context.moveTo(centerOfCircle[0], centerOfCircle[1]);
                ig.system.context.lineTo(centerOfMouse[0], centerOfMouse[1]);
                ig.system.context.closePath();
                ig.system.context.stroke();
                this.currentAnim.angle = angle;
            }
        } else {
            this.font.draw('Click Me to begin!', this.pos.x + 22, this.pos.y-10, ig.Font.ALIGN.CENTER)
        }
        var force = Math.abs(this.vel.x).round() + Math.abs(this.vel.y).round()
        if (force < 400){
            this.currentAnim = this.anims.idle;
        } else if (force >= 400 && force < 800){
            this.currentAnim = this.anims.yellow;
        } else if (force >= 800){
            this.currentAnim = this.anims.red;
        }
        this.parent();
    },
    setVelocity: function () {
        if (!this.mouseOverHud()){
            var difX = ((ig.input.mouse.x - (this.size.x / 2)) - this.pos.x).round();
            var difY = ((this.getMouseY() - (this.size.y / 2)) - this.pos.y).round();

            if (difX > 0){
                this.accel.x = -difX * -this.tightness;
            } else if (difX < 0){
                this.accel.x = difX * this.tightness;
            } else {
                this.accel.x = 0;
            }

            if (difY > 0){
                this.accel.y = -difY * -this.tightness;
            } else if (difY < 0){
                this.accel.y = difY * this.tightness;
            } else {
                this.accel.y = 0;
            }
            this.setDecay(difX, difY);
        }
    },
    setDecay: function (difX, difY) {
        var decayRate = Math.sqrt(difX * difX + difY * difY);
        if (this.vel.x > 0){
            this.accel.x -= decayRate;
        } else if (this.vel.x < 0){
            this.accel.x += decayRate;
        }

        if (this.vel.y > 0){
            this.accel.y -= decayRate;
        } else if (this.vel.y < 0){
            this.accel.y += decayRate;
        }

    },
    clickOnMe: function () {
        return ig.input.pressed('click')
            && (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },
    handleMovementTrace: function(res){
        if ((res.collision.x || res.collision.y) && !this.powerupActive){
            this.powerModifier = 1;
        }
        this.parent(res);
    },
    getMouseY: function () {
        if (ig.input.mouse.y < 140){
            return 140;
        }
        return ig.input.mouse.y;
    },
    mouseOverHud: function () {
        return this.getMouseY() === 140 && ig.input.mouse.x > 750;
    }


});

});
