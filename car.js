class Car{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=3;
        this.friction=0.05;
        this.angle=0;

        this.controls=new Controls();

        this.sensor=new Sensor(this);
    }

    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        
        const flip=(this.speed<0)?-1:1;
        
        if(this.controls.left){
            this.angle+=0.03*flip;
            if(!this.controls.forward && !this.controls.reverse){
                this.speed=1;
            }
        }
        if(this.controls.right){
            this.angle-=0.03*flip;
            if(!this.controls.forward && !this.controls.reverse){
                this.speed=1;
            }
        }

        if(Math.abs(this.speed)>this.maxSpeed){
            this.speed=this.maxSpeed * this.speed / Math.abs(this.speed);
        }

        if(Math.abs(this.speed)>0){
            this.speed-= this.friction*flip;
        }

        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.w/2,
            -this.h/2,
            this.w,
            this.h,
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx);
    }
}