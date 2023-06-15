/**
 * @description: lazada default loading with heart shape and a spinning circle around it.
 */

import React from 'react'
import cx from "classnames";
import './index.less'

interface Props {
  readonly [index: string]: any,
  className?: string,
}

class LazadaIcon extends React.Component {
  props: Props;

  render() {
    const { className } = this.props;
    return (
      <svg
        className={cx("i-lazada-icon", className)}
        width='100'
        height='100'
        viewBox='0 0 100 100'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <linearGradient
            x1='-0.0262274148%'
            y1='49.9999788%'
            x2='99.9998872%'
            y2='49.9999788%'
            id='linearGradient-1'
          >
            <stop stopColor='#FF9200' offset='0%'></stop>
            <stop stopColor='#F36D00' offset='29%'></stop>
            <stop stopColor='#F4680B' offset='32%'></stop>
            <stop stopColor='#F83C72' offset='57%'></stop>
            <stop stopColor='#FC1CBE' offset='78%'></stop>
            <stop stopColor='#FE08ED' offset='93%'></stop>
            <stop stopColor='#FF00FF' offset='100%'></stop>
          </linearGradient>
          <linearGradient id='top-arc'>
            <stop stopColor='#fab8d1' offset='0%'></stop>
            <stop stopColor='#f6498d' offset='100%'></stop>
          </linearGradient>
          <linearGradient id='bottom-arc'>
            <stop stopColor='#f53883' offset='0%'></stop>
            <stop stopColor='#f6498d' offset='100%'></stop>
          </linearGradient>
        </defs>

        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g id="circle" className="loading-circle">
            <path d="M 8, 50 A 42 42 0 0 1 92 50" strokeWidth="4" stroke="url(#top-arc)" fill="transparent"/>
            <path d="M 8, 50 A 42 42 0 0 0 92 50" strokeWidth="4" stroke="url(#bottom-arc)" fill="transparent"/>
          </g>
          <g
            id='Group'
            transform='translate(25.000000, 30.000000)'
            fillRule='nonzero'
          >
            <path
              d='M24.960764,40.2571928 C24.6119612,40.2586011 24.2689069,40.1688244 23.9659996,39.9968308 C21.3324918,38.4791171 1.80107814,26.2931522 1.06024045,25.8922468 C0.0131200273,25.3221279 0.0131200273,24.5255235 0.0131200273,24.4916808 L0.0131200273,7.40113186 C0.0159143495,6.76778246 0.342366586,6.17930809 0.879612175,5.83916242 L1.00526662,5.76366724 C2.90317239,4.60780985 9.22254412,0.78098472 10.2277797,0.208262592 C10.4605064,0.0727837139 10.7251278,0.000932848719 10.9947954,-4.43938416e-14 C11.243627,0.00138575761 11.4882461,0.0639900592 11.7068373,0.182229768 C11.7225441,0.182229768 20.5654761,5.90945104 21.9162614,6.43010753 C23.0000311,6.84402943 23.6230676,7.06530843 24.973853,7.06530843 C26.1609705,7.0909937 27.3341914,6.80739243 28.3769944,6.24267119 C29.6728059,5.54759479 38.1361567,0.239501981 38.2199263,0.18483305 C38.4391,0.0653720148 38.6846576,0.0018632375 38.934586,-4.43938416e-14 C39.2015187,0.00278266183 39.463135,0.0745524322 39.6937483,0.208262592 C40.8377274,0.84606678 48.6911305,5.6204867 49.0157378,5.82354273 L49.0392981,5.83916242 C49.5895098,6.16860871 49.9239246,6.76246609 49.9189906,7.40113186 L49.9189906,24.4890775 C49.9189906,24.5229202 49.9005546,25.3221279 48.8586697,25.8922468 C48.1152143,26.2983588 28.5968896,38.4739106 25.9529106,39.9916242 C25.6513258,40.1651094 25.3091703,40.2566827 24.960764,40.2571928 Z'
              fill='url(#linearGradient-1)'
            ></path>
            <path
              d='M24.869141,40.2493692 L24.9712352,40.2493692 C25.3191668,40.2504568 25.6612912,40.1606872 25.9633818,39.989021 C28.6073609,38.4713073 48.1256854,26.2957555 48.869141,25.8896434 C49.9162614,25.3195246 49.9294879,24.5203169 49.9294879,24.4864742 L49.9294879,7.40113186 C49.9318983,7.1137906 49.8654882,6.82998944 49.7356332,6.57328806 L24.869141,20.1546124 L24.869141,40.2493692 Z'
              style={{ mixBlendMode: 'multiply' }}
              fill='#F624A0'
            ></path>
            <path
              d='M-2.95723117e-05,24.4916808 C-2.95723117e-05,24.5255235 0.0183556294,25.3221279 1.06024045,25.8922468 C1.80107814,26.2957555 21.3324918,38.4791171 23.9659996,39.9916242 C24.2388445,40.1469683 24.5446733,40.2361568 24.8586697,40.2519525 L24.8586697,20.1546124 L0.115214268,6.76853424 C0.0377950643,6.97049756 -0.00126065995,7.1849954 -2.95723117e-05,7.40113186 L-2.95723117e-05,24.4916808 Z'
              fill='#F58000'
              style={{ mixBlendMode: 'multiply' }}
              opacity='0.41'
            ></path>
          </g>
        </g>
      </svg>
    )
  }
}

export default LazadaIcon
