import React from 'react'
import { Ellipsis, Space } from 'components'
import { IconInfo, IconAriseCloseFill } from '@ali/super-icon'
import { DemoBlock } from 'demos'
import './demo1.less'

const content = 'Pull en maille à carrea Vintage style limited Pull en maille à carreau ....'

export default () => {
  return (
    <>
      <DemoBlock title='头部省略'>
        <Ellipsis direction='start' content={content} />
      </DemoBlock>

      <DemoBlock title='中间省略'>
        <Ellipsis direction='middle' content={content} />
      </DemoBlock>

      <DemoBlock title='尾部省略'>
        <Ellipsis direction='end' content={content} />
      </DemoBlock>

      <DemoBlock title='多行省略'>
        <Ellipsis direction='end' rows={3} content={content} />
      </DemoBlock>

      <DemoBlock title='展开收起'>
        <Ellipsis
          direction='end'
          content={content}
          expandEle={<IconInfo size={16} color='red' />}
          collapseEle={<IconAriseCloseFill size={16} color='#00f' />}
        />
      </DemoBlock>

      <DemoBlock title='展开收起'>
        <Ellipsis
          direction='end'
          content={content}
          expandEle={'点击展开'}
          collapseEle={'点击收起'}
        />
      </DemoBlock>
      <DemoBlock title='仅展开'>
        <Space block direction='vertical'>
          <Ellipsis direction='end' content={content} expandEle={<IconInfo size={16} color='red' />} />
          <Ellipsis direction='start' content={content} expandEle={<IconInfo size={16} color='red' />} />
          <Ellipsis direction='middle' content={content} expandEle={<IconInfo size={16} color='red' />} />
        </Space>
      </DemoBlock>
    </>
  )
}
