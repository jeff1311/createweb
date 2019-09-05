document.getElementById('menu-switch').onclick = function(){
    console.log(this.style);
    if(this.parentNode.style.transform != 'translateX(0px)'){
        this.parentNode.style.transform = 'translateX(0)';
        this.style.opacity = '1';
    }else{
        this.parentNode.style.transform = 'translateX(-100%)';
        this.style.opacity = '0.5';
    }
}