import React from 'react'
import { ImageViewer, TabSwiper, Image } from 'components'
import { DemoBlock } from 'demos'
import "./index.less"

const bearImg = 'https://lzd-img-global.slatic.net/g/tps/tfs/TB12FYKn21TBuNjy0FjXXajyXXa-1920-1080.jpg';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.tabs = [
      {
        key: "used",
        title: "Used",
        count: 100,
      },
      {
        key: "expired",
        title: "Expired",
        count: 9,
      },
    ];
    this.state = {
      disabled: false,
      visible: false
    }
  }

  handleTabChange = (key, index) => {
    console.log(key, index);
  }

  render() {
    const { visible, disabled } = this.state;
    return (
      <>
        <DemoBlock title='基础使用'>
          <TabSwiper className="basic-tab-swiper"
            defaultIndex={0}
            tabs={this.tabs}
            disabled={disabled}
            onChange={this.handleTabChange}>
            {
              this.tabs.map(({ key }, index) => (
                <div key={key}>
                  <div onClick={() => {
                    this.setState({
                      disabled: true,
                      visible: true
                    })
                  }}>
                    {index}
                    <Image src={bearImg} />
                  </div>
                </div>
              ))
            }
          </TabSwiper>
          <ImageViewer
            image={bearImg}
            visible={visible}
            onClose={() => {
              this.setState({
                disabled: false,
                visible: false
              })
            }}
          />
        </DemoBlock>
      </>
    )
  }
}

