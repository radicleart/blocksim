import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: Error;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ErrorNodeProps = typeof __propDef.props;
export declare type ErrorNodeEvents = typeof __propDef.events;
export declare type ErrorNodeSlots = typeof __propDef.slots;
export default class ErrorNode extends SvelteComponentTyped<ErrorNodeProps, ErrorNodeEvents, ErrorNodeSlots> {
}
export {};
