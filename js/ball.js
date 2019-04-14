class Ball extends Circle
{
    constructor(x,y,areaHeight)
    {
        super(x,y,
            CIRCLE_RADIUS[Math.floor(Math.random() * (CIRCLE_RADIUS.length))],
            COLORS[Math.floor(Math.random() * (COLORS.length))]);
        this.area=new Rectangle(0,0,WIDTH,areaHeight,"#525252");
    }

    draw()
    {
        this.area.draw();
        super.draw();
    }

    move(x=0,y=0)
    {
        this.x+=x;
        this.y+=y;
        if(this.x-this.radius<=0)
            this.x=this.radius;
        else if(this.x+this.radius>=WIDTH)
            this.x=WIDTH-this.radius;
    }
}

class Guide extends Circle
{
    constructor(x,radius,color)
    {
        super(x,HEIGHT-50,radius,color);
    }

    draw()
    {
        super.draw();
    }

    setPosition(x=0,y=0)
    {
        this.x=x;
    }

    calcY(sections)
    {
        let min=HEIGHT-this.radius;
        for(let i=sections.length-1;i>=0;i--)
        {
            let collide=sections[i].collide(this);
            if(collide)
                min=Math.min(min,collide);
        }
        this.y=min;
    }
}