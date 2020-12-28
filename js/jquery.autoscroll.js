// auto scrolling JS
///////전역변수셋팅/////////////////////////
var pNum=0;//현재 페이지번호 전역변수
var psts=0;///스크롤애니메이션 작동중여부(0-쉼,1-함)\
////모바일 사이즈 여부 구분 코드///
var msts = 0;//모바일-1, DT-0
if($(window).width()<=760){msts=1;}
//console.log(msts);
////////////////////////////////////////////
$(function(){//jQB/////////////////////
	//////모바일일때 전체 메뉴 배경 비디오 삭제하고 배경 이미지넣기/////
	if(msts===1){
		$("#menu>video").remove();
		$("#menu").css({
			background:"url(images/ban04.jpg) no-repeat center/cover"
		});
		
		//모바일일때 배너 배경이미지 모바일 전용으로 불러오기
		$(".draggable>li").each(function(idx,elem){
			//console.log(idx);
			$(this).css({backgroundImage:"url(images/mobile/ban0"+(idx+1)+".jpg)"});
		});
		
	}//if/////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	/////////////////////////////////////////////////////////
	
	
	// 홈버튼(로고) 클릭시 맨위로 이동, top버튼 클릭시에도!
	$("#top>img, #tbtn").click(function(){
		//스크롤 애니메이션
		$("html,body").animate({
			scrollTop:"0px"
		},500,"easeInOutExpo");
		pNum=0;//페이지번호 전역변수 변경
		pageAction();//페이지액션 호출
	});//click///
	
	// GNB의 a링크를 클릭하면 해당 페이지로 스크롤 애니메이션 하기
			
	$("#top>ul>li>a").click(function(e){
		e.preventDefault();// a링크 기본이동 막기

		//클릭해서 페이지 이동시 전역 페이지 변수일치
		var idx = $(this).parent().index()+1;//li순번+1
		pNum=idx;//이동 페이지번호와 일치시킴!

		/*
		스크롤 관련 위치 속성값
		1. scrollTop -> 오른쪽 스크롤바의 top위치값(px)
		2. scrollLeft -> 왼쪽 스크롤바의 left 위치값(px)

	*/

		//클릭한 a태그의 href 값 알아오기
		var pid = $(this).attr("href");
		//alert(pid);
		var pagepos = $(pid).offset().top;
		//현재 선택된 id의 top위치값(offset()에서 알아옴)
		//console.log(pagepos);

		//스크롤 애니메이션
		$("html,body").animate({
			scrollTop:pagepos+"px"
		},500,"easeInOutExpo");
		
		pageAction();//페이지액션 호출

	});//click//////
	
	
	
	
	
	var mwEvt = (/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");
//		console.log(navigator.userAgent.toLowerCase());//현재브라우저
//	console.log(mwEvt);//할당된 이벤트값
	///////////////////////////////////////////////
	$(document).on(mwEvt,function(e){
		///////모바일일때 작동 금지!///////
		if(msts===1){return false;}
		
		// 0. 연속실행막기////////////////////
		if(psts==1)return false;//돌아갓!
		psts=1;////잠금!!!
		////////////////////////////////////////				

		// 1. 기본스크롤기능 막기
		e.preventDefault();

		// 2. ie구버전 구분하기
		var evt = window.event || e;
		// 변수 = 값1 || 값2;
		// 할당가능 여부에 따라 값1혹은 값2가 변수할당됨.

		/*
			가장 중요함!!!!
			wheelDelta 란? (ie, chrome용), opera는 detail을 사용함
			- 마우스 이벤트에 따라서 발생하는 이벤트 횟수 및 방향과 이동거리를 리턴함.
			- 만약에 wheelDelta를 click이벤트에 적용하면  횟수를 리턴함.
			- 마우스 휠 이벤트일 경우에는 스크롤 방향과 이동거리를 모두 리턴함.
			  예) 120 / -120 -> 120px기본이동거리와 +,-는 방향(+위, -아래)		
		*/
		var delta = evt.detail?evt.detail:evt.wheelDelta;
		// 조건연산자를 사용하여 detail이 유효하면(true이면) 그대로 쓰고 아니면 wheelDelta를 씀

		///////////파이어폭스를 위한 별도처리/////////
		///1. 파이어폭스는 스크롤 처리시 방향이 반대이다.
		///2. 파이어폭스는 detail처리시  originalEvent.detail 로 사용해야함.
		if(/Firefox/i.test(navigator.userAgent)){
			delta = -evt.originalEvent.detail;
		}
		////////////////////////////////////////////////



//		console.log(delta);
		if(delta>0){//윗방향
			pNum--;
			if(pNum==-1)pNum=0;//첫페이지로 고정정
		}
		else{//아랫방향
			pNum++;
			if(pNum==5)pNum=4;//마지막페이지 고정
		}
//		console.log(pNum);


		//해당 순번의 page 높이값 구하기
		var pos = $("body>section")
		.eq(pNum).offset().top;

		$("html,body")
		.animate({
			scrollTop:pos+"px"
		},500,"easeInOutExpo",
			function(){//애니메이션 후
				psts=0;//잠금해제!!!!!
			});///ani//////

		pageAction();//페이지 이동시 호출


	});/////마우스휠/////////////////////
	
	//// 각 페이지 등장 액션을 위한 CSS초기화 ////
	if(msts==0){///DT일때 만 초기화////////////////
		//1. Men page
		$("#cont1>ul>li:first-child>img").css({
			top: "15%", opacity:0
		});//공유
		$("#cont1>ul>li:last-child>h1").css({
			top: "70%", opacity:0
		});//글자

		//2. Women page
		$("#cont2>ul>li:last-child>img").css({
			top: "15%", opacity:0
		});//여자
		$("#cont2>ul>li:first-child>h1").css({
			top: "70%", opacity:0
		});//글자

		//3. Style page
		$("#cont3>ul>li>img").css({
			top: "15%", opacity:0
		});//남자,여자 이미지 공통
		$("#cont3>ul>li:nth-child(2)>h1:first-child").css({
			top: "50%", opacity:0
		});//남자글자	
		$("#cont3>ul>li:nth-child(2)>h1:last-child").css({
			top: "90%", opacity:0
		});//여자글자
	}///////////////DT일때만 CSS초기화//////////////////
	
	

});//jQB/////////////////////////////////////////////

/*
	함수명: pageAction
	기능 : 페이지 이동시 애니메이션 설정
*/
function pageAction(){
	// 1. 첫페이지와 그 밖의 페이지일때 top메뉴 변경애니
	if(pNum===0){//첫페이지페이지
		$("#top>img").animate({
			width:"15%", marginTop:"3%"
		},200);//ani
		$("#top").removeClass("bgtop");/*투명도복원*/
		// 위로가기 버튼 숨기기
		$("#tbtn").fadeOut(300);
	}//if///
	else{//그 밖의 페이지
		$("#top>img").animate({
			width:"11%", marginTop:"1%"
		},200);//ani
		$("#top").addClass("bgtop");/*투명도 변경*/
		//위로가기 버튼 보이기
		$("#tbtn").fadeIn(300);
	}///else///
	
	// 2. GNB 메뉴 현재 위치 표시 글자색 변경
	if(pNum===0 || pNum===4){//첫페이지, 회사정보
		$("#top>ul>li").removeClass("selpos");
	}///if///
	else{//컨텐츠 페이지
		$("#top>ul>li").eq(pNum-1).addClass("selpos")
		.siblings().removeClass("selpos");
	}//else///
	
	///////////// 각 페이지 액션 설정/////////////
	if(pNum===1){//남자 페이지
		//1. Men page
		$("#cont1>ul>li:first-child>img").delay(300)
		.animate({
			top: "0%", opacity:1
		},1500,"easeInOutCubic");//공유
		$("#cont1>ul>li:last-child>h1").delay(300)
		.animate({
			top: "50%", opacity:1
		},1500,"easeInOutCubic");//글자
	}//if///
	else if(pNum===2){//여자 페이지
		//2. Women page
		$("#cont2>ul>li:last-child>img").delay(300)
		.animate({
			top: "0%", opacity:1
		},1500,"easeInOutCubic");//공유
		$("#cont2>ul>li:first-child>h1").delay(300)
		.animate({
			top: "50%", opacity:1
		},1500,"easeInOutCubic");//글자
	}//else if///
	else if(pNum===3){//스타일 페이지
		//3. Style page
		$("#cont3>ul>li>img").delay(300)
		.animate({
			top: "0%", opacity:1
		},1500,"easeInOutCubic");//남자,여자 이미지 공통
		$("#cont3>ul>li:nth-child(2)>h1:first-child")
		.animate({
			top: "30%", opacity:1
		},1500,"easeInOutCubic");//남자글자	
		$("#cont3>ul>li:nth-child(2)>h1:last-child")
		.animate({
			top: "70%", opacity:1
		},1500,"easeInOutCubic");//여자글자
	}////else if//////
	
	
}////pageAction함수///////////////////






