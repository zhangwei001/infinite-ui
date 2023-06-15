// deal with different types of picker 
import { PickerType,PickerValue } from "./types"

const getMonthEndDay = (year: number, month: number): number =>
    32 - new Date(year, month - 1, 32).getDate();


function times<T>(n: number, iteratee: (index: number) => T) {
    let index = -1;
    try{
        const result: T[] = Array(n);
        while (++index < n) {
            result[index] = iteratee(index);
        }
        return result;
    }catch(error) {
        console.log(error)
    }
    return []
}

function padZero(num: number | string, targetLength = 2): string {
    let str = num + '';

    while (str.length < targetLength) {
        str = '0' + str;
    }

    return str;
}

function formatValue(type: PickerType, value?: any, columnsOrder?: Array<string>) {
    let dateStr = ''
    if (type == 'date' || type == 'datetime') {
        const yearIndex = columnsOrder ? columnsOrder.indexOf('year') : 0;
        const monthIndex = columnsOrder ? columnsOrder.indexOf('month') : 1;
        dateStr = value[yearIndex] + '-' + value[monthIndex] + '-' + '01';
    }
    const dateData = new Date(dateStr);
    return dateData
}

export function formatData(type: PickerType, minDate: Date, maxDate: Date, currSelected?: PickerValue[], columnsOrder?: Array<string>, localeMonths?: Array<string>) {
    const currentDate = formatValue(type, currSelected, columnsOrder);

    const getBoundary = (boundaryType: 'max' | 'min', value: Date) => {

        let boundary = minDate;
        if (boundaryType === 'max') {
            boundary = maxDate;
        }
        const year = boundary.getFullYear();
        let month = 1;
        let date = 1;
        let hour = 0;
        let minute = 0;

        if (boundaryType === 'max') {
            month = 12;
            date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1);
            hour = 23;
            minute = 59;
        }

        if (value.getFullYear() === year) {
            month = boundary.getMonth() + 1;
            if (value.getMonth() + 1 === month) {
                date = boundary.getDate();
                if (value.getDate() === date) {
                    hour = boundary.getHours();
                    if (value.getHours() === hour) {
                        minute = boundary.getMinutes();
                    }
                }
            }
        }

        return {
            [`${boundaryType}Year`]: year,
            [`${boundaryType}Month`]: month,
            [`${boundaryType}FormatDate`]: date,
            [`${boundaryType}Hour`]: hour,
            [`${boundaryType}Minute`]: minute,
        };
    };

    const ranges = () => {
        const { maxYear, maxFormatDate, maxMonth, maxHour, maxMinute } = getBoundary(
            'max',
            currentDate || minDate
        );

        const { minYear, minFormatDate, minMonth, minHour, minMinute } = getBoundary(
            'min',
            currentDate || minDate
        );

        let result: Array<{ type: string; range: number[] }> = [
            {
                type: 'year',
                range: [minYear, maxYear],
            },
            {
                type: 'month',
                range: [minMonth, maxMonth],
            },
            {
                type: 'day',
                range: [minFormatDate, maxFormatDate],
            },
            {
                type: 'hour',
                range: [minHour, maxHour],
            },
            {
                type: 'minute',
                range: [minMinute, maxMinute],
            },
        ];
        switch (type) {
            case 'date':
                result = result.slice(0, 3);
                break;
            case 'year-month':
                result = result.slice(0, 2);
                break;
            case 'month-day':
                result = result.slice(1, 3);
                break;
            case 'datehour':
                result = result.slice(0, 4);
                break;
        }
        if (columnsOrder) {
            const columnsOrderFormat = columnsOrder.concat(
              result.map((column) => column.type)
            );
            result.sort(
              (a, b) => columnsOrderFormat.indexOf(a.type) - columnsOrderFormat.indexOf(b.type)
            );
          }

        return result;
    };

    const rangesData = ranges();

    const originColumns = () =>
        rangesData.map(({ type: rangeType, range: rangeArr }) => {
            const values = times(rangeArr[1] - rangeArr[0] + 1, (index) =>
                padZero(rangeArr[0] + index)
            );

            return {
                type: rangeType,
                values,
            };
        });

    const originData = originColumns();
    let formatDataArr = [];

    formatDataArr = originData.map((originItem) => {
        const formatItem = originItem.values.map((itemVal) => {
            const formatedItem = {
                label: originItem.type === 'month' ? (localeMonths?.[+itemVal - 1] || itemVal) : itemVal,
                value: itemVal
            }
            return formatedItem
        })
        return formatItem
    })
    return formatDataArr;
}