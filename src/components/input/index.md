# Input 文本域

<code src="./demos/index.tsx"></code>

## 属性

| 属性         | 说明                                            | 类型                                                             | 默认值  |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------------- | ------- |
| value        | 输入值                                          | `string`                                                         | -       |
| defaultValue | 默认值                                          | `string`                                                         | -       |
| onChange     | input内容变化时触发                            | `(value: string) => void`                                        | -       |
| placeholder  | 提示文本                                        | `string`                                                         | -       |
| bordered     | 是否有边框                                | `boolean`              | `true` |
| disabled         |是否禁用状态                                            | `boolean`                                                         | `false`     |
| allowClear         |可以点击清除图标删除内容                                            | `boolean`                                                         | `false`     |
| Integer         |是否为整数（结合原生属性：type）                                            | `boolean`                                                         | `false`     |
| maxLength    | 最大字符数                                      | `number`                                                         | -       |
| showCount    | 显示字数，支持自定义渲染                        | `boolean \| ((length: number, maxLength?: number) => ReactNode)` | `false` |
| id           | `input` 元素的 `id`，常用来配合 `label` 使用 | `string`                                                         | -       |
| prefix           | 前缀文案 | `string`                          | -       |
| suffix           | 后缀文案 | `string`                          | -       |
| actionIcon       | input触发按钮 | `ReactNode`                          | -       |


此外还支持以下原生属性：`autoComplete` `readOnly` `onFocus` `onBlur` `type`

## CSS 变量

| 属性                | 说明                   | 默认值                   |
| ------------------- | ---------------------- | ------------------------ |
| --i-input-text-font-size | input 字体大小 | `13px` |
| --i-input-text-color | input 内文字颜色  |  `#272833`|
|  --i-input-placeholder-color | input placehoder 文字颜色 |   `var(--i-color-light)` |
|  --i-input-disabled-text-color | 禁用状态下的文字颜 |    `#c6cad2` |
|  --i-input-disabled-color | 禁用状态下的输入框颜色 |  `#eee` | 
|  --i-input-border-radius | input 边框radius |    `0` | 
|  --i-input-focus-border-color | input focus 状态下边框颜色 | `#272833`|