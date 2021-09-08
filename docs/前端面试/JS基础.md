- 数组扁平化

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
