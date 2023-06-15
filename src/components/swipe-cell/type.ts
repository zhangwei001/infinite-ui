import React from "react";

export type Action = {
    key: string
    icon?: React.ReactElement
    text?: string
    bgColor?: string
    onClick?: (event:any) => void
}