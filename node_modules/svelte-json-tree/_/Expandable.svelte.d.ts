import { SvelteComponentTyped } from "svelte";
import { type Writable } from 'svelte/store';
declare const __propDef: {
    props: {
        expanded: Writable<boolean>;
        key: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export declare type ExpandableProps = typeof __propDef.props;
export declare type ExpandableEvents = typeof __propDef.events;
export declare type ExpandableSlots = typeof __propDef.slots;
export default class Expandable extends SvelteComponentTyped<ExpandableProps, ExpandableEvents, ExpandableSlots> {
}
export {};
