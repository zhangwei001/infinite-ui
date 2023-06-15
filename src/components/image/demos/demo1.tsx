import React from 'react'
import { DemoBlock } from 'demos'
import { Image, Space } from 'components'
import styles from './demo1.less'

const demoSrc =
  'https://lzd-img-global.slatic.net/g/tps/tfs/TB12FYKn21TBuNjy0FjXXajyXXa-1920-1080.jpg'
const demoSrc2 =
  'https://lzd-img-global.slatic.net/g/tps/imgextra/i4/O1CN01JaAJZ41nE9cWJN9DV_!!6000000005057-0-tps-750-422.jpg'

const placeholder = 'data:image/png;base64,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';
export default () => {
  return (
    <>
      <DemoBlock title='基础用法'>
        <Image src={demoSrc} />
      </DemoBlock>
      <DemoBlock title='图片压缩'>
        <Image src={demoSrc} width={150} height={150} compress={{ width: 150, height: 150 }} style={{ marginRight: 10 }} />
        <Image src={demoSrc} width={150} height={150} compress={{ width: 150, height: 150, quality: 'q90' }} />
      </DemoBlock>
      <DemoBlock title='通过 CSS 变量统一设置图片大小'>
        <div className={styles.imagesContainer}>
          <Space wrap>
            <Image src={demoSrc} />
          </Space>
        </div>
      </DemoBlock>
      <DemoBlock title='多个属性同时设置'>
        <div className={styles.imagesContainer}>
          <Space wrap>
            <Image src={demoSrc} width={100} height={100} />
            <Image src={demoSrc} />
          </Space>
        </div>
      </DemoBlock>
      <DemoBlock title='自定义占位'>
        <Image src='/404' width={100} height={100} placeholder={placeholder}/>
  </DemoBlock>
      <DemoBlock title='加载失败'>
        <Space wrap>
        <Image src='/404' width={351} height={120} />
        <Image src='/404' width={200} height={200} />
        <Image src='/404' width={33} height={33} svgType="small"/>
        <Image src='/404' width={33} height={33} svgType="avatar"/>
        <Image src='/404' placeholder='//lzd-img-global.slatic.net/g/tps/tfs/TB11KU2DQY2gK0jSZFgXXc5OFXa-345-345.png' width={66} height={66} svgType="avatar"/>

        </Space>

     </DemoBlock>
      <DemoBlock title='自定义样式'>
        <Space wrap>
          <Image
            src='/404'
            width={66}
            height={66}
            fit='cover'
            style={{ borderRadius: 8 }}
            svgType="small"
          />
          <Image
            src='/404'
            width={64}
            height={64}
            fit='cover'
            style={{ borderRadius: 32 }}
            svgType="avatar"
          />
        </Space>
      </DemoBlock>
      <DemoBlock title='多种填充模式'>
        <Space wrap>
          <Image src={demoSrc} width={100} height={100} fit='fill' />
          <Image src={demoSrc} width={100} height={100} fit='contain' />
          <Image src={demoSrc} width={100} height={100} fit='cover' />
          <Image src={demoSrc} width={100} height={100} fit='scale-down' />
          <Image src={demoSrc} width={100} height={100} fit='none' />
        </Space>
      </DemoBlock>
      <DemoBlock title='懒加载'>
        <Image lazy src={demoSrc2} />
      </DemoBlock>
    </>
  )
}
