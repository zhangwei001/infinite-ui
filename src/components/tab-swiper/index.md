# TabSwiper 左右横滑组件
左右横滑组件，结合了swiper与tabs.
**暂未适配鼠标事件，请扫码查看**

## 基础使用
传入tabs参数来确定tab数量，以及配置defaultIndex来展示默认tab
<code src="./demos/basics/index.tsx" />

## 包含内部滚动的tab列表
tab内容包含内部滚动
<code src="./demos/tab-with-inner-scroll-content/index.tsx" />

## 超长tab
当tab使用多语言时，可以传入stretch=false,使用自适应tab，默认tab布局为等分。
<code src="./demos/long-tab/index.tsx" />

## 异步调用，手动切换tab
某些情况下，你可能需要在数据返回后，手动切换到指定tab。  
此时可以调用组件的实例方法：
```js
  this.tabSwiperRef.navigateTo(3);
```


<code src="./demos/async-tab/index.tsx" />


## API

### props
| 属性              | 说明                       | 类型                                                             | 默认值    |
| ----------------- | --------------------------| -------------------- | --------- |
| tabs | tabs 数据， 留意这里count若为数字，并且大于99，将会显示99+，如果不需要此特性，count传入字符串即可| Array<{key: string, title: string, count?: number &vert; string}>; |  |
| defaultIndex | 初始swiper的位置，默认为0（最左边） | Array<{key: string, title: string}>; | 0  |
| disabled | 禁用tabswiper滑动 | `boolean` | `false`  |
| className | 最外层容器样式 | string | ''
| tabContainerClassName | tab container样式 | string | ''
| tabListClassName | tab list样式 | string | ''
| tabItemClassName | tab item样式 | string | ''
| tabSliderClassName | tab slider样式 | string | ''
| tabItemTitleCountClassName | tab 数量样式 | string | ''
| swiperClassName | swiper容器的样式 | string | ''
| onChange | tab变化时触发 | (key: string, index: number) => void | null
| fixedLine | 下划线是否固定长度 | boolean | true

### 实例方法
| 属性              | 说明               | 类型                   | 默认值    |
| ----------------- | -----------------| -------------------- | --------- |
| navigateTo | 手动跳转到指定tab, 可选参数isTriggerOnChange表示是否触发tab变化onChange回调，默认为不触发 | (index: number， isTriggerOnChange: boolean=false) => void | |

