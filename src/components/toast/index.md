# Toast 提示

<code src="./demos/index.tsx"></code>
### 指令式组件
Toast 仅支持指令事件调用

## Toast.show
#### show 方法 支持传入一个`props` 对象，包含了以下属性


| 属性      | 说明                                   | 类型                                             | 默认值       |
| --------- | -------------------------------------- | ------------------------------------------------ | ------------ |
| icon     | icon 类型                        | `success` \| `warning` \| `info` \| `error`           | -     |
| customIcon | React.Node | 支持自定义icon | - |
| content   | message 内容                               | React.ReactNode                                        | - |
| duration     | 提示持续时间，为0则不会关闭                      | number                                       | 3000 |
|maskStyle| Toast 遮罩样式 | React.CSSProperties  | - |
|maskClassName | Toast 遮罩类名 | string | - |
|buttonText | Toast 右侧按钮文案, 有该字段自动调整为icon 居中| string | - |
|clickEvent | Toast 右侧按钮事件| () => void | - |



> 同一个时间只允许弹出一个轻提示, 新出现的Toast 会将之前正在显示中的Toast 挤掉。
你也可以直接传入一个字符串，`Toast.show` 会自动把它作为 `content`。

## Toast.clear
#### 清除所有Toast
