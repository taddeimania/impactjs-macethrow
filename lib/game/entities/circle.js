ig.module( 
	'game.entities.circle' 
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCircle = ig.Entity.extend({
    animSheet: new ig.AnimationSheet('media/circle.png', 45, 45),
    collides: ig.Entity.COLLIDES.LITE,
    type: ig.Entity.TYPE.A,
    checkAgainst: ig.Entity.TYPE.B,
    size: {x: 45, y: 45},
    clicked: undefined,
    rightClickCount: 0,
    bounciness: .4,
    decay: true,
	init: function(x, y, settings) {
        this.maxVel.x = 2000;
        this.maxVel.y = 2000;
        this.addAnim('idle', 1, [0])
        this.addAnim('yellow', 1, [1])
        this.addAnim('red', 1, [2])
        this.zIndex = 10;
        this.parent(x, y, settings);
	},
    update: function () {
        if (this.clickOnMe()){
            this.clicked = true;
        }

        this.parent();
    },
    check: function (other) {
        var force = (Math.abs(this.vel.x.round()) + Math.abs(this.vel.y.round())) * .75;
        if (force > 300){
            other.receiveDamage(force);
        }
    },
    draw: function () {

        if (this.clicked){
            this.setVelocity();
        }
        if (this.decay){
            if (this.vel.x > 0){
                this.accel.x -= 200;
            } else if (this.vel.x < 0){
                this.accel.x += 200;
            }
            if (this.vel.y > 0){
                this.accel.y -= 200;
            } else if (this.vel.y < 0){
                this.accel.y += 200;
            }
        }
        if (this.clicked){
            var centerOfCircle = [this.pos.x+((this.size.x)/2), this.pos.y+((this.size.y)/2)];
            var centerOfMouse = [ig.input.mouse.x,  ig.input.mouse.y];
            var angle = Math.atan2(centerOfMouse[1]-this.pos.y, centerOfMouse[0]-this.pos.x);
            ig.system.context.strokeStyle = "grey";
            ig.system.context.beginPath();
            ig.system.context.moveTo(centerOfCircle[0], centerOfCircle[1]);
            ig.system.context.lineTo(centerOfMouse[0], centerOfMouse[1]);
            ig.system.context.closePath();
            ig.system.context.stroke();
        }
        if (this.dink){
            this.dink = false;
        }

        var force = Math.abs(this.vel.x).round() + Math.abs(this.vel.y).round()
        
        if (force < 400){
            this.currentAnim = this.anims.idle;
        } else if (force >= 400 && force < 800){
            this.currentAnim = this.anims.yellow;
        } else if (force >= 800){
            this.currentAnim = this.anims.red;
        }
        this.currentAnim.angle = angle;
        this.parent();
    },
    setVelocity: function () {
        if (this.clicked){
            var difX = ((ig.input.mouse.x - (this.size.x / 2)) - this.pos.x).round();
            var difY = ((ig.input.mouse.y - (this.size.y / 2)) - this.pos.y).round();

            if (difX > 0){
                this.accel.x = -difX * -5;
            } else if (difX < 0){
                this.accel.x = difX * 5;
            } else {
                this.accel.x = 0;
            }

            if (difY > 0){
                this.accel.y = -difY * -5;
            } else if (difY < 0){
                this.accel.y = difY * 5;
            } else {
                this.accel.y = 0;
            }

        }

    },
    clickOnMe: function () {
        this.clickCount++;
        return ig.input.pressed('click')
            && (ig.input.mouse.y > this.pos.y
            && ig.input.mouse.y < this.pos.y + this.size.y)
            && (ig.input.mouse.x > this.pos.x
            && ig.input.mouse.x < this.pos.x + this.size.x);
    },
    handleMovementTrace: function(res){


        this.parent(res);
    }


});

});
