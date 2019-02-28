class Oberve {
  constructor (data) {
    // 劫持数据
    typeof data === 'object' && this.observe(data)
  }
  observe(data) {
    // data: {a:3, b:5}
    // console.log(Object.keys(data)) => [a, b]
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key])
      // 深度递归劫持
      // console.log(data[key])
      typeof data[key] === 'object' && this.observe(data[key])
    })
  }
  // 数据响应式
  defineReactive(obj, key, value) {
    let that = this
    let dep = new Dep()
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        // alert(value)
        // 叹为观止
        Dep.target && dep.addSub(Dep.target)
        // console.log(Dep.target)
        return value
      },
      set(newValue) {
        // console.log(this)
        if (newValue !== value) {
          typeof newValue === 'object' && that.observe(newValue)
          value = newValue
          // console.log(dep)
          dep.notify()
        }
      }
    })
  }
}