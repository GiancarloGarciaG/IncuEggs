var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
const port = new SerialPort('COM3');
const parser = new Readline();
port.pipe(parser);
port.write('Esperando respuesta\n');


io.on('connection',function(socket){
    console.log("Alguien se conecto a la pagina.");
});

port.on('open', function(){
   console.log('El ARDUINO está disponible.');
});

parser.on('data', function(dato){//Esta funcion se encarga de emitir los datos generados por el ARDUINO
  console.log(dato);
  io.sockets.emit('lectura',dato);
});

app.get('/',function(req,res){
  res.sendfile('public/index.html');
});

server.listen(8080,function(){
  console.log("Alguien se conecto al servidor.");
});
