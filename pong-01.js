function main()
{
  console.log("Pong: Main: Start!")
  var marcadormaquina=0;
  var marcadorjugador=0;
  var random = Math.random();
  var canvas = document.getElementById('display')
  canvas.width = 600;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");
  var marcador ={
    ctx:null,
    init : function(ctx){
      this.ctx= ctx;
    },
    draw: function(marcadormaquina,marcadorjugador){
      //--Marcador Maquina
      ctx.font="60px Comic Sans MS";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(marcadormaquina, canvas.width/2-50, 50);
      //--Marcador Jugador
      ctx.font="60px Comic Sans MS";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(marcadorjugador, canvas.width/2+50, 50);
    }
  }

  var bola = {
    x_init:canvas.width/2,
    y_init:canvas.height/2,
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
  var palamaquina = {
    x_init:50,
    y_init:canvas.height/2-20,
    x:0,
    y:0,
    vy:10,
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
      this.y= bola.y-this.altura/4*0.1; //
      console.log(random)
    },
  }

  ///
  var palajugador = {
    x_init:500,
    y_init:canvas.height/2-20,
    x:0,
    y:0,
    vy:10,
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
      arriba.onclick = ()=>{  moverpala('38'); }
      abajo.onclick = ()=>{  moverpala('40'); }
      window.onkeydown = (e) => {
        e.preventDefault();
        console.log(e.keyCode)
        //Flechas
      if(e.keyCode == '38'|| e.keyCode == '40'){  moverpala(e.keyCode); }
      }
      function moverpala(e){
        if(e =='38' && palajugador.y >palajugador.altura/20){
        palajugador.y-=palajugador.vy
        }
        if(e == '40'){
          if(palajugador.y != canvas.height-40){
            palajugador.y+=palajugador.vy
          }
        }
      }
    },
  }
  ///
  bola.init(ctx);
  bola.draw();
  palamaquina.init(ctx);
  palamaquina.draw();
  palajugador.init(ctx);
  palajugador.draw();
  marcador.init(ctx);
  marcador.draw(marcadormaquina,marcadorjugador);

  var timer = null;
  var sacar = document.getElementById('sacar');
  var e;
  sacar.onclick = ()=>{  moverbola();
    marcadormaquina=0;
    marcadorjugador=0;}
  window.onkeydown = (e) => {
    e.preventDefault();
    console.log(e.keyCode)
    //Numero del espacio para poder sacar dando al espacio o boton sacar
  if(e.keyCode == '32'){  moverbola(); }
}
  function moverbola(){
      bola.init(ctx);
      bola.draw();
      palamaquina.init(ctx);
      palamaquina.draw();
      palajugador.init(ctx);
      palajugador.draw();
      marcador.init(ctx);
      marcador.draw(marcadormaquina,marcadorjugador);

      console.log("Sacar Click")
      //Lanzar el timer si no estaba lanzado antes.
      if(!timer){
          timer = setInterval(()=>{
          //--Actualizar la bola
          bola.update()
          palamaquina.update()
          palajugador.update()
          //--Borrar canvas
          ctx.clearRect(0,0,canvas.width,canvas.height);
          //--Dibujar la bola
          bola.draw()
          palamaquina.draw()
          palajugador.draw()
          marcador.draw(marcadormaquina,marcadorjugador);


          if(bola.x >= palajugador.x-palajugador.anchura && bola.x <= palajugador.x+palajugador.anchura){
            if(bola.y <= palajugador.y+palajugador.altura && bola.y >= palajugador.y-10){
              bola.vx = -bola.vx;
            }
          }

          if(bola.x+ bola.vx<= palamaquina.x){
            console.log(bola.y)

            if(bola.y <= palamaquina.y+palamaquina.altura && bola.y >= palamaquina.y-palamaquina.altura){
              console.log(bola.y)
              bola.vx = -bola.vx;
            }
          }

          //--Condiciones de terminacion
          if(bola.x>=canvas.width-6 || bola.x<=6){
            console.log('hey')
            console.log('punto!')
            if(bola.x>=canvas.width-6){
                marcadormaquina +=1;
            }
            if(bola.x<=6){
                marcadorjugador +=1;
            }
            marcador.draw(marcadormaquina,marcadorjugador)

              //clearInterval(timer)
              //bola.reset();
              //bola.update();
              //ctx.clearRect(0,0,canvas.width,canvas.height);
              //bola.draw();
            }
          },20);
        }
      }
}
