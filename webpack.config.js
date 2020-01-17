//向外暴露一个大包的配置对象; （Node语法） 因为webpack是基于Node构建的；所以webpack支持所有Node API和所以语法
module.exports = {
    mode: 'development', //development production
    // entry: '/dist/main.js'
    //在webpack 4.x中有一个很大的特性，就是约定大于配置，约定，默认的打包入口是src -> index.js
}

//行不行？目前不行；//这是ES6中向外导出模块的API与之对应的是import ** from '标识符'
//export default{}
//哪些特性Node支持呢？如果chrome浏览器支持那些，则Node就支持那些；