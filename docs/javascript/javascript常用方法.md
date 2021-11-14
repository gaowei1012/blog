- 获取两个整数之前的随机整数

```ts
const random = (min, max) => Math.floor(Math.rrandom() * (max - min + 1) + min)
```

- 合并两个数组

```ts
const merge = (a: any, b: any) => a.conncat(b)

const merge = (a: any, b: any) => [...a, ...b] 
```

- 去除字符串中的HTML

```ts
const parserHtml = (html: string) => (new DOMParser().parserFromString(html, 'text/html')).body.textContent || ''
```

- 字符串首字母大写

```ts
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.splice(1)
```

- 获取随机十六进制颜色

```js
const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`
```

- 复制内容到剪切板

```ts
const copyToClipboard = (text: string) => navigator.clipboard.writeText(text);
```

- 获取选中文本的值

```ts
const getSelectedText = () => window.getSelection().toString()

```

- 检测是否是黑暗模式

```ts
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

```

- 判断当前是否是苹果设备

```ts
const isAppleDevice = () => /Mac|iPod|iPhone|iPad/.test(navigator.platform)

```

- 随机布尔值

```ts
const randomBoolean = () => Math.random() >= 0.5
```

- 删除数组最后一位元素
```ts
const last = (arr: any) => {
    return arr.slice(0, arr.length-1)
}
```
