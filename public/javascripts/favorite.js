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

function install(){
  socket.emit('install pdf','');
}

//星
function hosi() {
	var $button = $('.btn-group');	//ボタン
	var $listItem = $('ul#comments > li');	//リストアイテム(コメント)
	var $messageInput = $('#message');	//入力窓
  
	//リストアイテムに星をつける
	$listItem.on('click', function() {
		var index = $listItem.index(this)+1;
		//debug
		console.log(index);
		//星span取得
		var $star = $(this).children('i');
    star.css('color','yellow');
    // if(index%2 == 0 && $star.hasClass('fa-star')){
    //   $star.removeClass('fa-star');
    //   $star.addClass('fa-star-o');
    // }
    // console.log($star.hasClass('fa-star-o'));
    
    // $star.removeClass('fa-star-o');
		// 	$star.addClass('fa-star').css('color','yellow');

    // $star.removeClass('fa-star-o');
    // $star.addClass('fa-star').css('color','yellow');

		//星をトグルでつけたり消したりする（枠星のクラス削除→星のクラス追加）

    

		// if ($star.hasClass('fa-star-o')) {
		// 	$star.removeClass('fa-star-o');
		// 	$star.addClass('fa-star').css('color','yellow');
		// } else {
		// 	$star.removeClass('fa-star');
		// 	$star.addClass('fa-star-o').css('color','#ccc');
		// }
	});
}


