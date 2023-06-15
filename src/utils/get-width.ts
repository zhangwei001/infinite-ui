import { RefObject } from "react";

export function getWidth(ref: RefObject<HTMLDivElement>) {
    const ele = ref.current
    if (!ele) return 0
    return ele.offsetWidth
}