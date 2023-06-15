import React, { Component } from 'react';
import ErrorPage from '../../error-page';
import { DEFAULT_ITRACE_CAT_ID } from '../const';
import { getPageName, getRandomHash } from '../utils';

interface IProps {
  itraceCatId?: number;
  pageName?: string;
  showErrorPage?: boolean;
}

interface IState {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  errorCodeHash: string;
  itraceCatId: number;
  showErrorPage: boolean;

  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
    this.errorCodeHash = getRandomHash();
    this.itraceCatId = this.props.itraceCatId || DEFAULT_ITRACE_CAT_ID;
    this.showErrorPage = this.props.showErrorPage===undefined ? true :this.props.showErrorPage ;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    const wpkLogger = window.__wpk || {};
    const pageName = this.props.pageName || getPageName();
    const logGroupBy = `render_${pageName}`;
    wpkLogger?.report?.({
      category: this.itraceCatId,
      msg: logGroupBy,
      c1: pageName, // 自定义字段c1 对应 pageName
      c2: '', // 自定义字段c2 对应 mtop
      c3: this.errorCodeHash, // 自定义字段c3 对应 errorCode
      bl1: error?.message || '', // 自定义长文本bl1 对应 error
      bl2: JSON.stringify(errorInfo), // 自定义长文本bl2 对应 errorStack
    });
  }

  render() {
    if (this.state.hasError) {
      if(!this.showErrorPage) return null;
      return (
        <ErrorPage
          scene="boundary"
          itraceCatId={this.props.itraceCatId}
          errorCodeHash={this.errorCodeHash}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
