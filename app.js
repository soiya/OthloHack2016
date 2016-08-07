
var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io')

var app = express()
  , server = require('http').createServer(app)
  , io = io.listen(server);
var mysql = require('mysql');
var TABLE = "math";
var client = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : 'nao0426',
      database: 'chatlog'
});


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
 
io.sockets.on('connection', function(socket) {
  
  //接続が確立された時に呼ばれる
  socket.on('log connect', function (n) {
    if(n ==1){
    client.query(
      'select comment from ' + "math",
      function (err, result, field) {
        if (err) {
          throw err;
        }
        for(var i = 0; i < 8; i++){
           io.sockets.emit('log-receive', result[i].comment);
        }
        // client.end();
        
      });
    }
    if(n == 2){
      client.query(
      'select comment from ' + "math_favorite",
      function (err, result, field) {
        if (err) {
          throw err;
        }
        for(var i = 0; i < 3; i++){
           io.sockets.emit('log-receive', result[i].comment);
        }
        // client.end();
        
      });
    }
    });

  //socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
  socket.on('message:send', function(data) {
    //自分を含む全員宛てにメッセージを送信します。通常のチャットの発言に使える処理です。
    io.sockets.emit('message:receive', { message: data.message });
  });
  socket.on('install pdf',function(){
    
  });

});