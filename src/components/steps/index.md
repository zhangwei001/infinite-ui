# Steps 步骤条

<code src="./demos/index.tsx"></code>

### 属性



### Steps

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| direction        | 步骤条方向，可选值为 horizontal                             | `string`                               | `vertical` |
| activeIcon | 当前步骤对应的图标                                 | `React.Element` |  `-`
| inActiveIcon | 非当前步骤对应的图标                                 | `React.Element` |  `-`
| activeIndex | 当前步骤对应的索引值                                 | `Number` |  `0`
| renderCustomIcon | 渲染当前步骤自定义icon                                 | `function` |  `-`

----


### Step

| 参数           | 说明                                         | 类型                                    | 默认值  |
| -------------- | -------------------------------------------- | --------------------------------------- | ------- |
| icon | 当前步骤的图标，默认圆点，会自动根据Steps activeIndex判断             | `React.ReactNode` |  `-`
| content |  当前步骤旁边的内容                               | `React.ReactNode` |  `-`
| status | 当前步骤对应的状态, 会自动根据Steps activeIndex判断                                  | `'waiting' \| 'process' \| 'finished'` |  `-`


----

### CSS 变量

### Steps

| 属性        | 说明                     | 默认值 |
| ----------- | ------------------------ | ------ |
| --icon-finished-color | 已完成步骤的line 及默认icon 的颜色   | `#D5D5D5` | 
| --icon-process-color | 当前步骤的默认icon 颜色       | `#2E6EF6` |
| --icon-waiting-color |  待完成步骤的line 及默认icon 颜色 |  `#D5D5D5`|
| --title-font-size | 根据该size 计算icon 距离顶部的距离, vertical下有效 ｜ `14px`|