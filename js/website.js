$(function() {
	banner();
	ourHardwareBanner();
	dataDownload();
	showHeader();
	$(".nav li").click(function() {
		var _this = $(this);
		judePcOrPhone(function() {
			_this.addClass("selected").siblings().removeClass("selected");
			$(".open-nav-btn").click();
		}, function() {
			_this.addClass("selected").siblings().removeClass("selected");
		});
	})
});

function banner() {
	var mySwiper = new Swiper('.banner .swiper-container', {
		direction: 'horizontal',
		loop: true,
		autoplay: {
			delay: 5000,
			stopOnLastSlide: false,
			disableOnInteraction: true,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	})
}

function ourHardwareBanner() {
	var mySwiper = new Swiper('.our-hardware-banner .swiper-container', {
		effect: 'coverflow',
		loop: true,
		grabCursor: true,
		slidesPerView: 2,
		centeredSlides: true,
		coverflowEffect: {
			rotate: 45,
			stretch: 0,
			depth: 10,
			modifier: 1,
			slideShadows: false
		},
		on: {
			slideChange: function() {
				$(".our-hardware-banner-title").text(this.slides.eq(this.activeIndex).attr("data-title"));
				$(".our-hardware-banner-con").text(this.slides.eq(this.activeIndex).attr("data-con"));
			}
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true
		},
	})
}

function dataDownload() {
	var mySwiper = new Swiper('.data-download-box .swiper-container', {
		slidesPerView: 4,
		spaceBetween: 18,
		grabCursor: true
	})
}

function judePcOrPhone(phoneCallBack, pcCallBack) {
	var sUserAgent = navigator.userAgent.toLowerCase();
	var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
	var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
	var bIsMidp = sUserAgent.match(/midp/i) == "midp";
	var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
	var bIsAndroid = sUserAgent.match(/android/i) == "android";
	var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
	var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
	if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
		phoneCallBack();
	} else {
		pcCallBack();
	}
}

//tab切换
function showProduct(i) {
	var len = $(".tab-opera li").length;
	if(i == len - 1) {
		$(".icon-right").addClass("icon-right-disabled").attr("onclick", "");
		$(".icon-left").removeClass("icon-left-disabled").attr("onclick", "leftTab();");
	} else if(i == 0) {
		$(".icon-left").addClass("icon-left-disabled").attr("onclick", "");
		$(".icon-right").removeClass("icon-right-disabled").attr("onclick", "rightTab();");
	} else {
		$(".icon-left").removeClass("icon-left-disabled").attr("onclick", "leftTab();");
		$(".icon-right").removeClass("icon-right-disabled").attr("onclick", "rightTab();");
	}
	$(".tab-opera li").eq(i).addClass("selected").siblings().removeClass("selected");
	$(".tab-con-box li").eq(i).show().siblings().hide();
}

function clickTab(t) {
	var i = $(t).index();
	showProduct(i);
}

function rightTab() {
	var i = $(".tab-opera .selected").index();
	showProduct(i + 1);
}

function leftTab() {
	var i = $(".tab-opera .selected").index();
	showProduct(i - 1);
}

function showHeader() {
	var startTop = 0,
		scrollTop = 0;
	var criticalTop = $(".banner").height();
	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
		if(startTop <= scrollTop) {
			if(scrollTop > criticalTop) {
				judePcOrPhone(function() {}, function() {
					$(".header-box").slideUp(200);
				});
			}
		} else {
			judePcOrPhone(function() {}, function() {
				$(".header-box").slideDown(200);
			});
		}
		setTimeout(function() {
			startTop = scrollTop;
		}, 0);
	})
}

var openNavFlag = true;

function openNav(t) {
	var top = $(t).find(".top");
	var bottom = $(t).find(".bottom");
	if(openNavFlag == true) {
		openNavFlag = false;
		top.addClass("move-top45").removeClass("move-top0").addClass("top45").removeClass("top0");
		bottom.addClass("move-bottom45").removeClass("move-bottom0").addClass("bottom45").removeClass("bottom0");
		$(".header-box").animate({
			height: "100%"
		}, 200);
	} else {
		openNavFlag = true;
		top.removeClass("move-top45").addClass("move-top0").removeClass("top45").addClass("top0");
		bottom.removeClass("move-bottom45").addClass("move-bottom0").removeClass("bottom45").addClass("bottom0");
		$(".header-box").animate({
			height: "1rem"
		}, 200);
	}
}