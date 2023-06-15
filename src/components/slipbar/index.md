# SlipBar 半浮层

<code src="./demos/index.tsx"></code>

# API

## SlipBar

| 属性             | 说明                                                     | 类型                                            | 默认值        |
| ---------------- | -------------------------------------------------------- | ----------------------------------------------- | ------------- |
| title            | 对话框标题                                               | React.ReactNode 
| desc            | 对话框desc                                               | React.ReactNode                                 | -             |
| content          | 对话框内容                                               | React.ReactNode                                 | -             |
| actions          | 操作按钮列表，可以传入二级数组来实现同一行内并排多个按钮 | (Action \| Action\[])\[]                        | \[]           |
| actionsInArow          | 操作按钮是否横向一排展示                      | boolean         | true
| onAction         | 点击操作按钮时触发                                       | (action: Action, index: number) => void         | -             |
| closeOnAction    | 点击操作按钮后后是否关闭                                 | boolean                                         | false         |
| onClose          | 关闭时触发                                               | () => void                                      | -             |
| afterClose       | SlipBar 完全关闭后的回调                                  | () => void                                      | -             |
| maskClosable | 是否支持点击遮罩关闭对话框                               | boolean                                         | false         |
| visible          | 显示隐藏                                                 | boolean                                         | false         |
| hideFooter        | 隐藏SlipBar底部按钮区域                                          | boolean | false |  
| hideHeader        | 隐藏SlipBar顶部区域                                         | boolean | false |
| bodyStyle        | SlipBar 内容样式                                          | React.CSSProperties                             | -             |
| bodyClassName    | SlipBar 内容类名                                          | string                                          | -             |
| maskStyle        | SlipBar 遮罩样式                                          | React.CSSProperties                             | -             |
| maskClassName    | SlipBar 遮罩类名                                          | string                                          | -             |
