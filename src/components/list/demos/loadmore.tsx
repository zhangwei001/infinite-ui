import React, {useState} from 'react'
import { List } from 'components'
import { DemoBlock } from 'demos'
import { sleep } from '../../../utils/sleep'
import styles from './index.less'


let count = 0

async function mockRequest() {
  if (count >= 5) {
    return []
  }
  await sleep(2000)
  count++
  return [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
  ]
}

export default () => {
    const [data, setData] = useState<string[]>([])
    const [hasMore, setHasMore] = useState(true)

    async function loadMore() {
      const append = await mockRequest()
      setData(val => [...val, ...append])
      setHasMore(append.length > 0)
    }

  return (
    <>
    <DemoBlock title='基础用法' padding='0' border='none'>
        <List onScroll={(e?: any, scrollElementRect?: any)=> { console.log(e,scrollElementRect) }} className={styles.list} loadMore={loadMore} hasMore={hasMore} timeout={0} type={'arise'}>
            {data.map((item, index) => (
                <List.Item
                  key={index} 
                  onAppear={() => { console.log(item) }} 
                  onFirstAppear={()=> { console.log('firstappear-' + item)}}
                  onDisappear={() => { console.log('Disappear-' + item)}}
                  >{item}</List.Item>
            ))}
        </List>
      </DemoBlock>
    </>
  )
}
