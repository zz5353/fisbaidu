$(document).ready(function() {
    /*更多产品  begin*/
    $("#more").mouseover(function() {
        $("#more-list").css("display", "block");
        $("#more").css({ "background": "#fff", "color": "#333" })
    });
    $("#more").mouseleave(function() {
        $("#more-list").css("display", "none");
        $("#more").css({ "background": "#398bfb", "color": "#fff" })
    });
    /*更多产品  end*/

    /*换肤  begin*/
    $("#change-skin").click(function() {

        $("#skin").animate({ height: '310px' });
        var $xz = parseInt(localStorage.getItem("selected-x"));
        var $yz = parseInt(localStorage.getItem("selected-y"));
        $('#selected').css({ "left": $xz, "top": $yz });

    });
    /*换肤  end*/

    /*收起 begin*/
    $("#close").click(function() {
        $("#skin").animate({ height: '0px' });
        var def = localStorage.getItem("src");
        if (def) {
            $('.header').css("background", "rgba(0,0,0,0.5)")
            $('.nav-left>a,.nav-left>span,.nav-right>a,.nav-right>div,#change-skin').css("color", "#fff");
            $("button").css({ "background": "#ccc", "color": "#333", "border-color": "#ccc" });
            $("#logo").attr('src', "images/logo_white.png");

        } else {
            $("button").css({ "background": "#3385ff", "color": "#fff", "border-color": "#3385ff" });
            $("#logo").attr('src', "images/bd_logo1.png");
            $('.nav-left>a,.nav-left>span,.nav-right>a,.nav-right>div,#change-skin').css("color", "#333");
        }
    });
    /*收起 end*/

    /*滑动改变透明度 begin*/
    function range() {
        var $box = $('#box');
        var $bg = $('#bg');
        var $ads = $('#ads');
        var $text = $('#text');
        var statu = false; //用于判断鼠标是否按下
        var ox = 0;
        var lx = 0;
        var left = 0;
        $ads.mousedown(function(e) {
            lx = $ads.offset().left; //获取x方向偏移值
            ox = e.pageX - left; //获取偏移前的x坐标
            statu = true;
            console.log(e.pageX);
        });
        $(document).mouseup(function() {
            statu = false;
        });
        $box.mousemove(function(e) {
            if (statu) { //当鼠标按下时，鼠标拖动，滑块滑动
                left = e.pageX - ox; //获取x方向的偏移量
                if (left < 0) {
                    left = 0;
                }
                if (left > 80) {
                    left = 80;
                }
                $ads.css('left', left);
                var opac = parseInt(left * 1.25) / 100;
                var rgba = 'rgba(255,255,255,' + (1 - opac) + ')';
                localStorage.setItem("rgba", rgba); //存储透明度
                localStorage.setItem("left", left); //存储滑块偏移量
                $('.content').css("background", rgba);
                $text.html(parseInt(left * 1.25) + '%');

            }
        });
    }
    range();
    /*滑动改变透明度 end*/

    /*设置皮肤初始值 begin*/
    var def = localStorage.getItem("src");
    if (def) {
        $('#pv').attr("src", def);
        var rgba = localStorage.getItem("rgba");
        var left = localStorage.getItem("left");
        $('#ads').css("left", left + 'px');
        $('#text').html(parseInt(left * 1.25) + '%');
        $('body').css("background-image", 'url('+def+')');
        $('.content').css("background", rgba);
        $("button").css({ "background": "#ccc", "color": "#333", "border-color": "#ccc" });
        // $("#logo").attr('src', "images/logo_white.png");
        $('.header').css("background", "rgba(0,0,0,0.1)")
        $('.nav-left>a,.nav-left>span,.nav-right>a,.nav-right>div').css("color", "#fff");
        $('#change-skin').css("color", "#fff");
        $('.footer').css("color", "#fff");
        $('.footer>a').css("color", "#fff");
    } else {
        noSkin();
    }
    /*设置皮肤初始值 end*/

    /*皮肤预览 begin*/
    $(".ski").each(function() {
        $(this).mouseover(function() {
            var imgsrc = $(this).attr("src");
            $('#pv').attr("src", imgsrc);
            $('#pv').css("opacity", "1");
            // $('#logo-perview').attr("src", "images/logo-perview.png");
        })
    });
    var def = localStorage.getItem("src");

    $("#ski").mouseleave(function() {
        var def = localStorage.getItem("src");
        if (def) {
            $('#pv').attr("src", def);

        } else {
            noSkin();
        }

    })

    $(".ski").each(function() {
        $(this).click(function() {
            $('#bgs').css("display", "inline-block");
            $('#no-skin').css("display", "inline-block");
            $('#box').css("display", "inline-block");
            var imgsrc = $(this).attr("src");
            localStorage.setItem("src", imgsrc);
            $('body').css("background-image", 'url('+imgsrc+')');
            $('.footer').css("color", "#fff");
       		$('.footer>a').css("color", "#fff");
            console.log(imgsrc);
        });
    });


    $(".img-all").each(function() {
        $(this).click(function() {
            var $a = $(this).css("left");
            var $b = $(this).css("width");
            var $c = $(this).css("top");
            var $d = $(this).css("height");
            var $x = parseInt($a) + parseInt($b);
            var $y = parseInt($c) + parseInt($d);
            localStorage.setItem("selected-x", $x);
            localStorage.setItem("selected-y", $y);
            $('#selected').css({ "left": $x, "top": $y });
        });
    });
    /*皮肤预览 end*/


    /*不使用皮肤 begin*/
    $("#no-skin").on("click", noSkin);

    function noSkin() {
        $('#pv').css("opacity", "0");
        // $('#logo-perview').attr("src", "images/logo-perview-de.png");
        $('#bgs').css("display", "none");
        $('#no-skin').css("display", "none");
        $('#box').css("display", "none");
        localStorage.setItem("src", "");
        var x = localStorage.getItem("src");        
        $('#selected').css({ "left": "-100px", "top": "-100px" });
        $('body').css("background-image", "none");
        $('.header').css("background", "#fff");
        $('.footer').css("color", "#333");
        $('.footer>a').css("color", "#333");
    }
    /*不使用皮肤 end*/

    /*主体部分tab选项卡切换  begin*/
    var $titles = $(".content-list>li");
    var $mains = $(".content-main");

    $titles.each(function() {
        $(this).mousedown(function() {

            $titles.each(function() {
                $(this).attr("class", "");
            });
            $(this).attr("class", "content-selected");
            var x = $(this).index();
            var y = '.content>div:nth-of-type(' + (x + 1) + ')';
            $(".content-main").attr("id", "");
            $(y).attr("id", "main-selected");
        });
    });
    /*主体部分tab选项卡切换  end*/

});
