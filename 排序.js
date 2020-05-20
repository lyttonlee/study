let arr = [3, 54, 3,4, 732, 2, 45, 545, 23, 76, 893, 2, 47, 78,32,32]
// 选择排序
/**
 *
 *
 * @param {number[]} nums
 * @returns {number[]} nums
 */
function selectSort (nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
  }
  return nums
}

// console.log(selectSort(arr))

// 冒泡排序

function buddleSort (nums) {
  let loopTimes = 0
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i; j++) {
      loopTimes++
      if (nums[j] > nums[j+1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
      }
    }
  }
  console.log(loopTimes)
  return nums
}
function buddleSort_optimize (nums) {
  let loopTimes = 0
  let swaped
  do {
    swaped = false
    for (let j = 0; j < nums.length; j++) {
      loopTimes++
      // console.log(j)
      if (nums[j] > nums[j+1]) {
        [nums[j], nums[j+1]] = [nums[j+1], nums[j]]
        swaped = true
      }
    }
    console.log(swaped)
  } while (swaped)
  console.log(loopTimes)
  return nums
}
// console.log(buddleSort(arr))
// console.log(buddleSort_optimize(arr))

// 插入排序
function inserSort (nums) {
  let cur,res=[]
  res.push(nums[0])
  for (let i = 1; i < nums.length; i++) {
    cur = res.length - 1
    while (cur >= 0 && res[cur] > nums[i]) {
      cur--
    }
    // console.log(res)
    res.splice(cur + 1, 0, nums[i])
    // console.log(res)
  }
  return res
}

// console.log(inserSort(arr))

// 归并排序

// dac 分治思想 将排序数组变小使得有序，再合并
function mergeSort (arr=[]) {
  let len = arr.length
  if (len === 1) return arr
  let mid = Math.floor(len / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid, len)
  // console.log(arr)

  return merge(mergeSort(left), mergeSort(right))
}
function merge (leftArr, rightArr) {
  let res = []
  let left = 0
  let right = 0
  while (left < leftArr.length && right < rightArr.length) {
    if (leftArr[left] < rightArr[right]) {
      res.push(leftArr[left])
      left++
    } else {
      res.push(rightArr[right])
      right++
    }
  }

  // 循环结束后可能还有左边或者右边剩余的数组
  while (left < leftArr.length) {
    res.push(leftArr[left])
    left++
  }
  while (right < rightArr.length) {
    res.push(rightArr[right])
    right++
  }
  // console.log(res)
  return res
}

console.log(mergeSort(arr))

