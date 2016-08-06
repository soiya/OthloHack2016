$(function () {
	var $button = $('.btn-group');	//ボタン
	var $listItem = $('ul#comments > li');	//リストアイテム(コメント)
	var $searchInput = $('.search');	//入力窓

	//入力窓のフォーカスによるボタンのトグル
	$searchInput.on('focus', function() {
		console.log('focusing input window.');
		$button.css('visibility','visible');
	});
	$searchInput.on('blur', function() {
		//入力窓が空欄ならボタンを消す(入力中かどうか判断する)
		if ($('footer>input.search').val()==='') {
			console.log('bluring input window.');
			$button.css('visibility','hidden');
		}
	});
	//リストアイテムに星をつける
	$listItem.on('click', function() {
		var index = $listItem.index(this)+1;
		console.log(index+' th-child clicked!');
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
	$('header').on('keypress', function(){
		$headerText = $('header').text();
		$headerTextLength = $headerText.length;
		console.log('changed!!: '+$headerTextLength);
		//6文字より多い場合はサイズを縮小する（15文字程度まで対応可）
		if ($headerTextLength > 6) {
			var $fixedFontSize = Math.abs(36 - $headerTextLength/1.01)+"px";
			$('header').css('font-size', $fixedFontSize);
		} else {
			$('header').css('font-size', '36px');
		}
	})
});
