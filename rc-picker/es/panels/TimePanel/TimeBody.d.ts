import * as React from 'react';
import type { SharedTimeProps } from '.';
import type { GenerateConfig } from '../../generate';
import type { CellRender, Locale, OnSelect } from '../../interface';
export declare type BodyOperationRef = {
    onUpDown: (diff: number) => void;
};
export declare type TimeBodyProps<DateType> = {
    prefixCls: string;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: DateType | null;
    onSelect: OnSelect<DateType>;
    activeColumnIndex: number;
    operationRef: React.MutableRefObject<BodyOperationRef | undefined>;
    cellRender?: CellRender<DateType, number>;
} & SharedTimeProps<DateType>;
declare function TimeBody<DateType>(props: TimeBodyProps<DateType>): React.JSX.Element;
export default TimeBody;