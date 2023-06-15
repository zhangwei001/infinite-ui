# ActionSheet 动作面板

<code src="./demos/index.tsx"></code>

# API

## SlipBar

| 属性             | 说明                                                     | 类型                                            | 默认值        |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------- | ------------- |
visible          | 显示隐藏                                                 | boolean                                         | false         |
actions          | 操作按钮数组数据， | Action\[] \| \[]                        | \[]           |
renderItem          | item 渲染函数 | (action: {}, index: number) => ReactNode                        | -          |
cancelText          | 取消按钮文案,有则展示底部取消按钮 | string                      | -           |
cancelClass          | 取消按钮样式类 | string                      | -           |
onCancel          | 取消时触发 | ()=>void                     | -           |
itemClass          | 每个选项item 的样式类 |          React.CSSProperties                | -           |
 onSelect         | 点击操作按钮时触发                                       | (action: Action, index: number) => void         | -             |
| closeOnAction    | 点击操作按钮后后是否关闭                                 | boolean                                         | `true`         |
| maskClosable    | 点击遮罩层后是否关闭                                 | boolean                                         | `true`         |
| onClose          | 关闭时触发                                               | () => void                                      | -             |
| afterClose       | SlipBar 完全关闭后的回调                                  | () => void                                      | -             |



### action 数据结构

| 属性             | 说明                                                     | 类型                                            | 默认值        |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------- | ------------- |
name          | 标题                                                 | string                                         |-         |
desc          | 描述                                                 | string                                         |-         |
className    | 内容项额外添加的样式类，当前item 特有                                          | string                                       | -             |
disabled    | 是否为禁用状态                                          | boolean                                       |  `false`             |
callback    | 点击时触发的回调函数                                          | () => void      |  -             |