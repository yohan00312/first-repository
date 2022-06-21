$(function(){

	// 문서의 document 정의 변수로 저장
	doc = $(document);

	// layer_wrap 변수에 layer_wrap(layer box 요소) class 저장
	layerWrap = $(".layer_wrap");

	// 컨텐츠 요소들을 OutContents 변수에 대입
	OutContents = $(".contents_wrap, .contents_wrap *");

	// 1. attr role="dialog" => 콘텐츠를 분리하는 "창"임을 나타내기 위함
	// 2. aria-hidden="true" => 스크린 리더기를 사용하는 이들에게 해당 콘텐츠의 탐색을 제한함. 탐색 불가
	// 3. visibility="hidden" => 눈으로 보여지지 않도록 하여, 사용자에게 정보를 전달하지 않도록
	// 4. attr hidden => 시각적 외의 스크린 리더 등 다른 모든 표시 방식에서 숨겨짐
	layerWrap.attr('role', 'dialog').attr('aria-hidden', 'true').css('visibility', 'hidden').attr('hidden', '');

	// 객체 리터럴 사용하여 생성
	var Layerbox = {

		// 실행(열릴 때)
		open : function(target){

			// layer 변수에 각 data-layer 의 해당되는 target값을 가진 구조를 대입 시킨다.
			var $layer = $('[data-layer="' + target + '"]');

			console.log($layer);

			//layer_wrap
			// focusOn 변수에 front-focus 구조를 대입 시킨다.
			focusOn = $('<div class="front-focus" tabindex="0"></div>');

			// tab key 이동 시, 생성해둔 front-focus에 초점이 맞춰질 경우
			focusOn

				//layer 구조의 마지막에 front-focus 구조를 추가시킨다.
				// layer 안에서만 focus가 반복.
				.appendTo($layer)

				// focusOn 변수에 focus가 위치해 있다면
				.on('focusin', function () {

					// 현재 열린 layer에 focus를 맞춘다.
					$layer.focus();
				})


			$layer
				// 1. 숨겨져있던 layer를 fadeIn 시킨다.
				.fadeIn(300, function(){

					// 1-1. l_open class 추가
					$layer.addClass("l_open")
				})

				// 2. layer의 tabindex 속성을 0으로 주어 focus 받도록
				.attr("tabindex","0")

				// 3. '' aria-hidden="false" => 스크린 리더기를 사용하는 이들에게 해당 콘텐츠의 탐색 가능하도록
				.attr("aria-hidden", "false")

				// 4. '' aria-modal="true" => modal 요소 존재 시, 다른 사용자의 콘텐츠 사용 배제
				.attr("aria-modal", "true")

				// 5. '' visibility="visible" => 요소를 보이도록
				.css("visibility", "visible")

				// 6. hidden attr 제거
				.removeAttr("hidden")

		},

		// 닫힐 때
		close : function(target){

			// layer 변수에 각 data-layer 의 해당되는 target값을 대입 시킨다.
			var $layer = $('[data-layer="' + target + '"]');

			// focusOut 변수에 front-focus 구조를 대입 시킨다.
			focusOut = $('<div class="front-focus" tabindex="0"></div>');

			// focusOut 변수 안 front-focus 태그를 제거시킨다.
			focusOut.remove();

			// open과 반대
			$layer
				.fadeOut(500)
				.attr("tabindex","-1")
				.attr('aria-hidden', 'true')
				.removeAttr("aria-modal")
				.css('visibility', 'hidden')
				.attr('hidden','')
				.removeClass('l_open');
		}
	}

	// element가 나중에 생긴 경우 click 이벤트 적용 안됨
	// 대비하여 document click 사용
	doc
		// data-layer-open 속성을(layer 클릭 버튼) 클릭 할 시
		.on("click.Layerbox", "[data-layer-open]", function(){

			// this 자신 값 this 변수에 대입
			var $this = $(this);

			// 클릭 시 클릭한 요소의 data-layer-open 속성값을 layer 변수에 대입
			var layer = $this.attr('data-layer-open');

			// console.log(layer);

			// Layerbox 객체의 open event 실행
			Layerbox.open(layer);

			// layer 제외 요소들 속성값 변경
			// aria-hidden="true" => 스크린 리더와 같은 보조기술 사용자의 콘텐츠 탐색을 제한
			// inert => 포커스 이벤트로 요소에 대한 사용자 입력 이벤트를 무시
			OutContents.attr('aria-hidden', 'true').attr('inert', '');

		})
		// data-layer-close 속성을(layer 닫기 버튼) 클릭 할 시
		.on("click.Layerbox", "[data-role='layerClose']", function(){

			// this 자신 값 this 변수에 대입
			var $this = $(this);

			// click한 close button에서 제일 가까운 data-layer값을 1개만 찾고, 해당되는 data-layer의 속성 값 layer 변수에 대입
			var layer = $this.closest("[data-layer]").attr("data-layer");

			// Layerbox 객체의 close event 실행
			Layerbox.close(layer);

			// open과 반대
			OutContents.attr('aria-hidden', 'false').removeAttr('inert')

		})

});