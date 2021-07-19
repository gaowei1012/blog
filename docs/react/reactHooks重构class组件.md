<!--
 * @Author: 执念
 * @Date: 2021-07-19 10:30:46
 * @LastEditTime: 2021-07-19 10:37:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/react/reactHooks重构class组件.md
-->

#### React Hooks

首先大致介绍下 `React Hooks` 一些常用的 `API`

 **useState**

  初始化组件 `state`， 类似于 `state = { }`

  ```javascript

    // 我们定义了一个 value 的初始化变量，后面的参数是对他进行赋值操作，相当于函数组件中的 `this.setState({value: ''})`
    const [value, setValue] = useState('')
  ```

  **useEffect**
  组件加载在中调用，相当于类组件中的 `componentDidMount && componentDidUpdate` 等生命周期函数，此时我们的 `DOM` 节点已经加载完毕，可以去做网络请求等相关工作。

 ```javascript
  useEffect(() => {
    // ...
  }, [])
 ```

  此钩子接收两个参数，第一个是 callback 用于处理我们的业务数据，第二个参数用于优化，也就是组价刷新所依赖的对象

  **useCallback**
  此钩子接收一个 callback 用于定义我们的回调函数
  ```javascript
   
   const handleClick = useCallback(() => {
     // ...
    }, 'value')

  ```


  **useRef**
  此钩子用于获取我们真是的 DOM 节点，以供我们操作使用

  