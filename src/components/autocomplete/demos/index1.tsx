import React, { useState } from 'react'
import { AutoComplete } from 'components'
import { IconAriseChats} from '@ali/super-icon'
import { DemoBlock } from 'demos'

import './index.less';

const { Option } = AutoComplete;

export default () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<any>([])

  const fetchUserData = () => {
    setOptions([
      { name: '秦始皇', phone: '197281390', value: '秦始皇' },
      { name: '老墨', phone: '197281392', value: '老墨' },
      { name: '智子', phone: '197281391', value: '智子' },
    ])
  }

  const renderOptions = () => {
    return options.map((item) => {
      return (
        <Option key={item.value}  value={item.value} className="option-item" destroyOnClose>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <IconAriseChats size={40} color="#555" />
            <div style={{ marginLeft: 4 }}>
              <div style={{ fontSize: 14, marginLeft: 4 }}>{item.name}</div>
              <div style={{ marginLeft: 4 }}>{item.phone}</div>
            </div>
          </div>
        </Option>
      )
    })
  }

  return (
    <>
      <DemoBlock title='自定义搜索选项'>
        <AutoComplete
          value={value}
          className="custom-hover-border-color"
          onChange={val => {
            setValue(val)
          }}
          onSearch={fetchUserData}
          allowClear
        >
            {renderOptions()}
        </AutoComplete>
      </DemoBlock>

    </>
  )
}
