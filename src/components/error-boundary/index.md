# ErrorBoundary 错误边界


<code src="./demos/demo1.tsx"></code>


## ErrorBoundary 属性

| 属性        | 说明                                | 类型                                                             | 默认值   |
| ----------- | ----------------------------------------------------------- | ----------------- | -------- |
| itraceCatId       | itrace自定义上报ID |                      `number`                         |     `106`   |
| pageName       | 页面名，该值会以 c1 字段上报到 itrace  |                `string`                   |    `document.title \|\| goldlog.spm_ab`  |
| showErrorPage       | 出错是否要展示错误页 |                      `boolean`                         |     `true`   |

## ErrorPage 属性

| 属性        | 说明                                | 类型                                                             | 默认值   |
| ----------- | ----------------------------------------------------------- | ----------------- | -------- |
| scene       | 错误场景 |                           `'boundary' \| 'mtop'  \| 'RESOURCE_ERROR'`                   |     `mtop`   |
| itraceCatId       | itrace自定义上报ID |                      `number`                         |     `106`   |
| mtop       |  mtop名，该值会以 c2 字段上报到 itrace |                          `string`                     |     -   |
| errorMsg  |  自定义错误信息 |                          `string`                     |     -   |
| desc       | 错误文案 |                      `string`                         |     `多语言 Something went wrong. Come back later.`   |
| buttonText       | 组件按钮文案 |                      `string`                         |     `多语言Try again`   |
| showFeedback       | 是否展示反馈链接 |                      `boolean`                         |    `true`    |
| errorImg       | 组件配图 |                      `string`                         |        |
| fixed       | 是否固定定位 |                      `boolean`                         |     `false`   |
| fullscreen      | 是否全屏（100vh） |     `boolean`                 | `true`       |
| onButtonClick       | 重试按钮逻辑 |                     `(event: React.MouseEvent<HTMLImageElement, Event>) => void`                         |    location.reload() 刷新页面    |
| onFeedbackClick       | 反馈按钮逻辑 |                     `(event: React.MouseEvent<HTMLImageElement, Event>) => void`                         |    跳转反馈页:http://native.m.lazada.com/feedback   |


## 自定义监控查看
请进入到自己页面所在的 itrace 项目，查看 id 为 `itraceCatId` 的自定义监控项

![itrace](https://img.alicdn.com/imgextra/i4/O1CN01BnVLvE1YtAvL3MMTg_!!6000000003116-2-tps-2534-900.png)

> 基础链路的同学直接点此进行查看: https://wpk-intl.ucweb.com/#/ym9gy0ob-2mtx43wn/h5/custom/index?code=106
