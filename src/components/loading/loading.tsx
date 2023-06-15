import React from "react";
import cx from "classnames";
import LazadaIcon from "./lazada-icon";
import "./loading.less";

interface Props {
  readonly [index: string]: any,
  mask?: boolean,
  className?: string,
  wrapperClassName?: string,
  iconClassName?: string,
  visible?: boolean,
  children?: object,
  indicator?: false,
}

class Loading extends React.PureComponent {
  state: {
    isAddEnterStyle: boolean
  }
  props: Props;
  
  constructor (props: Props) {
    super(props);
    this.state = {
      isAddEnterStyle: true,
    }
  }

  async componentDidMount () {
    document.body.clientWidth; // trigger reflow
    this.setState({
      isAddEnterStyle: false,
    });
  }

  handleStopPropagation = (e: any) => {
    e && e.stopPropagation();
  }

  addEnterStyle () {
    this.setState({
      isAddEnterStyle: true,
    });
  }

  render () {
    const { 
      mask, 
      className, 
      wrapperClassName, 
      iconClassName, 
      children,
      visible,
      indicator = false,
    } = this.props;
    const { isAddEnterStyle } = this.state;
    const finalWrapperClassName = wrapperClassName ? wrapperClassName : "i-loading-wrapper";
    return (
      visible && <div className={cx("i-loading-container", className)}>
        {mask && <div className="i-loading-mask" onClick={this.handleStopPropagation}></div>}
        <div className={cx(finalWrapperClassName, {"i-loading-wrapper-enter": isAddEnterStyle})}>
          {!indicator && <LazadaIcon className={cx("i-loading-wrapper-icon", iconClassName)}/>}
          { children }
        </div>
      </div>
    );
  }
}

export default Loading;

