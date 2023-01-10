import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        list: Array<unknown> | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | BigInt64Array | BigUint64Array;
        hasMore: boolean;
        label?: string;
        prefix?: string;
        postfix?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        item: {
            item: unknown;
            index: any;
        };
    };
};
export declare type PreviewListProps = typeof __propDef.props;
export declare type PreviewListEvents = typeof __propDef.events;
export declare type PreviewListSlots = typeof __propDef.slots;
export default class PreviewList extends SvelteComponentTyped<PreviewListProps, PreviewListEvents, PreviewListSlots> {
}
export {};
