class Dep {
  constructor () {
    // 订阅者
    this.subs = []
  }
  // 添加一个订阅者
  addSub (watcher) {
    this.subs.push(watcher)
  }
  // 通知订阅者watchers更新 
  notify () {
    this.subs.forEach((watcher) => watcher.update())
  }
}