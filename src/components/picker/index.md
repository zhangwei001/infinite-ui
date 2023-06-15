# Picker 选择器
<code src="./demos/demo1.tsx"></code>


## Picker

### 属性

| 属性             | 说明                        | 类型                                                                       | 默认值         |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- | -------------- |
| options          | 配置每一列的选项             | `[[],[],[]]` | -                      |
| type            | 选择器类型.非必传，不设置type 需要自己设置options, 设置type 需要配合传入minDate 和maxDate  , 支持`'date'属性 `                      | `string`                                                    | -                      |
| columnsOrder          | type 为date 时年月日的排列顺序 | `Array`                                                   | `['year', 'month', 'day']`                      |
| buttonPosition | 按钮位置 | `'top' \| 'bottom'` | `bottom` |
| defaultValue     | 默认选中项                   | `PickerValue[]`              | `[]`                   |
| value            | 选中项                       | `PickerValue[]`   | `[]`                   |
| visible            | 是否可见                         | `boolean`                                                    | `false`                      |
| title            | 标题                         | `ReactNode`                                                    | -                      |
| cancelText       | 取消按钮的文字               | `ReactNode`                                                    | `'Cancel'`               |
| confirmText      | 确定按钮的文字               | `ReactNode`                                                    | `'Done'`               |
| onCancel         | 取消时触发                   | `() => void`                                                   | -                      |
| onConfirm        | 确认时触发                   | `(value: PickerValue[]) => void`    | -                      |
| onSelect         | 选项改变时触发               | `(value: PickerValue[]) => void`    | -                      |
| onClose          | 确认和取消时都会触发关闭事件 | `() => void`                                                   | -                      |
| monthWithNumber | 用数字展示月份, arise 默认用数字展示 | `boolean` |   `false` |  
| selectedStyle | 当前选中项样式 | `React.CSSProperties` |  `{color: '#FE4960', 'fontWeight': 'bold', fontSize: '21px' }`  |  
| showScrollStyle | 是否以滚筒形式展示 | `boolean` |   `true` |  
| showSelectedBorder | 选中项是否展示选定边框 | `boolean` |   `true` |  

</br>
</br>


### DatePicker Props
#### 当时间选择器类型为 'datetime' \| 'date' \| 'time' \| 'year-month' \| 'month-day' \| 'datehour' 时，支持以下 props:

| 属性             | 说明                        | 类型                                                                       | 默认值         |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- | -------------- |
| minDate            | 可选的最小时间，精确到分钟                         | `Date`                                                    | -                      |
| maxDate            | 可选的最大时间，精确到分钟                         | `Date`                                                    | -                      |


</br>

### CSS 变量

| 属性            | 说明                 | 默认值 |
| --------------- | -------------------- | ------ |
| --i-picker-height        | 半浮层content高度                 | `240px` |
| --i-item-font-size | 滚轮内item fontSize | `16px` |
</br>
