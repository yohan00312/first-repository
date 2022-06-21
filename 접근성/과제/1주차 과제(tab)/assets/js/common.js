$(function(){

	// tab click 요소들을 개수만큼 돌려서, index값을 받아 추가시켜준다.
	$(".tablist li").each(function(index){

		$(this).attr("aria-controls", "tab_panel_"+index);

	});

	// tab panel 요소들을 개수만큼 돌려서, index값을 받아 추가시켜준다.
	$(".tabpanel").each(function(index){

		$(this).attr("id","tab_panel_"+index);

	});

	// 첫번째 active 및 영역 초점을 얻기 위해 tabindex 0값 표기.
	$(".tab:first-of-type, .tabpanel:first-of-type").addClass("active").attr("tabindex", "0");

	// 첫번째 요소에 현재 선택됨을 나타내는 aria-selected="true" 설정
	$(".tab:first-of-type").attr("aria-selected", "true");

	// // 요소 클릭 시 발생하는 이벤트
	$(".tab").on("click mousedown", function(){

		// 선택된 요소 활성화
		$(this).addClass("active");

		// 선택된 요소 index값 및 selected 속성 true 설정
		$(this).attr({"tabindex" : "0", "aria-selected" : "true"});

		// 선택된 요소 focus 이동 및 형제 클릭 요소들 active 제거
		$(this).focus().siblings().removeClass("active");

		// 선택된 요소 focus 이동 및 형제 클릭 요소들 tabindex -1, selected 속성 false 설정
		$(this).focus().siblings().attr({"tabindex" : "-1", "aria-selected" : "false"});

		//// 연관된 탭 패널 활성화

		// 클릭 요소의 aria-controls 속성값을 가진 연관된 id의 tabpanel 에 active 추가
		$("#" + $(this).attr("aria-controls")).addClass("active");

		// 클릭 요소의 aria-controls 속성값을 가진 연관된 id의 tabpanel 에 tabindex 값 0 설정
		$("#" + $(this).attr("aria-controls")).attr("tabindex", "0");

		// 클릭 요소의 aria-controls 속성값을 가진 연관된 id의 tabpanel의 선택된 요소 제외한 형제 tabpanel의 tabindex -1 및 active 제거
		$("#" + $(this).attr("aria-controls")).siblings(".tabpanel").attr("tabindex", "-1").removeClass("active");

		// 탭 요소의 title 값을 비워준다.
		$(".tablist li").attr("title","");

		// 탭 클릭 요소(active) 의 title 값을 인지시켜준다.
		$(this).attr("title", "현재 선택된 탭 메뉴입니다.");

	});


	// 탭 요소 누르는 순간 실행
	$(".tab").on("keydown", function(e){

		// 좌우 화살표 입력 가능한 keycode 정의
		var keycode = e.keyCode;

		// keycode의 경우의 수
		switch(keycode){

			// 좌측 화살표의 경우
			case 37:

				//현재 tab의 바로 이전 형제요소
				if(this.previousElementSibling){

					// 현재 tab key의 tabindex 값을 -1로 설정후, 좌측 화살표 클릭 시 그 요소가 active 이므로 tabindex="0" 설정
					$(this).attr("tabindex", "-1").prev().attr("tabindex", "0").focus();

					// 이전 tab key를 클릭시켜준다.
					$(this).prev().click();

				} else {

					// 바로 이전 형제 요소가 아닌경우, tabindex를 -1로 설정
					$(this).attr("tabindex", "-1");

					// tab key의 last 요소값을 tabindex 0 설정 후 focus 시켜준다.
					$(".tab:last-of-type").attr("tabindex", "0").click().focus();

				}

			break;

			// 우측 화살표의 경우 (좌측과 반대로)
			case 39:

				if(this.nextElementSibling){

					$(this).attr("tabindex", "-1").next().attr("tabindex", "0").focus();

					$(this).next().click();

				} else {

					$(this).attr("tabindex", "-1");

					$(".tab:first-of-type").attr("tabindex", "0").click().focus();

				}

			break;

		}

	});

});
//window-onload