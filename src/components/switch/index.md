# Switch 开关

<code src="./demos/index.tsx"></code>

### 属性



### Switch

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| checked        | 指定当前是否选中                             | `boolean \| -`                               | `undefined` |
| defaultChecked | 初始是否选中                                 | `boolean`                               | `false` |
| disabled       | 是否可用                                    | `boolean`                               | `false` |
| onChange       | 变化时回调函数                               | `(val: boolean) => void`                | -       |
| activeColor    | 打开时背景色                                 | `string`                                | `#1989fa` |
| inActiveColor  | 关闭时背景色                                 | `string`                                | `#F8F8F8` |

### CSS 变量

### Switch

| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --i-switch-width | switch宽       | `50px` |
| --i-switch-height  |  switch高, handler 宽高都使用该值 | `32px`  |
