
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