# Toggle 切换

<code src="./demos/index.tsx"></code>


# API

### Toggle

| 参数           | 说明                                         | 类型                                                            | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------------------------------- | ------- |
| checked        | 指定当前是否选中                             | `boolean`                                                       | `false` |
| text           | Text for the toggle                             | `string`                                                       | - |
| defaultChecked | 初始是否选中                                 | `boolean`                                                       | `false` |
| onChange       | 变化时回调函数                               | `(val: boolean) => void`                                        | -       |
| id             | `input` 元素的 `id`，常用来配合 `label` 使用 | `string`                                                          | -       |
| icon           | 自定义 `icon` 图标                           | `(checked: boolean) => React.ReactNode`                        | -       |

### CSS 变量

| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --icon-size | 勾选图标的大小           | `16px` |
| --font-size | 右侧文字描述的大小       | `13px` |
| --select-font-color | 选中字体和边框色           | `#1E71FF` |
| --select-bg-color | 选中背景色   | `#E8F0FF` |
