
/* 全てのスマホで幅320px(iphone)相当に見えるようにdpiを調整 */
jQuery(document).ready(function($) {
    /*
     Android の場合 DPIを調整
    =========================================*/
    $(window).on('resize.dpi', function () {

        // 指定済みの viewport を取得
        var BASE_PARAM = $('meta[name="viewport"]').attr('content');

        // Android スマートフォンのみに適用する（タブレットも対象にしたい場合は 'Mobile' の判定を削除）
        if (navigator.userAgent.indexOf('Android') != -1 && navigator.userAgent.indexOf('Mobile') != -1 && window.orientation === 0) {

            // デバイスのスクリーンの幅を取得する
            var width = $(window).width();

            // Android の仕様でDPI基準値となる 160 で固定
            var DEFAULT_DPI = 160;

            // iPhone の幅に合わせるので 320 固定
            // ※ガラケー基準の場合は、240 でも可
            var DEFAULT_WIDTH = 320;

            if (width !== DEFAULT_WIDTH) {

                // 320px で収まる DPI を計算する
                var dpi = DEFAULT_WIDTH / width * DEFAULT_DPI;

                // 幅が正常に取得できた時だけ （dpi の値が、仕様の 70-400 に収まる）
                // 幅が正常に取得できず DPI が異常値（70-400に入らない）になった場合に除外する
                if (dpi >= 70 && dpi <= 400) {
                    // Androidは「target-densitydpi」プロパティで、1インチの中に何ドット表示するかを設定して調整する
                    $('head').append('<meta name="viewport" content="target-densitydpi=' + dpi + ', ' + BASE_PARAM + '" />');
                }
            }
        }
    }).trigger('resize.dpi');

    pageScroll();
    rollover();
    common();

    modal();

    $(window).on('load',function(){
        $('a[href*=\\#]:not([href=\\#])').click(function() {

            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html,body').animate({
                    scrollTop: target.offset().top
                }, 800);
                return false;
                }
            }
        });
         //Executed on page load with URL containing an anchor tag.
        if($(location.href.split("#")[1])) {
            var target = $('#'+location.href.split("#")[1]);
            if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 800);
                return false;
            }
        }
    });
    // $(document).on("scroll", onScroll);
    // function onScroll(event){
    //     var scrollPos = $(document).scrollTop();
    //     $('.fixed-left a').each(function () {
    //         var currLink = $(this);
    //         var refElement = $(currLink.attr("href"));
    //         if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
    //             $('.fixed-left a').removeClass("active");
    //             currLink.addClass("active");
    //         }
    //         else{
    //             currLink.removeClass("active");
    //         }
    //     });
    // }


});

$(function() { //IE8のalpha使用時に発生の黒枠を消す
    if(navigator.userAgent.indexOf("MSIE") != -1) {
        $('img').each(function() {
            if($(this).attr('src').indexOf('.png') != -1) {
                $(this).css({
                    'filter': 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' +
                    $(this).attr('src') +
                    '", sizingMethod="scale");'
                });
            }
        });
    }
});

/* !isUA -------------------------------------------------------------------- */
var isUA = (function(){
    var ua = navigator.userAgent.toLowerCase();
    indexOfKey = function(key){ return (ua.indexOf(key) != -1)? true: false;}
    var o = {};
    o.ie      = function(){ return indexOfKey("msie"); }
    o.fx      = function(){ return indexOfKey("firefox"); }
    o.chrome  = function(){ return indexOfKey("chrome"); }
    o.opera   = function(){ return indexOfKey("opera"); }
    o.android = function(){ return indexOfKey("android"); }
    o.ipad    = function(){ return indexOfKey("ipad"); }
    o.ipod    = function(){ return indexOfKey("ipod"); }
    o.iphone  = function(){ return indexOfKey("iphone"); }
    return o;
})();

/* !init Smart Devices ------------------------------------------------------*/
(function (){
    var parentNode = document.getElementsByTagName('head')[0];
    var viewport = {
        withzoom:'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        android : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        ipad    : 'width=1200  user-scalable=no',
        //iphonescale1  : 'width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
        iphone  : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }
    meta = document.createElement('meta');
    meta.setAttribute('name','viewport');

    if( isUA.android() ){
        meta.setAttribute('content',viewport.android);
        parentNode.appendChild(meta);
    }else if( isUA.ipad() ){
        meta.setAttribute('content',viewport.ipad);
        parentNode.appendChild(meta);
    }else if( isUA.ipod() || isUA.iphone() ){
        meta.setAttribute('content',viewport.iphone);
        parentNode.appendChild(meta);
        window.addEventListener('load', function(){ setTimeout(scrollTo, 100, 0, 1);}, false);
    }else{
    }
})();
/* !rollover ---------------------------------------------------------------- */
var rollover = function(){
	var suffix = { normal : '_no.', over   : '_on.'}
	$('a.over, img.over, input.over').each(function(){
		var a = null;
		var img = null;

		var elem = $(this).get(0);
		if( elem.nodeName.toLowerCase() == 'a' ){
			a = $(this);
			img = $('img',this);
		}else if( elem.nodeName.toLowerCase() == 'img' || elem.nodeName.toLowerCase() == 'input' ){
			img = $(this);
		}

		var src_no = img.attr('src');
		var src_on = src_no.replace(suffix.normal, suffix.over);

		if( elem.nodeName.toLowerCase() == 'a' ){
			a.bind("mouseover focus",function(){ img.attr('src',src_on); })
			 .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'img' ){
			img.bind("mouseover",function(){ img.attr('src',src_on); })
			   .bind("mouseout", function(){ img.attr('src',src_no); });
		}else if( elem.nodeName.toLowerCase() == 'input' ){
			img.bind("mouseover focus",function(){ img.attr('src',src_on); })
			   .bind("mouseout blur",  function(){ img.attr('src',src_no); });
		}

		var cacheimg = document.createElement('img');
		cacheimg.src = src_on;
	});
};
/* !pageScroll -------------------------------------------------------------- */
var pageScroll = function(){
	jQuery.easing.easeInOutCubic = function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	}; 
	// $('a.scroll, .scroll a').each(function(){
	// 	$(this).bind("click keypress",function(e){
	// 		e.preventDefault();
	// 		var target  = $(this).attr('href');
	// 		var targetY = $(target).offset().top;
	// 		var parent  = ( isUA.opera() )? (document.compatMode == 'BackCompat') ? 'body': 'html' : 'html,body';
	// 		$(parent).animate(
	// 			{scrollTop: targetY },
	// 			400
	// 		);
	// 		return false;
	// 	});
	// });
    $(window).scroll(function(){
        scroll_menu();
    });
    function scroll_menu(){
        var scrollTop	= parseInt($(document).scrollTop());
        if(scrollTop > 150) {
            $('.pageTop').fadeIn();
        } else {
            $('.pageTop').fadeOut();
        }
    }
	$('.pageTop a, .spPageTop a').click(function(){
		$('html,body').animate({scrollTop: 0}, 'slow','swing');
		return false;
	});
}



/* !common --------------------------------------------------- */
var common = (function(){
	// $('#globalnavi li').hover(function(){
	// 	if($(this).has('ul'))
	// 		$(this).find('ul').stop().fadeIn(800);
	// },function(){
	// 	if($(this).has('ul'))
	// 		$(this).find('ul').stop().fadeOut(800);
	// });
    $("#globalnavi li").hover(function (e) {
        e = e || window.event;
        e.stopPropagation?e.stopPropagation():e.cancelBubble=true;
        if($(this).has("ul"))
            $(this).find("ul").stop().addClass("pulldownmenu01").fadeIn(200);
        },function () {
        if($(this).has('ul'))
        	$(this).find('ul').stop().removeClass("pulldownmenu01");

    })
    $('.navbar-toggle').on('click',function(){
        var target = $(this).data('target');
        if($(target).hasClass("on")){
            $(target).stop().fadeOut(200).removeClass("on");
            $(this).removeClass("on");
            $(".navbar-toggle img").attr("src","images/common/header_sp_menu.png")
        }else{
            $(target).stop().fadeIn(200).addClass("on");
            $(this).addClass("on");
            $(".navbar-toggle img").attr("src","images/common/header_sp_menu_close.png")
        }
    });
   	$(".spmenubtn").click(function () {
		if($(".navbar-collapse").hasClass("spnavbar_show")){
			$(".navbar-collapse").removeClass("spnavbar_show");
		}
    })

        $('.toggle').click(function(){
        if($(this).hasClass("on")){
            $(this).next().stop().slideUp(200);
            $(this).removeClass("on");
        }else{
            $(this).next().stop().slideDown(200);
            $(this).addClass("on");
        }
    });
	$('.btnCloseMenu a').click(function(){
		$('#headerMenu').stop().slideUp(200).removeClass("on");
		$('.navbar-toggle').removeClass("on");
		return false;
	});
    $(function () {
        $(".sidetop").click(function () {
            if($(".sidebom").hasClass("on")){
                $(".sidebom").removeClass("on")
                $(".sidetop img").attr("src","images/common/img_side03.png");
            }else {
                $(".sidebom").addClass("on")
                $(".sidetop img").attr("src","images/common/img_side04.png");
            }
        })
    })
	$('#headerMenu .subBtn, #footerMenu .subBtn').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).next().stop().slideUp(200);
		}else{
			$(this).parent().addClass('on');
			$(this).next().stop().slideDown(200);
		}
		return false;
	});
	$(window).resize(function (event) {
		if($('.visible-ts').css('display') == 'none') {
			var target = $('.navbar-toggle').data('target');
			$(target).hide().removeClass("on");
			$('.navbar-toggle').removeClass("on");
		}
	});
	
});


function modal() {

    const $modalOpen    = $('.js-modal-open');
    const $modal        = $('.js-modal');
    const $modalButton  = $('.js-modal-button');

    $modalOpen.on('click', function(e) {

        e.preventDefault();

        let modal = $(this).attr('data-modal');

        $('.js-modal-' + modal).fadeIn();

    });

    $modalButton.on('click', function() {

        $modal.fadeOut(200);

    });

}
