import * as React from 'react';
import type { CellRender, Locale } from '../../interface';
export declare type Unit = {
    label: React.ReactText;
    value: number;
    disabled: boolean;
};
export declare type TimeUnitColumnProps<DateType> = {
    prefixCls?: string;
    units?: Unit[];
    value?: number;
    active?: boolean;
    hideDisabledOptions?: boolean;
    onSelect?: (value: number) => void;
    type: 'hour' | 'minute' | 'second' | 'meridiem';
    info: {
        today: DateType;
        locale: Locale;
        cellRender: CellRender<DateType, number>;
    };
};
declare function TimeUnitColumn<DateType>(props: TimeUnitColumnProps<DateType>): React.JSX.Element;
export default TimeUnitColumn;
