# Button 按钮

<code src="./demos/index.tsx"></code>

## API

| 属性        | 说明                         | 类型                                                             | 默认值    |
| ----------- | ---------------------------- | ---------------------------------------------------------------- | --------- |
| type       | 按钮的类型                   | 'primary' \| 'secondary' \| 'tertiary' \| 'dimmed' \| 'special'    | 'primary' |
| icon        | 按钮内展示的icon              | ReactNode                                                           | -         |
| size        | 大小                        | 'smaller' \|'small' \| 'middle' \| 'large'                                  | 'middle'  |
| block       | 是否是块级元素                | boolean                                                          | false     |
| link        | 是否为Link Button              | boolean                                                           | false         |
| hideArrow   | 是否展示箭头, 只有link 为true 时有效                  | boolean                                                          | false     |
| fill        | 填充模式                     | 'solid' \| 'outline' \| 'none'                                   | 'solid'   |
| disabled     | 是否禁用                     | boolean                                                          | false     |
| onClick     | 点击事件                     | (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | -         |
| btnType        | 原生 button 元素的 type 属性  | 'submit' \| 'reset' \| 'button'                                  | 'button'        |
