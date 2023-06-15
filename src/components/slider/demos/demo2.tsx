import React from 'react'
import { DemoBlock, DemoDescription } from 'demos'
import { Space, Slider } from 'components'
import styles from './demo2.less'

const colors = ['#fe4960', '#bcffbd', '#e4fabd', '#ffcfac']

const items = colors.map((color, index) => (
    <div className={styles.content} style={{ background: color }} key={index}>
      {index + 1}
    </div>
))

export default () => {
  return (
    <>
      <DemoBlock title='指示器颜色'>
        <Space direction='vertical' block>
          <Slider
            indicatorProps={{
              color: 'white',
            }}
            defaultIndex={1}
          >
            {items}
          </Slider>
          <DemoDescription content='通过 indicatorProps 可以控制指示器的外观' />
        </Space>
      </DemoBlock>
      <DemoBlock title='指示器在滑块外面'>
        <Space direction='vertical' block>
          <Slider
            style={{
              '--track-padding': ' 0 0 16px',
            }}
          >
            {items}
          </Slider>
          <DemoDescription content='通过 --track-padding 可以控制滑动轨道区域的 padding，从而实现指示器和滑块"分离"的效果' />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义指示器'>
        <Space direction='vertical' block>
          <Slider
            indicator={(total: 10, current: 3) => (
              <div className={styles.customIndicator}>
                {`${current + 1} / ${total}`}
              </div>
            )}
          >
            {items}
          </Slider>
          <DemoDescription content='你可以完全自定义指示器的渲染，甚至改变指示器的位置' />
        </Space>
      </DemoBlock>
      <DemoBlock title='无指示器'>
        <Slider indicator={() => null}>{items}</Slider>
      </DemoBlock>
    </>
  )
}
