import React, { useState } from 'react'
import { DemoBlock } from 'demos'
import { ErrorBoundary, Button, ErrorPage, Space } from 'components'

export default () => {
  const BuggyCounter = () => {
    const [count, setCount] = useState(0);

    const handleClick = () => {
      if(count === 2){
        throw new Error('I crashed!')
      }
      setCount(cnt => cnt+1)
    }

    return <Button onClick={handleClick}>点击3次后出错，已点击{count}次 </Button>;
  }

  const ComponentError = () => {
    const [isError, setIsError] = useState(false);
    const handleClick = () => {
      setIsError(true);
    }
    return (
      <div>
        <Button onClick={handleClick}>
          函数组件内部报错, 隐藏组件
        </Button>
        {isError && <span> {undefinedVar} </span>}
      </div>
    );
  }

  return (
    <>
      <DemoBlock title='组件出错,展示错误页并上报' >
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </DemoBlock>
      <DemoBlock title='组件出错,不展示错误页并上报' >
        <ErrorBoundary showErrorPage={false}>
          <ComponentError />
        </ErrorBoundary>
      </DemoBlock>
      <DemoBlock title='错误页'>
        <ErrorPage scene="RESOURCE_ERROR" errorMsg='::System Error'></ErrorPage>
      </DemoBlock>
    </>
  )
}
