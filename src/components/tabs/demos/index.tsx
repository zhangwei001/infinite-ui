import React from 'react'
import {  Tabs } from 'components';
import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='基本用法' padding='0'>
        <Tabs activeLineMode="fixed" defaultActiveKey={'ship'}>
          <Tabs.Tab title='All' key='all'>
              All
          </Tabs.Tab>
          <Tabs.Tab title='To sasdasdads' key='pay'>
            To Pay
          </Tabs.Tab>
          <Tabs.Tab title='To Ship' key='ship'>
            To Ship
          </Tabs.Tab>
          <Tabs.Tab title='To Recieve' key='receive'>
            To Recieve
          </Tabs.Tab>
          <Tabs.Tab title='To Review' key='review'>
            To Review
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>

      <DemoBlock title='隐藏tab下的line' padding='0'>
        <Tabs hideLine>
          <Tabs.Tab title='All' key='all'>
            All
          </Tabs.Tab>
          <Tabs.Tab title='To Pay' key='pay'>
            To Pay
          </Tabs.Tab>
          <Tabs.Tab title='To Ship' key='ship'>
            To Ship
          </Tabs.Tab>
          <Tabs.Tab title='To Recieve' key='receive'>
            To Recieve
          </Tabs.Tab>
          <Tabs.Tab title='To Review' key='review'>
            To Review
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>
      <DemoBlock title='Swipeable tabs' padding='0'>
        <Tabs
          swipeable
          defaultActiveKey='pay'
        >
          <Tabs.Tab title='All' key='all'>
            <div style={{width: '100vw', height: '30px', overflowY: 'scroll'}}>
            All
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='To Pay' key='pay'>
            <div style={{width: '100vw', height: '30px', overflowY: 'scroll'}}>
            To Pay
            </div>
          </Tabs.Tab>
          <Tabs.Tab title='To Ship' key='ship'>
            <div style={{width: '100vw', height: '30px', overflowY: 'scroll'}}>
            To Ship
            </div>
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>

      <DemoBlock title='配合 Badge 使用' padding='0'>
        <Tabs>
          <Tabs.Tab title='First' key='fruits' badge={{content: '99+'}}>
            菠萝
          </Tabs.Tab>
          <Tabs.Tab title='Second' key='vegetables' badge={{content: '25'}}>
            西红柿
          </Tabs.Tab>
          <Tabs.Tab title='Test' key='animals' badge={{content: '5'}}>
            蚂蚁
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>

      <DemoBlock title='超长自动滚动' padding='0'>
        <Tabs defaultActiveKey='4'>
          <Tabs.Tab title='Espresso' key='1'>
            1
          </Tabs.Tab>
          <Tabs.Tab title='Coffee Latte' key='2'>
            2
          </Tabs.Tab>
          <Tabs.Tab title='Cappuccino' key='3'>
            3
          </Tabs.Tab>
          <Tabs.Tab title='Americano' key='4' badge={{content: '25'}}>
            4
          </Tabs.Tab>
          <Tabs.Tab title='Flat White' key='5'>
            5
          </Tabs.Tab>
          <Tabs.Tab title='Caramel Macchiato' key='6'>
            6
          </Tabs.Tab>
          <Tabs.Tab title='Cafe Mocha' key='7'>
            7
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>

      <DemoBlock title='没有内容区' padding='0'>
        <Tabs >
          <Tabs.Tab title='水果' key='fruits' />
          <Tabs.Tab title='蔬菜' key='vegetables' />
          <Tabs.Tab title='动物' key='animals' />
        </Tabs>
      </DemoBlock>

      <DemoBlock title='禁用' padding='0'>
        <Tabs>
          <Tabs.Tab title='水果' key='fruits' />
          <Tabs.Tab title='蔬菜' key='vegetables' />
          <Tabs.Tab title='动物' key='animals' disabled />
        </Tabs>
      </DemoBlock>

      <DemoBlock title='自定义当前激活的下划线长度-Arise' padding='0'>
        <Tabs
          activeLineMode='fixed'
          style={{
            '--fixed-active-line-width': '30px',
          }}
        >
          <Tabs.Tab title='超长的tab111' key='1'>
            1
          </Tabs.Tab>
          <Tabs.Tab title='超长的tab2' key='2'>
            2
          </Tabs.Tab>
          <Tabs.Tab title='超长的tab333' key='3'>
            3
          </Tabs.Tab>
          <Tabs.Tab title='超长的tab4444' key='4'>
            4
          </Tabs.Tab>
          <Tabs.Tab title='超长的tab55555' key='5'>
            5
          </Tabs.Tab>
        </Tabs>
      </DemoBlock>

      <DemoBlock title='自定义选项卡头的文字大小' padding='0'>
        <Tabs
          style={{
            '--title-font-size': '13px',
          }}
        >
          <Tabs.Tab title='水果' key='fruits' />
          <Tabs.Tab title='蔬菜' key='vegetables' />
          <Tabs.Tab title='动物' key='animals' />
        </Tabs>
      </DemoBlock>
    </>
  )
}
