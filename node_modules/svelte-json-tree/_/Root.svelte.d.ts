import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: unknown;
        defaultExpandedPaths?: string[];
        defaultExpandedLevel?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type RootProps = typeof __propDef.props;
export declare type RootEvents = typeof __propDef.events;
export declare type RootSlots = typeof __propDef.slots;
export default class Root extends SvelteComponentTyped<RootProps, RootEvents, RootSlots> {
}
export {};
