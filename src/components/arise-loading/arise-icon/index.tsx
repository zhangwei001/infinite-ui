import React from 'react'
import { useState, useEffect } from "react";
import cx from "classnames";
import { sleep } from '../../../utils/sleep';

import "./index.less";

interface PropsType {
  className?: string;
}

function Lump(props: PropsType) {
  const list = [
    `M28.7113 2 
    L1 23 
    L14.4227 44 
    L35.8557 44 
    L43 30.1443 
    L28.7113 2Z`,

    `M33.7 6.975
    L5.35 0
    L4 37.125
    L22 45
    L41.35 20.7
    L33.7 6.975Z`,

    `M43 19.4246
    L33.8492 3 
    L1 11.9162
    L3.34637 36.7877
    L31.0335 41.9497
    L43 19.4246Z`,

    `M15.2715 6.64706
    L28.0995 4
    L45 27.4163
    L32.3756 41.2624
    L0 29.2489
    L15.2715 6.64706Z`,
  ];

  const len = list.length;
  const [attribute, setAttribute] = useState(list[0]);
  const loop = async (i=0) => {
    i = i % len;
    setAttribute(list[i]);
    await sleep(300);
    loop(i+1);
  }

  useEffect(() => {
    loop();
  }, []);

  const { className } = props;
  return (
    <svg className={cx("i-lump", className)} width="26" height="26" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={attribute} fill="#1E1F26" className="i-lump-path"/>
    </svg>

  );
}

export default Lump;