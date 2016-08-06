var socket = io.connect();
var count = 0;


//接続に成功すると'connect'イベントが発火する
//コンストラクタみたいなやつ
socket.on('connect',function() {
  console.log('サーバーと接続しました。');
  socket.emit('log connect', '');
});

//ログ読み出し用
socket.on('log-receive', function (str) {
  // console.log(str);
  if(count < 6){
    $("div#chat-area>ul#comments").prepend('<li>' + str + '<i class="fa fa-star-o"></i></li>');
    count++;
  }
});

//socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
//コメントを受信して表示
socket.on('message:receive', function (data) {
   console.log("message:receive'");
  $("div#chat-area>ul#comments").prepend('<li>' + data.message + '<i class="fa fa-star-o"></i></li>');
});

//コメントの送信
function send() {
	//入力窓の値を取得
  var msg = $("input#message").val();
	//入力窓をリセット
  $("input#message").val("");
  //サーバーへデータの送信
	//取得した値を送信
  socket.emit('message:send', { message: msg });
}
