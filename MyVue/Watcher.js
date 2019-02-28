// 观察者，监控数据变化，如果数据变化 -> 执行操作
class Watcher {
  constructor (vm, expression, callBack) {
    this.vm = vm
    this.expression = expression
    this.callBack = callBack
    // 要监测需要将以前的值和现在的值作比较
    this.oldValue = this.getOldValue()
  }
  getCurValue (vm, expression) {
    // person = {
    //   name: {
    //     a: {
    //       b: {
    //         c: 'c'
    //       }
    //     }
    //   }
    // }
    // 获取要取得值 person.name.a.b.c
    expression = expression.split('.')
    return expression.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  }
  getOldValue () {
    // 这里的this => 观察者的实例
    Dep.target = this
    // 

    let oldValue = this.getCurValue(this.vm, this.expression)

    Dep.target = null
    
    return oldValue
  }
  update () {
    // console.log('update')
    let newValue = this.getCurValue(this.vm, this.expression)
    let oldValue = this.oldValue
    // console.log(newValue, oldValue)
    if (newValue !== oldValue) {
      this.callBack(oldValue, newValue)
      // console.log(this.callBack)
      this.oldValue = newValue
    }
  }

}