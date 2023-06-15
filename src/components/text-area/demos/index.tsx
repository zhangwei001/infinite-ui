import React, { useState } from 'react'
import { TextArea } from 'components'
import { DemoBlock } from 'demos'

export default () => {
  const [value, setValue] = useState('')
  return (
    <>
      <DemoBlock title='基本的输入框组件'>
        <TextArea
          placeholder='请输入内容'
          value={value}
          onChange={val => {
            setValue(val)
          }}
        />
      </DemoBlock>
      <DemoBlock title='指定行数'>
        <TextArea placeholder='请输入内容' rows={5} />
      </DemoBlock>
      <DemoBlock title='根据内容自动调整高度'>
        <TextArea
          placeholder='请输入内容'
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </DemoBlock>
      <DemoBlock title='字数统计'>
        <TextArea defaultValue={'字数统计\n字数统计'} showCount />
      </DemoBlock>
      <DemoBlock title='字数限制'>
        <TextArea
          defaultValue={'字数限制\n字数限制'}
          showCount
          maxLength={30}
        />
      </DemoBlock>
    </>
  )
}
