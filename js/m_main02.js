////m_main02.js
$(document).ready(function () {
    // $(".draggable").animate({
    //     left: -num * 100 + "%"
    // }, 800, "easeInQuad"); /////ani

    // var Timer = setInterval(scrollDown, 500);

    // function scrollDown() {
    //     var win = $(window).width();
    //     $('.draggable').animate({
    //         left: -win * 1 + "px"
    //     }, 500, 'easeInQuad')
    // };


    $('.c_btn li').click(function () {
        $('.c_btn li').removeClass('on');
        $(this).addClass('on');

        var num = $(this).index();
        console.log(num)

        $('.draggable').animate({
            left: -num * 100 + "%"
        }, 500, 'easeInQuad');
    });




});