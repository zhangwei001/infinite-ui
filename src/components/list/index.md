# List 列表

<code src="./demos/index.tsx"></code>
<code src="./demos/loadmore.tsx"></code>
<code src="./demos/tabs.tsx"></code>

## 属性


| 属性                      | 说明             | 类型                     | 默认值                    |
| ------------------------- | ----------------- | ------------------------- |------------------------- |
| type  | 主题类型              | 可选：`arise`                  | `-`              |
| innerStyle            | 设置list 层级下i-list-inner 的样式 | CSSProperties                  | - 
| loadMore  | 加载更多的回调函数                         | `() => Promise<void>` | -      |
| hasMore   | 是否还有更多内容                           | `boolean`             | false      |
| threshold | 触发加载事件的滚动触底距离阈值，单位为像素 | `number`              | `250`  |
| loadingText | 触发加载事件的底部文案 | `ReactNode`              | `加载中`  |
| moreText |加载完毕后底部文案 | `ReactNode`              | `没有更多了`  |
| timeout | 截流滚动时间控制，为0时自动填充加载          |     500    |
| onScroll | 滚动事件         |     `Function`    |   -
| scrollEventThrottle | 滚动事件截流          |    `number`    | `100`

List 会自动对 `loadMore` 函数加锁，避免重复的请求，但是前提是 `loadMore` 函数需要返回一个正确的 Promise，下面是正确和错误的用法示例：

## Ref

```
export type ListRef = {
    resetLoadMore?: () => void
}

const listRef = useRef<ListRef>(null)

// 通过调用resetLoadMore 重置列表
listRef.current &&  listRef.current.resetLoadMore && listRef.current.resetLoadMore()


```

```js
function loadMore() { // 错误
  doRequest()
}

async function loadMore() { // 错误
  doRequest()
}

async function loadMore() { // 正确
  await doRequest()
}

function loadMore() { // 正确
  return doRequest()
}
```

### List.Item

| 属性        | 说明                                                            | 类型                            | 默认值                                                     |
| ----------- | --------------------------------------------------------------- | ------------------------------- | ---------------------------------------------------------- |
| title       | 列表项中间上部的标题区域                                        | `ReactNode`                     | -                                                          |
| children    | 列表项中间的主内容区域                                          | `ReactNode`                     | -                                                          |
| description | 列表项中间下部的描述区域                                        | `ReactNode`                     | -                                                          
| padding       | 列表项上下padding 值                  | `Number` | `String`                     | `12px`                                                          |
| clickable   | 是否可以点击                                                    | `boolean`                       | 当 `onClick` 属性存在时，默认为 `true`，否则默认为 `false` |
| arrow       | 右侧是否显示箭头图标，也支持传入 `ReactNode` 来自定义图标       | `boolean \| ReactNode`          | 默认和 `clickable` 的值保持一致                            |
| disabled    | 是否禁用                                                        | `boolean`                       | `false`                                                    |
| onClick     | 列表项的点击事件，当设置了 `onClick` 属性时，列表项会有点击效果 | `(e: React.MouseEvent) => void` | -                                                          |
| onAppear     | 列表项的曝光事件，当设置了 `onAppear` 属性时，每次曝光都会调用该事件 | `(e: React.MouseEvent) => void` | -                                                          |
| onFirstAppear     | 列表项的曝光事件，当设置了 `onFirstAppear` 属性时，首次曝光将调用该事件 | `(e: React.MouseEvent) => void` | -                                                          |
| onDisappear     | 列表项的隐藏事件，当设置了 `onDisappear` 属性时，列表项隐藏时会调用该事件 | `(e: React.MouseEvent) => void` | -                                                          |

## CSS 变量

### List & List.Item

| 属性                      | 说明              | 默认值                    |
| ------------------------- | ----------------- | ------------------------- |
| --item-padding          | list Item 上下的padding 值 | `12px`                    |
| --prefix-width            | prefix 部分的宽度 | `auto`                    |
| --align-items           | list Item 对齐方向 | `center`                    |