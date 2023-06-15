import React, { useState } from 'react'
import { Checkbox, Space } from 'components'
import { DemoBlock } from 'demos'

export default () => {
  const [value, setValue] = useState<string[]>([])
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
          <div
            onClick={() => {
              console.log('点击了')
            }}
          >
            <Checkbox />
          </div>
          <Checkbox >有描述的复选框</Checkbox>
          <Checkbox defaultChecked>默认选中</Checkbox>
          <Checkbox disabled>未选禁用</Checkbox>
          <Checkbox defaultChecked disabled>已选禁用</Checkbox>
        </Space>
      </DemoBlock>

      <DemoBlock title='选项组'>
        <Checkbox.Group
          value={value}
          onChange={val => {
            setValue(val as string[])
          }}
        >
          <Space direction='vertical'>
            <Checkbox value='apple'>苹果</Checkbox>
            <Checkbox value='orange'>橘子</Checkbox>
            <Checkbox value='banana'>香蕉</Checkbox>
          </Space>
        </Checkbox.Group>
      </DemoBlock>

      <DemoBlock title='整组禁用'>
        <Checkbox.Group defaultValue={['orange', 'banana']} disabled>
          <Space direction='vertical'>
            <Checkbox value='apple'>苹果：未勾选禁用</Checkbox>
            <Checkbox value='orange'>橘子：已勾选禁用</Checkbox>
            <Checkbox value='banana'>香蕉：已勾选禁用</Checkbox>
          </Space>
        </Checkbox.Group>
      </DemoBlock>

      <DemoBlock title='占满整行宽度'>
        <Space direction='vertical' block>
          <Checkbox block>块级元素</Checkbox>
          <Checkbox>非块级元素</Checkbox>
        </Space>
      </DemoBlock>

      <DemoBlock title='自定义属性'>
        <Checkbox
          style={{
            '--icon-size': '14px',
            '--font-size': '14px',
            '--base-color': '#FE4960',
            '--gap': '4px',
          }}
        >
          小号的复选框
        </Checkbox>
      </DemoBlock>
    </>
  )
}
