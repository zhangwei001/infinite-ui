import React, { useState } from 'react'
import { Button, SlipBar, Space } from 'components'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
     <DemoBlock title='底部多个按钮'>
        <Space direction='vertical' block>
          <Declarative />
        </Space>
      </DemoBlock>
      <DemoBlock title='底部多个按钮'>
        <Space direction='vertical' block>
          <Declarative1 />
        </Space>
      </DemoBlock>
      <DemoBlock title='底部单个按钮'>
        <Space direction='vertical' block>
          <Declarative2 />
        </Space>
      </DemoBlock>
      <DemoBlock title='隐藏底部'>
        <Space direction='vertical' block>
          <Declarative3 />
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
        按钮横向显示
      </Button>
      <SlipBar
        visible={visible}
        title='Confirm to delete?'
        content='Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actions={[
          {
            key: 'Cancel',
            color: 'secondary',
            text: 'Cancel',
          },
          {
            key: 'Confirm',
            text: 'Confirm',
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
        按钮纵向显示
      </Button>
      <SlipBar
        visible={visible}
        title='Confirm to delete?'
        content='Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actionsInArow={false}
        actions={[
          {
            key: 'Cancel',
            color: 'secondary',
            text: 'Cancel',
          },
          {
            key: 'Confirm',
            text: 'Confirm',
          },
        ]}
      />
    </>
  )
}
const Declarative2 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        block
        onClick={() => {
          setVisible(true)
        }}
      >
        单个按钮
      </Button>
      <SlipBar
        visible={visible}
        title='Confirm to delete?'
        content='Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actions={[
          {
            key: 'Confirm',
            text: 'Confirm',
            disabled: true
          },
        ]}
      />
    </>
  )
}

const Declarative3 = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        block
        onClick={() => {
          setVisible(true)
        }}
      >
        隐藏底部
      </Button>
      <SlipBar
        visible={visible}
        title='Confirm to delete?'
        content='Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        hideFooter
        actions={[
          {
            key: 'Cancel',
            color: 'secondary',
            text: 'Cancel',
          },
          {
            key: 'Confirm',
            text: 'Confirm',
          },
        ]}
      />
    </>
  )
}

