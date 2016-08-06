
var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')
 
var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);
 
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});
 
server.listen(app.get('port'))
 
io.sockets.on('connection', function(socket) 
{
  //socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
  socket.on('message:send', function(data) 
  {
    //自分を含む全員宛てにメッセージを送信します。通常のチャットの発言に使える処理です。
    io.sockets.emit('message:receive', { message: data.message });
  });
});