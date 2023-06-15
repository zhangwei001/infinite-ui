import React, { useState } from 'react'
import { Switch, Space } from 'components'
import { DemoBlock } from 'demos'
import './index.less'

export default () => {
  const [value, setValue] = useState<boolean>(false)
  const [value1, setValue1] = useState<boolean>(true)
  const [value2, setValue2] = useState<boolean>(true)
  const [value3, setValue3] = useState<boolean>(true)

  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
            <Switch checked={value} onChange={(checked) => {
                console.log('value', checked)
                setValue(checked)
            }} />
        </Space>
      </DemoBlock>
      <DemoBlock title='禁用状态'>
        <Space direction='vertical'>
            <Switch  defaultChecked={true} disabled />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义颜色'>
        <Space direction='vertical'>
            <Switch 
                checked={value2} 
                activeColor="#fe4960"
                inActiveColor="#dddddd"
                onChange={(checked) => {
                    console.log('value2', checked)
                    setValue2(checked)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义大小'>
        <Space direction='vertical'>
            <Switch 
                className="i-custom-switch"
                checked={value3} 
                onChange={(checked) => {
                    console.log('value3', checked)
                    setValue3(checked)
                }}
            />
        </Space>
      </DemoBlock>
    </>
  )
}
