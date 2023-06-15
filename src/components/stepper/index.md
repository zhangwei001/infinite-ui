# Stepper 数量选择器

<code src="./demos/index.tsx"></code>

### 属性



### Stepper

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| value        | 当前值，受控值                             | `number \| undefined`                               | `-` |
| defaultValue | 默认值                                 | `number \| undefined`                               | `0` |
| min | 最小值                                 | `number `                               | `-` |
| max | 最大值                                 | `number`                               | `-` |
| step | 步长，每次改变步数                                 | `number `                               | `1` |
| editable | input 输入框是否可以直接编辑                                 | `boolean `                               | `true` |
| disabled       | 是否可用                                    | `boolean`                               | `false` |
| onChange       | 变化时回调函数            | `(value: number \| undefined) => void`                | -       |
| beforeChange      | 输入值变化前的回调函数，返回 false 可阻止输入，支持返回 Promise                               | `(value: number | undefined) => boolean | Promise<boolean>`                | -       |
| onFocus     | 输入框聚焦时触发                               | `(e: React.FocusEvent<HTMLInputElement>) => void`                | -       |
| onBlur      | 输入框失焦时触发                               | `(e: React.FocusEvent<HTMLInputElement>) => void`                | -       |


### CSS 变量

### Stepper

| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --i-stepper-height | Stepper组件整体高度       | `24px` |
| --i-stepper-input-width  | 输入框宽度 | `28px`  |
| --i-stepper-input-font-size  | 输入框内文字大小 | `13px`  |
| --i-stepper-input-text-color  | 输入框内文字颜色 | `#595f6d`  |
| --i-stepper-button-width  | 左右两侧按钮宽度 | `28px`  |
| --i-stepper-button-radius  | 左右两侧按钮圆角大小 | `3px`  |
| --i-stepper-button-font-size | 左右两侧按钮Icon 字体大小 | `10px`  |
| --i-stepper-button-color   | 左右两侧按钮内不可用时颜色 | `#f9f9fd`  |
| --i-stepper-button-text-color  | 左右两侧按钮内icon 颜色 | `var(--i-colour_primary_info)`  |
| --i-stepper-button-disabled-color   | 左右两侧按钮内不可用时颜色 | `var(--i-colour_quaternary_info)`  |
| --i-stepper-button-disabled-icon-color   | 左右两侧按钮内不可用时icon颜色 | `#e3e7f1`  |
