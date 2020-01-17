// loading();

fill(data);

$(function(){
    initGallery();
});

function loading(){
    var loadingBlock = ['<div class="loading-background">',
                        '	<div class="loading-box">',
                        '		<div class="mop-load-8"></div>',
                        '	</div>',
                        '</div>'].join("");
    $('body').append(loadingBlock);
}
function removeLoading(){
    $('.loading-background').remove();
}

function fill(arr){
    var tags = '';
    for(var i = 0;i < arr.length;i ++){
        var tag = '';
        tag += '<a href="' + arr[i].imgUrl + '" data-size="' + arr[i].width + 'x' + arr[i].height + '" data-author="' + arr[i].author + '">';
        tag += '	<img src="' + arr[i].thuUrl + '" />';
        tag += '	<figure>' + arr[i].text + '</figure>';
        tag += '</a>';
        tags += tag;
    }
    $('#gallery').append(tags);
}

//设置画廊图片大小，缩略图显示位置
function initGallery(){
    //初始化photoSwipe
    initPhotoSwipeFromDOM('.gallery');
    //初始化预览图大小
    var galleryWidth = $('.gallery').width();
    var width = (galleryWidth - 80) / 4;
    $('.gallery img').css('width',width);

    var imgBoxes = $('.gallery > a');
    // 定义每一列之间的间隙 为10像素
    var gap = 20;
    // 1- 确定列数  = 页面的宽度 / 图片的宽度
    var pageWidth = getClient().width;
    var itemWidth = imgBoxes[0].offsetWidth;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = [];
    var i = 0;
    function waterfall(imgBoxes,images){
        if(i <= imgBoxes.length - 1){
            var imgUrl = images[i].src;
            var img = new Image();
            img.src = imgUrl;
            img.onload = function(){
                //设置图片尺寸防止图片比例变形
                // var imgSize = img.width + 'x' + img.height;
                // $(imgBoxes[i]).attr('data-size', imgSize);

                if (i < columns) {
                    // 2- 确定第一行
                    imgBoxes[i].style.top = 0;
                    imgBoxes[i].style.left = (itemWidth + gap) * i + 'px';
                    arr.push(imgBoxes[i].offsetHeight);
                } else {
                    // 其他行
                    // 3- 找到数组中最小高度  和 它的索引
                    var minHeight = arr[0];
                    var index = 0;
                    for (var j = 0; j < arr.length; j++) {
                        if (minHeight > arr[j]) {
                            minHeight = arr[j];
                            index = j;
                        }
                    }
                    // 4- 设置下一行的第一个盒子位置
                    // top值就是最小列的高度 + gap
                    imgBoxes[i].style.top = arr[index] + gap + 'px';
                    // left值就是最小列距离左边的距离
                    imgBoxes[i].style.left = imgBoxes[index].offsetLeft + 'px';

                    // 5- 修改最小列的高度 
                    // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
                    arr[index] = arr[index] + imgBoxes[i].offsetHeight + gap;
                }
                i ++;
                // if(imgBoxes.length == i){
                //     //瀑布流
                //     // waterFall();
                //     //初始化PhotoSwipe
                //     initPhotoSwipeFromDOM('.gallery');
                //     //隐藏loading
                //     // removeLoading();
                // }
                setTimeout(function(){
                    waterfall(imgBoxes,images);
                },100);
            }
        }
    }

    var images = $('.gallery img');
    waterfall(imgBoxes,images);
}



// 封装成一个函数
function waterFall() {
    var box = document.getElementById('gallery');
    var items = box.children;
    
    // 定义每一列之间的间隙 为20像素
    var gap = 20;
    // 1- 确定列数  = 页面的宽度 / 图片的宽度
    var pageWidth = getClient().width;
    var itemWidth = items[0].offsetWidth;
    var columns = parseInt(pageWidth / (itemWidth + gap));
    var arr = [];
    for (var i = 0; i < items.length; i++) {
        if (i < columns) {
            // 2- 确定第一行
            items[i].style.top = 0;
            items[i].style.left = (itemWidth + gap) * i + 'px';
            arr.push(items[i].offsetHeight);

        } else {
            // 其他行
            // 3- 找到数组中最小高度  和 它的索引
            var minHeight = arr[0];
            var index = 0;
            for (var j = 0; j < arr.length; j++) {
                if (minHeight > arr[j]) {
                    minHeight = arr[j];
                    index = j;
                }
            }
            // 4- 设置下一行的第一个盒子位置
            // top值就是最小列的高度 + gap
            items[i].style.top = arr[index] + gap + 'px';
            // left值就是最小列距离左边的距离
            items[i].style.left = items[index].offsetLeft + 'px';

            // 5- 修改最小列的高度 
            // 最小列的高度 = 当前自己的高度 + 拼接过来的高度 + 间隙的高度
            arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
    }
}
// 页面尺寸改变时实时触发
window.onresize = function() {
    waterFall();
};

// 当加载到第30张的时候
// window.onscroll = function() {
//     if (getClient().height + getScrollTop() >= items[items.length - 1].offsetTop) {
//         // 模拟 ajax 获取数据    
//         var datas = [
//             "../image/瀑布流/001.jpg",
//             "../image/瀑布流/030.jpg"
//         ];
//         for (var i = 0; i < datas.length; i++) {
//             var div = document.createElement("div");
//             div.className = "item";
//             div.innerHTML = '<img src="' + datas[i] + '" alt="">';
//             box.appendChild(div);
//         }
//         waterFall();
//     }

// };

// clientWidth 处理兼容性
function getClient() {
    return {
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
}
// scrollTop兼容性处理
function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}