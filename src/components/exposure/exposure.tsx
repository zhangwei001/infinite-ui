import React, { useEffect, useRef } from 'react';

export type ExposeProps = {
  children: any;
  readonly always?: boolean; // 是否一直有效
  // 曝光时的回调，若不存在always，则只执行一次
  onAppear?: (dom: HTMLElement) => void;
  // 仅执行一次
  onFirstAppear?: (dom: HTMLElement) => void;
  // 曝光后又隐藏的回调，若不存在always，则只执行一次
  onDisappear?: (dom: HTMLElement) => void;
  observerOptions?: IntersectionObserverInit; // IntersectionObserver相关的配置
}


/**
 * 监听元素的曝光
 * @param {ExposeProps} props 要监听的元素和回调
 * @returns {JSX.Element}
 */
export const Exposure = (props: ExposeProps): JSX.Element => {
  const ref = useRef<any>(null);
  const curExpose = useRef(false);
  const firstExpose = useRef(false);
  useEffect(() => {
    if (ref.current) {
      const target = ref.current;
      const observerOptions = props?.observerOptions || {
        // 决定了什么时候触发回调函数。默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。
        // [0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 可见时，会触发回调函数。
        threshold: [0, 0.5, 1],
      };
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          if (entry.intersectionRatio >= 0.5) {
            if (!curExpose.current) {
              props?.onAppear?.(target);
            }
            if (!firstExpose.current) {
              props?.onFirstAppear?.(target);
            }
            firstExpose.current = true;
            curExpose.current = true;
            if (!props?.always && typeof props?.onDisappear !== 'function') {
              // 当always属性为加，且没有onHide方式时
              // 则在执行一次曝光后，移动监听
              io.unobserve(target);
            }
          }
        } else if (typeof props?.onDisappear === 'function' && curExpose.current) {
          props.onDisappear(target);
          curExpose.current = false;
          if (!props?.always) {
            io.unobserve(target);
          }
        }
      };
      const io = new IntersectionObserver(intersectionCallback, observerOptions);
      io.observe(target);

      return () => io.unobserve(target); // 组件被卸载时，先取消监听
    }
  }, [ref]);

  // 当组件的个数大于等于2，或组件使用fragment标签包裹时
  // 则创建一个新的div用来挂在ref属性
  if (React.Children.count(props.children) >= 2 || props.children.type.toString() === 'Symbol(react.fragment)') {
    return <div ref="{ref}">{props.children}</div>;
  }
  // 为该组件挂在ref属性
  return React.cloneElement(props.children, { ref });
};
