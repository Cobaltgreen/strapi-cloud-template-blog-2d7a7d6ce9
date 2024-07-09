import * as React from 'react';
import { TreeContextProps } from './contextTypes';
import { TreeNodeProps } from './interface';
export type { TreeNodeProps } from './interface';
export interface InternalTreeNodeProps extends TreeNodeProps {
    context?: TreeContextProps;
}
export interface TreeNodeState {
    dragNodeHighlight: boolean;
}
declare class InternalTreeNode extends React.Component<InternalTreeNodeProps, TreeNodeState> {
    state: {
        dragNodeHighlight: boolean;
    };
    selectHandle: HTMLSpanElement;
    componentDidMount(): void;
    componentDidUpdate(): void;
    onSelectorClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onSelectorDoubleClick: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onSelect: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onCheck: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onMouseEnter: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onMouseLeave: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onContextMenu: (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
    onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onExpand: React.MouseEventHandler<HTMLDivElement>;
    setSelectHandle: (node: any) => void;
    getNodeState: () => "close" | "open";
    hasChildren: () => boolean;
    isLeaf: () => boolean;
    isDisabled: () => boolean;
    isCheckable: () => string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode>;
    syncLoadData: (props: any) => void;
    isSelectable(): boolean;
    isDraggable: () => boolean;
    renderDragHandler: () => React.JSX.Element;
    renderSwitcherIconDom: (isLeaf: boolean) => React.ReactNode;
    renderSwitcher: () => React.JSX.Element;
    renderCheckbox: () => React.JSX.Element;
    renderIcon: () => React.JSX.Element;
    renderSelector: () => React.JSX.Element;
    renderDropIndicator: () => React.ReactNode;
    render(): React.JSX.Element;
}
declare const ContextTreeNode: React.FC<TreeNodeProps>;
export { InternalTreeNode };
export default ContextTreeNode;