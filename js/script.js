var mapWidth = 800;
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
var colors = ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(0,0,255,0.5)'];
var colors2 = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)'];
function Kvadr(x,y, numColor)  {
    this.x = x;
    this.y = y;
    this.width= 80;
    this.height = 80;
    this.addX = null;
    this.addY = null;
    this.numColor = numColor; 
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

}
window.addEventListener('load', function () {
    create();
    console.log(kvadrArr);
    setInterval(function () {
        drawAll();
        update();
    }, 16);
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
            context.lineWidth = 3;
            context.setLineDash([4, 4]); 
            context.strokeStyle = colors2[kvadr.numColor];
            context.lineDashOffset = 2;//-offset;
            context.strokeRect(kvadr.x, kvadr.y, kvadr.width, kvadr.height);
        }
    }
}
function update()
{
    if (numSelectKvadr!=null)
    {
        let numK = numSelectKvadr;
        let dist = 50;
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
                    // numSelectKvadr = null;
                }
            }
            else  if (numSelectKvadr!=null)
            {
                let flag = false;
                let num = null;
                for (let i = 0; i < kvadrArr.length;i++)
                {
                    kvadrArr[i].x += dx;
                    kvadrArr[i].y += dy;
                    
                    for (let j = 0; j < kvadrArr.length;j++)
                    {    
                        if (kvadrArr[j].x<0 || kvadrArr[j].x+kvadrArr[j].width>mapWidth ||
                            kvadrArr[j].y<0 || kvadrArr[j].y+kvadrArr[j].height>mapHeight)
                        
                        //if (kvadrArr[i].x<0 || kvadrArr[i].x+kvadrArr[i].width>mapWidth ||
                        //    kvadrArr[i].y<0 || kvadrArr[i].y+kvadrArr[i].height>mapHeight)
                        {
                            flag = true;
                            num = j;
                            break;
                        }
                    }  
                }
                if (flag==true)
                {
                    let flag2 = false;
                  //  kvadrArr[num].x += dx;
                  //  kvadrArr[num].y += dy;
                    if (/*kvadrArr[num].x<0 ||*/ mouseX<1 )
                    {
                        kvadrArr[num].x = 0;
                        flag2 = true;
                        //   numSelectKvadr = null;
                    }
                    if (/*kvadrArr[num].x>mapWidth ||*/ mouseX > mapWidth)
                    {
                        kvadrArr[num].x = mapWidth-kvadrArr[num].width;
                        flag2 = true;
                        // numSelectKvadr = null;
                    }
                    if (/*kvadrArr[num].y<0 ||  */ mouseY<1)
                    {
                        kvadrArr[num].y = 0;
                        flag2 = true;
                        // numSelectKvadr = null;
                    }
                    if (/*kvadrArr[num].y>mapHeight || */mouseY>mapHeight)
                    {
                        kvadrArr[num].y = mapHeight-kvadrArr[num].height;
                        flag2 = true;
                        //// numSelectKvadr = null;
                    }    
                    if (flag2 == true || num!=null)
                    {
                        for (let j = 0; j < kvadrArr.length;j++)
                        {        
                            kvadrArr[j].x -= dx;
                            kvadrArr[j].y -= dy;
                        }
                        
                        if (num==0)
                        {
                            kvadrArr[0].x = kvadrArr[1].x - kvadrArr[0].addX;  
                            kvadrArr[0].y = kvadrArr[1].y - kvadrArr[0].addY;
                        }
                        if (num==1)
                        {
                            kvadrArr[1].x = kvadrArr[0].x - kvadrArr[1].addX;  
                            kvadrArr[1].y = kvadrArr[0].y - kvadrArr[1].addY;
                        }
                        num = null;
                     //  numSelectKvadr = null; 
                        if (mouseX<0 || mouseX>mapWidth || mouseY<0 || mouseY>mapHeight)
                        {
                          //  break;;
                      //      numSelectKvadr = null; 
                        }
                    }
                }

                  
                       
                

            }

            if (together==false)
            {
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
                        if (kvadrArr[i].y+kvadrArr[i].height>=kvadrArr[numK].y &&
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
                    kvadrArr[0].addX = kvadrArr[1].x - kvadrArr[0].x;
                    kvadrArr[0].addY = kvadrArr[1].y - kvadrArr[0].y;
                    kvadrArr[1].addX = kvadrArr[0].x - kvadrArr[1].x;
                    kvadrArr[1].addY = kvadrArr[0].y - kvadrArr[1].y;
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
                    numSelectKvadr = null;
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
            break;
        }

           
    }

});
window.addEventListener('mouseup', function () {
    if (event.which==1)
    {
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
function checkInObj(obj,x,y)
{
    if (x>obj.x && x<obj.x+obj.width &&
            y>obj.y && y<obj.y+obj.height )
    {
        return true;
    }
    return false;
}