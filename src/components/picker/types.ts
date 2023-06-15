import { ReactNode } from 'react'

export type PickerValue = string | null

export type PickerColumnItem = {
    label: ReactNode
    value: string
}

export type PickerColumn = (PickerColumnItem | string)[]

export type PickerColumnType =
  | 'year'
  | 'month'
  | 'day';


export type PickerType =
  | 'datetime'
  | 'date'
  | 'time'
  | 'year-month'
  | 'month-day'
  | 'datehour';


