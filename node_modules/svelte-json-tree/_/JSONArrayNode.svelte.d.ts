import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: Array<unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonArrayNodeProps = typeof __propDef.props;
export declare type JsonArrayNodeEvents = typeof __propDef.events;
export declare type JsonArrayNodeSlots = typeof __propDef.slots;
export default class JsonArrayNode extends SvelteComponentTyped<JsonArrayNodeProps, JsonArrayNodeEvents, JsonArrayNodeSlots> {
}
export {};
