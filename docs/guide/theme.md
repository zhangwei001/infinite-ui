# 主题

得益于 CSS 变量强大而灵活的能力，自定义一套 infinite-ui 的主题是非常简单的，你不需要配置任何编译工具，也不需要安装额外的插件，直接修在 `:root` 覆盖 CSS 变量就可以了：

```css
:root {
  --i-color-primary: #a062d4;
}
```

当然如果你只是希望对局部的主题进行调整，也可以把上面的 CSS 变量覆盖逻辑加在任何一个你想调整的节点上，例如：

```css
.purple-theme {
  --i-color-primary: #a062d4;
}
```

```jsx
<div className='purple-theme'>
  <Button color='primary'>Purple</Button>
</div>
```

可以得到这样的一个按钮：


以下是 infinite-ui 目前提供的全局性 CSS 变量：

```css
:root {
  --i-color-primary: #1677ff;
  --i-color-success: #00b578;
  --i-color-warning: #ff8f1f;
  --i-color-danger: #ff3141;
  --i-color-white: #ffffff;
  --i-color-weak: #999999;
  --i-color-light: #cccccc;
  --i-border-color: #eeeeee;
  --i-font-size-main: 13px;
  --i-color-text: #333333;

  --i-font-family: Roboto, -apple-system, blinkmacsystemfont, 'Helvetica Neue',
  helvetica, segoe ui, arial, 'PingFang SC', 'miui',
  'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;

  --i-z-index-mask: 1000;
  --i-z-index-popup: 1000;
  --i-z-index-popover: 1030;
  --i-z-index-floating-panel: 900;
}
```
