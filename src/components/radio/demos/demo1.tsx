import React, { useState } from 'react'
import { Radio, Space } from 'components'
import { DemoBlock } from 'demos'

export default () => {
  const [value, setValue] = useState<string>()
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
          <div
            onClick={() => {
              console.log('点击了')
            }}
          >
            <Radio />
          </div>
          <Radio>有描述的单选框</Radio>
          <Radio defaultChecked>默认选中</Radio>
          <Radio disabled>未选禁用</Radio>
          <Radio defaultChecked disabled>已选禁用</Radio>
        </Space>
      </DemoBlock>

      <DemoBlock title='选项组'>
        <Radio.Group
          value={value}
          onChange={val => {
            setValue(val as string)
          }}
        >
          <Space direction='vertical'>
            <Radio value='apple' >苹果</Radio>
            <Radio value='orange' >橘子</Radio>
            <Radio value='banana' >香蕉</Radio>
          </Space>
        </Radio.Group>
      </DemoBlock>

      <DemoBlock title='整组禁用'>
        <Radio.Group defaultValue='orange' disabled>
          <Space direction='vertical'>
            <Radio value='apple'>苹果</Radio>
            <Radio value='orange'>橘子</Radio>
            <Radio value='banana'>香蕉</Radio>
          </Space>
        </Radio.Group>
      </DemoBlock>

      <DemoBlock title='占满整行宽度'>
        <Space direction='vertical' block>
          <Radio block>块级元素</Radio>
          <Radio>非块级元素</Radio>
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义属性'>
        <Radio
          style={{
            '--icon-size': '14px',
            '--font-size': '14px',
            '--gap': '4px',
            "--base-color": 'red',
          }}
        >
          小号的单选框
        </Radio>
      </DemoBlock>
    </>
  )
}
