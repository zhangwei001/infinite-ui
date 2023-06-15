# InfiniteScroll 滚动组件

当 `hasMore` 属性为 `true` 时，用户页面滚动到底部 `threshold` (默认为 250px)时无限滚动组件会调用定义的 `loadMore` 函数。

<code src="./demos/index.tsx"></code>


## 属性


| 属性                      | 说明             | 类型                     | 默认值                    |
| ------------------------- | ----------------- | ------------------------- |------------------------- |
| type        | 主题类型              | 可选：`arise`                  | `-`              |
| loadMore  | 加载更多的回调函数                         | `Fn` | -      |
| hasMore   | 是否还有更多内容                           | `boolean`             | false      |
| children | 子元素 | `ReactNode`              | - |
| loader | 自定义加载更多文案,不存在默认loading ｜ `ReactNode`  | - |
| loadingText | 触发加载事件的底部文案, 有默认loading | `ReactNode`              | `loading more data`  |
| loading | 是否展示底部文案 | `boolean`              | `没有更多了`  |
| dataLength | 列表length          |     `number`    | -
