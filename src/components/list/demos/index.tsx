import React from 'react'
import { List } from 'components'
import { IconArrow } from '@ali/super-icon'
import { DemoBlock } from 'demos'
import styles from './index.less'


export default () => {
  return (
    <>
    <DemoBlock title='基础用法' padding='0' border='none'>
        <List className={styles.list} >
          <List.Item >1</List.Item>
          <List.Item >2</List.Item>
          <List.Item >3</List.Item>
        </List>
      </DemoBlock>
      <DemoBlock title='通过配置或者css 变量控制样式' padding='0' border='none'>
        <List innerStyle={{ padding: 4 }}>
          <List.Item padding={0}>1</List.Item>
          <List.Item className={styles.listItem}>2</List.Item>
          <List.Item >3</List.Item>
        </List>
      </DemoBlock>
      <DemoBlock title='展示箭头或者自定义' padding='0' border='none'>
        <List>
          <List.Item padding={0}>1</List.Item>
          <List.Item arrow={<div style={{ width: 20 }}><IconArrow size={16} color='currentColor' /></div>}>2</List.Item>
          <List.Item arrow>3</List.Item>
        </List>
      </DemoBlock>
      <DemoBlock title='可点击的功能列表' padding='0' border='none'>
        <List>
          <List.Item  onClick={() => {}}>
            Home
          </List.Item>
          <List.Item  onClick={() => {}}>
            Cart
          </List.Item>
          <List.Item  onClick={() => {}}>
            Account
          </List.Item>
        </List>
      </DemoBlock>
      <DemoBlock title='复杂布局' padding='0' border='none'>
        <List>
          <List.Item
            title='这里是标题'
            description='这里是描述信息'
            clickable
            onClick={() => {
              alert('clicked')
            }}
          >
            这里是主信息
          </List.Item>
          <List.Item title='这里是标题' clickable>
            这里是主信息
          </List.Item>
          <List.Item title='这里是标题'>这里是主信息</List.Item>
        </List>
      </DemoBlock>
    </>
  )
}
