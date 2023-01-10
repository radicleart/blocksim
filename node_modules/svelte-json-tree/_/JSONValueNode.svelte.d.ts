import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: unknown;
        nodeType: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonValueNodeProps = typeof __propDef.props;
export declare type JsonValueNodeEvents = typeof __propDef.events;
export declare type JsonValueNodeSlots = typeof __propDef.slots;
export default class JsonValueNode extends SvelteComponentTyped<JsonValueNodeProps, JsonValueNodeEvents, JsonValueNodeSlots> {
}
export {};
