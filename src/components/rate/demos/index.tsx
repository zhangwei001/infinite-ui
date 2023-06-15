import React from 'react'
import { DemoBlock } from 'demos'
import { Rate, Space, Toast } from 'components'
import { ToastShowProps } from '../../toast'
import styles from './index.less'

export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Rate onChange={(val: { toString: () => string | ToastShowProps }) => Toast.show(val.toString())} />
      </DemoBlock>
      <DemoBlock title='Arise Star'>
        <Rate type="arise" unselectedColor="grey"  onChange={(val: { toString: () => string | ToastShowProps }) => Toast.show(val.toString())} />
      </DemoBlock>
      <DemoBlock title='通过CSS修改星星大小' >
        <Rate defaultValue={5}  className={styles.container} />
      </DemoBlock>
      <DemoBlock title='1.2星'>
        <div style={{ backgroundColor: '#000'}}>
        <Rate defaultValue={1.2}  />
        </div>
      </DemoBlock>
       <DemoBlock title='2.5星'>
        <Rate defaultValue={2.5} unselectedColor="#f0f0f0" stokeColor="#ffffff" />
      </DemoBlock>
      <DemoBlock title='不同颜色'>
        <Rate defaultValue={4} color="#fe4960" unselectedColor="grey" />
      </DemoBlock>
      <DemoBlock title='只读'>
        <Rate readOnly value={4} />
      </DemoBlock>
      <DemoBlock title='清除'>
        <Space direction='vertical'>
          <Space align='center'>
            <Rate defaultValue={3} allowClear={true} />
            <div>可清除</div>
          </Space>
          <Space align='center'>
            <Rate defaultValue={3} allowClear={false} />
            <div>不可清除</div>
          </Space>
        </Space>
      </DemoBlock>
    </>
  )
}
