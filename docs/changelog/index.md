---
nav:
  title: Changelog
  order: 1
sidemenu: false
---

#### **组件发布版本规范**

**参照 Git 给出的 “**语义化版本 2.0.0**”约定，链接如下：**[https://semver.org/lang/zh-CN/](https://semver.org/lang/zh-CN/)

**主要约定内容如下：**

- **版本格式：主版本号.次版本号.修订号，版本号递增规则如下：**
- **主版本号：当你做了不兼容的 API 修改，**
- **次版本号：当你做了向下兼容的功能性新增，**
- **修订号：当你做了向下兼容的问题修正。**
- **先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸。**

**CHANGELOG 格式：**
🐞 修复 BUGs
🆕 添加新功能
🗑 移除一些老功能

###

---

## 5.0.0-beta.1
`2023-05-12`
### Features
- 🆕 组件库支持`treeshaking`，css引用方式更新,引用时需要在 项目中的根目录scss文件或页面的scss引入对应的css文件
```scss
@import "@ali/infinite-ui/es/style/infinite-ui.css";
```



## 4.0.6

`2023-04-26`
### Features
- 🆕 autoComplete: 新增 autoComplete 组件支持自动补齐输入
- 🆕 progress: 组件新增进度图标
- 🆕 select: 新增 select 组件
- 🆕 toggle: 新增 toggle 组件, 切换选择状态

### Enhancements [详情](https://aliyuque.antfin.com/grg64m/awhnoe/htpf8ixw5q6a4ogg?singleDoc#view:qpc5bpbgh6yu83uuchdruasfp30qqt6k)
- 🆕 checkbox: 选中颜色, box-shadow调整, 外观更新
- 🆕 input: 组件边框，布局调整，新增前缀，后缀，自定义动作
- 🆕 image: 组件默认placeholder调整, 新增3种placeholder形态
- 🆕 message: 组件默认背景色，字体色调整, 新增inline默认风格
- 🆕 picker: 组件布局调整， 支持5行内的滚筒风格
- 🆕 radio: 选中颜色,box-shadow调整,以及不再提供半选状态
- 🆕 step: 组件默认背景色，默认icon样式调整
- 🆕 switch: 默认尺寸、阴影、颜色调整
- 🆕 tab: 组件padding调整, 下划线长度默认固定
- 🆕 TabSwiper: 组件padding调整, 下划线长度默认固定
- 🆕 textarea: 组件边框，布局调整

### Deprecated
- 🗑 checkbox: 不再提供半选状态
- 🗑 step: 移除里程碑icon背景色

### Bug Fixes
- 🐞 Dialog: 组件默认宽度固定，修复了短正文时关闭按钮的位置偏下的问题



## 4.0.5

`2023-1-11`

- 🆕 button 整体 border-radius 调整 以及 渐变颜色调整等。[详情](https://yuque.antfin.com/grg64m/awhnoe/uvw9hd)



