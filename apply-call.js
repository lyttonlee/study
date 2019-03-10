//  call apply bind 区别
// 相同点: 三者都可以改变函数this的指向,this会指向三者的第一个参数

// 不同点
/** 
 * 1:call(this),apply(this) 改变this指向后会执行函数, bind(this)()改变this指向后
 *   会返回函数,但不执行
 * 2: 传值不同 call(this, arg1, arg2)
 *            apply(this, [arg1, arg2])
 *            bind(this)(arg1, arg2) | bind(this, arg1, arg2)
 * */ 