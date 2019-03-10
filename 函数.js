// 高阶函数 柯里化函数 fn(a, b) -> fn(a)(b) <--> fn(a) {return function (b) {}}

// 1.函数可以返回函数
// 类型判断

function isType (type) {
  // let currentType = Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '')
  // return currentType === type
  return function (content) {
    let currentType = Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '')
    return currentType === type
  }
}
let isString = isType('String')
// console.log(isString('abc'))
let types = ['Array', 'String', 'Number', 'Object', 'NULL', 'Boolean']
let util = {}
types.forEach((item) => {
  util[`is${item}`] = isType(item)
})
// console.log(util.isNumber(5))

class Type {
  constructor () {
    this.types = ['Array', 'String', 'Number', 'Object', 'NULL', 'Boolean']
    this.util = {}
    this.types.forEach((item) => {
      this.util[`is${item}`] = this.checkType(item)
    })
  }
  getType (content) {
    return Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '')
  }
  checkType (type) {
    return function (content) {
      return type === Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '')
    }
  }
  
}
let myType = new Type()
console.log(myType.util.isString('asd')) // true

//  2. 函数作为参数 (回调函数)
function after (times, callback) {
  return function () {
    --times
    if (times === 0) {
      callback()
    }
  }
}
let say = after(3, function () {
  console.log('say')
})
say()
say()
say()


// .................................
let readAfter = (times, callback) => {
  let arr = []
  return (data) => {
    arr.push(data)
    if (arr.length === times) {
      callback(arr)
    }
  }
}
let out = readAfter(2, (data) => {
  console.log(...data)
})

const fs = require('fs')
fs.readFile('./BFC.html', 'utf8', (err, data) => {
  if (!err) {
    // console.log(data)
    out(data)
  }
})
fs.readFile('./ajax.html', 'utf8', (err, data) => {
  if(!err) {
    // console.log(data)
    out(data)
  } 
})