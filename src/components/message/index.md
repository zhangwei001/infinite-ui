# Message 信息

<code src="./demo/index.tsx"></code>

## API

| 属性      | 说明                                   | 类型                                             | 默认值       |
| --------- | -------------------------------------- | ------------------------------------------------ | ------------ |
| color     | message 颜色类型                        | `default` \| `warning` \| `error` \| `success`\|          | `default`     |
| type     | message 类型        | `primary` \| `secondary` \|         | `primary`     |
| isInline   | 是否展示为行内模块                              | boolean                                      | `false`      |
| icon      | 左侧icon, 每个message 都有默认的icon,可替换    | React.ReactNode                                       | - |
| hideIcon      | 是否隐藏icon  | Boolean                                       | `false` |
| content   | message 内容                               | React.ReactNode                                        | - |
| title     | message title, 可不传                      | React.ReactNode                                        | - |
| closeable   | 是否可以关闭                               | boolean                                      | false      |
| onClose     | 关闭时的回调                               | ()=>void                                     | -        |
| extra     | 额外操作区域，展示在content 下方               | React.ReactNode                              | -        |
| style     | 自定义样式              | React.CSSProperties                              | -        |
