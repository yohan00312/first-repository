$(function(){

	// 문서의 document 변수로 저장
	$doc = $(document);

	// gnb 명을 지닌 객체 리터럴 생성
	var gnb = {

		// hover 시
		hover: function ($this) {

			// hover 한 자기 요소의 data값 대입
			var name = $this.attr('data-menu');

			// 자신의 hover 요소 제외한 data값 대입
			var otherItems = $('[data-menu]').not($this);

			// contents 영역의 data값 대입
			var $contents = $('[data-menu-conts="' + name + '"]');

			// 자신의 contents data값 제외한 값들 대입
			var $otherContents = $('[data-menu-conts]').not($contents);

			// 2차메뉴를 감싼 요소 대입
			var $layer = $('.side_hide_menu');

			// apfocus 변수 생성 및 매개변수 3개 생성
			function apfocus(className, $wrap, first) {

				// side_hide_menu에서 던져준 값의 class명을 el 변수에 대입
				var findEl = $wrap.find('.' + className);

				// el변수를 찾지 못한다면, 즉 focus 요소가 생성되지 않았다면 구문 실행
				if (!findEl.length) {

					// 받아온 class명의 tabindex 구조 생성
					el = $('<div tabindex="0" class="' + className + '"></div>');

					// true값이면
					if (first) {

						// $layer의 내용 앞에 구조 추가
						$wrap.prepend(el);

					// true가 아니라면
					} else {

						// $layer의 내용 뒤에 구조 추가
						$wrap.append(el);

					}
				}
			}

			// 함수 실행 후, 클래스/구조명/true or false 값 순으로 값 넘겨줌
			apfocus('first-focus', $layer, true);
			apfocus('last-focus', $layer);

			// 하위 메뉴가 있다면
			if ($contents.length) {

				// 현재 hover 된 1차메뉴 내용 뒤에 구조를 추가시킨다.
				apfocus('last-focus', $this);

				// 2차메뉴 감싼 요소에 열고 닫히는 용도의 클래스 추가
				$layer.addClass('is-opened');

			// 하위 메뉴가 존재하지 않다면
			} else {

				// 2차메뉴 감싼 요소에 클래스 제거
				$layer.removeClass('is-opened');

			}

			// 다른 1차메뉴 hover 요소의 클래스 제거
			otherItems.removeClass('is-hover');

			// 현재 hover된 1차메뉴에 클래스 추가
			$this.addClass('is-hover');

			// 다른 2차메뉴 감싼 요소의 클래스 제거
			$otherContents.removeClass('is-show');

			// 현재 hover된 메뉴의 2차메뉴 감싼 요소에 클래스 추가 및 tabindex값 설정
			$contents.addClass('is-show').attr('tabindex', '0');
		},

		// hover 벗어났을 때
		leave: function () {

			// 1차 메뉴 및 2차메뉴 감싼 요소 클래스 제거
			var $items = $('[data-menu]');
			var $layer = $('.side_hide_menu');

			$items.removeClass('is-hover');
			$layer.removeClass('is-opened');
		},

		// fake-first-focus에 focus 이동 시
		layerFirstFocus: function () {
			// 현재 active 된 메뉴를 찾아 변수에 대입
			var $hoverItem = $('[data-menu].is-hover');

			// active된 메뉴의 이전태그에서 a태그를 찾아 focus이동
			$hoverItem.find("a").focus();
		},

		// fake-last-focus에 focus 이동 시
		layerLastFocus: function () {

			// 현재 active 된 메뉴를 찾아 변수에 대입
			var $hoverItem = $('[data-menu].is-hover');

			// active된 메뉴의 다음태그에서 a태그를 찾아 focus이동
			$hoverItem.next().find("a").focus();

		},

		// hover된 1차메뉴의 fake-focus에 focus 이동 시
		itemLastFocus: function () {

			// 현재 1차메뉴와 연관된 하위메뉴를 변수에 대입
			var $showContents = $('[data-menu-conts].is-show');

			// 우측 하위메뉴에 focus이동
			$showContents.focus();

		},

		// 2차메뉴 slide down/up
		subMenuToggle: function(target) {

			// 클릭한 요소의 부모요소 ul을 show / hide 시켜준다.
			target.parent().siblings("ul").stop().slideToggle(300);

		},

		// text 변경
		toggleText: function(target) {

			// 현재 active된 contents 영역의 button
			var ta = $('[data-menu-conts].is-show').find("button");

			// 클래스의 존재여부 파악 후, text값 변경 (+)
			if(ta.hasClass("on") == false){

				ta.text("하위메뉴 닫기");

				ta.addClass("on");

			} else {

				ta.text("하위메뉴 열기");

				ta.removeClass("on");

			}

		}

	};


	$doc

		// 1차 hover menu에 mouse hover 및 focus 시,
		.on('mouseenter focusin', '[data-menu]', function () {

			// gnb 객체의 hover 실행 및 현재 마우스 올린 요소값 전달
			gnb.hover($(this));

		})

		// menu에서 mouse를 leave 시킬 때 (+)
		.on('mouseleave areaFocusOut', '.menu_wrap', function () {

			// gnb 객체의 leave 실행
			gnb.leave();

		})

		// 2차 menu를 감싼 side_hide_menu 의 first-focus에 focus 이동 시
		.on('focusin', '.side_hide_menu .first-focus', function () {

			// gnb 객체의 layerFirstFocus 실행
			gnb.layerFirstFocus();

		})

		// 2차 menu를 감싼 side_hide_menu 의 last-focus에 focus 이동 시
		.on('focusin', '.side_hide_menu .last-focus', function () {

			// gnb 객체의 layerLastFocus 실행
			gnb.layerLastFocus();

		})

		// 현재 hover한 1차메뉴의 last-focus에 focus 이동 시
		.on('focusin', '[data-menu] .last-focus', function () {

			// gnb 객체의 itemLastFocus 실행
			gnb.itemLastFocus();

		})

		// 2차 메뉴 show button click 시
		.on("click", ".side_hide_menu > div > ul > li .top button", function(){

			// this값 대입
			var te = $(this);

			// gnb 객체의 subMenuToggle실행 및 this 값 넘겨줌
			gnb.subMenuToggle(te);

			// gnb 객체의 toggleText 실행
			gnb.toggleText();

		})


	// area focus (+)
	function areaFocus(area) {
		$doc
			// menu를 감싸는 전체요소에 focus 되었을 경우
			.on("focus", area, function () {

				// this값 변수에 대입(menu_wrap)
				var $this = $(this);

				// menu_wrap의 focus 횟수 계산 후 timer 변수 대입
				var timer = $this.data("areaFocusTimer");

				// setTimeout 중지
				clearTimeout(timer);

					// is-focus class 추가 및 areaFocusIn data값
					$this.addClass("is-focus").trigger("areaFocusIn");

			})
			// menu를 감싸는 전체요소에 focus 사라질 경우
			.on("blur.areaFocus", area, function () {

				// this값 변수에 대입(menu_wrap)
				var $this = $(this);

				// menu_wrap의 focus 횟수 계산 후 timer 변수 대입
				var timer = $this.data("areaFocusTimer");

				// setTimeout 중지
				clearTimeout(timer);

				// focus 빠질 시
				$this.data(
					"areaFocusTimer",
					setTimeout(function () {
						// is-focus class 제거 및 areaFocusOut data값
						$this.removeClass("is-focus").trigger("areaFocusOut");
					}, 100)
				);
			});
		}

		areaFocus(".menu_wrap");
});