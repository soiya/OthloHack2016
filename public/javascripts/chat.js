var socket = io.connect();

//接続に成功すると'connect'イベントが発火する
//コンストラクタみたいなやつ
socket.on('connect',function() {
  console.log('サーバーと接続しました。');
  
});
 
//socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
//コメント受信で表示させている
socket.on('message:receive', function (data) {
  $("div#chat-area").prepend("<div>" + data.message + "</div>");
});
 
function send() {
  var msg = $("input#message").val();
  $("input#message").val("");
  socket.emit('message:send', { message: msg });
}
