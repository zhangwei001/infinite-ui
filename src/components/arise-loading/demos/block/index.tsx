import React from 'react'
import { Button, AriseLoading as Loading } from 'components'
import { DemoBlock } from 'demos'
import "./index.less"

export default class App extends React.Component {
  state: {
    visible: boolean;
  }

  constructor (props: any) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  loadMore = () => {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  render() {
    const { visible } = this.state;
    return (
      <>
        <DemoBlock title='Loading in the bottom'>
          <div>
            <p>apple</p>
            <p>banana</p>
            <Button onClick={this.loadMore}>click to load more</Button>
          </div>
          <Loading.Element
            wrapperClassName='arise-loading'
            iconClassName='arise-loading-icon'
            mask={false}
            visible={visible}
          >
            <span className='arise-loading-content'>try to load more orders...</span>
          </Loading.Element>
        </DemoBlock>
      </>
    )
  }
}

