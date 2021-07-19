<!--
 * @Author: 执念
 * @Date: 2021-07-19 09:55:06
 * @LastEditTime: 2021-07-19 10:26:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /blog/docs/electron.md
-->

### electron 主进程与渲染进程

一、 **主进程**

  在 electron 中主进程通过读取 `package.json` 中的 `main`字段，加载 `main.js` 执行主进程加载，一个`electron`中只有有个主进程，多个渲染进程。

二、**渲染进程**

   渲染进程可以通俗的理解为多个页面的渲染，每一个页面就是一个独立的 `renderer` 进程，且每一个渲染进程之间的同时与之隔绝的。避免了一个页面崩溃导致整个应用崩溃无法使用。

三、**进程通信**

   在 `electron` 的渲染进程中，像 `menu, dialog` 模块只能在主进程中使用，要想在渲染进程中使用，必须进行主、渲染进程之间的通讯。

  ###### IpcMain 与 ipcRenderer

  通过这两个模块可以实现进程之间的通讯。

  - `ipcMain` 在主进程中使用，用来处理渲染进程发送的消息。
  - `ipcRenderer` 在渲染进程中使用，用来发送信息给主进程或者接受主进程发来的信息。

  ###### 主进程
  ```javascript
    const { ipcMain } = require('electron')

    // 监听渲染进程发来的事件
    ipcMain.on('event', (event, data) => {
      event.sender.send('event1', '我是主进程返回的值')
    })
  ```

###### 渲染进程
```javascript
  const { ipcRenderer } = require('electron')

  // 发送事件给主进程
  ipcRenderer.send('event', '我是传递给主进程的事件')

  // 监听主进程发来的事件
  ipcRenderer.on('event1', (event, data) => {
    console.log('我是主进程传递过来的')
  })
```
