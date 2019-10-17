$('.main').mousemove(function(e) {
    var x = (e.pageX * -1 / 10), y = (e.pageY * -1 / 10);
    $(this).css('background-position', x + 'px ' + y + 'px');
    // var x2 = (e.pageX * -1 / 5) + 400, y2 = (e.pageY * -1 / 5) + 400;
    // $('#widget').css({'left': x2 + 'px','top':y2 + 'px'});
});