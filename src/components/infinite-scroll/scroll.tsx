import React, {
    ReactNode,
    useImperativeHandle,
    forwardRef,
    CSSProperties,
    useRef,
    useMemo,
    ForwardRefExoticComponent,
    memo,
} from 'react';
import { useMemoizedFn, usePrevious, useUpdateEffect } from 'ahooks';
import useIntersection from '../../utils/use-inter-section';
import Loading from '../loading'
import AriseLoading from '../arise-loading'

const getDefaultIntersectionOption = (isInverse: boolean | undefined) => {
    if (isInverse) {
        return { root: null, rootMargin: '20px 0px 0px 0px', threshold: 1 };
    }
    return { root: null, rootMargin: '-20px 0px 0px 0px', threshold: 1 };
};

export type InfiniteScrollOutRef = {
    scrollToBottom?: null | (() => void);
}
type Fn = () => any;

export type InfiniteScrollProps = {
    ref?: React.Ref<InfiniteScrollOutRef>;
    loadMore: Fn;
    type?: string
    style?: CSSProperties;
    hasMore: boolean;
    children: ReactNode;
    loader?: ReactNode;
    inverse?: boolean;
    dataLength: number;
    loading: boolean;
    loadingText?: ReactNode
    intersectionOption?: IntersectionObserverInit;
}

export const InfiniteScroll: ForwardRefExoticComponent<InfiniteScrollProps> = memo(
    forwardRef(({ children, loadMore, style, hasMore, loader, loadingText, dataLength, inverse, intersectionOption, loading, type }, ref) => {
        const _intersectionOption = {
            ...getDefaultIntersectionOption(inverse),
            ...intersectionOption,
        };
        const stateRef = useRef({
            initTime: 0,
        });

        const intersectionRef = useRef<HTMLDivElement>(null);
        const inverseViewRef = useRef<HTMLDivElement>(null);

        const intersection = useIntersection(intersectionRef, _intersectionOption);

        useUpdateEffect(() => {
            if (intersection?.time) {
                if (stateRef.current.initTime === 0) {
                    stateRef.current.initTime = intersection?.time;
                }
            }
        }, [stateRef, intersection]);

        const oldDataLength = usePrevious(dataLength);
        useUpdateEffect(() => {
            if (dataLength === 0 && oldDataLength === 0 && intersection?.time) {
                stateRef.current.initTime = 0;
            }
        }, [dataLength === 0, oldDataLength === 0, stateRef, intersection]);

        const isIntoVIew = useMemo(
            () =>
                intersection &&
                intersection.intersectionRatio === 1 &&
                stateRef.current.initTime !== 0 &&
                intersection.time - stateRef.current.initTime > 300,
            [intersection]
        );

        const scrollToBottom = useMemoizedFn(() => {
            if (inverse) {
                return inverseViewRef?.current?.scrollIntoView({
                    behavior: 'auto',
                    block: 'end',
                    inline: 'nearest',
                });
            }
            intersectionRef?.current?.scrollIntoView({
                behavior: 'auto',
                block: 'end',
                inline: 'nearest',
            });
        });
        useImperativeHandle(ref, () => ({
            scrollToBottom,
        }));

        useUpdateEffect(() => {
            if (isIntoVIew && hasMore) {
                loadMore && loadMore();
            }
        }, [isIntoVIew, hasMore]);

        const wapperElement = type === 'arise' ? AriseLoading : Loading;
        return (
            <div className={inverse ? 'i-infinite-scroll inverse' : 'i-infinite-scroll'} style={style}>
                {inverse && <div ref={inverseViewRef} className="inverse-view"></div>}
                {children}
                <div ref={intersectionRef}></div>
                {loading && hasMore && (loader || <wapperElement.Element
                    wrapperClassName='loading'
                    iconClassName='loading-icon'
                    mask={false}
                    visible={hasMore}
                >
                    {loadingText ? loadingText : <span className="loading-content">loading more data</span>}
                </wapperElement.Element>)}
            </div>
        );
    })
);
