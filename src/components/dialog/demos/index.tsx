import React, { useState } from 'react'
import { Button, Dialog, Space, Toast } from 'components'

import { DemoBlock, DemoDescription } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='Basic Alert'>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() =>
              Dialog.alert({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
              })
            }
          >
            Alert 对话框
          </Button>
          <Button
            block
            onClick={() => {
              Dialog.alert({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?',
                maskClosable: true,
              })
            }}
          >
            点击遮罩关闭
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Free Form'>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() => {
              Dialog.alert({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?',
                hideFooter: true
              })
            }}
          >
          隐藏Footer
          </Button>
          <Button
            block
            onClick={() => {
              Dialog.alert({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?',
                hideCloseBtn: true
              })
            }}
          >
            隐藏关闭按钮
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Basic Alert'>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() =>
              Dialog.alert({
                hideFooter: true,
                bodyStyle: { padding: 0 },
                content: <img style={{ width: '100%' }} src="//filebroker-s.slatic.net/Sc2da4a46d4384d1191309f48583aa3400.jpg_720x720q80.jpg_.webp" />
              })
            }
          >
            自定义内容
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='多个按钮排列'>
        <Space direction='vertical' block>
          <Button
            block
            onClick={() => {
              Dialog.show({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?',
                closeOnAction: true,
                actions: [
                  {
                    key: 'cancel',
                    text: 'Cancel',
                  },
                  {
                    key: 'delete',
                    type: 'secondary',
                    text: 'Confirm'
                  }
                ],
              })
            }}
          >
            按钮纵向排列
          </Button>
          <Button
            block
            onClick={() =>
              Dialog.confirm({
                title: 'Confirm to delete?',
                content: 'Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?',
                cancelText: 'CANCEL',
                confirmText: 'CONFIRM',
                onCancel: () => {
                  Toast.show({
                    icon: 'success',
                    content: 'Cancel success'
                  })
                },
                onConfirm: () => {
                  Toast.show({
                    icon: 'success',
                    content: 'Confirm success'
                  })
                },
              })
            }
          >
            按钮横向排列
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='声明式'>
        <Space direction='vertical' block>
          <Declarative />
          <DemoDescription content='你可以手动控制 visible 状态' />
        </Space>
        <Space direction='vertical' block>
          <Declarative1 />
          <DemoDescription content='你可以手动控制 visible 状态' />
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
        显示对话框-按钮纵向
      </Button>
      <Dialog
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
          type: 'secondary',
          text: 'Cancel',
        },
        {
          key: 'Confirm',
          text: 'Confirm',
        }
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
        显示对话框-按钮横向
      </Button>
      <Dialog
        visible={visible}
        title='Confirm to delete?'
        content='Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?Are you sure you want to delete this item from cart?'
        closeOnAction
        onClose={() => {
          setVisible(false)
        }}
        actions={[
         [{
          key: 'Cancel',
          type: 'secondary',
          text: 'Cancel',
        },
        {
          key: 'Confirm',
          text: 'Confirm',
        }]
        ]}
      />
    </>
  )
}
