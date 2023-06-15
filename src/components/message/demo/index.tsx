import React from 'react'
import { Message, Space } from 'components'

import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='Full width message' padding={'0px'} border='none'>
        <Space wrap>
          <Message hideIcon content="Information notification" style={{borderRadius: 0}}/>
          <Message hideIcon content="Information notification" style={{borderRadius: 0}} closeable />
          <Message  color="warning" content="Warning notification" style={{borderRadius: 0}} closeable/>
          <Message  color="error" content="Your infomation is not approved." style={{borderRadius: 0}} closeable/>
          <Message  color="success" content="Your Information has been approved." style={{borderRadius: 0}}/>
          
        </Space>
      </DemoBlock>
      <DemoBlock title='Inline Message' padding={'4px'} border='none'>
        <Space wrap>
          <Message isInline content="Information notification" style={{ margin: '0px 10px' }} closeable/>
          <Message isInline color="warning" content="Warning notification" style={{ margin: '0px 10px' }} closeable/>
          <Message isInline color="error" content="Your infomation is not approved." style={{ margin: '0px 10px' }} closeable/>
          <Message isInline color="success" content="Your Information has been approved." style={{ margin: '0px 10px' }}/>
          <Message isInline content="Information notification"style={{ margin: '0px 10px' }} type='secondary' closeable/>
          <Message isInline color="warning" content="Warning notification" type='secondary' closeable  style={{ margin: '0px 10px' }}/>
          <Message isInline color="error" content="Your infomation is not approved." type='secondary' closeable style={{ margin: '0px 10px' }}/>
          <Message isInline color="success" content="Your Information has been approved." type='secondary' closeable style={{ margin: '0px 10px' }}/>
        </Space>
      </DemoBlock>
      <DemoBlock title='Message With Multi lines' padding={'0px'} border='none'>
        <Space wrap>
          <Message color="success" content="Your materials are being reviewed.Your materials are being reviewed.Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed." />
        </Space>
      </DemoBlock>
      <DemoBlock title='Message With Title' padding={'0px'} border='none'>
        <Space wrap>
          <Message color="warning" title="Message Title" content="Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed." />
        </Space>
      </DemoBlock>
      <DemoBlock title='Message With Close Button' padding={'0px'} border='none'>
        <Space wrap>
          <Message color="error" closeable title="Message Title" content="Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed." onClose={() => { alert('close') }} />
        </Space>
      </DemoBlock>
      <DemoBlock title='Message With Extra Action' padding={'0px'} border='none'>
        <Space wrap>
          <Message
            closeable
            title="Message Title"
            content="Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed."
            extra={<div onClick={() => { alert('your action') }}><span >Action</span></div>}
          />
        </Space>
      </DemoBlock>
      <DemoBlock title='Message With customized Icon' padding={'0px'} border='none'>
        <Space wrap>
          <Message icon={<svg viewBox="0 0 1024 1024" version="1.1" width="15" height="15"><path d="M300.515556 765.155556a59.733333 59.733333 0 1 1 0 119.438222 59.733333 59.733333 0 0 1 0-119.466667z m312.888888 0a59.733333 59.733333 0 1 1 0 119.438222 59.733333 59.733333 0 0 1 0-119.466667zM894.862222 129.450667a28.444444 28.444444 0 0 1-12.743111 38.172444l-100.920889 50.460445-74.183111 423.054222A85.447111 85.447111 0 0 1 623.075556 711.111111H289.621333a85.731556 85.731556 0 0 1-83.427555-67.470222L143.872 329.472a85.105778 85.105778 0 0 1 17.749333-70.769778A85.048889 85.048889 0 0 1 227.555556 227.555556h328.931555a28.444444 28.444444 0 1 1 0 56.888888H227.555556a28.529778 28.529778 0 0 0-27.932445 33.991112l62.236445 313.742222c2.702222 12.600889 14.421333 22.044444 27.733333 22.044444h333.454222a28.387556 28.387556 0 0 0 27.932445-23.153778l74.126222-422.769777a57.173333 57.173333 0 0 1 30.634666-41.073778l100.920889-50.460445a28.529778 28.529778 0 0 1 38.172445 12.743112z" p-id="1457"></path></svg>} content="Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed." />
          <Message color="success" icon={<img src="//lzd-img-global.slatic.net/g/tps/imgextra/i3/O1CN01vwkoRe1wXh2oI4snJ_!!6000000006318-2-tps-160-160.png" width="15px" height="15px" />} content="Your materials are being reviewed.Your materials are being reviewed. Your materials are being reviewed." />
        </Space>
      </DemoBlock>
    </>
  )
}

