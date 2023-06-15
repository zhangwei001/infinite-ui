# Image 图片


<code src="./demos/demo1.tsx"></code>
<code src="./demos/demo2.tsx"></code>

## 属性

| 属性        | 说明                                | 类型                                                             | 默认值   |
| ----------- | ----------------------------------------------------------- | ----------------- | -------- |
| src         | 图片地址                            | `string`                                                         | -        |
| width       | 图片宽度，如果传入数字则单位为 `px` | `string \| number`                                               | -        |
| height      | 图片高度，如果传入数字则单位为 `px` | `string \| number`                                               | -        |
| compress     | 图片压缩后需要展示的尺寸（按750的设计上的宽高直接传即可）,没传则不压缩。压缩质量根据网络情况有默认值  | `{ width?: number, height?: number,  quality?: string}` | -                                               | -        |
| fit         | 图片填充模式                        | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'`       | `'fill'` |
| placeholder | 加载时的占位                        | `string`                                                      | 默认占位图 |
| fallback    | 加载失败的占位                      | `string`                                                      | 默认占位图 |
| lazy        | 是否懒加载图片                      | `boolean`                                                        | `false`  |
| onError     | 加载失败时触发                      | `(event: React.SyntheticEvent<HTMLImageElement, Event>) => void` | -        |
| onClick     | 图片点击事件                        | `(event: React.MouseEvent<HTMLImageElement, Event>) => void`     | -        |
| svgType     |  placeholder-svg默认类型                       |  `'large' \| 'small' \| 'avator' `     |  `large`       |

此外，还支持以下 HTML 原生属性：`crossOrigin`、`decoding`、`loading`、`referrerPolicy`、`sizes`、`srcSet`、`useMap`

`width` `height` 属性和 CSS 变量 `--width` `--height` 并不冲突，这些组件属性其实就是基于 CSS 变量实现的，只是 CSS 变量的一种快捷设置方式, 若同时设置，`width` 和 `height` 的属性优先级高于 `--width` `--height`。

----------------------------------------------------------------
`
## Arise
针对Arise 主题，会自动移除backgoudImage 属性，新增placeholderType 来标识占位图背景颜色
| 属性        | 说明                                | 类型                                                             | 默认值   |
| ----------- | ----------------------------------------------------------- | ----------------- | -------- |
| type       | Image 类型  | 支持 `arise`类型，该类型下会移除backgoudImage属性 | `-`     |
| placeholderType       | 占位图颜色类型  | `'light' \｜ 'dark' ` | `dark`     |


--------------------------------

## CSS 变量

| 属性     | 说明     | 默认值 | 全局变量             |
| -------- | -------- | ------ | -------------------- |
| --width  | 图片宽度 | `auto` | `--i-image-width`  |
| --height | 图片高度 | `auto` | `--i-image-height` |
| --placeholder-width | Arise 主题下的占位图高度 | `40px` | `-` |
