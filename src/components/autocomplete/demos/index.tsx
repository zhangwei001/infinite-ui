import React, { useCallback, useRef, useState } from 'react'
import { AutoComplete, Loading } from 'components'
import debounce from 'lodash-es/debounce';
import { DemoBlock } from 'demos'

import './index.less';

export default () => {
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<any>([])
  const [loading, setLoading] = useState(false);

  const [value1, setValue1] = useState('')
  const [options1, setOptions1] = useState<any>([])

  const loadOptions = (input) => {

    if (!input) {
      setOptions([]);
      return;
    }
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
      // });
      }).catch((err)=>{
        setLoading(false);
        console.log("err",err);
      })
  }

  const debounceFetcher = useCallback(debounce(loadOptions, 200), [])


  const searchData = (val) => {
    let result: { value: string; }[];
    if (val) {
      result = ['gmail.com', '163.com', 'qq.com'].map(domain => {
        return { value: `${val}@${domain}` }
      });
    } else {
      result = [];
    }
    setOptions1(result);
  }

  return (
    <>
      <DemoBlock title='远程搜索'>
        <AutoComplete
          value={value}
          onChange={val => setValue(val)}
          options={options}
          allowClear
          onSearch={debounceFetcher}
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
      <DemoBlock title='自动完成'>
        <AutoComplete
          value={value1}
          onChange={val => setValue1(val)}
          options={options1}
          onSearch={searchData}
          allowClear
        />
      </DemoBlock>

    </>
  )
}
