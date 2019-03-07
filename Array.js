// 数组方法 array
/* 
  push(element) length 
  unshift(element) length
  pop() element
  shift() element
  splice(startIndex, num) 从第{start}开始,删除{num}项 
      返回值是被删除的数组
    splice(0) 全部删除
    splice() 一项都不删除 返回空数组
    splice(n, m, element) 将删除的项用element代替
    splice(n, 0, elemrnt) 一项都不删除,将element插入到索引n的前面
*/ 

/*
* slice(startIndex, endIndex) 从索引{startIndex}到{endIndex}(不包含)查询
        返回值是 把找到的一部分作为数组返回
    slice(0) slice() 数组克隆 
  concat([], 4, 'a') 拼接数组,返回新的数组
 */ 

/**
 * toString() 返回将数组以逗号,分割转化为字符串,原数组不变
 * join('-') 返回以指定的连接符将数组转化为字符串, 原数组不变
 *  */ 

let arr = [13, 15, 89, 3, 65]
function sum (arr) {
  // let total = null
  // for (let i = 0; i < arr.length; i++) {
  //   total += arr[i]
  // }
  let total = eval(arr.join('+')) 
  // eval() 将字符串转化为 JS表达式
  return total
}

console.log(sum(arr))
/**
 * reverse() 把数组的每一项倒过来排列 
 *    返回排序后的数组
 *    原数组改变
 * sort() 参数: 回调函数
 * 返回值: 排序后的数组
 * 原数组改变
 *  */ 
let newArr = arr.sort((a,b) => {
  return a-b // 升序 b-a 降序
})
console.log(newArr)
/** 
 * indexOf() lastIndexOf() 获取当前项在数组中第一次/最后一次出现的索引
 *        可以验证数组中是否包含某一项
 * arr.indexOf() !== -1
 * */ 

//  循环
/**
 * forEach((el, index) => {}) 可变遍历,不会修改
 * map((el, index) => {return xxx}) return 返回的是替换当前项的值 
 *  */ 