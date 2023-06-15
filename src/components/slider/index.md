# Slider 走马灯

<code src="./demos/demo1.tsx"></code>
<code src="./demos/demo2.tsx"></code>

## Slider

### 属性

| 属性             | 说明                        | 类型                                                                       | 默认值         |
| ---------------- | --------------------------- | -------------------------------------------------------------------------- | -------------- |
| defaultIndex     | 初始位置                    | `number`                                                                   | `0`            |
| allowTouchMove   | 是否允许手势滑动            | `boolean`                                                                  | `true`         |
| autoplay         | 是否自动切换                | `boolean`                                                                  | `false`        |
| autoplayInterval | 自动切换的间隔，单位为 `ms` | `number`                                                                   | `3000`         |
| loop             | 是否循环                    | `boolean`                                                                  | `true`         |
| direction        | 方向，默认是水平方向        | `'horizontal' \| 'vertical'`                                               | `'horizontal'` |
| onIndexChange    | 切换时触发                  | `(index: number) => void`                                                  | -              |
| onLastIndexChange    | 非循环模式下，切换到最后一页时触发                  | `(index: number) => void`                                                  | -              |
| showIndicator    | 是否展示指示器                  | `boolean`                                                  | `false`            |
| indicatorProps   | 指示器的相关属性            | 支持 [PageIndicator](./page-indicator) 的 `color` `style` `className` 属性 | -              |

### CSS 变量

| 属性            | 说明                 | 默认值 |
| --------------- | -------------------- | ------ |
| --height        | 高度                 | `auto` |
| --width         | 宽度                 | `100%` |
| --slider-width   | 滑块宽度             | `100%` |
| --slider-height  | 滑块高度             | `auto` |
| --border-radius | 整体组件的圆角       | `0`    |
| --track-padding | 轨道区域的 `padding` | `0`    |
| --track-offset  | 轨道的整体偏移量     | `0`    |

### Ref

| 属性      | 说明           | 类型                      |
| --------- | -------------- | ------------------------- |
| sliderTo   | 切换到指定索引 | `(index: number) => void` |
| sliderPrev | 切换到上一张   | `() => void`              |
| sliderNext | 切换到下一张   | `() => void`              |

## Slider.Item

| 属性    | 说明           | 类型                                                        | 默认值 |
| ------- | -------------- | ----------------------------------------------------------- | ------ |
| onClick | 点击滑块时触发 | `(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void` | -      |
