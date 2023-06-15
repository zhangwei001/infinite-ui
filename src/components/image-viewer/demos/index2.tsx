import React from 'react'
import { DemoBlock } from 'demos'
import { ImageViewer, Button } from 'components'
import { useState } from 'react'
import './index2.less';

const demoImages = [
  'https://lzd-img-global.slatic.net/g/tps/tfs/TB12FYKn21TBuNjy0FjXXajyXXa-1920-1080.jpg',
  'https://lzd-img-global.slatic.net/g/tps/imgextra/i4/O1CN01JaAJZ41nE9cWJN9DV_!!6000000005057-0-tps-750-422.jpg',
  'https://lzd-img-global.slatic.net/g/tps/imgextra/i1/O1CN01qPsJjD1lEx59j0pKJ_!!6000000004788-0-tps-750-300.jpg',
  'https://lzd-img-global.slatic.net/g/tps/tfs/TB1uB6SnY9YBuNjy0FgXXcxcXXa-1920-1080.jpg'
]


export default () => {
  const [defaultIndex, setDefaultIndex] = useState(0)
  const handleCLick = (e: any) => {
    console.log('bg click: ', { e });
  };

  return (
    <>
      <DemoBlock title='指令式调用'>
        <Button
          onClick={(e) => {
            ImageViewer.Multi.show({
              disableBodyScroll: true, 
              images: demoImages,
              defaultIndex: defaultIndex,
             
            })


          }}
        >
          显示图片
        </Button>
        <div className="long-content" onClick={() => { console.log('clicked')}}>
          long content to make body scroll
        </div>
      </DemoBlock>
    </>
  )
}
