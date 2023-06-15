# Select 选择

<code src="./demos/index.tsx"></code>

## AutoCompute 属性


| 属性 | 说明 | 类型 | 默认值 |
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
| dropdownClassName | 下拉菜单的 className 属性 | `string` | - | 
| notFoundContent | 当下拉列表为空时显示的内容 | ReactNode | - |  
| open | 是否展开下拉菜单 | `boolean` | - |  
| options | 数据化配置选项内容，相比 jsx 定义会获得更好的渲染性能 | { label, value }\[] | - |  
| children | 自定义下拉展示，优先级高于options | React.ReactNode[] | - |  
| onBlur | 失去焦点时的回调 | function() | - |  
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | - |  
| autoFocus | 自动聚焦 | boolean | false |
| onFocus | 获得焦点时的回调 | function() | - |  
| onSearch | 搜索补全项的时候调用 | function(value) | - |  
| onSelect | 被选中时调用，参数为选中项的 value 值, label(默认为`${value}_${idx}`) | function(value, label) | - |  



此外还支持以下原生属性：`autoComplete` `readOnly`  `type`

## Option 属性


| 属性 | 说明 | 类型 | 默认值 |
| ------------ | ----------------------------------------------- | ---------------------------------------------------------------- | ------- |
| label | onSelect回调传参, 唯一值 | `string` | - |  
| value | onChange回调传参 | `string` | - |  
| destroyOnClose	| 不可见时卸载内容	| `boolean`	| `false` | 
| forceRender	| 被隐藏时是否渲染 DOM 结构 | 	`boolean`	| `false`| 



