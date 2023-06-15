import React, { useRef } from 'react'
import { Video, Button } from 'components'
import { DemoBlock } from 'demos'
import { VideoRef } from '../video'


export default () => {
  const ref = useRef<VideoRef>(null)
  const play = () => {
    ref && ref.current && ref.current.play && ref.current.play()
  }
  const pause = () => {
    ref && ref.current && ref.current.pause && ref.current.pause()
  }

  return (
    <>
      <DemoBlock title='Basic Video'>
      <Video
        className="slider-video"
        controls
        playsInline
        muted
        custom
        autoPlay
        poster="https://lzd-img-global.slatic.net/g/p/b3fff66e073bb07f44f72e64f92ac99c.jpg_340x340q80.jpg_.webp"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
        />
      </DemoBlock>
      <DemoBlock title='自动播放,默认静音'>
        <Video autoPlay controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
      </DemoBlock>
      <DemoBlock title='自动带声音播放'>
        <Video autoPlay  muted={false} controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
      </DemoBlock>
      <DemoBlock title='循环播放'>
        <Video loop controls src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
      </DemoBlock>
      <DemoBlock title='手动开始/暂停'>
        <div style={{ display: 'flex', flexDirection: 'row', margin: 10, justifyContent: 'center' }}>
          <Button onClick={play}>点击开始</Button>
          <Button onClick={pause} type="secondary">点击暂停</Button>
        </div>
        <Video
          ref={ref}
          controls
          playsInline
          muted
          custom
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
          onEnded={pause}
        />
      </DemoBlock>
    </>
  )
}

