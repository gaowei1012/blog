- 数组扁平化

[面试](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc9240467b46494ca8fdc2d35d9f729e~tplv-k3u1fbpfcp-watermark.awebp)

```js

  const arr = [1, [2, [3, [4, 5]]], 6];
  // => [1, 2, 3, 4, 5, 6]

  // flat
  const result = arr.flat(arr)
  
  // 正则
  const result = JSON.stringify(arr).replace(/\[|\]/g, '').split(',');
  // 转完的是一个string类型的
  // => '[1, 2, 3, 4, 5, 6]'
  // 此时可以parse一下，JSON.parse(result) 

  // reduce
  const flatarr = arr => {
    return arr.reduce((pre, cur) => {
      return pre.cocat(Array.isArray(cur) ? flatarr(cur) : cur)
    }, [])
  }

  // => flatarr(arr) => [1, 2, 3, 4, 5, 6]


  // 函数递归
  // 利用递归实现，所谓的递归就是自己调自己
  // 以下面的例子为例，一直循环到自己本身完
  const temp = []
  const fn = arr => {
    for(let i = 0; i <arr.length; i++ ) {
      if (Array.isArray(arr[i])) {
        fn(arr[i])
      } else {
        temp.pysh(arr[i])
      }
    }
  }
```

- 数组去重

```js 

  const arr = [1,2,43,1,4,1,true, false]

  // Set
  const result = Array.form(new Set(arr))

  // for循环
  const unique = arr => {
    let len = arr.length
    for(let i = 0; i < len; i++) {
      for(let j = i + 1; i < len; j++) {
        if (arr[i] === arr[j]) {
          arr.splice(j, 1)
          len--
          j--
        }
      }
    }
    return arr
  }

  // unique(arr)
  // => [1, 2, 4, 43]

```

- 类数组转数组

```js
  const obj = "123"

  // 数组自带方法当然你好使
  Array.form(obj)
  // => ["1", "2", "3"]

  // 使用数组的原型方法
  Array.propotype.slice.call()
  // => ["1", "2", "3"]

  // 扩展运算符号
  [...obj]
  // => ["1", "2", "3"]

  // 使用 concat
  Array.propotype.concat.apply([], obj)
  // => ["1", "2", "3"]
```

- 函数珂里化

```js
 // add(1)(2)(3)(4)=10; 、 add(1)(1,2,3)(2)=9;

 function add() {
   const _args = [...arguments]
   function fn() {
     _args.push(...arguments)
     return fn
   }

   fn.toString() = function() {
     return _args.reduce((sum, cur) => sum + cur)
   }
   return fn
 }

  // add(1)(2)(3)
  // => 6 
```

- 模拟 new 操作

```js

  function newSty(ctor, ...args) {
    if (typeof ctor !== 'function') {
      throw new TypeError('Type Error')
    }
    const obj = Object.create(ctor.propotype)
    const res = ctor.apply(obj, args)

    const isObject = typeof res === 'object' && res !== ''
    const isFunction = typeof res === 'function'
    return isObject || isFunction ? res : obj 
  }

```

- instanceof 使用

```js
  // instanceof运算符用于检测构造函数的prototype属性是否出现在某个实例对象的原型链上
  function instanceofSty(left, right) {
    // 基本数据类型返回false
    if (typeof left !== 'object' || left === null) return false
    let _propo = Object.getPrototypeOf(left)
    while(true) {
      if (_propo === null) return false
      if (_propo === right.propotype) return true
      _propo = Object.getPropotypeOf(_propo)
    }
  }
```

- debounce (防抖)

```js
  const debounce = (fn, time) => {
    let timeout = null;
    return function() {
      clearTimeout(time)
      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, time)
    }
  }
```

- throttle (节流)

```js
  // 高频时间触发,但n秒内只会执行一次,所以节流会稀释函数的执行频率。
  const throttle = (fn, time) => {
    let flag = true
    return function() {
      if (!flag) return
      flag = false
      setTimeout(() => {
        fn.apply(this, arguments)
        flag = true
      }, time)
    }
  }
```

- Object.assgin() (浅拷贝)

```js
  Object.defineProperty(Object, 'assgin', {
    // target 目标对象
    value: function(target, ...args) {
      if (target == null) {
        return new typeError('Cannot convert undefined or null to object')
      }
      // 目标对象需要统一是引用数据类型，若不是会自动转换
      const to = Object(target)
      for (let i = 0; i < args.length; i++) {
        const nextSource = args[i]
        // 每一个源对象
        if (nextSource != null) {
          for (nextSoucre in nextKey) {
            // 使用for...in和hasOwnProperty双重判断，确保只拿到本身的属性、方法（不包含继承的）
            if (Object.propotype.hasOwnProperty.call(nextSoucre, nextKey)) {
              to[nextKey] = nextSoucre[nextKey]
            }
          }
        }
      }

      return to
    },
    // 不可枚举
    enumerable: false,
    writable: true,
    configurable: true,
  })

```

- 深拷贝

```js
  const cloneDeep = (target, hash = new WeakMap()) => {
    // 对于传入参数处理
    if (typeof target !== 'object' || target === null) {
      return target
    }

    // 哈希表中存在直接返回
    if (hash.has(target)) return hash.get(target)

    const cloneTarget = Array.isArray(target) ? [] : {};
    hash.set(target, cloneTarget);

    // 针对 Symbol
    const symKeys = Object.getOwnPropertySymbols(target)
    if (symKeys.length) {
      symKeys.forEach(sumKey => {
        if (typeof target[symKey] === 'object' && target[symKey] !== null) {
          cloneTarget[symKey] = cloneDeep(target[symKey])
        } else {
          cloneTarget[symKey] = target[symKey]
        }
      })
    }

    for (const i in target) {
      if (Object.prototype.hasOwnProperty.call(target, i)) {
        cloneTarget[i] =
          typeof target[i] === 'object' && target[i] !== null
          ? cloneDeep1(target[i], hash)
          : target[i];
      }
    }

    return cloneTarget
  }
```

- Object.is 

```js
  // Object.is 用于解决 
  // +0 === -0  // true
  // NaN === NaN // false

  const is = (x, y) => {
    if (x === y) {
      return x !== 0 || y !== 0 || 1/x  === 1/y
    } else {
      return x !== x && y !== y
    }
  }
```

- Promise 实现 
 Promise的标准可以查看 [PrmiseA+](https://promisesaplus.com/)
```js
  // 具体可以参考PromiseA+ 标准实现

  // 定义三种状态
  const PENDING = 'PENDING';      // 进行中
  const FULFILLED = 'FULFILLED';  // 已成功
  const REJECTED = 'REJECTED';    // 已失败

  class Promise {
    constructor(exector) {
      // 初始化状态
      this.status = PENDING;
      // 将成功、失败结果放在this上，便于then、catch访问
      this.value = undefined;
      this.reason = undefined;

      // 成功态回调函数队列
      this.onFulfilledCallbacks = [];
      // 失败态回调函数队列
      this.onRejectedCallbacks = [];

      const resolve = value => {
        // 只有进行中的状态可以更改
        if (this.status === PENDING) {
          this.status = FULFILLED;
          this.value = value
          // 成功函数一次执行
          this.onFulfilledCallbacks.forEach(fn => fn(this.value))
        }
      }

      const reject = reason => {
        // 只有进行中的状态可以更改
        if (this.status === PENDING) {
          this.status = REJECTED
          this.reason = reason
          // 失败函数回调
          this.onRejectedCallbacks.forEach(fn => fn(this.value))
        }
      }

      try {
        // 立即执行 exector
        // 用户可以直接调用 exector 里面的方法
        exector(resolve, reject)
      } catch (e) {
        // 抛出异常
        reject(e)
      }
    }

    then(onFulfilled, onRejected) {
      onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
      onRejected = typeof onRejected === 'function' ? onRejected : reason => {
        throw new Error(reason instanceof Error ? reason.message : reason)
      }
      const self = this
      return new Promise((resolve, reject) => {
        if (self.status === PENDING) {
          self.onFulfilledCallbacks.push(() => {
            try {
              setTimeout(() => {
                const result = onFulfilled(self.value)
                // 分两种情况：
                // 1. 回调函数返回值是Promise，执行then操作
                // 2. 如果不是Promise，调用新Promise的resolve函数
                result instanceof Promise ? result.then(resolve, reject) : resolve(result)
              })
            } catch (e) {
              reject(e)
            }
          })
          self.onRejectedCallbacks.push(() => {
            try {
              const result = onRejected(self.reason)
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise ? result.then(resolve, reject) : resolve(result)
            } catch (e) {
              reject(e)
            }
          })
        } else if (self.status === FULFILLED) {
          try {
            const result = onFulfilled(self.value)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          } catch(e) {
            reject(e)
          }
        } else if (self.status === REJECTED) {
          try {
            const result = onRejected(self.reason)
            result instanceof Promise ? result.then(resolve, reject) : resolve(result)
          } catch (e) {
            reject(e)
          }
        }
      })
    }

    catch(onRejected) {
      return this.then(null, onRejected)
    } 

    static resolve(value) {
      if (value instanceof Promise) {
        // 如果是Promise实例，直接返回
        return value
      } else {
        // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
        return new Promise((resolve, reject) => resolve(value))
      }
    }

    static reject(reason) {
      return new Promise((resolve, reject) => {
        reject(reason)
      })
    }

    static all(promiseAll) {
      const len = promiseArr.length
      const values = new Array(len)
      // 记录已经成功执行的promise个数
      let count = 0
      return new Promise((resolve, reject) => {
        for (let i = 0; i < len; i++) {
          // Promise.resolve()处理，确保每一个都是promise实例
          Promise.resolve(promiseAll[i]).then(
            val => {
              values[i] = val;
              count++;
              // 如果全部执行完，返回promise的状态就可以改变了
              if (count === len) resolve(values)
            },
            err => reject(err),
          )
        }
      })
    }

    static race(promiseAll) {
      return new Promise((resolve, reject) => {
        promiseAll.forEach(p => {
          Promise.resolve(p).then(
            val => resolve(val),
            err => reject(err),
          )
        })
      })
    }
  }

```

- Object.is 与比较操作符 “===”、“==” 的区别？

```js
  // 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。

  // 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。

  // 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。
```

- 什么是虚拟DOM，又是如何转为真实DOM的？
```js

  // 虚拟DOM可以理解为一个JS对象， 在SPA中，我们操作是对虚拟DOM进行操作，进而转为为真实DOM

  function render(vnode, container) {
    container.appendChild(_render(vnode))
  }

  // render DOM
  // 生成真是DOM节点
  function _render(vnode) {
    // 如果是数字类型转化为字符串
    if (typeof vnode === 'number') {
      vnode = String(vnode)
    }

    // 如果是字符串则直接创建文本节点
    if (typeof vnode === 'string') {
      return document.createTextNode(vnode)
    }

    // 普通DOM
    const dom = document.createElement(vnode.tag)

    if (vnode.attrs) {
      // 遍历状态
      Object.keys(vnode.attrs).map(key => {
        const value = vnode.attrs[key]
        dom.setAttribute(key, value)
      })
    }

    // 子数组进行递归操作
    vnode.children.forEach(child => render(child, dom))
    return dom
  }
```
