# Video 视频

<code src="./demos/index.tsx"></code>

<code src="./demos/demo1.tsx"></code>

## API

| 属性      | 说明                                   | 类型                                             | 默认值       |
| --------- | -------------------------------------- | ------------------------------------------------ | ------------ |
| src     | 视频地址                               | `string` | -         | -            |
| poster | 封面图地址                               | `string` | -                       | - |
| playsInline      | 是否全屏幕播放                               | `boolean`  | true         |
| controls      | 是否展示控制器控件                               | `boolean`  | false         |
| muted        | 视频内的音频是否是默认静音     | `boolean `              | true        |
| autoPlay | 是否自动播放                               | `boolean` | false                    | - |
| playControl | play 或 pause，手动控制视频播放，如果不设置，则通过autoPlay属性来判定当视频加载后，是否播放，autoPlay优先                            | `string` | pause                    | - |
| onPlay | 视频播放时处理方法     |  `() => void`  |     - |
| onEnded | 视频播放完后处理方法     |  `() => void`  |     - |
| onPause | 视频暂停时处理方法     |  `() => void`  |     - |
| onError | 视频播放失败时处理方法     |  `() => void`  |     - |
