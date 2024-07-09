import type { DialogProps as IDialogPropTypes } from 'rc-dialog';
import React from 'react';
export interface PreviewProps extends Omit<IDialogPropTypes, 'onClose'> {
    onClose?: (e: React.SyntheticEvent<Element>) => void;
    src?: string;
    alt?: string;
    rootClassName?: string;
    icons?: {
        rotateLeft?: React.ReactNode;
        rotateRight?: React.ReactNode;
        zoomIn?: React.ReactNode;
        zoomOut?: React.ReactNode;
        close?: React.ReactNode;
        left?: React.ReactNode;
        right?: React.ReactNode;
        flipX?: React.ReactNode;
        flipY?: React.ReactNode;
    };
    countRender?: (current: number, total: number) => string;
    scaleStep?: number;
}
declare const Preview: React.FC<PreviewProps>;
export default Preview;