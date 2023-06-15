import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Select, Loading, Button, Input } from 'components'
import debounce from 'lodash-es/debounce';
import { IconAriseChats} from "@ali/super-icon"
import { DemoBlock } from 'demos'

import './index.less';

const { Option } = Select;


export default () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<any>([])
  const [loading, setLoading] = useState(false);

  const loadOptions = () => {

    setLoading(true)
    setOptions([]);
    fetch('https://randomuser.me/api/?results=5')
      .then((response) => response.json())
      .then((body) => {
        setOptions(
          body.results.map((user) => ({
            value: user.login.username,
          })),
        );
        setLoading(false);
      });
  }

  // const debounceFetcher = useCallback(debounce(loadOptions, 200), [])


  const [value1, setValue1] = useState('')
  const [options1, setOptions1] = useState<any>([
    { name: '秦始皇', phone: '197281390', value: 'Option1' },
    { name: '老墨', phone: '197281392', value: 'Option2' },
    { name: '智子', phone: '197281391', value: 'Option3' },
    { name: '智子智子', phone: '197281391', value: 'Option4' },
  ])

  const renderOptions = () => {
    return options1.map((item) => {
      return (
        <Option key={item.value} value={item.value} className="option-item" destroyOnClose>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <IconAriseChats />
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
      <DemoBlock title='显示单项'>
        <Select
          value={value}
          onChange={val => setValue(val)}
          options={options1}
          placeholder={'Select Option'}
          open={true}
        />
      </DemoBlock>

      <DemoBlock title='无内容'>
        <Select
          value={value}
          onChange={val => setValue(val)}
          options={[]}
          notFoundContent={
            <div style={{ padding: 10 }} >
              <span className='loading-content'>No content...</span>
            </div>
          }
        />
      </DemoBlock>


      <DemoBlock title='远程搜索'>
        <Select
          value={value}
          onChange={val => setValue(val)}
          options={options}
          onSearch={loadOptions}
          notFoundContent={loading ?
            <Loading.Element
              wrapperClassName='loading'
              iconClassName='loading-icon'
              mask={false}
              visible
            >
              <span className='loading-content'>search...</span>
            </Loading.Element>
            : null}
        />
      </DemoBlock>
      <DemoBlock title='自定义搜索选项'>
        <Select
          value={value1}
          className="custom-hover-border-color"
          onChange={val => {
            setValue1(val)
          }}
          allowClear
        >
          {renderOptions()}
        </Select>
      </DemoBlock>

    </>
  )
}
