import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonStringNodeProps = typeof __propDef.props;
export declare type JsonStringNodeEvents = typeof __propDef.events;
export declare type JsonStringNodeSlots = typeof __propDef.slots;
export default class JsonStringNode extends SvelteComponentTyped<JsonStringNodeProps, JsonStringNodeEvents, JsonStringNodeSlots> {
}
export {};
