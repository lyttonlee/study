// 隐式转换 显示转换

let a = 1

a + '' // 隐式转换

let b = '1'
console.log(++b)

b * 1 // 隐式转换

console.log(1 + '1') // '11' 隐式转换

console.log( true + false) // 1 隐式转换

// 隐式转换 JS自动去转换

parseInt('3') // 3 显示转换 字符串 '3' => 数字 3 

NaN // 非数字 JS中的一个值


console.log(isNaN(3)) // false
console.log(isNaN('3')) //false
console.log(isNaN('我是数字')) //true
console.log(isNaN()) //true