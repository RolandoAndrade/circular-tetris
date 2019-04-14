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

    collide()
    {

    }

    add(ball)
    {
        if(ball.y>this.y&&this.y+this.height>ball.y)
        {
            this.balls.push(ball);
            return true;
        }
        return false;
    }



    draw()
    {
        this.rectangle.draw();
        ctx.font ='40px Arial, sans-serif';
        ctx.fillStyle="#A3A3A3";
        ctx.textAlign="center";
        ctx.fillText(this.text,WIDTH/2,this.y+this.height-10);
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
    }

    draw()
    {
        for(let i=0;i<this.sections.length;i++)
        {
            this.sections[i].draw();
        }
        this.ball.draw();
        this.guide.draw();
    }

    move(x,y)
    {
        this.ball.move(x,y);
        this.guide.setPosition(this.ball.x);
        this.draw();
    }

    drop()
    {

    }
}