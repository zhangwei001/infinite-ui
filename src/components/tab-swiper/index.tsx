import React from 'react';
import cx from 'classnames';
import Tabs from "./components/tabs";
import Swiper from "./components/swiper";
import './index.less';

interface PropsType {
  tabs: Array<{key: string, title: string, count?: string | number}>;

  defaultIndex?: number,

  stretch?: boolean;  // true means use flex: 1 to make equal tab.

  children: any;

  className?: string;

  tabContainerClassName?: string;

  tabListClassName?: string;

  tabItemClassName?: string;

  tabSliderClassName?: string;

  swiperClassName?: string;

  onChange: (key: string, index: number) => void;

  disabled?: boolean
}

class App extends React.Component {
  props: PropsType;
  tabRef: any;
  swiperRef: any;

  handleTabChange = (key: string, index: number) => {
    const { onChange } = this.props;
    this.swiperRef.swipeTo(index);
    typeof onChange === "function" && onChange(key, index);
  }

  handleSwiperChange = (index: number) => {
    const { onChange, tabs } = this.props;
    this.tabRef.tabTo(index);
    typeof onChange === "function" && onChange(tabs[index].key, index);
  }

  navigateTo(index: number, isTriggerOnChange=false) {
    const { onChange, tabs } = this.props;
    this.tabRef.tabTo(index);
    this.swiperRef.swipeTo(index);
    isTriggerOnChange && typeof onChange === "function" && onChange(tabs[index].key, index);
  }

  handleSwiperTouchMove = (moveX: number) => {
    this.tabRef.moveTo(moveX);
  }

  handleSwiperTouchEnd = (index: number) => {
    this.tabRef.setSlider(index);
  }

  render () {
    const { 
      children, 
      tabs,
      defaultIndex=0,
      stretch,
      className,
      tabContainerClassName,
      tabListClassName,
      tabItemClassName,
      tabSliderClassName,
      swiperClassName,
      disabled=false
    } = this.props;
    return (
      <div className={cx("i-tab-swiper", className)}>
        <Tabs ref={elem => this.tabRef = elem}
          tabs={tabs}
          stretch={stretch}
          className={tabContainerClassName}
          tabListClassName={tabListClassName}
          tabItemClassName={tabItemClassName}
          tabSliderClassName={tabSliderClassName}
          defaultIndex={defaultIndex}
          onChange={this.handleTabChange}/>
        
        <div className={cx("i-swiper", swiperClassName)}>
          <Swiper ref={elem => this.swiperRef = elem}
            defaultIndex={defaultIndex}
            disabled={disabled}
            onTouchMove={this.handleSwiperTouchMove}
            onTouchEnd={this.handleSwiperTouchEnd}
            onChange={this.handleSwiperChange}>
              {children}
          </Swiper>
        </div>
      </div>
    );
  }
}

export default App;
