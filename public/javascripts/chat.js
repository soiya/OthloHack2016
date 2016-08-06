var socket = io.connect();

//接続に成功すると'connect'イベントが発火する
//コンストラクタみたいなやつ
socket.on('connect',function() {
  console.log('サーバーと接続しました。');
});

//socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
//コメントを受信して表示
socket.on('message:receive', function (data) {
  $("div#chat-area>ul#comments").prepend('<li>' + data.message + '<i class="fa fa-star-o"></i></li>');
});

//コメントの送信
function send() {
	//入力窓の値を取得
  var msg = $("input#message").val();
	//入力窓をリセット
  $("input#message").val("");
	//取得した値を送信
  socket.emit('message:send', { message: msg });
}
