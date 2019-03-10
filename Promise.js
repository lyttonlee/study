class Promise {
  // Promise 执行器 executor
  constructor (executor) {
    // 初始状态为等待
    this.status = 'pending'
    this.value = undefined
    this.reason = undefined
    // 成功的方法
    let resolve = (data) => {
      if (this.status === 'pending') {
        this.value = data
        this.status = 'resolved'
      }
    }
    // 失败的方法
    let reject = (reason) => {
      if (this.status === 'pending') {
        this.reason = reason
        this.status = 'rejected'
      }
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  // then 方法
  then (onFufilled, onRejected) {
    if (this.status === 'resolved') {
      onFufilled(this.value)
    }
    if (this.status === 'rejected') {
      onRejected(this.reason)
    }
  }
}
let p = new Promise((resolve, reject) => {
  // resolve('success')
  reject('error')
})
p.then(data => {
  console.log(data)
  return 'p'
}, err => {
  console.log(err)
})

