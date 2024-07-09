import * as React from 'react';
import type { PanelSharedProps, PanelMode, CellRender } from '../../interface';
export declare type YearPanelProps<DateType> = {
    sourceMode: PanelMode;
    cellRender?: CellRender<DateType>;
} & PanelSharedProps<DateType>;
export declare const YEAR_DECADE_COUNT = 10;
declare function YearPanel<DateType>(props: YearPanelProps<DateType>): React.JSX.Element;
export default YearPanel;