/// <reference types="react" />
import type { ColumnsType, ColumnType, Direction, ExpandableType, ExpandedRowRender, GetComponent, RenderExpandIcon, RowClassName, TableLayout, TriggerEventHandler } from '../interface';
import type { FixedInfo } from '../utils/fixUtil';
export interface TableContextProps<RecordType = any> {
    prefixCls: string;
    getComponent: GetComponent;
    scrollbarSize: number;
    direction: Direction;
    fixedInfoList: readonly FixedInfo[];
    isSticky: boolean;
    supportSticky: boolean;
    componentWidth: number;
    fixHeader: boolean;
    fixColumn: boolean;
    horizonScroll: boolean;
    rowClassName: string | RowClassName<RecordType>;
    expandedRowClassName: RowClassName<RecordType>;
    tableLayout: TableLayout;
    indentSize: number;
    expandableType: ExpandableType;
    expandRowByClick: boolean;
    expandedRowRender: ExpandedRowRender<RecordType>;
    expandIcon: RenderExpandIcon<RecordType>;
    onTriggerExpand: TriggerEventHandler<RecordType>;
    expandIconColumnIndex: number;
    allColumnsFixedLeft: boolean;
    columns: ColumnsType<RecordType>;
    flattenColumns: readonly ColumnType<RecordType>[];
    onColumnResize: (columnKey: React.Key, width: number) => void;
    hoverStartRow: number;
    hoverEndRow: number;
    onHover: (start: number, end: number) => void;
}
declare const TableContext: import("@rc-component/context").SelectorContext<TableContextProps<any>>;
export default TableContext;