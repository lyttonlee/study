class MyVue {
  constructor(options) {
    this.$el = options.el;
    this.$data = options.data;
    this.$methods = options.methods
    // 编译模板
    // 只要节点是存在的，就开始编译模板
    if (this.$el) {
      // 劫持数据，编译的数据
      new Oberve(this.$data)
      this.proxyData(this.$data)
      this.proxyData(this.$methods)
      new Compile(this.$el, this)
    };
  }
  // this.msg ==  this.$data.msg
  proxyData (data) {
    Object.keys(data).forEach((key) => {
      Object.defineProperty(this, key, {
        get () {
          return data[key]
        },
        set (newValue) {
          data[key] = newValue
        }
      })
    })
  }
}