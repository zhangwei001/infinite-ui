import React from 'react'
import { Button, Toast, Space } from 'components'
import { IconBottombarWishlist } from '@ali/super-icon'

import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='Basic Toast'>
        <Space wrap>
          <Button color='primary' onClick={() => Toast.show('Hello World')}>Normal Toast</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title=' Toast with Different Icon'>
        <Space wrap>
          <Button onClick={() => Toast.show({ icon: 'success', content: 'Hello World', clickEvent: function() {
            console.log('click')
          }})}>Success Toast</Button>
          <Button onClick={() => Toast.show({ icon: 'warning', content: 'Hello World'})}>Warning Toast</Button>
          <Button onClick={() => Toast.show({ icon: 'info', content: 'Hello World'})}>Info Toast</Button>
          <Button onClick={() => Toast.show({ icon: 'error', content: 'Hello World'})}>Error Toast</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Toast with custom Icon and  CTA Button - only support Arise'>
        <Space wrap>
          <Button onClick={() => Toast.show({
              icon: 'success',
              duration: 10000,
              content: 'Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World',
              buttonText: 'Detail Long CTA button',
              customIcon: <IconBottombarWishlist size={18} color='#fff' />,
              clickEvent: () => {
                alert('clicked')
              }
            })
          }>Toast with CTA Button</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Toast with customize duration'>
        <Space wrap>
          <Button onClick={() => Toast.show({ icon: 'success', duration: 5000, content: 'Hello World Hello World Hello World Hello World Hello World Hello World Hello World Hello World'})}>Close After 5s</Button>
        </Space>
      </DemoBlock>
      <div className="bottom-bar"></div>
    </>
  )
}

