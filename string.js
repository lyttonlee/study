// String 原型方法
/** 
 * slice()
 * split()
 * substr()
 * substring()
 * charAt()
 * indexOf()
 * replace()
 * concat()
 * */ 

 const str = 'adskjdhwqkudsakj67asdwauyjhdaw'

//  slice(startIndex, endIndex) 返回截取的字符串,不包括endIndex
// 为负数时会先与字符串长度相加
console.log(str.slice(3, 7)) //kjdh
// console.log(str.slice(3, -7)) //kjdhwqkudsakj67asdwa

// substr(startIndex, length) 返回截取的字符串
// console.log(str.substr(3, 6)) // kjdhwq
// console.log(str.substr(-3, 6)) // daw 负数为从后面开始计数
// console.log(str.substr(-3, -6)) // 什么都不会返回 undefined

// substring() 和slice() 一样

// split(string | reg, limit?)
console.log(str.split('k'))

// charAt(number)
// console.log(str.charAt(7))

// replace(string | reg)
str.replace(searchValue, replaceValue)