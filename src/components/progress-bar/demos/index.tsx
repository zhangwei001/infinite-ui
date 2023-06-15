import React, { useState } from 'react'
import { DemoBlock } from 'demos'
import { Button, ProgressBar, Space } from 'components'
import styles from './index.less'

export default () => {
  const [percent, setPercent] = useState<number>(10)
  return (
    <>
      <DemoBlock title='基本用法'>
        <Space direction='vertical' block>
          <Button
            color='primary'
            disabled={percent === 100}
            onClick={() => {
              setPercent(pre => pre + 10)
            }}
            style={{ marginRight: '8px' }}
          >
            进度+10
          </Button>
          <ProgressBar percent={percent} />
          <Button
            color='primary'
            fill='outline'
            onClick={() => {
              setPercent(10)
            }}
          >
            重置
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='fire bar指定线条宽度'>
        <Space direction='vertical' block>
          <ProgressBar
            percent={30}
            type='fire'
            style={{
              '--track-width': '3px',
              '--fill-color': '#FE4960',
              '--background-color': '#FEECEF',
            }}
          />
          <ProgressBar
            percent={75}
            type='fire'
            style={{
              '--track-width': '6px',
              '--fill-color': '#FE4960',
              '--background-color': '#FEECEF',
            }}
          />
        </Space>
      </DemoBlock>
      <DemoBlock title='step bar'>
        <ProgressBar
          percent={100}
          type='fire'
          style={{
            '--fill-color': '#FE4960',
          }}
        />
      </DemoBlock>
    </>
  )
}
