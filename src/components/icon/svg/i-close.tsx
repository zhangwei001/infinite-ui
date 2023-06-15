import React from 'react'

let defaultFill = "#858b9c";

export const IconClose = (props: { closeType?: string }) => {
  const { closeType } = props;

  if (typeof (closeType) == 'string'
  ) {
    switch (closeType) {
      case 'default':
        defaultFill = '#1E71FF';
        break;
      case 'warning':
        defaultFill = "#BA5300";
        break;
      case 'error':
        defaultFill = "#D20B0B";
        break;
      case 'success':
        defaultFill = "#018434";
        break;
      default:
        break;
    }
  }

  return (
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L19 19" stroke={defaultFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 1L1 19" stroke={defaultFill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}