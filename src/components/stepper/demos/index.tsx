import React, { useState } from 'react'
import { Stepper, Space, Loading } from 'components'
import { DemoBlock } from 'demos'
import './index.less'

export default () => {
  const [value, setValue] = useState()
  const [value1, setValue1] = useState(1)
  const [value2, setValue2] = useState(1)
  const [value3, setValue3] = useState(3)
  const [value4, setValue4] = useState(4)
  const [value5, setValue5] = useState(5)
  const [value6, setValue6] = useState(6)

  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
            <Stepper 
                value={value}
                defaultValue={2}
                onFocus={(e) => {
                    console.log(e)
                }}
                onBlur={(e) => {
                    console.log(e)
                }}
                onChange={(val) => {
                  console.log('outer change', val)
                    setValue(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='步长设置'>
        <Space direction='vertical'>
            <Stepper 
                value={value1}
                step={2}
                onChange={(val) => {
                    setValue1(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='限制输入范围,超出范围不能输入'>
        <Space direction='vertical'>
            <Stepper 
                value={value2}
                min={1}
                step={2}
                max={8}
                onChange={(val) => {
                  setValue2(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='禁用状态'>
        <Space direction='vertical'>
            <Stepper 
                value={value3}
                disabled
                onChange={(val) => {
                  setValue3(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='禁用输入框'>
        <Space direction='vertical'>
            <Stepper 
                value={value4}
                editable={false}
                onChange={(val) => {
                  setValue4(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义输入框样式'>
        <Space direction='vertical'>
            <Stepper 
                className="i-custom-stepper" 
                value={value5}
                onChange={(val) => {
                  setValue5(val)
                }}
            />
        </Space>
      </DemoBlock>
      <DemoBlock title='异步请求'>
        <Space direction='vertical'>
            <Stepper 
                value={value6}
                beforeChange={() => {
                  Loading.show();
                  return new Promise((resolve) => {
                    setTimeout(() => {
                      Loading.hide();
                      resolve(true);
                    }, 3000);
                    return false
                  });
                }}
                onChange={(val) => {
                  setValue6(val)
                }}
            />
        </Space>
      </DemoBlock>
    </>
  )
}
