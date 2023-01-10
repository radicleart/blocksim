import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: Map<unknown, unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonIterableMapNodeProps = typeof __propDef.props;
export declare type JsonIterableMapNodeEvents = typeof __propDef.events;
export declare type JsonIterableMapNodeSlots = typeof __propDef.slots;
export default class JsonIterableMapNode extends SvelteComponentTyped<JsonIterableMapNodeProps, JsonIterableMapNodeEvents, JsonIterableMapNodeSlots> {
}
export {};
