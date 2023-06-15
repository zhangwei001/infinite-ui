import React from 'react';
import cx from 'classnames';
import { sleep } from '../../../../utils/sleep';
import './index.less';

interface PropsTypes {
  defaultIndex?: number,

  className?: string;

  tabListClassName?: string;

  tabItemClassName?: string;

  tabSliderClassName?: string;

  tabItemTitleCountClassName?: string;

  stretch?: boolean;  // true means use flex: 1 to make equal tab.

  tabs: Array<{key: string, title: string, count?: string | number}>;
  
  onChange: (key: string, index: number) => void;

  fixedLine?: boolean
}

interface StateTypes {
  activeIndex: number;
  left: number;
  currentSliderWidth: number | null,
  transition: string;
  scrollX: number;
  fixedLine: boolean
}


class Tabs extends React.Component {
  props: PropsTypes;
  state: StateTypes;
  tabItemWidthMap: {
    [index: number]: number,
  };
  tabItemLeftMap: {
    [index: number]: number,
  };
  sliderLeftMap: {
    [index: number]: number,
  };
  sliderWidth: number;
  bodyWidth: number;
  listRef: any;
  sliderRef: any;

  constructor(props: PropsTypes) {
    super(props);
    this.state = {
      activeIndex: props.defaultIndex || 0,
      left: 0,
      currentSliderWidth: null,
      transition: "all 250ms",
      scrollX: 0,
      fixedLine: props.fixedLine || true,
    }
    this.tabItemWidthMap = {};
    this.sliderWidth = 0;
  }

  componentDidMount(): void {
    const { activeIndex } = this.state;
    this.tabItemWidthMap = this.getTabItemWidth();
    this.sliderWidth = this.sliderRef.clientWidth;
    this.bodyWidth = document.body.clientWidth;
    this.setSliderTabItemLeft();
    this.setSlider(activeIndex, false);
  }

  smoothScrollTo (scrollX: number, duration=250) {
    const startingX = this.listRef.scrollLeft;
    const diff = scrollX - startingX;
    let start: number;

    if(duration === 0) {
      this.listRef.scrollTo(scrollX, 0);
      return;
    }

    const step = (timestamp: number)=> {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const percent = Math.min(time / duration, 1);
      this.listRef.scrollTo(startingX + diff * percent, 0);
      if (time < duration) {
        window.requestAnimationFrame(step);
      }
    }
    window.requestAnimationFrame(step);
  }

  getTabItemWidth () {
    const result: { [index: number]: number } = {};
    const tabList = this.listRef.children;
    for(let i=0; i<tabList.length; ++i) {
      result[i] = tabList[i].clientWidth;
    }
    return result;
  }

  setSliderTabItemLeft () {
    const { tabs } = this.props;
    this.sliderLeftMap = {};
    this.tabItemLeftMap = {};
    let tabItemWidthTotal = 0;  // all the slider left tab item width add up
    for( let i=0; i<tabs.length; ++i) {
      this.sliderLeftMap[i] = tabItemWidthTotal + (this.tabItemWidthMap[i] - this.sliderWidth) / 2;
      this.tabItemLeftMap[i] = tabItemWidthTotal;
      tabItemWidthTotal += this.tabItemWidthMap[i] ;
    }
  }

  tabTo (index: number) {
    this.setState({
      activeIndex: index,
    });
    this.setSlider(index);
  }

  moveTo (swipeX: number) {
    const { activeIndex } = this.state;
    const direction = swipeX < 0 ? 1 : -1;
    const currentIndex = activeIndex + direction;
    const sliderMaxWidth = this.sliderWidth + 
      (this.tabItemWidthMap[activeIndex] - this.sliderWidth) / 2 + (this.tabItemWidthMap[currentIndex] - this.sliderWidth) / 2;
    const sliderMoveX = swipeX / this.bodyWidth * sliderMaxWidth;
    this.setState({
      transition: "none",
      left: this.sliderLeftMap[activeIndex] - sliderMoveX,
      currentSliderWidth: this.sliderWidth + this.sliderWidth * 1.5 * Math.sin(Math.abs(Math.PI * swipeX / this.bodyWidth)),
    });
    
  }

  handleClick = (key: string, index: number) => {
    const { activeIndex } = this.state;
    const { onChange } = this.props;
    if(activeIndex === index) return;
    this.setState({
      activeIndex: index,
    });
    this.setSlider(index);
    typeof onChange === "function" && onChange(key, index);
  }
  
  setScrollLeft (activeIndex: number,) {
    const scrollLeft = this.listRef.scrollLeft;
    let currentScrollLeft = 0;
    const buffer = 100; // why we need add this buffer, for the tab item may be just in its place exactly.
    // left boundary
    if((this.tabItemLeftMap[activeIndex] - scrollLeft) < buffer && 
      (this.tabItemLeftMap[activeIndex] + this.tabItemWidthMap[activeIndex]  - scrollLeft) > 0) {
        currentScrollLeft = scrollLeft - this.tabItemWidthMap[activeIndex];
        if(currentScrollLeft < 0) {
          currentScrollLeft = 0;
        }
        this.smoothScrollTo(currentScrollLeft);
    } else if((this.tabItemLeftMap[activeIndex] - scrollLeft) < this.bodyWidth && 
    (this.tabItemLeftMap[activeIndex] + this.tabItemWidthMap[activeIndex]  - scrollLeft) > this.bodyWidth - buffer){ // right boundary
      currentScrollLeft = scrollLeft + this.tabItemWidthMap[activeIndex];
      if(currentScrollLeft + this.bodyWidth > this.listRef.scrollWidth) {
        currentScrollLeft = this.listRef.scrollWidth;
      }
      this.smoothScrollTo(currentScrollLeft);
    }
  }

  async setSlider (activeIndex: number, withTransition=true) {
    const {stretch} = this.props;
    if(!stretch) {
      this.setScrollLeft(activeIndex);
    }
    this.setState({
      transition: withTransition ? "all 250ms" : "none",
    });
    await sleep(0); // why we use this? for ios won't execute animation
    this.setState({
      left: this.sliderLeftMap[activeIndex],
      currentSliderWidth: this.sliderWidth,
    });
  }

  formatCount (count: number | string) {
    if(typeof count === "string") return count;
    const maxNumber = 100;
    if(count >= maxNumber) {
      return "99+";
    } else {
      return count;
    }
  }

  render () {
    const { tabs, 
      stretch=true,
      className, 
      tabListClassName, 
      tabItemClassName, 
      tabSliderClassName,
      tabItemTitleCountClassName,
    } = this.props;
    
    const { activeIndex, left, currentSliderWidth, transition, fixedLine } = this.state;
    const sliderStyle = {
      left: left + "px",
      width: fixedLine ? '21px' : currentSliderWidth + "px",
      transition
    }
    const tabItemStyle = {
      flex: stretch ? '1' : 'none',
    }
    return <div className={cx("i-tab", className)}>
      <div className={cx("i-tab-list", tabListClassName, {
        [`i-tab-list-padding-light`] : tabs.length>3
      })} ref={elem => this.listRef = elem}>
        {
          tabs.map((item,index) => 
          (<div style={tabItemStyle}
            className={cx("i-tab-item", {"i-tab-item-active": activeIndex === index }, tabItemClassName,)}
            key={item.key} 
            onClick={() => this.handleClick(item.key, index)}>
              <div className="i-tab-item-title">
                {item.title}
                {!!item.count && <div className={cx("i-tab-item-title-count", tabItemTitleCountClassName)}>
                  <span>{this.formatCount(item.count)}</span>
                </div>}
              </div>
          </div>))
        }
      <div className={cx("i-tab-slider", tabSliderClassName)}
        style={sliderStyle}
        ref={elem => this.sliderRef = elem}></div>
      </div>
    </div>
  }
}

export default Tabs;