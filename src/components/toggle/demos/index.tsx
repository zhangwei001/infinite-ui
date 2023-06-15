import React from 'react';
import { Space, Toggle } from 'components';
import { DemoBlock } from 'demos'

const App: React.FC = () => {
  return (
    <>
      <DemoBlock title="Simple usage">
        <Toggle
          text='Test toggle'
        />
      </DemoBlock>

      <DemoBlock title="Selected">
        <Space >
          <Toggle
            text='KTP'
            defaultChecked
          />
          <Toggle
            text='Long KTP Words'
            defaultChecked
          />

          <Toggle
            text='Long KTP Words'
            defaultChecked
            style={{width:'100px'}}
          />
        </Space>

      </DemoBlock>

      <DemoBlock title="With icon">
        <Toggle
          text='Test toggle'
          icon={(checked: boolean) => checked ? <>&#9786;</> : <>&#9785;</>}
        />
      </DemoBlock>


    </>
  )
};

export default App;
