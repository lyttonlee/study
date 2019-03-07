// 找出字符串中出现最多的字符,统计次数
let str = 'sdadlahwkdjagdawfdajsdw'
function getLetter (str) {
  let res = []
  // 去重
  let arr = str.split('')
  let newArr = [arr[0]]
  for (let i = 1; i <arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
  }
  // console.log(newArr)
  let maxNum = 0
  for (let j = 0; j < newArr.length; j++) {
    let length = arr.filter(el => el === newArr[j]).length
    res.push({el: newArr[j], num: length})
    if (length > maxNum) {
      maxNum = length
    }
  }
  // console.log(...res)
  let obj = {
    maxNum,
    el: res.filter(el => el.num === maxNum)[0].el
  }
  return `出现最多的字母是${obj.el},一共出现${obj.maxNum}次`
}
console.log(getLetter(str))

// 随机生成指定长度的字符串
function createStr (num) {
  let letters = 'abcdefg123456789'
  function createRandomLetter (letters) {
    let randomLetter = letters.charAt(Math.floor(Math.random() * letters.length)) 
    // console.log(randomLetter)
    return randomLetter
  }
  let str = ''
  let arr = []
  for (let i = 0; i < num; i++) {
    // str += createRandomLetter(letters)

    // arr.push(createRandomLetter(letters))
    // str = arr.join('')

    // 不重复
    let letter = createRandomLetter(letters)
    if (arr.indexOf(letter) === -1) {
      arr.push(letter)
    } else {
      i--
    }
    // console.log(i)
  }
  str = arr.join('')
  return str
}
console.log(createStr(7))

// 
let sum = 0
for (let i = 1; i <= 100; i++) {
  let num = (i % 3 === 0 && i % 5 === 0 ) ? i : 0
  sum += num
}
console.log(sum)
// 递归
function fn (i) {
  if (i > 100) {
    return 0
  }
  if (i % 15 === 0) {
    return i += fn(i + 1)
  }
  return fn(i + 1)
}
console.log(fn(1))

function fn2(i) {
  if (i <= 1) {
    return 1
  }
  if (i % 2 === 0) {
    return i * fn2(i - 1)
  }
  return fn2(i - 1)
}
fn2(10)
console.log(fn2(10))