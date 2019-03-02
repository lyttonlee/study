class Person {
  constructor () {
    this.a = 1
    this.b = 'hi'
  }
  say () {
    console.log(this.b)
  }
}  
let li = new Person()
// 继承
class Child extends Person {
  constructor () {
    super()
    this.age = 20
  }
}
let child = new Child()
console.log(child.a)