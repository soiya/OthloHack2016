var express = require('express')
  , http = require('http')
  , path = require('path')
  , io = require('socket.io');

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
var PDFDocument = require('pdfkit');
var fs = require('fs');

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
    var D = new Date() ;
    var year = D.getFullYear();
    var month = D.getMonth()+1;
    var day = D.getDate();
    var pdfdoc = new PDFDocument;

    client.query(
      'select comment from ' + "math_favorite",
      function (err, result, field) {
        if (err) {
          throw err;
        }
        pdfdoc.pipe(fs.createWriteStream('public/pdfs/output.pdf'));
        pdfdoc.fontSize(25).text(year+'-'+month+'-'+day+" notebook", 100, 80);
        for(var i = 0; i < 3; i++){
          var iconv = require('Iconv');
          var conv = new iconv.Iconv('utf8', 'UTF-16BE');
          var bom = "\xFE\xFF";
          // pdfdoc.font('public/fonts/ume-hgo4.ttf').fontSize(8).text(bom + conv.convert(result[i].comment).toString());
          pdfdoc.font('public/fonts/ume-hgo4.ttf').fontSize(12).text("・"+result[i].comment);
        }
        // client.end();
        pdfdoc.end();
        io.to(socket.id).emit('pdf download', '');
      });
   

   console.log("pdf Accept");
  });

});