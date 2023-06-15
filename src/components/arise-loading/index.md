# Arise Loading 加载中
用于页面与区块的加载中

## 基础使用
通过show与hide方法来显示与关闭loading
```js
import { AriseLoading as Loading } from "infinite-ui"
Loading.show(); // 显示全局loading
Loading.hide(); // 关闭全局loading
```

<code src="./demos/basics/index.tsx" />

## 局部使用
当我们需要在页面的局部添加loading，例如：  
- 页面加载更多，需要在页面的底部加上局部loading  
- 下拉刷新，需要在页面的顶部增加loading
```jsx
// 通过切换visible来隐藏和展示loading，配置wrapperClassName 和iconClassName可以调整样式
<Loading.Element visible={visible}>
  <span>loading...</span>
</Loading.Element>
```

<code src="./demos/block/index.tsx" />

# API
## Loading
| 属性              | 说明                                       | 类型                                                             | 默认值    |
| ----------------- | ------------------------------------------ | -------------------- | --------- |
| config | 配置全局mask是否展现: { mask: true} | function | - |
| show | 显示loading | function | - |
| hide | 隐藏loading | function | - |

## Loading.Element
页面结构如下
```html
<div class="className">
  <div class="wrapperClassName">
    <icon class="iconClassName"/>
    {children}
  </div>
</div>
```
| 属性              | 说明                                       | 类型                                                             | 默认值    |
| ----------------- | ------------------------------------------ | -------------------- | --------- |
| visible | 是否显示loading | boolean | false |
| mask | 是否需要全屏的遮罩，存在时将会阻止事件冒泡 | boolean | false |
| className | 默认loading是位于全屏中间, 定制loading的样式 | string | ''
| wrapperClassName | 定制wrapper的样式 | string | ''
| iconClassName | 定制icon的样式 | string | ''
| indicator | 自定义指示器，为true将隐藏lazada图标,传入children实现自定义loading | boolean | false