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
    event.preventDefault();
    if ( event.target.className.indexOf("menu") == -1 ) {
        console.log(event);
        event.preventDefault();
        var dragId = event.dataTransfer.getData("dragId");
        var disX = event.dataTransfer.getData("disX");
        var disY = event.dataTransfer.getData("disY");
        var drag = document.getElementById(dragId);
        drag.style.left = event.x - disX + 'px';
        drag.style.top = (event.y - disY) < 0 ? 0 : (event.y - disY) + 'px';
        event.target.appendChild(drag);
        event.target.style.border = "dashed 1px #b7b7b7";
    }
});

//拖动、放大
document.addEventListener('mousedown',function(event){
    console.log('mousedown');
    var target = event.target;
    // console.log(event);
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
    if(target.id.indexOf('bar-drag') != -1){
        console.log(event);
        var bar = event.target.parentNode.parentNode.parentNode;
        // console.log(event.x,bar.offsetLeft);
        // console.log(event.y,bar.offsetTop);
        var disX = event.x - bar.offsetLeft;
        var disY = event.y - bar.offsetTop;
        document.onmousemove = function (ev) {
            // console.log(ev.x,disX);
            // console.log(ev.y,disY)
            ev.preventDefault();
            bar.style.left = ev.x - disX + 'px';
            bar.style.top = (ev.y - disY) < 0 ? 0 : (ev.y - disY) + 'px';
            
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
