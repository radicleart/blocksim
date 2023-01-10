import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: unknown;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonNodeProps = typeof __propDef.props;
export declare type JsonNodeEvents = typeof __propDef.events;
export declare type JsonNodeSlots = typeof __propDef.slots;
export default class JsonNode extends SvelteComponentTyped<JsonNodeProps, JsonNodeEvents, JsonNodeSlots> {
}
export {};
