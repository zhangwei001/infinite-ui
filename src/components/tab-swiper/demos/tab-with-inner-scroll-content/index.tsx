import React from 'react'
import { TabSwiper } from 'components'
import { DemoBlock } from 'demos'
import "./index.less"

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.tabs = [
      {
        key: "collect",
        title: "Collect",
        count: 200,
      }, 
      {
        key: "used",
        title: "Used",
        count: 100,
      }, 
      {
        key: "expired",
        title: "Expired",
        count: 300,
      },
    ];
  }

  handleTabChange = (key, index) => {
    console.log(key, index);
  }

  render() {
    return (
      <>
        <DemoBlock title='包含内部滚动内容的tab'>
        <TabSwiper className="scroll-content-tab-swiper"
          defaultIndex={0}
          tabs={this.tabs} 
          onChange={this.handleTabChange}>
          <div className="scroll-content-tab-swiper-list">{new Array(200).fill(1).map((item, index) => <p key={index}>collect: {index}</p>)}</div>
          <div className="scroll-content-tab-swiper-list">{new Array(100).fill(1).map((item, index) => <p key={index}>used: {index}</p>)}</div>
          <div className="scroll-content-tab-swiper-list">{new Array(300).fill(1).map((item, index) => <p key={index}>expired: {index}</p>)}</div>
        </TabSwiper>
        </DemoBlock>
      </>
    )
  }
}

