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