document.getElementById('menu-switch').onclick = function(){
    console.log(this.style);
    if(this.parentNode.style.transform != 'translateX(0px)'){
        this.parentNode.style.transform = 'translateX(0)';
        // this.style.opacity = '0.5';
    }else{
        this.parentNode.style.transform = 'translateX(-100%)';
        // this.style.opacity = '0.3';
    }
}

var list = document.querySelectorAll('.menu > ul li > a');
for(var i = 0;i < list.length;i ++){
    list[i].onclick = function(event){
        // console.log(event);
        var menu = event.target.parentNode.children[1];
        if(menu != undefined && menu.children.length > 0){
            if(menu.style.height != '0px' && menu.style.height != ''){
                menu.style.height = '0px';
            }else{
                menu.style.height = menu.children.length * 30 + 'px';
                var others = document.querySelectorAll('.menu > ul div');
                // console.log(list1);
                for(var j = 0;j < others.length;j ++){
                    if(others[j] != menu){
                        others[j].style.height = '0px';
                    }
                }   
            }
        }
    }
}