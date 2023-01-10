import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: Iterable<unknown>;
        nodeType: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonIterableArrayNodeProps = typeof __propDef.props;
export declare type JsonIterableArrayNodeEvents = typeof __propDef.events;
export declare type JsonIterableArrayNodeSlots = typeof __propDef.slots;
export default class JsonIterableArrayNode extends SvelteComponentTyped<JsonIterableArrayNodeProps, JsonIterableArrayNodeEvents, JsonIterableArrayNodeSlots> {
}
export {};
