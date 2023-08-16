﻿var mapWidth = 800;
var mapHeight = 800;
var canvas = null;
var context = null;
var mouseX = 0;
var mouseY = 0;
var mouseOldX = 0;
var mouseOldY = 0;
var mauseLeftPress = false;
var numSelectKvadr = null;
var together = false;
var grabKvadrMouse = false;
var colors = ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'];
var colors2 = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
var interface = null;
function Kvadr(x,y, numColor)  {
    this.x = x;
    this.y = y;
    this.width= 80;
    this.height = 80;
    this.addX = null;
    this.addY = null;
    this.rect = false;
    this.numColor = numColor; 
}
function Interface() {
    this.x = 550;
    this.y = 50;
    this.width = 200;
    this.height = 100;
    this.button = {
        width: 130,
        height: 30,
        x: 35,//this.x + this.width/2 - this.button.width / 2,
        y: 60,
        text: 'Разъединить',
        textSize: 17,


    }
    this.colorButton = {
        x:null,
        y:32,
        color:null,
        radius: 20,
    }
    this.colorButtonArr = [];
    this.init=function()
    {
        for (let i = 0; i < 3;i++)
        {
            colorBut = clone(this.colorButton);
            colorBut.x = this.x + i * 50+50;
            colorBut.y= this.y+colorBut.y;
            colorBut.color = colors2[i];
            this.colorButtonArr.push(colorBut);
        }
        this.button.x = this.x + this.button.x;
        this.button.y = this.y + this.button.y;
    }
    this.draw=function()
    {
        context.fillStyle = 'rgba(255,255,255,0.4)';
        context.fillRect(this.x,this.y,this.width,this.height);
        for (let i = 0; i < this.colorButtonArr.length;i++)
        {
            context.beginPath();
            context.fillStyle = this.colorButtonArr[i].color;
            context.arc(this.colorButtonArr[i].x, this.colorButtonArr[i].y, 
                        this.colorButtonArr[i].radius, 0, 2 * Math.PI);
            context.fill();
            context.stroke();
        }
        drawButton(this.button);
    }
    this.update=function()
    {

    }
    
    
}
var kvadrArr = [];
function create()
{
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.setAttribute('width',mapWidth);
    canvas.setAttribute('height',mapHeight);
    kvadrArr[0] = new Kvadr(100,100,0);
    kvadrArr[1] = new Kvadr(500,100,1);
    interface = new Interface();
    interface.init();

}
window.addEventListener('load', function () {
    create();

    setInterval(function () {
        drawAll();
        update();
    }, 6);
});
function drawAll() 
{
    context.fillStyle='rgb(220,220,220)';
    context.fillRect(0,0,mapWidth,mapHeight);// очистка экрана
    for (let i = 0; i < kvadrArr.length;i++)
    {
        kvadr = kvadrArr[i];
        context.fillStyle = colors[kvadr.numColor];

        context.fillRect(kvadr.x, kvadr.y, kvadr.width, kvadr.height);
        if (numSelectKvadr==i)
        {    
            context.save();
            context.lineWidth = 3;
            context.setLineDash([4, 4]); 
            context.strokeStyle = colors2[kvadr.numColor];
            context.lineDashOffset = 2;//-offset;
            context.strokeRect(kvadr.x, kvadr.y, kvadr.width, kvadr.height);
            context.restore();
        }
        interface.draw();
    }
}
function drawButton (obj)
{
    context.strokeStyle = obj.color;
    context.strokeRect(obj.x, obj.y, obj.width, obj.height);
    let str= obj.text;
    context.font =  obj.textSize+'px Arial';
    let widthText = context.measureText(str).width;
    context.fillStyle = obj.textColor;
    context.fillText(str,obj.x+ obj.width / 2 - widthText / 2, obj.y+obj.textSize*1.2);
}
function update()
{
    function calcKvadr(num)
    {
        let oldX = kvadrArr[0].x;
        let oldY = kvadrArr[0].y;
        if (num==1)
        {
            kvadrArr[0].x = kvadrArr[1].x + kvadrArr[0].addX;  
            kvadrArr[0].y = kvadrArr[1].y + kvadrArr[0].addY;
        }
        if (num==0)
        {
            kvadrArr[1].x = kvadrArr[0].x + kvadrArr[1].addX;  
            kvadrArr[1].y = kvadrArr[0].y + kvadrArr[1].addY;
          //  kvadrArr[1].x = oldX + kvadrArr[1].addX;  
            //kvadrArr[1].y = oldY + kvadrArr[1].addY;
        }
        console.log("hello"+ num);
    }
    function calcCollision (i)
    {                    
        if (kvadrArr[i].x<0 || mouseX<0 )
        {
            kvadrArr[i].x = 0;
            calcKvadr(i);

        }
         if (kvadrArr[i].x+kvadrArr[i].width>mapWidth || mouseX > mapWidth)
        {
            kvadrArr[i].x = mapWidth-kvadrArr[i].width;
             calcKvadr(i);

        }
          if (kvadrArr[i].y<0  ||  mouseY<0)
        {
            kvadrArr[i].y = 0;
            calcKvadr(i);

        }
         if (kvadrArr[i].y+kvadrArr[i].height>mapHeight || mouseY>mapHeight)
        {
            kvadrArr[i].y = mapHeight-kvadrArr[i].height;
            calcKvadr(i);

        }    
        console.log(kvadrArr);
    }
    if (numSelectKvadr!=null && grabKvadrMouse==true)
    {
        let numK = numSelectKvadr;
        if (mouseLeftPress==true)
        {
            let dx = mouseX - mouseOldX;
            let dy = mouseY - mouseOldY;
            let flag = false;
            if (together==false)
            {

            
                kvadrArr[numK].x += dx;
                kvadrArr[numK].y += dy;
                if (kvadrArr[numK].x<0 || kvadrArr[numK].x+kvadrArr[numK].width>mapWidth ||
                    kvadrArr[numK].y<0 || kvadrArr[numK].y+kvadrArr[numK].height>mapHeight)
                {
                    kvadrArr[numK].x -= dx;
                    kvadrArr[numK].y -= dy;
                }
            }
            else  
            {
                let flag = false;
                let num = null;
                console.log("begin");
                for (let i = 0; i < kvadrArr.length;i++)
                {
                    let value = 60;
                    if (dx > value) dx = value;
                    if (dx < -value) dx = -value;
                    if (dy > value) dy = value;
                    if (dy < -value) dy = -value;
                  //  console.log('dx: ' + dx +' dy: '+dy)
                    if ((mouseX<0 || mouseX>mapWidth || mouseY<0 || mouseY>mapHeight)==false)
                    {

                    
                        kvadrArr[i].x += dx;
                        kvadrArr[i].y += dy;
                    }
                }
                for (let i = 0; i < kvadrArr.length;i++)
                {
                    kvadrArr[i].rect = false;
            
                        if (kvadrArr[i].x<0 || kvadrArr[i].x+kvadrArr[i].width>mapWidth ||
                            kvadrArr[i].y<0 || kvadrArr[i].y+kvadrArr[i].height>mapHeight)
                        {
                            flag = true;
                            num = i;
                            kvadrArr[i].rect = true;                        
                            calcCollision(num);                            
                            console.log('rect: '+i )
                            //break;
                        }
                }
                //if (flag==true)
                //{

                //    if (mouseX<0 || mouseX>mapWidth || mouseY<0 || mouseY>mapHeight)
                //    {
                //          //  break;;
                //           numSelectKvadr = null; 
                //    }
                //}                  
            }

            if (together==false)
            {
                let dist = 15;
                for (let i = 0; i < kvadrArr.length;i++)
                {
                    if (i!=numSelectKvadr)
                    {
                        if (kvadrArr[i].x+kvadrArr[i].width>=kvadrArr[numK].x &&
                            kvadrArr[i].x<kvadrArr[numK].x+kvadrArr[numK].width)
                        {
                            if (kvadrArr[i].y+kvadrArr[i].height<kvadrArr[numK].y+dist && 
                                kvadrArr[i].y+kvadrArr[i].height>kvadrArr[numK].y-dist)
                            {
                                kvadrArr[i].y = kvadrArr[numK].y - kvadrArr[numK].height;
                                together = true;
                            }
                            else if (kvadrArr[i].y-kvadrArr[numK].y<kvadrArr[numK].height+dist &&
                                kvadrArr[i].y-kvadrArr[numK].y>kvadrArr[numK].height-dist)
                            {
                                kvadrArr[i].y = kvadrArr[numK].y+kvadrArr[numK].height;
                                together = true;
                            }
                            console.log(1);
                        }
                        else if (kvadrArr[i].y+kvadrArr[i].height>=kvadrArr[numK].y &&
                            kvadrArr[i].y<kvadrArr[numK].y+kvadrArr[numK].height)
                        {
                            if (kvadrArr[i].x+kvadrArr[i].width<kvadrArr[numK].x+dist && 
                                kvadrArr[i].x+kvadrArr[i].width>kvadrArr[numK].x-dist)
                            {
                                kvadrArr[i].x = kvadrArr[numK].x - kvadrArr[numK].width;
                                together = true;
                            }
                            else if (kvadrArr[i].x-kvadrArr[numK].x<kvadrArr[numK].width+dist &&
                                kvadrArr[i].x-kvadrArr[numK].x>kvadrArr[numK].width-dist)
                            {
                                kvadrArr[i].x = kvadrArr[numK].x+kvadrArr[numK].width;
                                together = true;
                            }
                            console.log(1);
                        }

                    }
                }
                if (together==true)
                {
                    kvadrArr[0].addX = kvadrArr[0].x - kvadrArr[1].x;
                    kvadrArr[0].addY = kvadrArr[0].y - kvadrArr[1].y;
                    kvadrArr[1].addX = kvadrArr[1].x - kvadrArr[0].x;
                    kvadrArr[1].addY = kvadrArr[1].y - kvadrArr[0].y;
                   
                }
            }
            if (together==false)
            {    
                if (mouseX<0)
                {
                    kvadrArr[numK].x = 0;
                    //   numSelectKvadr = null;
                }
                if (mouseX>mapWidth)
                {
                    kvadrArr[numK].x = mapWidth-kvadrArr[numK].width;
                    // numSelectKvadr = null;
                }
                if (mouseY<0)
                {
                    kvadrArr[numK].y = 0;
                    // numSelectKvadr = null;
                }
                if (mouseY>mapHeight)
                {
                    kvadrArr[numK].y = mapHeight-kvadrArr[numK].height;
                    //// numSelectKvadr = null;
                }  
                if (mouseX<0 || mouseX>mapWidth || mouseY<0 || mouseY>mapHeight)
                {
                  //  numSelectKvadr = null;
                }
            }

            

        }  

    }  
    mouseOldX = mouseX;
    mouseOldY = mouseY;
}
window.addEventListener('mousedown', function () {
    if (event.which == 1) mouseLeftPress = true;
    for (let i = 0; i < kvadrArr.length;i++)
    {
        if (checkInObj(kvadrArr[i],mouseX,mouseY)==true)  
        {
            numSelectKvadr = i;
            grabKvadrMouse = true;
            break;
        }

           
    }

});
window.addEventListener('mouseup', function () {
    if (event.which==1)
    {
        grabKvadrMouse = false;
        mouseLeftPress=false;
        //mouseClick=true;
        //setTimeout(function () {
        //    if (mouseClick == true) mouseClick = false;
        //}, 100);
    } 
});
document.addEventListener('mousemove', function (e) {
    let mouseOfsX=(window.innerWidth - mapWidth)/2
    let mouseOfsY=(window.innerHeight - mapHeight)/2;
    mouseX = (event.clientX-mouseOfsX);
    mouseY = (event.clientY-mouseOfsY);
    //mouseX =/*event.offsetX*/e.pageX - e.target.offsetLeft// event.x;
    //mouseY = /*event.offsetY*/e.pageY - e.target.offsetTop//event.y;
   
   // console.log(mouseX+' '+ mouseY);
});
// функция клонирования обьектов
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}// функция клонирования обьектов
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
function checkInObj(obj,x,y)
{
    if (x>obj.x && x<obj.x+obj.width &&
            y>obj.y && y<obj.y+obj.height )
    {
        return true;
    }
    return false;
}