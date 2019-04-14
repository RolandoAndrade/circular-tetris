const SECTION_HEIGHT= HEIGHT*0.15;

class Section
{
    constructor(number, y=HEIGHT, height=SECTION_HEIGHT)
    {
        this.number=number;
        this.color=GRAY_SCALE_COLORS[number];
        this.height=height;
        this.y=y-height;
        this.rectangle=new Rectangle(0,this.y,WIDTH,this.height,this.color);
        this.text="+"+this.number*100;
        this.balls=[];
    }

    collide(guide)
    {
        let leftGuide=guide.x-guide.radius;
        let rightGuide=guide.x+guide.radius;
        let min=HEIGHT-guide.radius;
        let collide=false;
        for(let i=0;i<this.balls.length;i++)
        {
            let b=this.balls[i];
            let left=b.x-b.radius;
            let right=b.x+b.radius;

            if(left<=rightGuide&&leftGuide<=right)
            {
                let y=b.y-Math.sqrt((b.radius+guide.radius)**2-(b.x-guide.x)**2);
                min=Math.min(min,y);
                collide=true;
            }
        }
        return collide?min:undefined;
    }

    add(ball)
    {
        if(ball.y>=this.y&&this.y+this.height>=ball.y)
        {
            this.balls.push(ball);
            return true;
        }
        return false;
    }

    drawText()
    {
        ctx.font ='40px Arial, sans-serif';
        ctx.fillStyle="#A3A3A3";
        ctx.textAlign="center";
        ctx.fillText(this.text,WIDTH/2,this.y+this.height-10);
    }

    drawBalls()
    {
        for(let i=0;i<this.balls.length;i++)
        {
            this.balls[i].draw();
        }
    }

    draw()
    {
        this.rectangle.draw();
        this.drawText();
    }

    isPointed()
    {
        if(this.balls.length===BALLS_TO_WIN)
        {
            let points=this.number*100;
            for(let i=0;i<this.balls.length;i++)
            {
                points+=this.balls[i].radius/0.6;
            }
            this.balls=[];
            return points;
        }
        return 0;
    }
}


class Board
{
    constructor()
    {
        this.createBoard();
        this.createBall();
    }

    createBoard()
    {
        this.sections=[];
        this.y=HEIGHT;
        let height=SECTION_HEIGHT;
        for(let i=0;i<NUMBER_OF_SECTIONS;i++)
        {
            this.sections.push(new Section(i,this.y,height));
            this.y=this.sections[i].y;
            height*=0.92;
        }
    }

    createBall()
    {
        this.ball=new Ball(WIDTH/2,this.y/2,this.y);
        this.guide=new Guide(this.ball.x,this.ball.radius,this.ball.color);
        this.guide.calcY(this.sections);
    }

    draw()
    {
        for(let i=0;i<this.sections.length;i++)
        {
            this.sections[i].draw();
        }
        for(let i=0;i<this.sections.length;i++)
        {
            this.sections[i].drawBalls();
        }
        this.ball.draw();
        this.guide.draw();
    }

    move(x,y)
    {
        this.ball.move(x,y);
        this.guide.setPosition(this.ball.x);
        this.guide.calcY(this.sections);
        this.draw();
    }

    drop()
    {
        let i=0;
        while(i<NUMBER_OF_SECTIONS&&!this.sections[i++].add(this.guide));
        this.sections[i-1].isPointed();
        this.createBall();
        this.draw();
    }
}