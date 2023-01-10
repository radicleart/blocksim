import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        expanded?: import("svelte/store").Writable<boolean>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonArrowProps = typeof __propDef.props;
export declare type JsonArrowEvents = typeof __propDef.events;
export declare type JsonArrowSlots = typeof __propDef.slots;
export default class JsonArrow extends SvelteComponentTyped<JsonArrowProps, JsonArrowEvents, JsonArrowSlots> {
}
export {};
