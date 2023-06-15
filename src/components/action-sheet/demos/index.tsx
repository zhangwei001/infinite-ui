import React, { useState } from 'react'
import { Button, ActionSheet, Space, Toast } from 'components'
import { DemoBlock } from 'demos'
import './index.less'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical' block>
          <Declarative />
        </Space>
      </DemoBlock>
      <DemoBlock title='带取消按钮'>
        <Space direction='vertical' block>
          <Declarative1 />
        </Space>
      </DemoBlock>
      <DemoBlock title='自渲染Item 选项'>
        <Space direction='vertical' block>
          <Declarative2 />
        </Space>
      </DemoBlock>
    </>
  )
}


const Declarative = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        block
        onClick={() => {
          setVisible(true)
        }}
      >
        基础用法
      </Button>
      <ActionSheet
        visible={visible}
        closeOnAction
        className="actionsheet-bottom"
        onClose={() => {
          setVisible(false)
        }}
        onSelect={(action, index) => {
          Toast.show({ content: action.name })
          console.log(action, index)
        }}
        actions={[
          {
            key: '1',
            name: '选项一',
            className: 'action-item-red'
          },
          {
            key: '2',
            name: '选项二',
            disabled: true
          },
          {
            key: '3',
            name: '选项三',
          },
        ]}
      />
    </>
  )
}
const Declarative1 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        block
        onClick={() => {
          setVisible(true)
        }}
      >
        带取消按钮
      </Button>
      <ActionSheet
        visible={visible}
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        cancelText='取消'
        onSelect={(action, index) => {
          if (action && action.name) {
            Toast.show({ content: action.name })
          }
          console.log(action, index)
        }}
        actions={[
          {
            key: '1',
            name: '选项一',
          },
          {
            key: '2',
            name: '选项二',
          },
          {
            key: '3',
            name: '选项三',
          },
        ]}
      />
    </>
  )
}
const Declarative2 = () => {
  const [visible, setVisible] = useState(false)
  const renderItem = (item: { title: string }, index: number) => {
    return <span>{index}-{item.title}</span>
  }
  return (
    <>
      <Button
        block
        onClick={() => {
          setVisible(true)
        }}
      >
        自渲染item
      </Button>
      <ActionSheet
        visible={visible}
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        onSelect={(action, index) => {
          Toast.show({ content: action.title })
          console.log(action, index)
        }}
        renderItem={renderItem}
        actions={[
          {
            title: '1'
          },
          {
            title: '2'
          },
          {
            title: '3'
          },
        ]}
      />
    </>
  )
}


