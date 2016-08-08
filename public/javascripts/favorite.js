var socket = io.connect();
var count = 0;


//接続に成功すると'connect'イベントが発火する
//コンストラクタみたいなやつ
socket.on('connect',function() {
  console.log('サーバーと接続しました。');
  socket.emit('log connect', 2);
});

//ログ読み出し用
socket.on('log-receive', function (str) {
  // console.log(str);
  if(count < 3){
    $("div#chat-area>ul#comments").prepend('<li>' + str + '<i class="fa fa-star" style="color: yellow;"></i></li>');
    // hosi();
    count++;
  }
});

//socket.on(eventname, callback) でイベントを検知(=データの受信)を行います。
//コメントを受信して表示
socket.on('message:receive', function (data) {
  $("div#chat-area>ul#comments").prepend('<li>' + data.message + '<i class="fa fa-star-o"></i></li>');
});

socket.on('pdf download', function () {
  // document.location  = "/pdfs/output.pdf";
  // window.location.href = "https://syncer.jp/" ;
  // window.location.href = "/pdfs/output.pdf";
	window.open('/pdfs/output.pdf', '_blank'); 
});

//コメントの送信
function send() {
  console.log("send Accept");
	//入力窓の値を取得
  var msg = $("input#message").val();
	//入力窓をリセット
  $("input#message").val("");
  //サーバーへデータの送信
	//取得した値を送信
  socket.emit('message:send', { message: msg });
}

function install(){
  console.log("pdf Accept");
  socket.emit('install pdf','');
}

//星
function hosi() {
	var $button = $('.btn-group');	//ボタン
	var $listItem = $('ul#comments > li');	//リストアイテム(コメント)
	var $messageInput = $('#message');	//入力窓
  
//入力窓のフォーカスによるボタンのトグル
	$messageInput.on('focus', function() {
		$button.css('visibility','visible');
	});
	$messageInput.on('blur', function() {
		//入力窓が空欄ならボタンを消す(入力中かどうか判断する)
		if ($('footer>input#message').val()==='') {
			$button.css('visibility','hidden');
		}
	});

	//リストアイテムに星をつける
	$listItem.on('click', function() {
		var index = $listItem.index(this)+1;
		//debug
		console.log(index);
		//星span取得
		var $star = $(this).children('i');
    star.css('color','yellow');
	});
}


