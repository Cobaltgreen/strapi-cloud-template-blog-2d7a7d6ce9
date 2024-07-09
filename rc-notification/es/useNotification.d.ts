import * as React from 'react';
import type { Placement } from './Notifications';
import type { OpenConfig } from './Notifications';
import type { CSSMotionProps } from 'rc-motion';
type OptionalConfig = Partial<OpenConfig>;
export interface NotificationConfig {
    prefixCls?: string;
    /** Customize container. It will repeat call which means you should return same container element. */
    getContainer?: () => HTMLElement | ShadowRoot;
    motion?: CSSMotionProps | ((placement: Placement) => CSSMotionProps);
    closeIcon?: React.ReactNode;
    closable?: boolean;
    maxCount?: number;
    duration?: number;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    className?: (placement: Placement) => string;
    /** @private. Config for notification holder style. Safe to remove if refactor */
    style?: (placement: Placement) => React.CSSProperties;
    /** @private Trigger when all the notification closed. */
    onAllRemoved?: VoidFunction;
}
export interface NotificationAPI {
    open: (config: OptionalConfig) => void;
    close: (key: React.Key) => void;
    destroy: () => void;
}
export default function useNotification(rootConfig?: NotificationConfig): [NotificationAPI, React.ReactElement];
export {};