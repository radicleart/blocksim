import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        stack: string[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type ErrorStackProps = typeof __propDef.props;
export declare type ErrorStackEvents = typeof __propDef.events;
export declare type ErrorStackSlots = typeof __propDef.slots;
export default class ErrorStack extends SvelteComponentTyped<ErrorStackProps, ErrorStackEvents, ErrorStackSlots> {
}
export {};
