import type { State } from './context';
export declare function getShouldExpandNode({ defaultExpandedPaths, defaultExpandedLevel, }: {
    defaultExpandedPaths: string[];
    defaultExpandedLevel: number;
}): State['shouldExpandNode'];
