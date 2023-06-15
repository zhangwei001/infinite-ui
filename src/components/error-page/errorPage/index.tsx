import React, { useEffect, useLayoutEffect, useRef } from 'react';
import classNames from 'classnames';
import { FEEDBACK_TEXT, BTN_TEXT, OOPS_TEXT, ERROR_IMG, DEFAULT_ITRACE_CAT_ID } from '../const';
import { getPageName, getRandomHash, getErrorDesc, getEnv, isInLzdApp } from '../utils';
import './index.less'
import Button from '../../button';

const classPrefix = `i-errpage`

interface IProps {
  scene?: 'boundary' | 'mtop' | 'RESOURCE_ERROR';
  itraceCatId?: number;
  errorCodeHash?: string;
  mtop?: string;
  errorMsg?: string;
  desc?: string;
  buttonText?: string;
  showFeedback?: boolean;
  errorImg?: string;
  fixed?: boolean;
  fullscreen?: boolean;
  onButtonClick?: (event: React.MouseEvent<HTMLImageElement, Event>) => void;
  onFeedbackClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const ErrorPage = (props: IProps) => {
  const lang: any = getEnv().language || 'en';
  const currTimestamp = new Date().valueOf();
  const refEl = useRef<HTMLDivElement>(null);
  const errorCodeRef = useRef(props?.errorCodeHash || getRandomHash());
  const defaultDesc = getErrorDesc(props.scene);

  const defaultProps = {
    scene: 'mtop',
    desc: defaultDesc[lang] || defaultDesc['en'],
    buttonText: BTN_TEXT[lang] || BTN_TEXT['en'],
    errorImg: ERROR_IMG,
    showFeedback: true,
    fullscreen: true,
    fixed: false,
    onButtonClick: () => location.reload(),
    onFeedbackClick: () => location.href="http://native.m.lazada.com/feedback"
  };
  const {
    scene,
    errorMsg,
    desc,
    buttonText,
    errorImg,
    fullscreen,
    fixed,
    showFeedback,
    onButtonClick,
    onFeedbackClick,
  } = Object.assign({}, defaultProps, props);

  useLayoutEffect(() => {
    if (!fullscreen) {
      return;
    }
    const headerEl = document.getElementById('lzd-global-header');
    const headerHeight = headerEl?.offsetHeight || 0;
    if (refEl.current) {
      refEl.current.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  }, []);

  useEffect(() => {
    // log is recorded in the <ErrorBoundary /> if scene is 'boundary'
    if (scene !== 'boundary') {
      const wpkLogger = window.__wpk || {};
      const pageName = getPageName();
      const logGroupBy = scene==='mtop' ? `mtop_${pageName}` : `RESOURCE_ERROR_${pageName}`;
      wpkLogger?.report?.({
        category: props.itraceCatId || DEFAULT_ITRACE_CAT_ID,
        msg: logGroupBy,
        c1: pageName, // 自定义字段c1 对应 pageName
        c2: props.mtop || '', // 自定义字段c2 对应 mtop
        c3: errorCodeRef.current || getRandomHash() || '', // 自定义字段c3 对应 errorCode
      });
    }
  }, []);

  const wrapperCls = classNames(classPrefix, {
    [`${classPrefix}-fullscreen`]: fullscreen,
    [`${classPrefix}-fixed`]: fixed
  });

  const isLzdApp = isInLzdApp();


  return (
    <div className={wrapperCls} ref={refEl}>
      <img className={`${classPrefix}-errorImg`} src={errorImg} />
      <p className={`${classPrefix}-oops`}>{OOPS_TEXT[lang] || OOPS_TEXT['en']}</p>
      <p className={`${classPrefix}-desc`}>{desc}</p>
      <Button className={`${classPrefix}-btn`} onClick={onButtonClick}>{buttonText}</Button>
      {isLzdApp && showFeedback && <p className={`${classPrefix}-feedback`} onClick={onFeedbackClick}>{FEEDBACK_TEXT[lang]}</p>}
      <div className={`${classPrefix}-errorInfoContainer`}>
        {errorMsg && <p className={`${classPrefix}-error-msg`}>{errorMsg}</p>}
        {errorCodeRef.current && <p>{errorCodeRef.current}</p>}
        <p>{currTimestamp}</p>
      </div>
    </div>
  );
};

export default ErrorPage;
