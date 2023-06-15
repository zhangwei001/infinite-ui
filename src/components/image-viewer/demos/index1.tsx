import React from 'react'
import { DemoBlock } from 'demos'
import { ImageViewer, Button } from 'components'
import { useState } from 'react'
import './index1.less';

const demoImages = [
  'https://lzd-img-global.slatic.net/g/tps/tfs/TB12FYKn21TBuNjy0FjXXajyXXa-1920-1080.jpg',
  'https://lzd-img-global.slatic.net/g/tps/imgextra/i4/O1CN01JaAJZ41nE9cWJN9DV_!!6000000005057-0-tps-750-422.jpg',
  'https://lzd-img-global.slatic.net/g/tps/imgextra/i1/O1CN01qPsJjD1lEx59j0pKJ_!!6000000004788-0-tps-750-300.jpg',
  'https://lzd-img-global.slatic.net/g/tps/tfs/TB1uB6SnY9YBuNjy0FgXXcxcXXa-1920-1080.jpg'
]

const Single = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        显示图片
      </Button>
      <ImageViewer
        image={demoImages[0]}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

const Multi = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        显示图片
      </Button>
      <ImageViewer.Multi
        images={demoImages}
        visible={visible}
        defaultIndex={1}
        onClose={() => {
          setVisible(false)
        }}
      />
    </>
  )
}

const ViewWithFooter = () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true)
        }}
      >
        显示图片
      </Button>
      <ImageViewer.Multi
        images={demoImages}
        visible={visible}
        defaultIndex={1}
        onClose={() => {
          setVisible(false)
        }}
        onEndChange={(movePercent) => {
          console.log(movePercent)
        }}
        renderRight={() => {
          return ( <div className="rigth-tip-info">
            <span>Release to view Outlet Gallery</span>
          </div>)
        }}
        renderHeader={() => {
          return <div className="custom-header"><Button>自定义顶部额外内容</Button></div>
        } }
        renderFooter={() => {
          return <div className="custom-footer"><Button>自定义底部额外内容</Button></div>
        } }
      />
    </>
  )
}

export default () => {
  return (
    <>
      <DemoBlock title='单张图片预览'>
        <Single />
      </DemoBlock>
      <DemoBlock title='多张图片预览'>
        <Multi />
      </DemoBlock>
      <DemoBlock title='指令式调用'>
        <Button
          onClick={() => {
            ImageViewer.Multi.show({ images: demoImages })
          }}
        >
          显示图片
        </Button>
      </DemoBlock>
      <DemoBlock title='手动控制关闭'>
        <Button
          onClick={() => {
            const handler = ImageViewer.show({
              image: demoImages[2],
            })
            setTimeout(() => {
              handler.close()
            }, 3000)
          }}
        >
          显示图片并在3秒后关闭
        </Button>
      </DemoBlock>
      <DemoBlock title='自定义头部及底部额外内容'>
        <ViewWithFooter />
      </DemoBlock>
    </>
  )
}
