import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonFunctionNodeProps = typeof __propDef.props;
export declare type JsonFunctionNodeEvents = typeof __propDef.events;
export declare type JsonFunctionNodeSlots = typeof __propDef.slots;
export default class JsonFunctionNode extends SvelteComponentTyped<JsonFunctionNodeProps, JsonFunctionNodeEvents, JsonFunctionNodeSlots> {
}
export {};
