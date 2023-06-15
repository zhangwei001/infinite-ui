import React from 'react'
import { Button, Space } from 'components'
import { IconInfo, IconChat } from '@ali/super-icon'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='Text Button With Different color'>
        <Space wrap>
          <Button type='primary'
            onClick={() => {
              alert('hello.')
            }}
          >Primary</Button>
          <Button type='secondary'>Secondary</Button>
          <Button type='tertiary'>Tertiary</Button>
          <Button type='dimmed'>Dimmed</Button>
          <Button type='special'>Special</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Text with Icon Button'>
        <Space wrap>
          <Button type='primary' icon={<IconInfo size={18} color='currentColor' />}>Primary</Button>
          <Button type='secondary' icon={<IconInfo size={18} color='currentColor' />}>Secondary</Button>
          <Button size='large' icon={<IconInfo size={21} color='currentColor' />}>Large</Button>
          <Button size='middle' icon={<IconInfo size={18} color='currentColor' />}>middle</Button>
          <Button size='small' icon={<IconInfo size={12} color='currentColor'/>}>small</Button>
          <Button size='smaller' icon={<IconInfo size={10} color='currentColor' />}>smaller</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Different Size'>
        <Space wrap align='center'>
          <Button size='large'>Large</Button>
          <Button size='middle'>middle</Button>
          <Button size='small'>small</Button>
          <Button size='smaller'>smaller</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Full-Width Button'>
        <Button block>Full-Width Button</Button>
      </DemoBlock>
      <DemoBlock title='Full-Width Button'>
        <Button block type="secondary">Full-Width Button</Button>
      </DemoBlock>
      <DemoBlock title='Full-Width Button with Icon'>
        <Button block icon={<IconInfo size={18} color='currentColor' />}>Full-Width Button</Button>
      </DemoBlock>
      <DemoBlock title='Link Button'>
        <Space wrap>
          <Button link type='primary'>
            Normal link
          </Button>
          <Button link type="secondary">
            Promotion link
          </Button>
          <Button link type="tertiary">
            Secondary link
          </Button>
          <Button link type="tertiary" icon={<IconChat size={18} color='currentColor' />}>
            Link with Icon
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Fill Mode'>
        <Space wrap>
          <Button type='primary' fill='solid'>
            Solid
          </Button>
          <Button type='primary' fill='outline'>
            Outline
          </Button>
          <Button type='primary' fill='none'>
            None
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='Disabled State'>
        <Space wrap>
          <Button disabled>Disabled</Button>
          <Button disabled type='secondary'>
            Disabled
          </Button>
          <Button disabled type='tertiary'>
            Disabled
          </Button>
        </Space>
      </DemoBlock>
    </>
  )
}

