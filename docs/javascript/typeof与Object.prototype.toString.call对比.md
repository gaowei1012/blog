<!--
 * @Author: 执念
 * @Date: 2021-07-19 12:35:02
 * @LastEditTime: 2021-07-19 12:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/javascript/typeof与Object.prototype.toString.call对比.md
-->

`typeof` 可以对 `Number， Boolean，Undefined，String, Function` 类型做比较的，对于对象数组则不适用，数组可以使用 `Array` 里面的方法，`Date, Object, Array, RegExp, Error, Null` 使用`typeof`只会返回 `object`

还可以使用 `Object.prototype.toString.call()` 进行判断，使用如下代码：

```javascript
const arr = [1, 2, 3]

// 使用typeof 对数组进行判断
console.log(typeof arr) // 'object'

// 对数组进行判断
console.log(Array.isArray([1, 2, 4])) //  true

// 使用 Object  call 对数组进行判断
console.log(Object.prototype.toString.call([1,2,4]))
// 输出 '[object, Array]', 判断是否等于输出值，则可以判断出是否为数组

// 使用 Object call 对对象进行判断
const obj = {}
console.log(Object.prototype.toString.call(obj))
// 输出 '[object, Object]' , 哦按段是否登录输出值

// 使用 Object call 对 字符串、数字、布尔类型

// 字符串
console.log(Object.prototype.toString.call('hello'))
// '[object, String]'

// 数字
console.log(Object.prototype.toString.call(123))
// '[object, Number]'


// 布尔
console.log(Object.prototype.toString.call(false))
// '[object,Boolean]'

```


![image](https://user-images.githubusercontent.com/25763661/114307826-e09cfa00-9b13-11eb-9ffd-6bdce8fa1d43.png)