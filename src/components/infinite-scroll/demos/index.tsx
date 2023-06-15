import React, { useRef, useState, useCallback } from 'react';
import InfiniteScroll, { InfiniteScrollOutRef } from '../index';
import { Exposure } from 'components';

export default () => {
  const targetRef = useRef<InfiniteScrollOutRef>(null);
  const targetWrapRef = useRef(null);
  const [list, setList] = useState(Array.from({ length: 20 }));
  const [loading, setLoading] = useState(false);

  const loadMore = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setList(pre => pre.concat(Array.from({ length: 20 })));
      setLoading(false);
    }, 2000);
  }, []);


  return (
    <div
      ref={targetWrapRef}
      style={{
        height: '90vh',
        overflow: 'auto',
        position: 'relative',
      }}>
      <InfiniteScroll
        intersectionOption={{ root: targetWrapRef.current }}
        dataLength={list.length}
        loadMore={loadMore}
        loading={loading}
        hasMore={true}
        ref={targetRef}
        >
        {list.map((_, i) => (
          <div key={i}>
            <Exposure always={true} onAppear={() => {console.log('onExpose' + i)}} onFirstAppear={() => {console.log('onFirstExposure' + i)}} onDisappear={() => {console.log('onHide' + i)}} >
              <div  style={{ height: 30, margin: 4, border: '1px solid hotpink' }}>
                #{i + 1} row
              </div>
            </Exposure>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
