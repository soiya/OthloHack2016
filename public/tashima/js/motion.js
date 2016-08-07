$(function () {
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
		//星をトグルでつけたり消したりする（枠星のクラス削除→星のクラス追加）
		if ($star.hasClass('fa-star-o')) {
			$star.removeClass('fa-star-o');
			$star.addClass('fa-star').css('color','yellow');
		} else {
			$star.removeClass('fa-star');
			$star.addClass('fa-star-o').css('color','#ccc');
		}
	});
	//ヘッダ（見出し）
	$('header').on('keydown keyup change', function(){
		$headerText = $('header').text();
		$headerTextLength = $headerText.length;
		//文字数に比例してサイズを縮小する（15文字程度まで対応可）
		var $fixedFontSize = Math.abs(36 - $headerTextLength/1.2)+"px";
		$('header').css(
			'font-size', $fixedFontSize,
			'line-height', $fixedFontSize
		);
		console.log($fixedFontSize);
	})
});
