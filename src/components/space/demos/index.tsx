import React from 'react'
import { Space, Button } from 'components'
import { DemoBlock } from 'demos'

export default () => {
  return (
    <>
      <DemoBlock title='水平方向的间距'>
        <Space>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='换行'>
        <Space wrap>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
          <Button>Button4</Button>
          <Button>Button5</Button>
          <Button>Button6</Button>
          <Button>Button7</Button>
          <Button>Button8</Button>
          <Button>Button9</Button>
          <Button>Button10</Button>
          <Button>Button11</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='垂直方向的间距'>
        <Space direction='vertical'>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义间距大小'>
        <Space size='24px'>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='对齐方式'>
        <Space align='end'>
          <Button>1</Button>
          <Button>
            2<br />2
          </Button>
          <Button>
            3<br />3<br />3
          </Button>
        </Space>
      </DemoBlock>
      <DemoBlock title='渲染为块级元素'>
        <Space direction='vertical' block>
          <Button>Button1</Button>
          <Button>Button2</Button>
          <Button>Button3</Button>
        </Space>
      </DemoBlock>
    </>
  )
}
