import React from 'react'
import { DemoBlock } from 'demos'
import { Icon, Space } from 'components'
import './demo1.less'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Icon type="search" />
        <Icon type="store" />
        <Icon type="info" />
        <Icon type="sort" />
        <Icon type="layout" />
        <Icon type="more" />
        <Icon type="like" />
        <Icon type="star" />
        <Icon type="arrow" />
        <Icon type="close" />
        <Icon type="notice" />
        <Icon type="success" />
        <Icon type="error" />
        <Icon type="warn" />
        <Icon type="chat" />
        <Icon type="arrow-light" />
        <Icon type="cart" />
        <Icon type="close-border" />
        <Icon type="delete" />
      </DemoBlock>
      <DemoBlock title='video 相关'>
        <Icon type="play" />
        <Icon type="mute" />
        <Icon type="fullscreen" />
        <Icon type="smallscreen" />
        <Icon type="sound" />
        <Icon type="pause" />
      </DemoBlock>
      <DemoBlock title='数量选择'>
        <Icon type="minus" />
        <Space style={{ width: 20 }}></Space>
        <Icon type="plus" />
      </DemoBlock>
      <DemoBlock title='Arise Icon'>
        <Icon type="ar-star" />
        <Icon type="ar-like" />
      </DemoBlock>
      <DemoBlock title='设置Icon 大小'>
        <Icon type="cart" size="smaller" />
        <Icon type="cart" size="small" />
        <Icon type="cart" size="middle" />
        <Icon type="cart" size="large" />
        <Icon type="cart" size="larger" />
      </DemoBlock>
      <DemoBlock title='自定义icon 颜色或者大小'>
        <Icon type="info" size="smaller" className="icon-info" />
        <Icon type="error" size="small" className="icon-error" />
        <Icon type="warn" size="middle" className="icon-warning" />
        <Icon type="success" size="large" className="icon-success" />
        <Icon type="success" size="larger" className="icon-success" />
      </DemoBlock>
      
    </>
  )
}
