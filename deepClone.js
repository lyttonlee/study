let deepClone = obj => {
  let result = Array.isArray(obj) ? [] : {}
  for(let key in obj) {
    // console.log(key)
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object') {
        result[key] = deepClone(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
const arr = [1, [2,3], 5]
const obj = {
  a: '1',
  b: {
    c: 'c',
    d: 'd'
  },
  e: 'e'
}
let newData = deepClone(arr)
// let newData = obj 浅拷贝
console.log(newData)
console.log(newData === arr) // fasle 引用地址不一样了