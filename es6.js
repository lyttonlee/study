// const let 块级作用域 {}
// let 没有变量提升 不能重复定义
// const name = {a: 3}
// const 不能修改引用空间
// name = {b:2} //Assignment to constant variable.

// 解构赋值
const obj = {name: 'lee', age: 20}
let {name, age} = obj
let arr = [1, 3, 'o']
let [,,s] = arr
// console.log(s)

// 字符串模板 `${}`

// 箭头函数 this问题
// 1 let that = this 2 箭头函数 3 bind(this)
// let obj = {
//   a: 1,
//   b: function () {
//     setTimeout(function () {
//       console.log(this) // window.setTimeout()
//     // }, 1000)
//   }.bind(this), 1000)
//   }
// }
// 箭头函数是没有this的 也没有arguments

// 继承
function Parent () {
  this.name = 'parent'
}
Parent.prototype.eat = function () {
  console.log('eat')
}
let parent = new Parent()
function Child () {
  this.age = 15
  // 继承私有 
  Parent.call(this)
}
let child = new Child()
console.log(child.name) //parent
// 继承公有
// 1
// Child.prototype.__proto__ = Parent.prototype
// 2
Child.prototype = Object.create(Parent.prototype, {constructor: {value: Parent}})

// Promise
// function say (str) {
//   return new Promise((resolve, reject) => {
//     resolve(str)
//   })
// }
let say = str => {
  return new Promise((resolve, reject) => {
    resolve(str)
  })
}
Promise.all([say('hello'), say('world')]).then(res => {
  // res => [hello, world]
  console.log(...res)
})


 