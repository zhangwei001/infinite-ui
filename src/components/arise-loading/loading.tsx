import React from "react";
import cx from "classnames";
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
      loadingText
    } = this.props;
    const { isAddEnterStyle } = this.state;
    const finalWrapperClassName = wrapperClassName ? wrapperClassName : "i-arise-loading-wrapper";
    return (
      visible && <div className={cx("i-arise-loading-container", className)}>
        {mask && <div className="i-arise-loading-mask" onClick={this.handleStopPropagation}></div>}
        <div className={cx(finalWrapperClassName, {"i-arise-loading-wrapper-enter": isAddEnterStyle})}>
          <div className="i-arise-loading-content">
            {!indicator && <img src="//img.mrvcdn.com/g/tps/imgextra/i3/O1CN01KV7Dfs24fxCSq7kNj_!!6000000007419-1-tps-60-60.gif" className={cx("i-arise-loading-wrapper-icon", iconClassName)}/>}
            {loadingText && <span className="i-arise-loading-wrapper-text">{loadingText}</span>}
          </div>
          { children }
        </div>
      </div>
    );
  }
}

export default Loading;

