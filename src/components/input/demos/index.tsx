import React, { useState } from 'react'
import { Input, Space } from 'components'
import { IconLayout} from '@ali/super-icon'

import { DemoBlock } from 'demos'

import './index.less';

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <DemoBlock title='基本的输入框组件'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            allowClear
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            disabled
          />

        </Space>
      </DemoBlock>
      <DemoBlock title='Custom Action'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            actionIcon={<div style={{ paddingLeft: 10, color: 'blue' }} >Apply</div>}
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            actionIcon={<div style={{paddingLeft: 10}}><IconLayout size={16} color="blue" /></div>}
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            actionIcon={<div style={{paddingLeft: 10}}><IconLayout size={16} color="blue" /></div>}
            allowClear
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            disabled
            actionIcon={<div style={{ padding: 10, color: 'blue', paddingLeft: 1 }} >Apply</div>}
          />
        </Space>
      </DemoBlock>
      <DemoBlock title='Prefix Suffix password'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Input
            placeholder='Placeholder'
            value={value}

            onChange={val => {
              setValue(val)
            }}
            prefix='SGD'
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            suffix='KG'
          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            allowClear
            prefix='SGD'
            suffix='KG'
          />
          <Input
            placeholder='Input Password'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            type="password"
            allowClear
          />
          <Input
            placeholder='Input Password'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            type="password"
            disabled

          />
        </Space>
      </DemoBlock>
      <DemoBlock title='Dropdown'>
        <Input
          placeholder='Placeholder'
          value={value}
          onChange={val => {
            setValue(val)
          }}
          prefix='SGD'
          suffix='KG'
          disabled
          allowClear
          showCount
          maxLength={10}
        />
      </DemoBlock>
      <DemoBlock title='All intergration'>
        <Space direction='vertical' style={{ width: '100%' }}>
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            prefix='SGD'
            suffix='KG'
            allowClear
            showCount
            maxLength={10}
            actionIcon={<div style={{paddingLeft: 10}}><IconLayout size={16} color="blue" /></div>}

          />
          <Input
            placeholder='Placeholder'
            value={value}
            onChange={val => {
              setValue(val)
            }}
            prefix='SGD'
            suffix='KG'
            disabled

            showCount
            maxLength={10}
            actionIcon={<div style={{paddingLeft: 10}}><IconLayout size={16} color="blue" /></div>}

          />
        </Space>
      </DemoBlock>

      <DemoBlock title='输入整数'>
        <Input
          placeholder='Input password'
          value={value}
          type={'number'}
          Integer
          onChange={val => {
            setValue(val)
          }}
        />
      </DemoBlock>
      <DemoBlock title='字数统计'>
        <Input
          defaultValue={'字数统计'}
          showCount
        />
      </DemoBlock>
      <DemoBlock title='字数限制'>
        <Input
          defaultValue={'字数限制'}
          showCount
          maxLength={10}
          allowClear
        />
      </DemoBlock>
    </>
  )
}
