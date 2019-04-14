
var opciones=[15,20,30,40,60,80];
var colores=["rgba(230,90,60,0.8)","rgba(230,220,60,0.8)","rgba(70,230,60,0.8)","rgba(60,230,190,0.8)","rgba(60,90,230,0.8)","rgba(190,60,230,0.8)"];
var seccol=["#343434","#4C4C4C","#575757","#6C6C6C","#7A7A7A","#878585","#9D9C9C"];
var sec=new Array(7);
tabla(sec);
var x=200;
var p=new Object();
var puntos=0;
function tabla(sec)
{
	for(var i=0;i<7;i++)
		sec[i]=new Array();
}
document.onkeydown = function (e)
{//detecta si una tecla fue presionada
	//console.log(e.keyCode);//detecta el codigo de la tecla y lo muestra en consola
	if ((e.keyCode==40)) 
	{
		soltar();
	};
	if ((e.keyCode==37||e.keyCode==65)) 
		if(p['x']-p['r']>0)
			p['x']--;
	if ((e.keyCode==39||e.keyCode==68)) 
		if(p['x']+p['r']<400)
			p['x']++;
}
function ordenar(t)
{
	for(var i=0;i<t.length-1;i++)
		for(var j=i+1;j<t.length;j++)
			if(t[i]['y']+t[i]['r']>t[j]['y']+t[j]['r'])
			{
				var aux=t[i];
				t[i]=t[j];
				t[j]=aux;
			}
}
function eliminar()
{
	secciones();
	for(var i=0;i<sec.length;i++)
		for(var j=0;j<sec[i].length;j++)
			circulo(sec[i][j]);
	
}
function colision()
{
	var col=false;
	var t=new Object();
	var min=1000;
	t['c']=p['c'];
	for(var i=sec.length-1;i>=0;i--)
		for(var j=0;j<sec[i].length;j++)
		{
			var px=sec[i][j]['x'];
			var py=sec[i][j]['y'];
			var r=sec[i][j]['r'];

			if(px+r>=p['x']-p['r']&&px-r<=p['x']+p['r'])
			{
				p['y']=py-Math.sqrt(((r+p['r'])**2)-((p['x']-px)**2));
				if(p['y']<min)
					min=p['y'];
				col=true;
			}
		}
	
	if(!col)
	{
		p['y']=1000-p['r'];
		t['x']=p['x'];
		t['r']=p['r'];
		t['y']=p['y'];
		sec[0].push(t);
		circulo(t);
		objeto();
		ordenar(sec[0]);
	}
	else
	{
		t['x']=p['x'];
		t['r']=p['r'];
		if(min<1000-t['r'])
			t['y']=min;
		else
			t['y']=1000-t['r'];
		sec[Math.trunc((1000-t['y'])/120)].push(t);
		circulo(t);
		objeto();
		ordenar(sec[i+1]);			
	}
	/*console.log(sec);
	console.log(col);
	console.log(t['y']);*/
}
function puntaje()
{ 	
	for(var i=0;i<sec.length;i++)
		if(sec[i].length==4)
		{
			while(sec[i].length>0)
			{
				puntos+=sec[i][0]['r'];
				sec[i].shift();
			}
			puntos+=i*100;
			eliminar();
		}
			

}
function soltar()
{
	colision();
	puntaje();
}
function seccion(y)
{
	ctx.fillStyle=seccol[y];
	ctx.fillRect(0,1000-120*(y+1),400,120);
	ctx.font ='50px Arial, sans-serif';
	ctx.fillStyle="#A3A3A3";
	ctx.textAlign="center"; 
	ctx.fillText("+"+y*100,200,1100-120*(y+1));
}
function objeto()
{
	p['x']=x;
	p['y']=100;
	p['r']=opciones[Math.floor(Math.random() * 6)];
	p['c']=colores[Math.floor(Math.random() * 6)];
}
function circulo(p)
{
	ctx.beginPath();
	ctx.arc(p['x'],p['y'],p['r'],0,2*Math.PI,false);
	ctx.fillStyle=p['c'];
	ctx.fill();
	ctx.closePath();
	ctx.beginPath();
	ctx.arc(p['x'],p['y'],2.5,0,2*Math.PI,false);
	ctx.fillStyle="#161616";
	ctx.fill();
	ctx.closePath();
	
	//console.log(p['x'],p['y'])	
}
function secciones()
{
	for(var i=0;i<7;i++)
		seccion(i);

}
secciones();
function fondo()
{

	ctx.fillStyle="#5B5B5B";
	ctx.fillRect(0,0,400,200);	
	ctx.font ='200px Arial, sans-serif';
	ctx.fillStyle="#7E7E7E";
	ctx.textAlign="center"; 
	ctx.fillText(puntos,200,170);
	ctx.font ='20px Arial, sans-serif';
	ctx.fillText(p['x'],20,20);
	ctx.fillText(p['r'],380,20);
	ctx.font ='15px Arial, sans-serif';
	ctx.fillText("Rolando Andrade",200,195);

}
function guia()
{
	var col=false;
	var t=new Object();
	var min=1000;
	t['c']=p['c'];
	t[t['c'].indexOf('8')]='3';
	for(var i=sec.length-1;i>=0;i--)
		for(var j=0;j<sec[i].length;j++)
		{
			var px=sec[i][j]['x'];
			var py=sec[i][j]['y'];
			var r=sec[i][j]['r'];

			if(px+r>=p['x']-p['r']&&px-r<=p['x']+p['r'])
			{
				t['y']=py-Math.sqrt(((r+p['r'])**2)-((p['x']-px)**2));
				if(t['y']<min)
					min=t['y'];
				col=true;
			}
		}
	
	if(!col)
	{
		t['y']=1000-p['r'];
		t['x']=p['x'];
		t['r']=p['r'];
		circulo(t);
	}
	else
	{
		t['x']=p['x'];
		t['r']=p['r'];
		if(min<1000-t['r'])
			t['y']=min;
		else
			t['y']=1000-t['r'];
		circulo(t);	
	}
}
objeto();
function loop () 
{
	eliminar();
	fondo();
	circulo(p);
	guia();
}
window.setInterval(loop, 30)