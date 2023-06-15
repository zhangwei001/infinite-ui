# SwipeCell 滑动单元格

<code src="./demos/index.tsx"></code>

<p>SwipeCell 可以嵌套任意内容，比如嵌套一个商品卡片。</p>

### 属性



### SwipeCell

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| rightActions | 左侧的操作按钮列表标                                 | `Action[]` |  `[]`
| onAction | 点击操作按钮时触发标                                 | `(action: Action, e: React.MouseEvent) => void` |  `-`
| closeOnTouchOutside | 是否在点击其他区域时自动归位                                 | `boolean` |  `-`
| closeOnAction | 是否在点击操作按钮时自动归位                                 | `boolean` |  `-`


----
### 指令式

可以通过指令式的方式使用 SwipeCell. 支持show & close 方法


----
#### Action

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| key | Action 内的key, 需要唯一,必传                                 | `string` |  `-`
| icon | Action 内icon                                  | `React.ReactElement` |  `-`
| text |  Action 内文案                                | `string` |  `-`
| bgColor |  Action 区域的背景色                                | `string` |  `-`
| onClick | Action 区域点击触发                                 | `(event:any) => void` |  `-`


----


### CSS 变量


| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --action-item-width | SwipeCell 单个Action 宽度       | `90px` |
| --action-item-fontsize  | Action 内文字 fontSize | `var(--i-fontsize_content_large)`  |
