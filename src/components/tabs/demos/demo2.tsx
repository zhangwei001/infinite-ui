import React, { useState, useRef } from 'react'
import { Tabs, List } from 'components';
import { sleep } from '../../../utils/sleep'
import { DemoBlock } from 'demos'
import styles from './index.less'

let count = 0

async function mockRequest() {
  if (count >= 5) {
    return []
  }
  console.log(count)
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

export type ListRef = {
    resetLoadMore?: () => void
}
  
export default () => {
    const [data, setData] = useState<string[]>([])
    const [hasMore, setHasMore] = useState(true)
    async function loadMore() {
        const append = await mockRequest()
        setData(val => [...val, ...append])
        setHasMore(append.length > 0)
    }
    const listRef = useRef<ListRef>(null)
    const changeList = (e:any) => {
        count = 0;
        setData([])
        setHasMore(true)
        listRef.current &&  listRef.current.resetLoadMore && listRef.current.resetLoadMore()
    }
  
    return (
        <>
        <DemoBlock title='复用一个列表' padding='0' >
            <Tabs
            style={{
                '--title-font-size': '13px',
                position: 'fixed',
                width: '100%'
            }}
            onChange={changeList}
            >
            <Tabs.Tab title='水果' key='fruits' />
            <Tabs.Tab title='蔬菜' key='vegetables' />
            <Tabs.Tab title='动物' key='animals' />
            </Tabs>
            <List ref={listRef} className={styles.list} loadMore={loadMore} hasMore={hasMore} timeout={0}>
                {data.map((item, index) => (
                    <List.Item key={index} >{item}</List.Item>
                ))}
            </List>
        </DemoBlock>
        </>
    )
}
