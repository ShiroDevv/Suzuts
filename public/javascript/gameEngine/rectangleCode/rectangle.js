//? making it easy to create an array of rectangles
class Rectangle {
    constructor(x, y, width, height, color, collisionEnabled, rigidBody = false) {
        //? Setting up variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.originalColor = color;
        this.color = color;
        this.collisionEnabled = collisionEnabled;
        this.colliding = false;
        this.rigidBody = rigidBody;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.bottomColliding = false;
        this.leftColliding = false;
        this.rightColliding = false;
        this.topColliding = false;
        this.colChecked = false;
    }

    draw(ctx) {
        //? Drawing the rect
        this.#gravity();
        this.move();
        this.colChecked = false;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

    }

    move() {
        if(this.rigidBody) {
            this.x += this.xVelocity;
            this.y += this.yVelocity;

            if(this.xVelocity > 0) this.xVelocity -= .1;
            if(this.xVelocity < 0) this.xVelocity += .1;

            if(this.xVelocity <= .1 && this.xVelocity >= -.1) this.xVelocity = 0;
            if(this.xVelocity > .2 && this.xVelocity < -.2) this.xVelocity = 0;

            if(this.xVelocity > 20) {
                this.xVelocity = 20;
            }

            if(this.xVelocity < -20) {
                this.xVelocity = -20;
            }

            this.onGround();

            if(this.bottomColliding && this.yVelocity > 0) this.yVelocity = 0;
            if(this.leftColliding && this.xVelocity < 0) this.xVelocity = 0;
            if(this.rightColliding && this.xVelocity > 0) this.xVelocity = 0;
            if(this.topColliding && this.yVelocity < 0) this.yVelocity = 0;

            if(this.yVelocity < -20) this.yVelocity = -20;
        } else return null;
    }

    #gravity() {
        if(this.bottomColliding == false) {
            this.yVelocity += 1;
        }
    }

    updatePos(x, y) {
        this.x = x;
        this.y = y;
    }

    onGround() {
        if(this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.yVelocity = 0;

            this.bottomColliding = true;
        }
    }
}