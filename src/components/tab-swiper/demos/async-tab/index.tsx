import React from 'react'
import { TabSwiper, Button, Space } from 'components'
import { DemoBlock } from 'demos'
import "./index.less"

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.tabs = [
      {
        key: "forecast",
        title: "Forecast",
      },
      {
        key: "available",
        title: "Available",
        count: 10,
      },
      {
        key: "collected",
        title: "Collected",
        count: 20,
      },
      {
        key: "used",
        title: "Used",
      }, 
      {
        key: "expired",
        title: "Expired",
      },
      {
        key: "ran_out",
        title: "Ran Out",
      },
    ];
  }

  handleNavigateToUsedTab = () => {
    this.tabSwiperRef.navigateTo(3);
  }

  handleNavigateToAvailableTab = () => {
    this.tabSwiperRef.navigateTo(1);

  }

  handleTabChange = (key, index) => {
    console.log(key, index);
  }

  render() {
    return (
      <>
        <DemoBlock title='手动切换tab'>
        <Space wrap>
          <Button onClick={this.handleNavigateToUsedTab}>切换到Used tab</Button>
          <Button onClick={this.handleNavigateToAvailableTab}>切换到Available tab</Button>
        </Space>

        <TabSwiper className="async-tab-swiper"
          ref={elem => this.tabSwiperRef = elem}
          stretch={false}
          defaultIndex={0}
          tabs={this.tabs}
          tabItemClassName="long-tab-item"
          onChange={this.handleTabChange}>
          {
            this.tabs.map(({ key }, index) => (
              <div key={key}>index: {index}, key: {key}</div>
            ))
          }
        </TabSwiper>
        </DemoBlock>
      </>
    )
  }
}

