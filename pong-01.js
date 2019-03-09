function main()
{
  console.log("Pong: Main: Start!")

  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");
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

      //Lineacentral
      ctx.setLineDash([4, 14, 18]);
      ctx.moveTo(canvas.width/2, 0);
      ctx.lineTo(canvas.width/2,canvas.height);
      ctx.strokeStyle = 'white';
      ctx.stroke();


    },
    update: function(){
      if(this.x + this.vx > canvas.width- 5 || this.x + this.vx < 5) {
        this.vx = -this.vx;
      }
      if(this.y + this.vy > canvas.height-5 || this.y + this.vy < 5) {
        this.vy = -this.vy;
      }
      this.x=this.x+this.vx;
      this.y=this.y+this.vy;
    },

  };
  ///
  var pala1 = {
    x_init:50,
    y_init:canvas.height/2-20,
    x:0,
    y:0,
    vy:20,
    ctx:null,
    anchura:10,
    altura:40,
    reset: function(){
      this.x= this.x_init;
      this.y= this.y_init;
    },
    init : function(ctx){
      this.reset();
      this.ctx= ctx;
    },

    draw : function(){
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x,this.y, this.anchura, this.altura)
      ctx.fill()
    },
    update: function(){
      var arriba = document.getElementById('arriba');
      var abajo = document.getElementById('abajo');
      var hey;
      arriba.onclick = ()=>{  moverpala('87'); }
      abajo.onclick = ()=>{  moverpala('83'); }
      window.onkeydown = (e) => {
        e.preventDefault();
        console.log(e.keyCode)

        //Numero del espacio para poder sacar dando al espacio o boton sacar
      if(e.keyCode == '87'|| e.keyCode == '83'){  moverpala(e.keyCode); }
      }
      console.log(this.y)
      function moverpala(e){
        if(e =='87' && pala1.y >pala1.altura/20){
        pala1.y-=pala1.vy
        }
        if(e == '83'){
          if(pala1.y != canvas.height-40){
            pala1.y+=pala1.vy
          }
        }
      }
    },
  }
  ///
  bola.init(ctx);
  bola.draw();
  pala1.init(ctx);
  pala1.draw();

  var timer = null;
  var sacar = document.getElementById('sacar');
  var e;
  sacar.onclick = ()=>{  moverbola(); }
  window.onkeydown = (e) => {
    e.preventDefault();
    console.log(e.keyCode)

    //Numero del espacio para poder sacar dando al espacio o boton sacar
  if(e.keyCode == '32'){  moverbola(); }

}
  function moverbola(){
      bola.init(ctx);
      bola.draw();
      pala1.init(ctx);
      pala1.draw();
      console.log("Sacar Click")
      //Lanzar el timer si no estaba lanzado antes.
      if(!timer){
          timer = setInterval(()=>{
          //--Actualizar la bola
          bola.update()
          pala1.update()
          //--Borrar canvas
          ctx.clearRect(0,0,canvas.width,canvas.height);
          //--Dibujar la bola
          bola.draw()
          pala1.draw()
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
