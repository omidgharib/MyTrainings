window.onload=function(){
  var canvas=document.getElementById("loading"),
      d2r = Math.PI/180,
      xShift=10,
      yShift=120,
      step=2,
      t=10,
      deg=0,       // deg=degree(x)
      r=100,       // r=range
      ctx=canvas.getContext('2d');
      
  //create line between r*sin(x) and r*sin(x+step) r=range
  drawSinLine=function(r,x,step){
      var gradient=ctx.createLinearGradient(0,0,canvas.width,0);
      gradient.addColorStop("0","red");
      gradient.addColorStop("0.4","green");
      gradient.addColorStop("1.0","blue");
      ctx.strokeStyle=gradient;
      ctx.lineWidth='3';
      ctx.shadowBlur=2;
      ctx.shadowColor="99d";
      ctx.beginPath();
      ctx.moveTo(x/t+xShift,yShift+r*Math.sin(x*d2r));
      ctx.lineTo(x/t+xShift+step,yShift+r*Math.sin((x+step)*d2r));
      ctx.stroke(); 
  }
  
  draw=setInterval(function(){
      if(r<0) r=0;
      if(deg==360*(t-1)){
         ctx.font="16px Georgia";
         ctx.fillText("Loading ...",295,110);
      }
      if(deg==360*t) {
         clearInterval(draw);
      }
      drawSinLine(r-=0.035,deg++,step);
      //console.log(r);
  },1);
}