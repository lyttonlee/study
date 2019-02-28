class Compile {

  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    // console.log(this.isElementNode(el))
    // CompileUtil['text']()

    if (this.el) {
      // 开始编译
      // 编译步骤
      // 1、获取这些节点，并存入fragment内存文档碎片中
      let fragment = this.nodeToFragment(this.el)
      // 2、 编译.....
      this.compile(fragment)
      // 3、 把编译好的节点重新放入页面中,也算是一种性能优化（要插入的节点都放入fragment中，然后一次性插入，重绘)
      this.el.appendChild(fragment)
    }
  }


  // 辅助方法
  // 判断传入的el是否是元素dom '#app' ||'document.querySelector('#app')'
  isElementNode (node) {
    return node.nodeType === 1;
  }



  // 核心方法

  // 判断是否是myvue的文本 {{xxxxx}}
  isMyVueText (text) {
    // console.log(text)
    let reg = /\{\{([^}])+\}\}/g
    return reg.test(text)
  }

  // 判断是否是myvue的指令 （含有 v-xxx）
  isDirective (attrName) {
    let reg = /^v-|@|:{1}[a-zA-Z0-9:]+$/g
    return reg.test(attrName)
  }

  // 判断指令类型
  getCurrentDirective (directive) {
    // 指令类型只考虑 v-xxx :xxx @xxxx
    // console.log(directive)
    let [,type] = directive.split('-')
    // type = model if || nudefined (@click :xxxx)
    if (type) {
      return type
    } else {
      let attribute = directive.slice(1)
      // console.log(attribute)
      if (directive[0] === ':') {
        return {directive: 'bind', attribute}
      } else {
        return {directive: 'methods', attribute}
      }
    }
  }

  // 获取el节点，并存入fragment文档碎片中
  nodeToFragment (el) {
    // 创造一个文档碎片
    let fragment = document.createDocumentFragment()
    // console.log(el.firstChild)
    let firstChild
    // 将el中所有节点存入文档碎片
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    // console.log(fragment)
    return fragment
  }

  // 编译
  compile (fragment) {
    let childNodes = fragment.childNodes
    // console.log(childNodes)
    // 将类数组的元素节点对象转换为数组，遍历每一个节点，把元素节点和文本分出来
    Array.from(childNodes).forEach((node) => {
      // console.log(node)
      if (this.isElementNode(node)) {
        // 编译元素节点
        this.compileElement(node)
        // 如果是元素节点，可能有子节点，需深入检查
        this.compile(node)
        // console.log('node', node)
      } else {
        // console.log('text', node)
        // 编译文本
        this.compileText(node)
      }
    })
  }

  // 编译文本
  compileText (node) {
    // console.log(node.textContent, this.isMyVueText(node.textContent))
    let text = node.textContent
    if (this.isMyVueText(text)) {
      let expression = text
      // console.log(expression)
      CompileUtil.text(node, this.vm, expression)
    }
  }

  // 编译元素节点
  compileElement (node) {
    // 我们只需要编译带有 “v-xxx” 属性的元素节点
    let nodeAttrs = node.attributes
    // console.log(node.attributes)
    Array.from(nodeAttrs).forEach((attr) => {
      let {name, value} = attr
      // console.log(name, value)
      if (this.isDirective(name)) {
        // 如果是myvue的指令，那就将vm.data中所对应的值给expression表达式
        // 根据不同的指令类型调用不同的方法 v-model v-show
        // let type = name.slice(2)
        // let [,type] = name.split('-')
        // console.log(type) type = model if || nudefined (@click :xxxx)
        let expression = value
        //  node data expression
        // type && CompileUtil[type](node, this.vm, expression)
        let type = this.getCurrentDirective(name)
        // console.log(type)
        typeof type !== 'object' && CompileUtil[type](node, this.vm, expression)
        typeof type === 'object' && CompileUtil[type.directive](node, this.vm, expression, type.attribute)
      }
    })
  }

  
}

let CompileUtil = {
  getCurValue (vm, expression) {
    // 获取要取得值 person.name.a.b.c
    expression = expression.split('.')
    return expression.reduce((prev, next) => {
      return prev[next]
    }, vm.$data)
  },
  getFunCode (vm, expression) {
    return vm[expression]
  },
  SetValue (vm, expression, newValue) {
    expression = expression.split('.')
    return expression.reduce((prev, next, currentIndex) => {
      if (currentIndex === expression.length - 1) {
        prev[next] = newValue
      }
      return prev[next]
    }, vm.$data)
  },
  text (node, vm, expression) {
    // expression => {{person.say}}
    // 去除2个大括号
    expression = expression.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
      // console.log(arguments)
      return arguments[1]
    })
    let updaterFn = this.updater['textUpdater']
    new Watcher(vm, expression, () => {
      // console.log('value change')
      updaterFn && updaterFn(node, this.getCurValue(vm, expression))
    })
    updaterFn && updaterFn(node, this.getCurValue(vm, expression))
    // console.log(expression)
  },
  model (node, vm, expression) {
    let updaterFn = this.updater['modelUpdater']
    // 
    new Watcher(vm, expression, () => {
      updaterFn && updaterFn(node, this.getCurValue(vm, expression))
    })
    node.addEventListener('input', (e) => {
      let newValue = e.target.value
      this.SetValue(vm, expression, newValue)
    })
    updaterFn && updaterFn(node, this.getCurValue(vm, expression))
  },
  show (node, vm, expression) {
    // console.log(node, expression)
    let updaterFn = this.updater['showUpdater']
    new Watcher(vm, expression, () => {
      // console.log(node)
      updaterFn && updaterFn(node, this.getCurValue(vm, expression))
    })
    updaterFn && updaterFn(node, this.getCurValue(vm, expression))
  },
  if (node, vm, expression) {
    // console.log(node, expression)
    let updaterFn = this.updater['ifUpdater']
    new Watcher(vm, expression, () => {
      updaterFn && updaterFn(node, this.getCurValue(vm, expression))
    })
    updaterFn && updaterFn(node, this.getCurValue(vm, expression))
  },
  // 多一个attribute
  bind (node, vm, expression, attribute) {
    let updaterFn = this.updater['bindUpdater']
    new Watcher(vm, expression, () => {
      // console.log('run')
      updaterFn && updaterFn(node, this.getCurValue(vm, expression), attribute)
    })
    updaterFn && updaterFn(node, this.getCurValue(vm, expression), attribute)
  },
  methods (node, vm, expression, attribute) {
    // console.log(node, vm[expression], attribute)
    // updaterFn && updaterFn(node, this.getFunCode(vm, expression), attribute)
    node.addEventListener(attribute, () => {
      vm[expression]()
      // this.getFunCode(vm, expression)() why?
    })
  },
  updater: {
    // {{}}
    textUpdater (node, value) {
      node.textContent = value
    },
    // v-model
    modelUpdater (node, value) {
      node.value = value
    },
    // v-show
    showUpdater (node, value) {
      // console.log(node, value)
      if (!value) {
        // console.log(node, value)
        node.style.display = 'none'
      } else {
        // console.log(node, value)
        node.style.display = ''
      }
    },
    ifUpdater (node, value) {
      // console.log(node.parentNode.appendChild(node))
      if (!value) {
        node && node.remove()
      } else {
        // console.log(node, value)
        // node.parentNode.appendChild(node)
        document.body.appendChild(node)
      }
    },
    bindUpdater (node, value, attribute) {
      // console.log(node, attribute, value)
      node[attribute] = value
    },
    // methodsRun (node, funCode, attribute) {
    //   console.log(funCode, attribute)
    //   node.addEventListener(attribute, () => {
    //     funCode()
    //   })
    // }
  }
}