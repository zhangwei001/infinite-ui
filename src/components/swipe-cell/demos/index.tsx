import React, { FC, useRef } from 'react'
import { SwipeCell, List, Dialog, Toast, Image } from 'components'
import { IconDelete } from '@ali/super-icon'
import { DemoBlock } from 'demos'
import {  SwipeCellRef } from '../swipeCell';
import { Action } from '../type'

import './index.less'


export default () => {
  return (
    <>
      <DemoBlock title='基础使用 + 自定义action 宽度' padding='0' border='none'>
        <BasicContent />
      </DemoBlock>

      <DemoBlock title='配合列表使用' padding='0' border='none'>
        <WithList />
      </DemoBlock>

      <DemoBlock title='手动控制归位逻辑' padding='0' border='none'>
        <Manual />
      </DemoBlock>
    </>
  )
}


// 基础使用
const BasicContent: FC = () => {
  return (
    <SwipeCell
      className="custom-item"
      rightActions={[
        {
          key: 'delete',
          text: 'Delete',
        },
        {
          key: 'icon',
          icon: <IconDelete size={16} color='#fff' />,
          bgColor: '#D81E36'
        },
        {
          key: 'both',
          icon: <IconDelete size={16} color='#fff' />,
          text: 'Delete',
        }
      ]}
      onAction={() => {
        Toast.show('You clicked Delete')
      }}
    >
      <div className="basic-item ">Content</div>
    </SwipeCell>
  )
}

// 配合列表使用
const WithList: FC = () => {
  const rightActions: Action[] = [
    {
      key: 'wishlist',
      text: 'Wishlist',
      bgColor: '#D81E36'
    },
    {
      key: 'delete',
      text: 'Delete'
    }
  ]
  const items = [1, 2]
  return (
    <List>
      {items.map(item => (
        <SwipeCell
          key={item}
          rightActions={rightActions}
        >
          <List.Item>
            <div className="product-item">
              <Image src="https://lzd-img-global.slatic.net/g/p/41360879199c86e9144e0f742cca88be.jpg" className="product-img" />
              <div className="product-main">
                <h5>Parreau</h5>
                <p>Pull en maille à carrea Vintage style limited Pull en maille à carreau ....</p>
                <span>136,00€</span>
              </div>
            </div>
          </List.Item>
        </SwipeCell>
      ))}
    </List>
  )
}

// 手动控制归位逻辑
const Manual: FC = () => {
  const ref = useRef<SwipeCellRef>(null)
  return (
    <List>
      <SwipeCell
        ref={ref}
        closeOnAction={false}
        closeOnTouchOutside={false}
        rightActions={[
          {
            key: 'delete',
            text: 'Delete',
            onClick: async () => {
              await Dialog.confirm({
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
              ref.current?.close()
            },
          },
        ]}
      >
        <List.Item
          className="single-item "
          onClick={() => {
            Toast.show('you clicked list item')
          }}
        >
          Content
        </List.Item>
      </SwipeCell>
    </List>
  )
}
