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
  var linea = canvas.getContext("2d");
  linea.setLineDash([4, 14, 18]);
  linea.moveTo(canvas.width/2, 0);
  linea.lineTo(canvas.width/2,canvas.height);
  linea.strokeStyle = 'white';
  linea.stroke();
  //--Pelota
  var pelota = canvas.getContext("2d");
  pelota.beginPath();
  pelota.arc(100, 50, 5, 0, 2 * Math.PI);
  pelota.stroke()
  pelota.fillStyle = 'white';
  pelota.fill()
  //--Marcador Jugador1
  var marcador1 = canvas.getContext("2d");
  marcador1.font="60px Comic Sans MS";
  marcador1.fillStyle = "white";
  marcador1.textAlign = "center";
  marcador1.fillText("2", canvas.width/2-50, 50);
  //--Marcador Jugador2
  var marcador2 = canvas.getContext("2d");
  marcador2.font="60px Comic Sans MS";
  marcador2.fillStyle = "white";
  marcador2.textAlign = "center";
  marcador2.fillText("0", canvas.width/2+50, 50);
}
