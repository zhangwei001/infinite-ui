import React from 'react';
import { sleep } from '../../../../utils/sleep';
import './index.less';

interface PropsType {
  defaultIndex?: number;

  disabled?: boolean;

  onChange: (index: number) => void;

  onTouchMove: (moveX: number) => void;

  onTouchEnd: (index: number) => void;

  children: any;
}

interface StartType {
  x: number;
  y: number;
  time: number;
  swipeX: number;
}

interface StateType {
  swipeX: number;
  transitionDuration: number;
  activeIndex: number;
}

class Swiper extends React.Component {
  props: PropsType;
  start: StartType;
  swiperRef: any;
  parentWidth: number;
  swiperCount: number;  // how many swiper elements
  state: StateType;
  isTouching: boolean;
  isScrolling: boolean;
  isDisableScroll: boolean;

  constructor(props: PropsType) {
    super(props);
    const defaultIndex = props.defaultIndex || 0;
    this.state = {
      swipeX: this.getSwipeXByIndex(defaultIndex),
      transitionDuration: 0,
      activeIndex: defaultIndex   // the active index of swiper element
    }
  }

  componentDidMount(): void {
    this.parentWidth = this.swiperRef.clientWidth;
    this.swiperCount = this.swiperRef.children.length;
  }

  async swipeTo (index = 0, withTransition=true) {
    if(withTransition) {
      this.setState({
        transitionDuration: 250,
      });
      await sleep(0);
    }
    this.setState({
      swipeX: this.getSwipeXByIndex(index),
      activeIndex: index,
    });
  }

  getSwipeXByIndex (index: number) {
    return -index * 100;
  }

  distanceToPercent (x: number) {
    return x / this.parentWidth * 100;
  }

  disableScroll () {
    // passive: false cannot omit
    document.body.addEventListener("touchmove", this.preventDefault, {passive: false});
  }

  enableScroll () {
    document.body.removeEventListener("touchmove", this.preventDefault);
  }

  preventDefault = (e: Event) => {
    if(e.cancelable) {
      e.preventDefault();
    }
  }

  touchEndReset () {
    this.isScrolling = false;
    this.isTouching = false;
    this.enableScroll();
  }

  handleTouchStart = (e: React.TouchEvent) => {
    const {disabled} = this.props;

    if(disabled) {
      // alert(1)
      return;}
    const { screenX, screenY } = e.changedTouches[0];
    this.start = {
      x: screenX,
      y: screenY,
      time: new Date().getTime(),
      swipeX: this.state.swipeX,
    }
    this.isTouching = false;
    this.isScrolling = false;
  }

  handleTouchMove = (e: React.TouchEvent)  => {
    const {disabled} = this.props;
    if(disabled) {
      return;}
    if(this.isScrolling) return;
    const { onTouchMove } = this.props;
    const { activeIndex } = this.state;
    const { screenX, screenY } = e.changedTouches[0];
    const moveX = screenX - this.start.x;
    const moveY = screenY - this.start.y;
    const direction = moveX > 0 ? -1 : 1; // 1 means go to next element

    if((activeIndex === 0 && direction === -1 ) || 
      (activeIndex === this.swiperCount - 1 && direction === 1)) {
      return false;
    }

    const TRIGGER_SWIPE = 0;
    if(Math.abs(moveX) - Math.abs(moveY) > TRIGGER_SWIPE && !this.isTouching) {
      this.isTouching = true;
      this.isScrolling = false;
      this.disableScroll();
    } else if(!this.isTouching){
      this.isTouching = false;
      this.isScrolling = true;
      return;
    }
    
    this.setState({
      swipeX: this.distanceToPercent(moveX) + this.start.swipeX,
      transitionDuration: 0,
    });

    typeof onTouchMove === "function" && onTouchMove(moveX);
  }

  handleTouchEnd = (e: React.TouchEvent) => {
    const {disabled} = this.props;

    if(disabled) {
      // alert(1)
      return;}
    if(this.isScrolling) return;
    this.touchEndReset();
    const { onChange, onTouchEnd } = this.props;
    const { activeIndex } = this.state;
    const { screenX, screenY } = e.changedTouches[0];
    const endTime = new Date().getTime();
    const TIME_LIMIT = 300;
    const X_DISTANCE = 30;
    const direction = screenX - this.start.x > 0 ? -1 : 1; // 1 means go to next element
    const moveX = Math.abs(screenX - this.start.x);

    if((activeIndex === 0 && direction === -1 ) || 
      (activeIndex === this.swiperCount - 1 && direction === 1)) {
      return false;
    }
    
    // if you slide quickly or swipe more half width
    if(moveX > X_DISTANCE && 
      Math.abs(screenX - this.start.x) > Math.abs(screenY - this.start.y) &&
      endTime - this.start.time < TIME_LIMIT || moveX > this.parentWidth / 2
    ) {
      const currentIndex = activeIndex + direction;
      this.setState({
        swipeX: this.getSwipeXByIndex(currentIndex),
        transitionDuration: 250,
        activeIndex: currentIndex,
      });
      typeof onChange === "function" && onChange(currentIndex);
      return;
    }

    this.setState({
      swipeX: this.getSwipeXByIndex(activeIndex),
      transitionDuration: 250,
    });

    typeof onTouchEnd === "function" && onTouchEnd(activeIndex)
  }

  render () {
    const { children } = this.props;
    const { swipeX, transitionDuration } = this.state;
    const style = {
      transform: `translate3d(${swipeX}%, 0, 0)`,
      transitionDuration: `${transitionDuration}ms`,
    };
    return (<div className="i-swiper-container"
      ref={elem => this.swiperRef = elem}
      style={style}
      onTouchStart={this.handleTouchStart}
      onTouchMove={this.handleTouchMove}
      onTouchEnd={this.handleTouchEnd}>
      {children}
    </div>);
  }
}

export default Swiper;