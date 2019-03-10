// JS模块规范
// CommonJS 一个文件就是一个模块 require() module.exports() exports 引入导出模块
//  NodeJS

// AMD
// 因为CommonJS的require()是同步的,如果要在浏览器端使用的话,那加载模块的相应取决于
// 用户的网络速度,如果网速不好加载的模块很大浏览器就是假死状态
// AMD 可以让模块异步加载
// require([module], function () {})

// cmd