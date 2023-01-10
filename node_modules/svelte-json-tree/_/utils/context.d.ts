import type { Readable, Writable } from 'svelte/store';
export declare type State = {
    isParentExpanded: Readable<boolean>;
    expanded: Writable<boolean>;
    expandable: Writable<boolean>;
    displayMode: 'summary' | undefined;
    root: boolean;
    shouldExpandNode: (opts: {
        keyPath: string[];
        level: number;
    }) => boolean;
    keyPath: string[];
    level: number;
};
export declare function useState(newState?: Partial<State> | ((state: State) => Partial<State>), opts?: {
    expandable?: boolean;
}): State;
