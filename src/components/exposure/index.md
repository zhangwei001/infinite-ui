# Exposure 曝光组件

```
import { Exposure } from '@ali/infinite-ui'

<Exposure always={true} onExpose={exposureEvent} onFirstExposure={firstExposure} onHide={hideEvent} >
</Exposure>
```


## 属性


| 属性                      | 说明             | 类型                     | 默认值                    |
| ------------------------- | ----------------- | ------------------------- |------------------------- |
| onAppear  | 元素曝光时处触发器                         | `（）=> void` | -      |
| onFirstAppear  | 首次曝光时触发                         | `（）=> void` | -      |
| onDisappear  | 元素消失时触发                         | `（）=> void` | -      |