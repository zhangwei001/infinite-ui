import React, { useEffect, useState } from 'react'
import { Video, Button } from 'components'

import { DemoBlock } from 'demos'

export default () => {
  const [playControl, setPlayControl] = useState('');
  const [playControl1, setPlayControl1] = useState('');

  const [source, setSource] = useState(undefined);
  const play = () => {
    setPlayControl('play');
  }
  const pause = () => {
    setPlayControl('pause');
  }
  useEffect(() => {
    // 异步设置video 需要用户手动点击播放
    setTimeout(() => {
      setSource('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm')
    }, 4000)
  }, [])

  return (
    <>
     <DemoBlock title='通过playControl控制手动开始/暂停'>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 10, justifyContent: 'center' }}>
          <Button onClick={play}>点击开始</Button>
          <Button onClick={pause} type="secondary">点击暂停</Button>
        </div>
        <Video
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          autoPlay
          playControl={playControl}
          poster={'http://vjs.zencdn.net/v/oceans.png'}
        />
      </DemoBlock>
      <DemoBlock title='OnError 处理播放异常的情况'>
        <Video
          className="slider-video"
          controls
          playsInline
          muted
          custom
          autoPlay
          playControl={playControl1}
          poster="https://lzd-img-global.slatic.net/g/p/b3fff66e073bb07f44f72e64f92ac99c.jpg_340x340q80.jpg_.webp"
          src={source}
          onError={() => {
            // 处理下播放失败的情况,比如播放兜底视频
            setSource('https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm')
            // 或者暂停
            // setPlayControl1('pause');
          }}
          />
        </DemoBlock>
    </>
  )
}

