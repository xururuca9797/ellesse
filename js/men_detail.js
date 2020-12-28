//상태체크 전역변수
var mob = 0; // 모바일인지 아닌지 상태(0-아님, 1-모바일)
var autocall, autocallT;
var bsts=0;//배너작동중 상태값(0-휴식,1-활동)
//////////////////////////////////////
//신상품 정보 전역변수 셋팅
var sinsang = {
	"m1":"[남성]카모전판프린트 PQ 티셔츠^DMTS7K731-MG^99,000원",
	"m2":"[남성]빅로고 컬러 블럭 PQ 티셔츠^DMTS7G731-BK ^89,000원",
	"m3":"[남성]빅로고 컬러 블럭 PQ 티셔츠^DMTS7G731-WH ^89,000원",
	"m4":"[남성]부분 스트라이프 PQ 티셔츠^DMTS77731-NY ^99,000원",
	"m5":"[남성]웰딩포인트 트레이닝 하프팬츠^DMTB61731-MD ^89,000원",
	"m6":"[남성]블럭형 풀집업 래쉬가드^DMSW21731-GR ^99,000원",
	"m7":"[남성]블럭형 풀집업 래쉬가드^DMSW21731-KA ^99,000원",
	"m8":"[남성]베이직 솔리드 래쉬가드^DMSW15731-BK ^49,000원",
	"m9":"[남성]남성 루즈핏 슬리브리스^DMSL6C731-MG ^59,000원"
};

/////////////////////////////////////////////////////
///페이지 로딩시 파라미터 변수 받아서 페이지 셋팅하기///
var param = location.href;//파라미터 받기
if(param.indexOf("?")==-1){//파라미터 존재여부 분기
	location.href = "men.html";//클릭해서 들어올 페이지
}//// 물음표 존재 여부검사/////
param = param.split("?")[1].split("=")[1];//값만추출
//console.log(param);

//페이지 셋팅///////////////
jQuery(document).ready(function($){
	"use strict";
	//// 1-1. 큰이미지 변경하기 
	$("#bigimg").attr("id",param);//아이디변경
	$("#"+param).attr("src","images/"+param+"-1.jpg");
	
	//// 1-2. 썸네일 변경하기
	var hcode = '<a href="images/'+param+'-1.jpg" data-large="images/'+param+'-1.jpg"><img src="images/'+param+'-1.jpg" alt="썸네일" /></a> ';
	hcode += '<a href="images/'+param+'-2.jpg" data-large="images/'+param+'-2.jpg"><img src="images/'+param+'-2.jpg" alt="썸네일" /></a>';
	hcode += '<a href="images/'+param+'-3.jpg" data-large="images/'+param+'-3.jpg"><img src="images/'+param+'-3.jpg" alt="썸네일" /></a>';
	hcode += '<a href="images/'+param+'-4.jpg" data-large="images/'+param+'-4.jpg"><img src="images/'+param+'-4.jpg" alt="썸네일" /></a>';
	hcode += '<a href="images/'+param+'-5.jpg" data-large="images/'+param+'-5.jpg"><img src="images/'+param+'-5.jpg" alt="썸네일" /></a>';
	hcode += '<a href="images/'+param+'-6.jpg" data-large="images/'+param+'-6.jpg"><img src="images/'+param+'-6.jpg" alt="썸네일" /></a>';
//	hcode += '<a href="images/'+param+'-7.jpg" data-large="images/'+param+'-7.jpg"><img src="images/'+param+'-7.jpg" alt="썸네일" /></a>';
	
	//썸네일 html 변경 및 class명 추가(id명과 같은 이름)
	$(".thumbs").html(hcode).addClass(param);	
	
	/// 2. 상품명 변경하기
	$("#gtit").text(sinsang[param].split("^")[0]);
	//// 3-1. 상품 가격 변경하기
	$("#gprice").text(sinsang[param].split("^")[2]);
	/// 3-2. 토탈가격 초기 셋팅
	$("#total").text(sinsang[param].split("^")[2].replace("원",""));//원 빼고 숫자만 넣기
	//// 4. 상품 코드 변경하기
	$("#gcode").text(sinsang[param].split("^")[1]);
	
	/////5. 상품 상세 이미지 셋팅하기
	for(var i=0; i<6; i++){console.log(i);
		$(".dimgs").append('<img src="images/'+param+'-'+(i+1)+'.jpg" alt="상세이미지">');
	}////for문///////
	
	
	
});//jQB///
	



/////// multizoom 플러그인 적용////////
jQuery(document).ready(function($){
		//Demo1
	$("#"+param)
	.addimagezoom({
		zoomrange: [2,10], //확대범위[최소비율, 최대비율]
		largeimage: "images/"+param+"-1.jpg",//확대로볼이미지
		magnifiersize: [700, 700], //확대화면 크기[가로,세로]
		magnifierpos: "right", //확대화면 위치(공간확보 필수)
		cursorshade: true, //사진위확대범위 표시자(true보임)
		cursorshadecolor: "#000", //확대범위표시 색상
		cursorshadeopacity: 0.4 //확대범위 투명도
	});//demo1 셋팅
	
	//.html('<img src="images/'+param+'-1.jpg" alt="선택이미지" id="bigimg">');
});///jQB///////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

jQuery(document).ready(function(e) {
    if(jQuery(window).width() <= 1100) mob=1;
	else mob=0;
//	console.log("잘나오니?");
});
jQuery(window).resize(function(){
    if(jQuery(window).width() <= 1100) mob=1;
	else mob=0;
//console.log(mob);
});

//배너 자동넘기기 함수
var bnum = 1;//배너번호
function goSlide(sts){//sts 상태값
	if(bsts==1)return false;
	bsts=1;//활동중변경

	bnum++;
	if(bnum==4)bnum=1;//한계수
	//다음 슬라이드 넣기
	jQuery("#banner>ul").append("<li></li>").find("li").last()
	.css("background","url(images/banmen0"+bnum+".png) no-repeat top/cover");
	//슬라이드 이동 및 첫슬라이드 지우기
	jQuery("#banner>ul").animate({left:"-100%"},2000,"easeInOutQuint",function(){
		jQuery(this).find("li").first().remove();//첫번째 li 지우기
		jQuery(this).css("left","0");//위치값 초기화
		bsts=0;//휴식상태
	});
	
	//블릿변경
	jQuery("#banner>aside li").eq(bnum-1).css("background-position","0 -10px")//해당블릿배경위치변경
	.siblings().css("background-position","0 0");//다른블릿 원위치
	
	//클릭시
	if(sts==1){
		clearInterval(autocall);
		clearTimeout(autocallT);
		autocallT = setTimeout(function(){autoFunc();},9000);
	}
	
	
}//func



function backSlide(){//sts 상태값
	if(bsts==1)return false;
	bsts=1;//활동중변경
	
	bnum--;
	if(bnum==0)bnum=3;//한계수
	//다음 슬라이드 넣기
	jQuery("#banner>ul").prepend("<li></li>").css("left","-100%")//위치값 보정
	.find("li").first().css("background","url(images/banmen0"+bnum+".png) no-repeat top/cover");
	//슬라이드 이동 및 첫슬라이드 지우기
	jQuery("#banner>ul").animate({left:"0%"},2000,"easeInOutQuint",function(){
		jQuery(this).find("li").last().remove();//첫번째 li 지우기
		bsts=0;//휴식상태
	});
	
	//블릿변경
	jQuery("#banner>aside li").eq(bnum-1).css("background-position","0 -10px")//해당블릿배경위치변경
	.siblings().css("background-position","0 0");//다른블릿 원위치
	
	//클릭시
	clearInterval(autocall);
	clearTimeout(autocallT);
	autocallT = setTimeout(function(){autoFunc();},9000);
	
	
}//func

//블릿클릭시 이동 실행 함수
function directSlide(snum){//snum 블릿순번
	alert(jQuery("#banner>ul>li").first().css("background-image"));
	var dirc = jQuery("#banner>ul>li").first().css("background-image").split("/");
	dirc = Number(dirc[dirc.length-1].split(".")[0].substr(7,1));
	
	var diff = dirc-snum;//현재번호와 블릿번호의 차이(양수,음수)
	if(diff==0)return false;//같은 번호면 나가기!!
	
	if(bsts==1)return false;
	bsts=1;//활동중변경
	
	bnum = snum;//블릿순번을 전역변수에 넣음(일치!!!)
	//alert(snum);
	
	//alert(dirc);
	
	if(diff<0){//왼쪽으로 이동
		//다음 슬라이드 넣기
		jQuery("#banner>ul").append("<li></li>").find("li").last()
		.css("background","url(images/banmen0"+bnum+".png) no-repeat top/cover");
		//슬라이드 이동 및 첫슬라이드 지우기
		jQuery("#banner>ul").animate({left:"-100%"},2000,"easeInOutQuint",function(){
			jQuery(this).find("li").first().remove();//첫번째 li 지우기
			jQuery(this).css("left","0");//위치값 초기화
			bsts=0;//휴식상태
		});
	}
	else if(diff>0){//오른쪽으로 이동
		//다음 슬라이드 넣기
		jQuery("#banner>ul").prepend("<li></li>").css("left","-100%")//위치값 보정
		.find("li").first().css("background","url(images/banmen0"+bnum+".png) no-repeat top/cover");
		//슬라이드 이동 및 첫슬라이드 지우기
		jQuery("#banner>ul").animate({left:"0%"},2000,"easeInOutQuint",function(){
			jQuery(this).find("li").last().remove();//첫번째 li 지우기
			bsts=0;//휴식상태
		});
	}
	
	
	//블릿변경
	jQuery("#banner>aside li").eq(bnum-1).css("background-position","0 -10px")//해당블릿배경위치변경
	.siblings().css("background-position","0 0");//다른블릿 원위치
	
	//클릭시
	clearInterval(autocall);
	clearTimeout(autocallT);
	autocallT = setTimeout(function(){autoFunc();},9000);
	
	
}//func

/*자동실행함수*/
function autoFunc(){
	autocall = setInterval("goSlide(0)",4000);
}
jQuery(document).ready(function(e) {
    autoFunc();
	
	//버튼클릭시
	jQuery(".abtn").click(function(){
		var idx=jQuery(this).index();
		if(idx==2){//왼쪽버튼
			backSlide();
		}
		else if(idx==3){//오른쪽버튼
			goSlide(1);
		}
	});
	
	//블릿클릭시 directSlide함수호출
	jQuery("#banner>aside>ul>li").click(function(){
		var idx = jQuery(this).index()+1;
		directSlide(idx);
	});////click/////////////////////////
	
	////신상품 li에 마우스 오버시 정보보이기//////
	jQuery(".flowImg li").hover(
		function(){//over
			var cls = jQuery(this).attr("class");//클래스명
			var info = sinsang[cls];//셋팅된 객체변수
			console.log(info);
			
			///상품정보박스 만들고 나타나기////
			jQuery(this).append("<div class='ibox'></div>");
			jQuery(".ibox")
			.html(info.replace(/\^/g,"<br>"))
			.animate({top:"105%",opacity:1},300);		
		},
		function(){//out
			jQuery(".ibox").remove();//박스제거
		});///hover//////////////////////
	
	
	
});//jQB///////////////////////////////////////////////////

var scNum = 0;//스크롤에 따른 페이지 번호( 첫페이지는 0페이지)
var psts = 0;//스크롤진행시 막는 변수(0- 스크롤안함, 1-스크롤중)

/*마우스 휠 페이지 이동*/
jQuery(document).ready(function(e) {
    var mwEvt = (/Firefox/i.test(navigator.userAgent)?"DOMMouseScroll":"mousewheel");//파이어폭스인 아닌지 구별하여 이벤트 명 변경
	
	
	
//	jQuery(document).on(mwEvt,function(e){
//		e.preventDefault();//기본스크롤링막기
//		
//		if(psts==1)return false;//스크롤애니메이션 중이니 나가!
//		psts=1;//상태변경으로 접근금지!!!
//		
//		
//		var evt = window.event || e;
//		// 변수에 ||(바)를 사용하면 둘중에 지원되는 이벤트 코드를 사용함.
//		// ie old 버전에서 호환성때문에 쓰는 코드
//		
//		var delta = evt.detail?evt.detail:evt.wheelDelta;// 조건연산자
//		/*
//			wheelDelta 란? (ie, chrome용), 오페라는 detail을 사용함!
//			- 마우휠 이벤트에 따라 발생하는 이벤트 횟수 및 방향값을 리턴함!
//			- 만약에 wheelDelta를 click이벤트에 적용하면 클릭횟수를 리턴함.
//			- 마우스 휠 이벤트일 경우에 스크롤횟수와 방향값 모두 리턴함
//				예) 120/-120 ->  120px 기본 이동함(+는 윗방향, -는 아랫방향)		
//		*/
//		//console.log(delta);
//		
//		//파이어폭스는 스크롤처리시 방향이 반대임!
//		//파이어폭스는 detail처리시 originalEvent.detail 로 사용함
//		if(/Firefox/i.test(navigator.userAgent)) delta = -evt.originalEvent.detail;
//		
//		if(delta>0){//윗방향
//			scNum--;//1씩감소
//			if(scNum==-1)scNum=0;//한계페이지 고정
//		}
//		else{//아랫방향
//			scNum++;//1씩증가
//			if(scNum==5)scNum=4;//한계페이지 고정
//		}
//		
//		//페이지별 액션주기
//		pageAction();//페이지액션 함수 호출!
//		
//		
//		//console.log(scNum);
//		// 페이지 이동 애니메이션
//		jQuery("html,body").animate({
//			scrollTop : jQuery("body>section").eq(scNum).offset().top + "px"
//		},700,"easeOutExpo",function(){
//			psts=0;//잠금상태 풀기~! 이제 드루와~~~!
//		});//animate
//		
//		
//		
//	});//on
	
	// ************ 메뉴 클릭시 이동하기*************
	jQuery("#top ul li a").click(function(e){
		e.preventDefault();
		var seq = jQuery(this).parent().index()+1;//이동할 페이지 순번
		scNum = seq;//전역페이지변수 변경
		//alert(seq);
		
		//페이지별 액션주기
		pageAction();//페이지액션 함수 호출!		
		
		// 페이지 이동 애니메이션
		jQuery("html,body").animate({
			scrollTop : jQuery("body>section").eq(scNum).offset().top + "px"
		},700,"easeOutExpo");//animate
	});//메뉴클릭
	
	//로고클릭
	jQuery("#top>img").click(function(){
		scNum=0;//전역변수 변경
		pageAction();//페이지액션호출
		
		jQuery("html,body").animate({
			scrollTop : jQuery("body>section").eq(0).offset().top + "px"
		},700,"easeOutExpo");//animate
	});//로고클릭
	
	//이미지, 글자 셋팅
	if(mob==0)//DT일때
	{
		/*//1페이지
		jQuery("#cont1 img").css({"top":"20%","opacity":"0"});
		jQuery("#cont1 h1").css({"top":"70%","opacity":"0"});
		//2페이지
		jQuery("#cont2 img").css({"top":"20%","opacity":"0"});
		jQuery("#cont2 h1").css({"top":"70%","opacity":"0"});
		//3페이지
		jQuery("#cont3 li img").css({"top":"20%","opacity":"0"});
		jQuery("#cont3 h1").eq(0).css({"top":"50%","opacity":"0"});
		jQuery("#cont3 h1").eq(1).css({"top":"90%","opacity":"0"});*/
	}
	// toggle(함수1, 함수2, 함수3,......) 클릭시 마다 순서대로 실행됨
	var hamsts=0;
	jQuery("#ham").toggle(
		function(){//x만들기
			if(hamsts==1)return false;
			hamsts=1;
			jQuery("#ham div").eq(0).css({"top":"10px","transform":"rotate(45deg)"});
			jQuery("#ham div").eq(1).css({"left":"20px","width":"0"});
			jQuery("#ham div").eq(2).css({"top":"10px","transform":"rotate(-45deg)"});
			//메뉴보이기
			jQuery("#menu").animate({width:"100%"},800,function(){hamsts=0;});
		},
		function(){//햄버거
			if(hamsts==1)return false;
			hamsts=1;
			jQuery("#ham div").eq(0).css({"top":"0px","transform":"rotate(0deg)"});
			jQuery("#ham div").eq(1).css({"left":"0px","width":"100%"});
			jQuery("#ham div").eq(2).css({"top":"20px","transform":"rotate(0deg)"});
			//메뉴감추기
			jQuery("#menu").animate({width:"0"},800,function(){hamsts=0;});
	});
	
	/*위로이동 버튼 클릭시 맨위로 이동*/
	jQuery("#tbtn").click(function(){
		jQuery("html,body").animate({
			scrollTop:0
		},800);
		scNum=0;//전역페이지변수 초기화!!!!
		pageAction();//메뉴변경위해 호출
	});
	
	
	
});//jQB


/*
	함수명: pageAction()
	기능 : 각 페이지별 액션주기
*/
function pageAction(){
	if(mob==1)return false;//모바일일때 아래 코드 실행안함
	
	//scNum 현재 페이지 전역변수
	if(scNum == 0){//첫페이지
		jQuery("#top").children("img").animate({width:"15%",marginTop:"3%"},200);
		jQuery("#top").children(".obg").animate({opacity:"0"},200);
		jQuery("#top>ul>li>a").css("color","#fff");//메뉴 글자색 모두 흰색!
		jQuery("#tbtn").fadeOut(300);//탑버튼 사라짐
	}
	else{//다른 하위 페이지
		jQuery("#top").children("img").animate({width:"11%",marginTop:"1%"},200);
		jQuery("#top").children(".obg").animate({opacity:"0.5"},200);	
		//페이지 이동시 해당메뉴 글자색 변경
		jQuery("#top>ul>li>a").css("color","#fff").eq(scNum-1).css("color","yellow");
		
		jQuery("#tbtn").fadeIn(300);//탑버튼 나타남
		
		
		if(scNum==1){//하위1번페이지
			jQuery("#cont1 img").animate({"top":"0%","opacity":"1"},1200);
			jQuery("#cont1 h1").delay(500).animate({"top":"50%","opacity":"1"},1200);
		}
		else if(scNum==2){//하위2번페이지
			jQuery("#cont2 img").animate({"top":"0%","opacity":"1"},1200);
			jQuery("#cont2 h1").delay(500).animate({"top":"50%","opacity":"1"},1200);
		}
		else if(scNum==3){//하위3번페이지
			jQuery("#cont3 li:eq(0) img").animate({"top":"0%","opacity":"1"},1200);
			jQuery("#cont3 li:eq(2) img").animate({"top":"0%","opacity":"1"},1200);
			jQuery("#cont3 h1").eq(0).delay(500).animate({"top":"30%","opacity":"1"},1200);
			jQuery("#cont3 h1").eq(1).delay(500).animate({"top":"70%","opacity":"1"},1200);
		}
		
	}
	
	
}//pageAction

var acall;//setInterval함수용
jQuery(function(){//jQB2/////////////////////////////////////
	//자동슬라이드 함수호출하기
	acall = setInterval(flowImg,20);
	
	//마우스 오버시 멈춤, 아웃시 다시 실행
	jQuery(".flowImg").hover(
		function(){//over
			clearInterval(acall);
		},
		function(){//out
			acall = setInterval(flowImg,20);
		});//hover//////////////////////////
	
	/////수량증감 버튼 클릭시 계산함수 호출하기/////
	jQuery(".chg_num>img").click(function(){
		var idx = jQuery(this).index();//이미지순번
		sumit(idx);//idx가 0이면 수량증가, 1이면 감소
		
	});//////click////
	
	
	
	
	
});//jQB2/////////////////////////////////////////////

/*
	함수명: flowImg
	기능: 이미지를 왼쪽으로 계속이동하여 흐르게함
*/
var fnum = 0;//이동픽셀수 전역변수
function flowImg(){
	//이미지 하나의 width 크기 측정
	var iw = jQuery(".flowImg img").first().width();
	
	fnum--;//픽셀수 1씩감소
	
	//이미지 하나의 width크기만큼 left값이 되면 나간 이미지 잘라서 맨뒤로 보내고 css값 0으로 초기화하기
	if(fnum<=-iw){
		jQuery(".flowImg").append(jQuery(".flowImg li").first())
		.css({left:"0"});
		fnum=0;//픽셀수 초기화
	}//if문/////
	
	jQuery(".flowImg").css({left:fnum+"px"});
	
}///flowImg함수/////////////////////////////////////

//////////////////////////////////////////////////////
///////////////수량증감함수///////////////////////
num=1;
function sumit(sts){//alert(sts);
	if(sts==0)num++;
	else num--;
	if(num==0)num=1;//한계수
	var target= document.getElementById("sum");
	target.value = num;
	
	//가격계산
	var price = document.getElementById("gprice");//기본가격
	var total = document.getElementById("total");//토탈
	price = price.innerHTML.split(",");
	price = price[0]+price[1].replace("원","");//숫자만추출
	price = Number(price)*num;	//토탈계산
	price = numberWithCommas(price);//점찍어서 오기
	total.innerHTML = price;	
}

//정규식함수(숫자 세자리마다 콤마해주는 기능)
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


















