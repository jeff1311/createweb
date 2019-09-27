var _that;//当前对象

//menu
document.getElementById('menu-switch').onclick = function(){
    console.log(this.style);
    if(this.parentNode.style.transform != 'translateX(0px)'){
        this.parentNode.style.transform = 'translateX(0)';
        document.getElementById('menu-switch').style.display = 'none';
    }else{
        this.parentNode.style.transform = 'translateX(-100%)';
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
                for(var j = 0;j < others.length;j ++){
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
    if ( event.target.className.indexOf("obj") != -1 || event.target.tagName == 'HTML') {
        event.preventDefault();
        var dragId = event.dataTransfer.getData("dragId");
        var disX = event.dataTransfer.getData("disX");
        var disY = event.dataTransfer.getData("disY");
        var drag = document.getElementById(dragId);
        var left = event.x - disX;
        var top = event.y - disY;
        drag.style.left = left + 'px';
        drag.style.top = top + 'px';
        drag.style.right = 'auto';
        drag.style.bottom = 'auto';
        // console.log(drag.parentNode != event.target);
        // console.log(drag != event.target);
        // console.log($(drag).find('.obj'));
        if(drag.parentNode != event.target && drag != event.target && checkChildren(event.target,$(drag).find('.obj'))){
            drag.style.left = '0px';
            drag.style.top = '0px';
            event.target.appendChild(drag);
        }
        setPosition(drag);
        // event.target.style.border = "dashed 1px #b7b7b7";
    }
});

//检查目标是否是当前拖拽对象的后代元素
function checkChildren(target,children){
    for(var i = 0;i < children.length;i ++){
        if(target == children[i]){
            return false;
        }
    }
    return true;
}

//拖动、放大
document.addEventListener('mousedown',function(event){
    console.log('mousedown');
    console.log(event);
    var target = event.target;
    setStyle(target);
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

            //bar value
            $('#width').val(w);
            $('#height').val(h);
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
        var disX = event.x - bar.offsetLeft;
        var disY = event.y - bar.offsetTop;
        document.onmousemove = function (ev) {
            ev.preventDefault();
            bar.style.left = ev.x - disX + 'px';
            bar.style.top = (ev.y - disY) <= 0 ? 0 : (ev.y - disY) + 'px';
            bar.style.right = 'auto';
            bar.style.bottom = 'auto';
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

//set position
function setPosition(_this){
    var top = $(_this).css('top');
    console.log('top:' + top);
    var left = $(_this).css('left');
    console.log('left:' + left);
    var right = $(_this).css('right');
    console.log('right:' + right);
    var bottom = $(_this).css('bottom');
    console.log('bottom:' + bottom);
    $('#top').val(top.replace('px',''));
    $('#left').val(left.replace('px',''));
    $('#right').val(right.replace('px',''));
    $('#bottom').val(bottom.replace('px',''));
}
//set element style
function setStyle(_this){
    if(_this.className.indexOf('obj') != -1){
        _that = _this;
        console.log(_this);
        setPosition(_this);
        var width = $(_this).css('width');
        console.log('width:' + width);
        $('#width').val(width.replace('px',''));

        var height = $(_this).css('height');
        console.log('height:' + height);
        $('#height').val(height.replace('px',''));

        var borderStyle = $(_this).css('border-style');
        var borderColor = $(_this).css('border-color');
        var borderWidth = $(_this).css('border-width');
        var borderRadius = $(_this).css('border-radius');
        console.log('border-style:' + borderStyle);
        console.log('border-color:' + borderColor);
        console.log('border-width:' + borderWidth);
        console.log('border-radius:' + borderRadius);
        $('#border-color').val(borderColor);
        $('#border-color').colorPicker({
            color: borderColor,
            customBG: borderColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(toggled == true){
                    
                }else if(toggled == false){
                    
                }else{
                    if(elm.text != null && elm.text != ''){
                        $(_this).css('border-color',elm.text);
                    }
                }
            }
        });
        $('#border-width').val(borderWidth.replace('px',''));
        $('#border-radius').val(borderRadius.replace('px',''));

        var bgColor = $(_this).css('background-color');
        var bgImage = $(_this).css('background-image');
        console.log('bg-color:' + bgColor);
        console.log('bg-image:' + bgImage);
        $('#background-color').val(bgColor);
        $('#background-color').colorPicker({
            color: bgColor,
            customBG: bgColor,
            renderCallback: function(elm, toggled) {
                if(toggled == true){
                    
                }else if(toggled == false){
                    
                }else{
                    if(elm.text != null && elm.text != ''){
                        $(_this).css('background-color',elm.text);
                    }
                }
            }
        });

        var fontColor = $(_this).css('color');
        var fontSize = $(_this).css('font-size');
        var fontShadow = $(_this).css('text-shadow');
        console.log(_this.id);
        console.log('font-color:' + fontColor);
        console.log('font-size:' + fontSize);
        console.log('font-shadow:' + fontShadow);
        $('#font-color').val(fontColor.replace('px',''));
        $('#font-color').colorPicker({
            color: fontColor,
            customBG: fontColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(toggled == true){
                    
                }else if(toggled == false){
                    
                }else{
                    if(elm.text != null && elm.text != ''){
                        $(_this).css('color',elm.text);
                    }
                }
            }
        });
        var fontShadowColor;
        if(fontShadow != 'none'){
            var fontShadowX;
            var fontShadowY;
            var fontShadowBlur;
            var lastIndex = fontShadow.lastIndexOf(')');
            fontShadowColor = fontShadow.substring(0,lastIndex + 1);
            var fontShadowParam = fontShadow.substring(lastIndex + 2).split(' ');
            fontShadowX = fontShadowParam[0];
            fontShadowY = fontShadowParam[1];
            fontShadowBlur = fontShadowParam[2];
            console.log(fontShadowBlur);
            $('#text-shadow-x').val(fontShadowX.replace('px',''));
            // $('#text-shadow-x-r').val(fontShadowX.replace('px',''));
            $('#text-shadow-y').val(fontShadowY.replace('px',''));
            // $('#text-shadow-y-r').val(fontShadowY.replace('px',''));
            $('#text-shadow-blur').val(fontShadowBlur.replace('px',''));
        }else{
            fontShadowColor = 'rgb(255,255,255)';
            $('#text-shadow-x').val(null);
            // $('#text-shadow-x-r').val(fontShadowX.replace('px',''));
            $('#text-shadow-y').val(null);
            // $('#text-shadow-y-r').val(fontShadowY.replace('px',''));
            $('#text-shadow-size').val(null);
        }
        console.log(fontShadowColor);
        $('#text-shadow-color').val(fontShadowColor);
        $('#text-shadow-color').colorPicker({
            color: fontShadowColor,
            customBG: fontShadowColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(toggled == true){
                    
                }else if(toggled == false){
                    
                }else{
                    if(elm.text != null && elm.text != ''){
                        var shadow = $(_that).css('text-shadow');
                        console.log(shadow);
                        var value;
                        var blurRadius;
                        if(shadow != 'none'){
                            var index = shadow.lastIndexOf(')');
                            // var color = fontShadow.substring(0,index + 1);
                            var param = shadow.substring(index + 2).split(' ');
                            var x = param[0];
                            var y = param[1];
                            blurRadius = param[2];
                            value = x + ' ' + y + ' ' + blurRadius + ' ' + elm.text;
                        }else{
                            blurRadius = '3px';
                            value = '0px 0px 3px ' + elm.text; 
                        }
                        // console.log(fontShadowSize);
                        console.log(value);
                        $(_this).css('text-shadow',value);
                        $('#text-shadow-size').val(blurRadius.replace('px',''));
                    }
                }
            }
        });
        $('#font-size').val(fontSize.replace('px',''));

        var textAlign = $(_this).css('text-align');
        console.log('text-align:' + textAlign);
        if(textAlign == 'center'){
            $('#text-pos-hor').prop('checked',true);
        }else{
            $('#text-pos-hor').prop('checked',false);
        }

        var boxShadow = $(_this).css('box-shadow');
        console.log('box-shadow:' + boxShadow);
        var boxShadowColor;
        if(boxShadow != 'none'){
            var boxShadowX;
            var boxShadowY;
            var boxShadowBlur;
            var boxShadowDiff;
            var lastIndex2 = boxShadow.lastIndexOf(')');
            boxShadowColor = boxShadow.substring(0,lastIndex2 + 1);
            var boxShadowParam = boxShadow.substring(lastIndex2 + 2).split(' ');
            boxShadowX = boxShadowParam[0];
            boxShadowY = boxShadowParam[1];
            boxShadowBlur = boxShadowParam[2];
            boxShadowDiff = boxShadowParam[3];
            console.log(boxShadowBlur);
            $('#box-shadow-x').val(boxShadowX.replace('px',''));
            $('#box-shadow-x-r').val(boxShadowX.replace('px',''));
            $('#box-shadow-y').val(boxShadowY.replace('px',''));
            $('#box-shadow-y-r').val(boxShadowY.replace('px',''));
            $('#box-shadow-blur').val(boxShadowBlur.replace('px',''));
            $('#box-shadow-diff').val(boxShadowDiff.replace('px',''));
        }else{
            boxShadowColor = 'rgb(255,255,255)';
            $('#box-shadow-x').val(null);
            $('#box-shadow-x-r').val(0);
            $('#box-shadow-y').val(null);
            $('#box-shadow-y-r').val(0);
            $('#box-shadow-blur').val(null);
            $('#box-shadow-diff').val(null);
        }
        $('#box-shadow-color').val(boxShadowColor);
        $('#box-shadow-color').colorPicker({
            color: boxShadowColor,
            customBG: boxShadowColor,
            renderCallback: function(elm, toggled) {
                console.log(elm.text);
                if(toggled == true){
                    
                }else if(toggled == false){
                    
                }else{
                    if(elm.text != null && elm.text != ''){
                        var shadow = $(_that).css('box-shadow');
                        var value;
                        var blurRadius;
                        var diffRadius;
                        if(shadow != 'none'){
                            var index = shadow.lastIndexOf(')');
                            // var color = boxShadow.substring(0,index + 1);
                            var param = shadow.substring(index + 2).split(' ');
                            var x = param[0];
                            var y = param[1];
                            blurRadius = param[2];
                            diffRadius = param[3];
                            value = x + ' ' + y + ' ' + blurRadius + ' ' + diffRadius + ' ' + elm.text;
                        }else{
                            blurRadius = '3px';
                            diffRadius = '0px';
                            value = '0px 0px 3px 0px ' + elm.text; 
                        }
                        // console.log(blurRadius);
                        // console.log(diffRadius);
                        // console.log(value);
                        $(_this).css('box-shadow',value);
                        $('#box-shadow-blur').val(blurRadius.replace('px',''));
                        $('#box-shadow-diff').val(diffRadius.replace('px',''));
                    }
                }
            }
        });
        

        var cursor = $(_this).css('cursor');
        console.log('cursor:' + cursor);
        var opacity = $(_this).css('opacity');
        console.log('opacity:' + opacity);
        var padding = $(_this).css('padding');
        console.log('padding:' + padding);
        var margin = $(_this).css('margin');
        console.log('margin:' + margin);
        
        // console.log(_this.offsetTop);
        // console.log(_this.offsetLeft);
        // $('#bar').css({
        //     top:_this.offsetTop,
        //     left:_this.offsetLeft,
        //     right:''
        // });
    }

}


//initialize
$(function(){
    //bar location
    var top = $(window).height() / 2 - $('.bar').height() / 2;
    $('.bar').css({
        display:'block',
        top:top + 'px',
        right:'30px'
    })
});

//bar hover event
$('.bar > dd > div').hover(function(ev){
    var width = 0;
    var offset = 0;
    $(this.children[1].children).each(function(){
        if($(this).css('display') != 'none'){
            width += $(this).outerWidth(true);
            // console.log($(this).outerWidth(true))
            offset += 5;
        }
    });
    width = width > 0 ? width + offset : 0;
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
$('#top').on('input propertychange',function(){
    $(_that).css('top',this.value + 'px');  
});
$('#left').on('input propertychange',function(){
    $(_that).css('left',this.value + 'px');  
});
$('#right').on('input propertychange',function(){
    $(_that).css('right',this.value + 'px');  
});
$('#bottom').on('input propertychange',function(){
    $(_that).css('bottom',this.value + 'px');  
});
$('#position-top').click(function(){
    $(_that).css({'top':'0','bottom':''});  
    setPosition(_that);
});
$('#position-bottom').click(function(){
    // var p = $(_that.parentNode).innerHeight() - $(_that).outerHeight(); 
    $(_that).css({'top':'','bottom':'0'});  
    setPosition(_that);
});
$('#position-center-hor').click(function(){
    // var p = $(_that.parentNode).innerWidth() / 2 - $(_that).outerWidth() / 2; 
    $(_that).css({'left':'0','right':'0','margin-left':'auto','margin-right':'auto'});  
    setPosition(_that);
});
$('#position-center-ver').click(function(){
    // var p = $(_that.parentNode).innerHeight() / 2 - $(_that).outerHeight() / 2; 
    $(_that).css({'top':'0','bottom':'0','margin-top':'auto','margin-bottom':'auto'});  
    setPosition(_that);
});
$('#position-left').click(function(){
    $(_that).css({'left':'0','right':''});  
    setPosition(_that);
});
$('#position-right').click(function(){
    // var p = $(_that.parentNode).innerWidth() - $(_that).outerWidth(); 
    $(_that).css({'left':'','right':'0'});  
    setPosition(_that);
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
//text-pos-hor event
$('#text-pos-hor').on('input propertychange',function(){
    console.log(this.checked);
    if(this.checked){
        $(_that).css('text-align','center');
    }else{
        $(_that).css('text-align','');
    }
});
//text-pos-ver event
$('#text-pos-ver').click(function(){
    // console.log($(_that).css('line-height'));
    if($(_that).css('line-height') == 'normal'){
        console.log($(_that).height());
        $(_that).css('line-height',$(_that).height() + 'px');
    }else{
        $(_that).css('line-height','normal');
    }
});
//text-shadow change event
// $('#text-shadow-x-r').on('input propertychange',function(){
//     $('#text-shadow-x').val(this.value);
//     setShadow('text-shadow','x',this);    
// });
$('#text-shadow-x').on('input propertychange',function(){
    // $('#text-shadow-x-r').val(this.value);
    setShadow('text-shadow','x',this);   
});
// $('#text-shadow-y-r').on('input propertychange',function(){
//     $('#text-shadow-y').val(this.value); 
//     setShadow('text-shadow','y',this);
// });
$('#text-shadow-y').on('input propertychange',function(){
    // $('#text-shadow-y-r').val(this.value);
    setShadow('text-shadow','y',this);
});
$('#text-shadow-blur').on('input propertychange',function(){
    setShadow('text-shadow','blurRadius',this);
});

//box-shadow change event
$('#box-shadow-x-r').on('input propertychange',function(){
    $('#box-shadow-x').val(this.value);
    setShadow('box-shadow','x',this);    
});
$('#box-shadow-x').on('input propertychange',function(){
    $('#box-shadow-x-r').val(this.value);
    setShadow('box-shadow','x',this);   
});
$('#box-shadow-y-r').on('input propertychange',function(){
    $('#box-shadow-y').val(this.value);
    setShadow('box-shadow','y',this);    
});
$('#box-shadow-y').on('input propertychange',function(){
    $('#box-shadow-y-r').val(this.value);
    setShadow('box-shadow','y',this);   
});
$('#box-shadow-blur').on('input propertychange',function(){
    setShadow('box-shadow','blurRadius',this);
});
$('#box-shadow-diff').on('input propertychange',function(){
    setShadow('box-shadow','diffRadius',this);
});

function setShadow(attrType,valueType,_this){
    var shadow = $(_that).css(attrType);
    console.log(shadow);
    var index = shadow.lastIndexOf(')');
    var color = shadow.substring(0,index + 1);
    var params = shadow.substring(index + 2).split(' ');
    var x = params[0];
    var y = params[1];
    var blurRadius = params[2];
    var value;
    if(attrType == 'text-shadow'){
        if(valueType == 'x'){//x轴偏移量
            value =  _this.value + 'px ' + y + ' ' + blurRadius + ' ' + color;
        }else if(valueType == 'y'){//y轴偏移量
            value =  x + ' ' + _this.value + 'px ' + blurRadius + ' ' + color;
        }else if(valueType == 'blurRadius'){//模糊半径
            value =  x + ' ' + y + ' ' + _this.value + 'px ' + color;
        }
    }else if(attrType == 'box-shadow'){
        var diffRadius = params[3];
        if(valueType == 'x'){//x轴偏移量
            value =  _this.value + 'px ' + y + ' ' + blurRadius + ' ' + diffRadius + ' ' + color;
        }else if(valueType == 'y'){//y轴偏移量
            value =  x + ' ' + _this.value + 'px ' + blurRadius + ' ' + diffRadius + ' ' + color;
        }else if(valueType == 'blurRadius'){//模糊半径
            value =  x + ' ' + y + ' ' + _this.value + 'px ' + diffRadius + ' ' + color;
        }else if(valueType == 'diffRadius'){//扩散半径
            value =  x + ' ' + y + ' ' + blurRadius + ' ' + _this.value + 'px ' + color;
        }
    }
    console.log(value);
    $(_that).css(attrType,value);
}

//cursor change event
$('#cursor').on('input propertychange',function(){
    $(_that).css('cursor',this.value);    
});

//opacity change event
$('#opacity-r').on('input propertychange',function(){
    $('#opacity').val(this.value);
    $(_that).css('opacity',this.value);    
});
$('#opacity').on('input propertychange',function(){
    $('#opacity-r').val(this.value);
    $(_that).css('opacity',this.value);
});

//image upload event
$('#background-img-upload').click(function(){
    $('#background-img').click();
});

//padding change event
$('#padding').on('input propertychange',function(){
    $(_that).css('padding',this.value + 'px');    
});

//margin change event
$('#margin').on('input propertychange',function(){
    $(_that).css('margin',this.value + 'px');    
});

//原生JS版上传图片预览
document.getElementById('background-img').onchange = function(){
    //创建FileReader
    var re = new FileReader();
    //读取文件
    re.readAsDataURL(this.files[0]);
    //读取完成后显示BASE64
    re.onload = function(){
        $(_that).css('background-image','url(' + re.result + ')');
        // document.getElementById('show').src = re.result;
        // document.getElementById('md5').innerText = '';
    }
}

var ids = new Array();
$('#box-new').click(function(){
    var id = ids[ids.length - 1] == undefined ? 1 : ids[ids.length - 1] + 1;
    ids.push(id);
    console.log(id);
    var html = ['<div id="drag' + id + '" class="obj drag" draggable="true">  ',
                '    <div id="scale" class="scale"></div>',
                '</div>'].join("");
    $('#container').append(html);
    // var top = $(window).height() / 2 - $('#drag' + id).height() / 2;
    // var left = $(window).width() / 2 - $('#drag' + id).width() / 2;
    $('#drag' + id).animate({top:0,left:0,right:0,bottom:0},100);
});