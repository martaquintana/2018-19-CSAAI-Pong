function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");
  window.onkeydown = (e) => {
    e.preventDefault();
    console.log(e.key)
    if(e.key =='a'){
      console.log("Tecla a apretada");
    }
  }

  //-- Raquetas
  ctx.fillStyle = 'white';
  ctx.fillRect(50,canvas.height/2-20, 10, 40)
  ctx.fillStyle = 'white';
  ctx.fillRect(500,canvas.height/2-20, 10, 40)
  //--Linea
  ctx = canvas.getContext("2d");
  ctx.setLineDash([4, 14, 18]);
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2,canvas.height);
  ctx.strokeStyle = 'white';
  ctx.stroke();
  //--Pelota
  ctx.beginPath();
  ctx.arc(100, 50, 5, 0, 2 * Math.PI);
  ctx.stroke()
  ctx.fillStyle = 'white';
  ctx.fill()
  //--Marcador Jugador1
  ctx.font="60px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("2", canvas.width/2-50, 50);
  //--Marcador Jugador2
  ctx.font="60px Comic Sans MS";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("0", canvas.width/2+50, 50);

  var bola = {
    x_init:50,
    y_init:50,
    x:0,
    y:0,
    vx:4,
    vy:1,
    ctx:null,
    ratio:5,

    reset: function(){
      this.x= this.x_init;
      this.y= this.y_init;
    },

    init : function(ctx){
      this.reset()
      this.ctx= ctx;
    },

    draw : function(){
      ctx.beginPath();
      ctx.arc(this.x,this.y, this.ratio, 0, 2 * Math.PI);
      ctx.stroke()
      ctx.fillStyle = 'white';
      ctx.fill()
    },
    update: function(){
      this.x=this.x+this.vx;
      this.y=this.y+this.vy;
    },

  }
  bola.init(ctx);
  bola.draw();
  var timer = null;
  var sacar = document.getElementById('sacar');
  sacar.onclick = () => {
    console.log("Sacar Click")
    //Lanzar el timer si no estaba lanzado antes.
    if(!timer){
      timer = setInterval(()=>{
        //--Actualizar la bola
        bola.update()
        //--Borrar canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);
        //--Dibujar la bola
        bola.draw()
        //--Condiciones de terminacion
        if(bola.x>canvas.width){
          clearInterval(timer)
          bola.reset();
          bola.update();
          ctx.clearRect(0,0,canvas.width,canvas.height);
          bola.draw();
        }
      },20);
    }
  }
}
