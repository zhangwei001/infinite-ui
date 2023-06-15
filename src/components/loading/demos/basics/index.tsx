import React from 'react'
import { Button, Loading, Space } from 'components'
import { DemoBlock } from 'demos'

export default class App extends React.Component {
  show () {
    Loading.show();
  }

  hide() {
    Loading.hide();
  }

  render() {
    // We can config mask to false currently , so you can close loading manually.
    Loading.config({ mask: false });
    return (
      <>
        <DemoBlock title='Basic Loading'>
          <Space wrap>
            <Button color='primary' onClick={this.show}>
              show loading
            </Button>
            <Button onClick={this.hide}>hide loading</Button>
          </Space>
        </DemoBlock>
      </>
    )
  }
}

