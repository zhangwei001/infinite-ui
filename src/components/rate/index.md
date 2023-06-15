# Rate 评分

<code src="./demos/index.tsx"></code>

## 属性

| 属性         | 说明                   | 类型                      | 默认值           |
| ------------ | ---------------------- | ------------------------- | ---------------- |
| type        | star 类型              | 可选：`arise`                  | `-`              |
| count        | star 总数              | `number`                  | `5`              |
| color        | star color              | `string`                  | `#ffc83c`             |
| unselectedColor  | star 未选中时的颜色              | `string`                  | `#f0f0f0`             |
| stokeColor  | start 边框颜色              | `string`                  | 不额外设置则跟color 保持一致           |
| defaultValue | 默认值，默认值为小数时暂不支持点击                 | `number`                  | `0`              |
| readOnly     | 只读，无法进行交互     | `boolean`                 | `false`          |
| value        | 当前数，受控值         | `number`                  | -                |
| allowClear   | 是否允许再次点击后清除 | `boolean`                 | `true`           |
| onChange     | 选择时的回调           | `(value: number) => void` | -                |

## CSS 变量

| 属性           | 说明      | 默认值    |
| -------------- | --------- | --------- |
| --star-size    | star 大小 | `28px`    |
|--star-padding    | star Padding | `3px`    |
