import React, { useRef } from 'react'
import { Button, Space, Slider, Toast, Video, Image } from 'components'
import { DemoBlock, DemoDescription } from 'demos'
import styles from './demo1.less'
import { SliderRef } from '../slider'

const colors = ['#0f9efe', '#bb9df8', '#fe9560', '#2cdbbe']

const items = colors.map((color, index) => (
    <div
      key={index}
      className={styles.content}
      style={{ background: color }}
      onClick={() => {
        Toast.show(`你点击了卡片 ${index + 1}`)
      }}
    >
      {index + 1}
    </div>
))

const images = [
  {
    "coverUrl": "https://sg-live-02.slatic.net/p/ec9b40f822e460b389df66cc10d48b1d.jpg",
    "height": 0,
    "mediaType": 2,
    "reviewRateId": 92256691952896,
    "size": 0,
    "videoId": 30021578993,
    "width": 0
  },
  {
    "coverUrl": "https://sg-live-02.slatic.net/p/ec9b40f822e460b389df66cc10d48b1d.jpg",
    "height": 2731,
    "mediaType": 1,
    "reviewRateId": 92256691952896,
    "size": 804347,
    "width": 2048
  },
];
export default () => {
  const ref = useRef<SliderRef>(null)
  return (
    <>
      <DemoBlock title='基础用法'>
        <Slider onIndexChange={(i) => {console.log('i', i)}}>{items}</Slider>
      </DemoBlock>
      <DemoBlock title='自动播放'>
      <Slider autoplay showIndicator>{items}</Slider>
      </DemoBlock>
      <DemoBlock title='禁用循环'>
        <Slider loop={false} onLastIndexChange={(i) => {console.log('lastpage', i)}}>{items}</Slider>
      </DemoBlock>
      <DemoBlock title='手动控制'>
        <Space direction='vertical' block>
          <Slider allowTouchMove={false} ref={ref} loop={false}>
            {items}
          </Slider>
          <Space>
            <Button
              onClick={() => {
                ref.current?.sliderPrev()
              }}
            >
              上一张
            </Button>
            <Button
              onClick={() => {
                ref.current?.sliderNext()
              }}
            >
              下一张
            </Button>
          </Space>
          <DemoDescription content='在禁用手势拖拽后，可以通过 Ref 进行手动翻页' />
        </Space>
      </DemoBlock>
      <DemoBlock title='自定义样式'>
        <Space direction='vertical' block>
          <Slider
            style={{
              '--slider-width': '80%',
              '--border-radius': '8px',
            }}
            defaultIndex={2}
          >
            {items}
          </Slider>
          <DemoDescription content='通过 CSS 变量可以控制滑块的大小、整体的圆角等样式' />
        </Space>
      </DemoBlock>
      <DemoBlock title='居中展示'>
        <Space direction='vertical' block>
          <Slider
           defaultIndex={2}
            loop={false}
            style={{ '--slider-width': '80%', '--track-offset': '10%' }}
          >
            {items}
          </Slider>
          <DemoDescription content='通过 CSS 变量可以控制滑块的大小和轨道的偏移量' />
        </Space>
      </DemoBlock>
      <DemoBlock title='循环居中展示'>
        <Slider style={{ '--slider-width': '70%', '--track-offset': '15%' }} defaultIndex={2}>
          {items}
        </Slider>
      </DemoBlock>
      <DemoBlock title='竖向'>
        <Slider direction='vertical'>{items}</Slider>
      </DemoBlock>
      <DemoBlock title='竖向居中展示'>
        <Slider
          direction='vertical'
          style={{ '--height': '160px', '--track-offset': '20px' }}
        >
          {items}
        </Slider>
      </DemoBlock>
      <DemoBlock title='视频+图片切换'>
        <Slider loop>
        {
            images.map((image, i) => {
              const { videoId, coverUrl } = image;
              const url = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm"
              if (videoId) {
                return url && <Video
                  key={`image-slider-item_${i}`}
                  className="slider-video"
                  playsInline
                  controls
                  muted={false}
                  poster={coverUrl}
                  src={url}
                  playControl={'pause'}
                />;
              }
              return (
                <div key={`image-slider-item_${i}`} className="image-slider-item">
                  <Image
                    className="preview-images"
                    src={image.coverUrl}
                    fit={'contain'}
                  />
                </div>);
            })
          }
        </Slider>
      </DemoBlock>
    </>
  )
}
