# Radio 单选框

<code src="./demos/demo1.tsx"></code>

### 属性

```ts | pure
type RadioValue = string | number
```

### Radio

| 参数           | 说明                                         | 类型                                    | 默认值  |  版本 |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- | - |
| checked        | 指定当前是否选中                             | `boolean`                               | `false` | |
| defaultChecked | 初始是否选中                                 | `boolean`                               | `false` | |
| disabled       | 失效状态                                     | `boolean`                               | `false` | |
| indeterminate  | 设置 `indeterminate` 状态，只负责样式控制    | `boolean`                                                       | `false` | 4.0.6后不再提供 |
| onChange       | 变化时回调函数                               | `(val: boolean) => void`                | -       | |
| value          | 携带的标识值，用于 `Group` 模式              | `RadioValue`                            | -       | |
| block          | 是否渲染为块级元素                           | `boolean`                               | `false` | |
| id             | `input` 元素的 `id`，常用来配合 `label` 使用 | `string`                                | -       | |
| icon           | 自定义 `icon` 图标                           | `(checked: boolean) => React.ReactNode` | -       | |

### Radio.Group

| 参数         | 说明           | 类型                          | 默认值  |
| ------------ | -------------- | ----------------------------- | ------- |
| defaultValue | 默认选中的选项 | `RadioValue \| null`          | `null`  |
| disabled     | 整组失效       | `boolean`                     | `false` |
| value        | 指定选中的选项 | `RadioValue \| null`          | -       |
| onChange     | 变化时回调函数 | `(value: RadioValue) => void` | -       |

### CSS 变量

### Radio

| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --icon-size | 勾选图标的大小           | `22px` |
| --font-size | 右侧文字描述的大小       | `17px` |
| --font-color | 右侧文字描述的颜色       | `2e3346/c6cad2` |
| --gap       | 图标和文字描述之间的间距 | `8px`  |
| --base-color| Radio color          | `#1E71FF`|
