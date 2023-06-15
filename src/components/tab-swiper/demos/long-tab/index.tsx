import React from 'react'
import { TabSwiper } from 'components'
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

  handleTabChange = (key, index) => {
    console.log(key, index);
  }

  render() {
    return (
      <>
        <DemoBlock title='超长tab滑动查看'>
        <TabSwiper className="tab-swiper"
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

