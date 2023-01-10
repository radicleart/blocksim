import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {};
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type SummaryProps = typeof __propDef.props;
export declare type SummaryEvents = typeof __propDef.events;
export declare type SummarySlots = typeof __propDef.slots;
export default class Summary extends SvelteComponentTyped<SummaryProps, SummaryEvents, SummarySlots> {
}
export {};
