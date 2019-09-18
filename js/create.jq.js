//menu
document.getElementById('menu-switch').onclick = function(){
    console.log(this.style);
    if(this.parentNode.style.transform != 'translateX(0px)'){
        this.parentNode.style.transform = 'translateX(0)';
        // this.style.opacity = '0.5';
        document.getElementById('menu-switch').style.display = 'none';
    }else{
        this.parentNode.style.transform = 'translateX(-100%)';
        // this.style.opacity = '0.3';
        document.getElementById('menu-switch').style.display = 'block';
    }
}

document.getElementById('menu-close').onclick = function(){
    if(this.parentNode.style.transform != 'translateX(0px)'){
        this.parentNode.style.transform = 'translateX(0)';
        document.getElementById('menu-switch').style.display = 'none';
    }else{
        this.parentNode.style.transform = 'translateX(-100%)';
        document.getElementById('menu-switch').style.display = 'block';
    }
}

var list = document.querySelectorAll('.menu > ul li > a');
for(var i = 0;i < list.length;i ++){
    list[i].onclick = function(event){
        // console.log(event);
        var arrow = event.target.children[0];
        var menu = event.target.parentNode.children[1];
        if(menu != undefined && menu.children.length > 0){
            if(menu.style.height != '0px' && menu.style.height != ''){
                menu.style.height = '0px';
                arrow.style.transform = 'rotate(0deg)';
            }else{
                menu.style.height = menu.children.length * 30 + 'px';
                arrow.style.transform = 'rotate(180deg)';
                var others = document.querySelectorAll('.menu > ul div');
                // var otherArrows = document.querySelectorAll('.menu a > span');
                // console.log(list1);
                for(var j = 0;j < others.length;j ++){
                    // console.log(others[j].parentNode.children[0].children[0]);
                    if(others[j] != menu){
                        others[j].style.height = '0px';
                        others[j].parentNode.children[0].children[0].style.transform = 'rotate(0deg)';
                    }
                }   
            }
        }
    }
}

//drag
/* 拖动时触发*/
document.addEventListener("dragstart", function(event) {
    // console.log(event);
    var target = document.getElementById(event.target.id);
    var disX = event.x - target.offsetLeft;
    var disY = event.y - target.offsetTop;
    event.dataTransfer.setData("dragId",target.id);
    event.dataTransfer.setData('disX',disX);
    event.dataTransfer.setData('disY',disY);
    //修改拖动元素的透明度
    event.target.style.opacity = "0.3";
});
//在拖动某元素的同时,改变输出文本的颜色
document.addEventListener("drag", function(event) {
    // console.log(event);
    if(event.target.className.indexOf('obj') == -1){
        event.target.style.cursor = 'no-drop';
    }
});

// 当拖完某元素输出一些文本元素和重置透明度
document.addEventListener("dragend", function(event) {
    event.target.style.opacity = "1";
});

/* 拖动进入某元素后触发 */
document.addEventListener("dragenter", function(event) {
    if ( event.target.className.indexOf("drop") != -1 ) {
        event.target.style.borderColor = "blue";
    }
});

// 默认情况下,数据/元素不能在其他元素中被拖放。对于drop我们必须防止元素的默认处理
document.addEventListener("dragover", function(event) {
    event.preventDefault();
});

// 当可拖放的某元素离开droptarget，重置div的边框样式
document.addEventListener("dragleave", function(event) {
    if ( event.target.className.indexOf("drop") != -1 ) {
        event.target.style.border = "dashed 1px #b7b7b7";
    }
});

//拖拽完成
document.addEventListener("drop", function(event) {
    console.log(event);
    event.preventDefault();
    if ( event.target.className.indexOf("obj") != -1 ) {
        console.log(event);
        event.preventDefault();
        var dragId = event.dataTransfer.getData("dragId");
        var disX = event.dataTransfer.getData("disX");
        var disY = event.dataTransfer.getData("disY");
        var drag = document.getElementById(dragId);
        // var left = (event.x - disX) < 0 ? 0 : (event.x - disX);
        // var top = (event.y - disY) < 0 ? 0 : (event.y - disY);
        var left = event.x - disX;
        var top = event.y - disY;
        // left = (left + drag.offsetWidth) > (event.target.offsetLeft + event.target.offsetWidth) ? (event.target.offsetLeft + event.target.offsetWidth - drag.offsetWidth - Number($(event.target).css('border-width').replace('px',''))) : left;
        // left = left < event.target.offsetLeft ? event.target.offsetLeft : left;
        drag.style.left = left + 'px';
        drag.style.top = top + 'px';
        drag.style.right = '';
        drag.style.bottom = '';
        // console.log(drag.offsetWidth);
        // console.log(event.target.style.borderWidth);
        // console.log(event.target.offsetLeft);
        // console.log(event.target.offsetWidth);
        if(drag.parentNode != event.target){
            event.target.appendChild(drag);
        }
        event.target.style.border = "dashed 1px #b7b7b7";
    }
});

//拖动、放大
document.addEventListener('mousedown',function(event){
    console.log('mousedown');
    console.log(event);
    var target = event.target;
    getStyle(target);
    if(target.className.indexOf('scale') != -1){
        // 阻止冒泡,避免缩放时触发移动事件
        event.stopPropagation();
        event.preventDefault();
        var parent = event.target.parentNode;
        var pos = {
            'w': parent.offsetWidth,
            'h': parent.offsetHeight,
            'x': event.clientX,
            'y': event.clientY
        };
        console.log(pos);
        document.onmousemove = function (ev) {
            console.log('parent.onmousemove');
            ev.preventDefault();
            // 设置图片的最小缩放为30*30
            var w = Math.max(30, ev.clientX - pos.x + pos.w)
            var h = Math.max(30, ev.clientY - pos.y + pos.h)
            // console.log(w,h)

            // 设置图片的最大宽高
            w = w >= ev.offsetWidth - parent.offsetLeft ? ev.offsetWidth - parent.offsetLeft : w
            h = h >= ev.offsetHeight - parent.offsetTop ? ev.offsetHeight - parent.offsetTop : h
            parent.style.width = w + 'px';
            parent.style.height = h + 'px';
        }
    }
    if(target.id.indexOf('bar-drag') != -1 || target.id.indexOf('bar-icon') != -1){
        console.log(event);
        var bar;
        if(target.id.indexOf('bar-drag') != -1){
            bar = event.target.parentNode.parentNode.parentNode;
        }else{
            bar = event.target.parentNode.parentNode.parentNode.parentNode;
        }
        // console.log(event.x,bar.offsetLeft);
        // console.log(event.y,bar.offsetTop);
        var disX = event.x - bar.offsetLeft;
        var disY = event.y - bar.offsetTop;
        document.onmousemove = function (ev) {
            // console.log(ev.x,disX);
            // console.log(ev.y,disY)
            ev.preventDefault();
            bar.style.left = ev.x - disX + 'px';
            bar.style.top = (ev.y - disY) <= 0 ? 0 - 12 : (ev.y - disY - 12) + 'px';
            bar.style.right = '';
        }
    }
    document.onmouseleave = function () {
        document.onmousemove = null;
        document.onmouseup = null;
    }
    document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
    } 
})


var _that;
//get element style
function getStyle(_this){
    if(_this.className.indexOf('obj') != -1){
        _that = _this;
        var width = $(_this).css('width');
        console.log('width:' + width);
        var height = $(_this).css('height');
        console.log('height:' + height);
        var borderStyle = $(_this).css('border-style');
        var borderColor = $(_this).css('border-color');
        var borderWidth = $(_this).css('border-width');
        var borderRadius = $(_this).css('border-radius');
        console.log('border-style:' + borderStyle);
        console.log('border-color:' + borderColor);
        console.log('border-width:' + borderWidth);
        console.log('border-radius:' + borderRadius);
        var bgColor = $(_this).css('background-color');
        var bgImage = $(_this).css('background-image');
        console.log('bg-color:' + bgColor);
        console.log('bg-image:' + bgImage);
        var fontColor = $(_this).css('color');
        var fontSize = $(_this).css('font-size');
        var fontShadow = $(_this).css('text-shadow');
        console.log('font-color:' + fontColor);
        console.log('font-size:' + fontSize);
        console.log('font-shadow:' + fontShadow);
        var boxShadow = $(_this).css('box-shadow');
        console.log('box-shadow:' + boxShadow);
        var cursor = $(_this).css('cursor');
        console.log('cursor:' + cursor);
        var opacity = $(_this).css('opacity');
        console.log('opacity:' + opacity);
        var padding = $(_this).css('padding');
        console.log('padding:' + padding);
        var margin = $(_this).css('margin');
        console.log('margin:' + margin);
    
        $('#width').val(width.replace('px',''));
        $('#height').val(height.replace('px',''));
        $('#border-color').val(borderColor);
        $('#border-color').colorPicker({
            color: borderColor,
            customBG: borderColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(elm.text != null && elm.text != ''){
                    $(_that).css(colorType,elm.text);
                }
            }
        });
        $('#border-width').val(borderWidth.replace('px',''));
        $('#border-radius').val(borderRadius.replace('px',''));
        $('#background-color').val(bgColor);
        $('#background-color').colorPicker({
            color: bgColor,
            customBG: bgColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(elm.text != null && elm.text != ''){
                    $(_that).css(colorType,elm.text);
                }
            }
        });
        $('#font-color').val(fontColor.replace('px',''));
        $('#font-color').colorPicker({
            color: fontColor,
            customBG: fontColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(elm.text != null && elm.text != ''){
                    $(_that).css(colorType,elm.text);
                }
            }
        });
        $('#font-size').val(fontSize.replace('px',''));

        // console.log(_this.offsetTop);
        // console.log(_this.offsetLeft);
        // $('#bar').css({
        //     top:_this.offsetTop,
        //     left:_this.offsetLeft,
        //     right:''
        // });
    }

}

var colorType;
//initialize
$(function(){
    //bar location
    var top = $(window).height() / 2 - $('.bar').height() / 2;
    $('.bar').css({
        display:'block',
        top:top + 'px',
        right:'30px'
    })
    //color panel
    // $('.color').colorPicker({
    //    renderCallback: function(elm, toggled) {
    //        console.log(elm.text);
    //        if(elm.text != null && elm.text != ''){
    //            $(_that).css(colorType + '-color',elm.text);
    //        }
    //    }
    // });
});

//bar hover event
$('.bar > dd > div').hover(function(ev){
    // console.log(ev);
    // console.log($(this.children[1].children[0]).width());
    var width = 0;
    $(this.children[1].children).each(function(){
        if($(this).css('display') != 'none'){
            width += $(this).outerWidth(true);
            // console.log($(this).css('width'));
            // console.log($(this).outerWidth(true));
        }
    });
    width = width > 0 ? width + 30 : 0;
    // console.log(width);
    var x = this.parentNode.parentNode.offsetLeft;
    var offsetX = $(window).width() - x;
    var left = offsetX >= (width + 50) ? '50' : '-' + width;
    var bc = 'rgba(200,200,200,0.7)';
    $(this).css({
        background:bc
    });
    $(this.children[1]).css({
        left:left + 'px',
        width:width + 'px',
        background:bc
    });
},function(ev){
    $(this).css({background:''});
    $(this.children[1]).css({
        width:'0px',
        background:''
    });
});

//position change event
$('#position-top').click(function(){
    $(_that).css({top:0,bottom:''});  
});
$('#position-bottom').click(function(){
    // var p = $(_that.parentNode).innerHeight() - $(_that).outerHeight(); 
    $(_that).css({top:'',bottom:0});  
});
$('#position-center-hor').click(function(){
    // var p = $(_that.parentNode).innerWidth() / 2 - $(_that).outerWidth() / 2; 
    $(_that).css({left:0,right:0});  
});
$('#position-center-ver').click(function(){
    // var p = $(_that.parentNode).innerHeight() / 2 - $(_that).outerHeight() / 2; 
    $(_that).css({top:0,bottom:0});  
});
$('#position-left').click(function(){
    $(_that).css({'left':0,right:''});  
});
$('#position-right').click(function(){
    // var p = $(_that.parentNode).innerWidth() - $(_that).outerWidth(); 
    $(_that).css({'left':'',right:0});  
});

//width change event
$('#width').on('input propertychange',function(){
    $(_that).css('width',this.value + 'px');  
});
$('#width-100').on('click',function(){
    $(_that).css({left:0,'width':'100%'});
    $('#width').val($(_that).css('width').replace('px',''));
});

//height change event
$('#height').on('input propertychange',function(){
    $(_that).css('height',this.value + 'px');  
});
$('#height-100').on('click',function(){
    // $(_that).css({top:0,'height':$(_that).parent().innerHeight() - Number($(_that).css('border-width').replace('px','')) * 2});
    // $('#height').val($(_that).css('height').replace('px',''));
    $(_that).css({top:0,'height':'100%'});
    $('#height').val($(_that).css('height').replace('px',''));
});

//border-color change event
$('#border-color').on('click',function(){
    colorType = 'border-color';
});
//background-color change event
$('#background-color').on('click',function(){
    colorType = 'background-color';
});
//font-color change event
$('#font-color').on('click',function(){
    colorType = 'color';
});
//shadow-color change event
$('#shadow-color').on('click',function(){
    colorType = 'shadow-asdfaskjdfkasdkfjahksdfh';
});

//border-width change event
$('#border-width').on('input propertychange',function(){
    $(_that).css('border-width',this.value + 'px');  
});

//border-radius change event
$('#border-radius').on('input propertychange',function(){
    $(_that).css('border-radius',this.value + 'px');
});

//font-size change event
$('#font-size').on('input propertychange',function(){
    $(_that).css('font-size',this.value + 'px');
});
//text-align-center event
$('#text-align-center').click(function(){
    $(_that).css('text-align','center');
});

//background-opacity change event
// $('#background-opacity-r').on('input propertychange',function(){
//     $('#background-opacity').val(this.value);    
// });
// $('#background-opacity').on('input propertychange',function(){
//     $('#background-opacity-r').val(this.value);
// });

//opacity change event
$('#opacity-r').on('input propertychange',function(){
    $('#opacity').val(this.value);    
});
$('#opacity').on('input propertychange',function(){
    $('#opacity-r').val(this.value);
});

//image upload event
$('#background-img-upload').click(function(){
    $('#background-img').click();
});
