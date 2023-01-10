import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: Record<string, unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonObjectNodeProps = typeof __propDef.props;
export declare type JsonObjectNodeEvents = typeof __propDef.events;
export declare type JsonObjectNodeSlots = typeof __propDef.slots;
export default class JsonObjectNode extends SvelteComponentTyped<JsonObjectNodeProps, JsonObjectNodeEvents, JsonObjectNodeSlots> {
}
export {};
