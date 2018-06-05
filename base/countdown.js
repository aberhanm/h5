var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=500;
var R=8;
var  MARGIN_TOP=60;
var MARGIN_LEFT=30;

const endTime=new Date(2018,5,5,24,59,59);
var curShowTimeSeconds=0;
var balls=[];
const colors=['beige','orange','yellow','green','pink',
    'purple','blue','lightskyblue','deeppink','darkgreen']
window.onload = function(){
    var canvas=document.getElementById('canvas');
    var context=canvas.getContext('2d');

    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    curShowTimeSeconds=getCurrentShowTimeSeconds();
    setInterval(function () {
        render(context);
        update();
    },50);

};
function update() {
    var nextShowTimeSeconds=getCurrentShowTimeSeconds();

    var nexthours=parseInt(nextShowTimeSeconds/3600);
    var nextminutes=parseInt((nextShowTimeSeconds-nexthours*3600)/60);
    var nextseconds=nextShowTimeSeconds%60;

    var curhours=parseInt(curShowTimeSeconds/3600);
    var curminutes=parseInt((curShowTimeSeconds-curhours*3600)/60);
    var curseconds=curShowTimeSeconds%60;

    if(nextseconds!=curseconds){
        if(parseInt(curhours/10)!=parseInt(nexthours/10)){
            addballs(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curhours/10));
        }
        if(parseInt(curhours%10)!=parseInt(nexthours%10)){
            addballs(MARGIN_LEFT+15*(R+1),MARGIN_TOP,parseInt(curhours/10));
        }

        if(parseInt(curminutes/10)!=parseInt(nextminutes/10)){
            addballs(MARGIN_LEFT+39*(R+1),MARGIN_TOP,parseInt(curminutes/10));
        }
        if(parseInt(curminutes%10)!=parseInt(nextminutes%10)){
            addballs(MARGIN_LEFT+54*(R+1),MARGIN_TOP,parseInt(curminutes%10));
        }

        if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
            addballs(MARGIN_LEFT+78*(R+1),MARGIN_TOP,parseInt(curseconds/10));
        }
        if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
            addballs(MARGIN_LEFT+93*(R+1),MARGIN_TOP,parseInt(curseconds%10));
        }

        curShowTimeSeconds=nextShowTimeSeconds;
    }
    updateballs();

}

function updateballs() {
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;

        if(balls[i].y>=WINDOW_HEIGHT-R){
            balls[i].y=WINDOW_HEIGHT-R;
            balls[i].vy=-balls[i].vy*0.7;
        }

    }
}

function addballs(x,y,num) {
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++) {
            if(digit[num][i][j]==1){
                var aball={
                    x:x+j*2*(R+1)+(R+1),
                    y:y+i*2*(R+1)+(R+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }
               balls.push(aball)
            }
        }
    }
}
function getCurrentShowTimeSeconds() {

    var curtime=new Date();
    var rec=endTime.getTime()-curtime.getTime();
    rec=Math.round(rec/1000);
    return rec >=0? rec:0;
}

function render( cxt ){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=parseInt(curShowTimeSeconds/3600);
    var minutes=parseInt((curShowTimeSeconds-hours*3600)/60);
    var seconds=curShowTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),cxt);
    renderDigit(MARGIN_LEFT+15*(R+1),MARGIN_TOP,parseInt(hours%10),cxt)
    renderDigit(MARGIN_LEFT+30*(R+1),MARGIN_TOP,10,cxt)


    renderDigit(MARGIN_LEFT+39*(R+1),MARGIN_TOP,parseInt(minutes/10),cxt);
    renderDigit(MARGIN_LEFT+54*(R+1),MARGIN_TOP,parseInt(minutes%10),cxt)
    renderDigit(MARGIN_LEFT+69*(R+1),MARGIN_TOP,10,cxt)


    renderDigit(MARGIN_LEFT+78*(R+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(R+1),MARGIN_TOP,parseInt(seconds%10),cxt)

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;
        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,R,0,2*Math.PI,true);
        cxt.closePath();
        cxt.fill();
    }

}

function renderDigit( x , y , num , cxt ){
    cxt.fillStyle='black';
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]==1){
                cxt.beginPath(``);
                cxt.arc(x+j*2*(R+1)+(R+1),y+i*2*(R+1)+(R+1),R,0,2*Math.PI);
                cxt.closePath();

                cxt.fill()
            }
        }
    }

}

