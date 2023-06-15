import React, { FC } from 'react'
import { Steps, Space } from 'components'
import { IconSuccess, IconError, IconWarn } from '@ali/super-icon'
import { DemoBlock } from 'demos'
import './index.less'

const { Step } = Steps

const MOCK_DELIVERY_DATA = {
  currentIndex: 1,
  data: [{
    title: 'Your parcel has been delivered. ',
    desc: 'It was received by [name].',
    date: '13 Aug • 09:00',
  }, {
    title: 'Our Logistics partner will attempt to deliver your parcel today!',
    desc: '',
    date: '12 Aug • 18:00',
  }, {
    title: 'Our Logistics partner will attempt to deliver your parcel today!',
    desc: '',
    date: '12 Aug • 18:00',
  }, {
    title: 'Our Logistics partner will attempt to deliver your parcel today!',
    desc: '',
    date: '12 Aug • 18:00',
  }, {
    title: 'Your parcel has been packed and is ready to handover to our logistics partner',
    desc: '',
    date: '10 Aug • 16:00',
  }]
}

export default () => {
  return (
    <>
      <DemoBlock title='Example1' padding='0' border='none'>
        <BasicContent />
      </DemoBlock>
      <DemoBlock title='Example2' padding='0' border='none'>
        <BasicContent1 />
      </DemoBlock>
      <DemoBlock title='Example3' padding='0' border='none'>
        <CustomContent />
      </DemoBlock>
      <DemoBlock title='Example3' padding='0' border='none'>
        <CustomContent1 />
      </DemoBlock>
    </>
  )
}

const BasicContent: FC = () => {
  return (
    <>
      <DemoBlock title='基础用法 + 自定义样式' padding='12px 0'>
        <Steps
          className='basic-style'
          direction='horizontal'
          activeIndex={2}
        >
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
          <Step ></Step>
        </Steps>
        <div style={{ textAlign: 'center', color: '#858B9C' }}>2/10</div>
      </DemoBlock>
      <DemoBlock title='基础用法 + 自定义样式'>
        <Space direction='vertical'>
          <Steps
            className='custom-style'
            direction='horizontal'
            activeIndex={2}
          >
            <Step content={<p className="basic-minwidth">Step1</p>}></Step>
            <Step content={<p className="basic-minwidth">Step2</p>}></Step>
            <Step content={<p className="basic-minwidth">Step3</p>}></Step>
            <Step content={<p className="basic-minwidth">Step4</p>}></Step>
          </Steps>
        </Space>
      </DemoBlock>
    </>
  )
}


const BasicContent1: FC = () => {
  const activeIndex = 0
  const data = MOCK_DELIVERY_DATA.data
  const renderContent = (item: any, index: number) => {
    const wrapperClass = index === activeIndex ? 'item-wrapper item-wrapper-active' : 'item-wrapper';
    return (
      <div className={wrapperClass}>
        <h4>{item.title}</h4>
        {item.desc && <p>{item.desc}</p>}
        <p>{item.date}</p>
      </div>
    )
  }
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
          <Steps
            activeIndex={activeIndex}
          >
            {data.map((item, index) => <Step key={index} content={renderContent(item, index)} />)}
          </Steps>
        </Space>
      </DemoBlock>
    </>
  )
}

const CustomContent: FC = () => {
  const activeIndex = MOCK_DELIVERY_DATA.currentIndex
  const data = MOCK_DELIVERY_DATA.data
  const renderContent = (item: any, index: number) => {
    const wrapperClass = index === activeIndex ? 'item-wrapper item-wrapper-active' : 'item-wrapper';
    return (
      <div className={wrapperClass}>
        <h4>{item.title}</h4>
        {item.desc && <p>{item.desc}</p>}
        <p>{item.date}</p>
      </div>
    )
  }
  return (
    <>
      <DemoBlock title='自定义icon'>
        <Space direction='vertical'>
          <Steps 
            activeIcon={<IconSuccess size={16} color='#36b360' />} 
            inActiveIcon={<IconError size={16} color='#d5d5d5'  />} 
            activeIndex={activeIndex}
          >
            {data.map((item, index) => <Step key={index} content={renderContent(item, index)} />)}
          </Steps>
        </Space>
      </DemoBlock>
    </>
  )
}

const BasicContent2: FC = () => {
  const activeIndex = 0
  const data = MOCK_DELIVERY_DATA.data
  const renderContent = (item: any, index: number) => {
    const wrapperClass = index === activeIndex ? 'item-wrapper item-wrapper-active' : 'item-wrapper';
    return (
      <div className={wrapperClass}>
        <h4>{item.title}</h4>
        {item.desc && <p>{item.desc}</p>}
        <p>{item.date}</p>
      </div>
    )
  }
  return (
    <>
      <DemoBlock title='基础用法'>
        <Space direction='vertical'>
          <Steps
            activeIndex={activeIndex}
          >
            {data.map((item, index) => <Step key={index} content={renderContent(item, index)} />)}
          </Steps>
        </Space>
      </DemoBlock>
    </>
  )
}

const CustomContent1: FC = () => {
  const activeIndex = MOCK_DELIVERY_DATA.currentIndex
  const data = MOCK_DELIVERY_DATA.data
  const renderContent = (item: any, index: number) => {
    const wrapperClass = index === activeIndex ? 'item-wrapper item-wrapper-active' : 'item-wrapper';
    return (
      <div className={wrapperClass}>
        <h4>{item.title}</h4>
        {item.desc && <p>{item.desc}</p>}
        <p>{item.date}</p>
      </div>
    )
  }
  return (
    <>
      <DemoBlock title='自定义每个步骤下的icon'>
        <Space direction='vertical'>
          <Steps
            activeIndex={activeIndex}
            renderCustomIcon={(status) => {
              console.log(status)
              switch (status) {
                case 'waiting': return <IconWarn size={16} color='#d5d5d5' />;
                case 'process': return <IconError size={16} color='#2e6ef6' />;
                case 'finished': return <IconSuccess size={16} color='#d5d5d5' />;
                default:  return <span className={`i-step-icon-dot`}></span>
              }
            }}
          >
            {data.map((item, index) => <Step key={index} content={renderContent(item, index)} />)}
          </Steps>
        </Space>
      </DemoBlock>
    </>
  )
}

