# Dialog 弹窗

<code src="./demos/index.tsx"></code>

# API

## Dialog

| 属性             | 说明                                                     | 类型                                            | 默认值        |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------- | ------------- |
| title            | 对话框标题                                               | React.ReactNode 
| desc            | 对话框desc                                               | React.ReactNode                                 | -             |
| content          | 对话框内容                                               | React.ReactNode                                 | -             |
| actions          | 操作按钮列表，可以传入二级数组来实现同一行内并排多个按钮 | (Action \| Action\[])\[]                        | \[]           |
| onAction         | 点击操作按钮时触发                                       | (action: Action, index: number) => void         | -             |
| closeOnAction    | 点击操作按钮后后是否关闭                                 | boolean                                         | false         |
| onClose          | 关闭时触发                                               | () => void                                      | -             |
| afterClose       | Dialog 完全关闭后的回调                                  | () => void                                      | -             |
| maskClosable | 是否支持点击遮罩关闭对话框                               | boolean                                         | false         |
| visible          | 显示隐藏                                                 | boolean                                         | false         |
| hideFooter        | 隐藏Dialog底部按钮区域                                          | boolean | false |  
| hideCloseBtn        | 隐藏Dialog底部关闭按钮域                                          | boolean | false |
| bodyStyle        | Dialog 内容样式                                          | React.CSSProperties                             | -             |
| bodyClassName    | Dialog 内容类名                                          | string                                          | -             |
| maskStyle        | Dialog 遮罩样式                                          | React.CSSProperties                             | -             |
| maskClassName    | Dialog 遮罩类名                                          | string                                          | -             |

### Action

| 属性     | 说明           | 类型             | 默认值 |
| -------- | -------------- | ---------------- | ------ |
| key      | 唯一标记       | string \| number | -      |
| text     | 标题           | string           | -      |
| disabled | 是否为禁用状态 | boolean          | false  |
| color   | 按钮颜色类型 | 'primary' \| 'secondary' \| 'tertiary' \| 'dimmed'          | 'primary'  |
| onClick  | 点击时触发     | () => void       | -      |

## 指令式

可以通过指令式的方式使用 Dialog：

### Dialog.show

```ts | pure
const handler = ActionSheet.show(props)
```

可以通过调用 `Dialog` 上的 `show` 方法直接打开对话框，其中 `props` 参数的类型同上表，但不支持传入 `visible` 属性。

当对话框被关闭后，组件实例会自动销毁。

`show` 方法的返回值为一个组件控制器，包含以下属性：

| 属性  | 说明       | 类型       |
| ----- | ---------- | ---------- |
| close | 关闭对话框 | () => void |

`show` 只是一个很基础的方法，在实际业务中，更为常用的是下面的 `alert` 和 `confirm` 方法：

### Dialog.alert

`alert` 接受的参数同 `show`，但不支持 `closeOnAction` `actions` 属性，它的返回值不是一个控制器对象，而是 `Promise<void>`。

此外，它还额外支持以下属性：

| 属性        | 说明               | 类型                         | 默认值   |
| ----------- | ------------------ | ---------------------------- | -------- |
| confirmText | 确认按钮的内容     | ReactNode                    | 我知道了 |
| onConfirm   | 点击确认按钮时触发 | () => void \| Promise\<void> | -        |

### Dialog.confirm

`alert` 接受的参数同 `show`，但不支持 `closeOnAction` `actions` 属性，它的返回值不是一个控制器对象，而是 `Promise<void>`。

此外，它还额外支持以下属性：

| 属性        | 说明               | 类型                         | 默认值 |
| ----------- | ------------------ | ---------------------------- | ------ |
| confirmText | 确认按钮的内容     | ReactNode                    | 确认   |
| onConfirm   | 点击确认按钮时触发 | () => void \| Promise\<void> | -      |
| cancelText  | 取消按钮的内容     | ReactNode                    | 取消   |
| onCancel    | 点击取消按钮时触发 | () => void \| Promise\<void> | -      |
