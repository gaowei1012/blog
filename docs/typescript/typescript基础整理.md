<!--
 * @Author: 执念
 * @Date: 2021-07-27 09:48:05
 * @LastEditTime: 2021-07-27 10:17:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/typescript/typescript基础整理.md
-->

### typescript 基础整理


> 类型约束

- 常用类型定义，包括 `string`, `number`, `boolean`, `Array`, `undefined`, `null`

```typescript

  const str: string = ''
  const num: number = 0
  const bol: boolean = false
  const arr_str: Array<string> = ['str']
  const arr_obj: Array<object> = [{key: 'value'}]
  const undefined: undefined = undefined
  const null: null = null

  // any
  let value: any

  value = 123 // ok
  value = '123' // ok
  value = {} // ok

```

- unknown 和 any

  `unknown` 与 `any` 的主要区别是  `unknown` 类型会更加严格；在对 `unknown` 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而对于 `any` 类型的执行操作之前，我们不必要进行任何检查。

```typescript
  let value: unknown

  value: any = '123' // ok
  value: unknown = 123 // ok

  // 定义其他类型会报错
  value: number = 123 // Error
  value: string = '123' // Error
  value: object = {} // Error

```


- void 类型
 `void` 类型与 `any` 相反，当一个函数没有任何返回值的时候，通常会使用 `void`

```typescript
  function warnUser(): void {
    console.log('This is my warning message')
  }
```

- Never 类型
`never` 类型表示不存在的类型，例如错误信息抛出
```typescript
  function error(message: string): never {
    throw new Error(message)
  }
```
