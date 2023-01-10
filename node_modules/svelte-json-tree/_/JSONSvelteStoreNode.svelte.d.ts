import { SvelteComponentTyped } from "svelte";
import type { Writable, Readable } from 'svelte/store';
declare const __propDef: {
    props: {
        value: Writable<unknown> | Readable<unknown>;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type JsonSvelteStoreNodeProps = typeof __propDef.props;
export declare type JsonSvelteStoreNodeEvents = typeof __propDef.events;
export declare type JsonSvelteStoreNodeSlots = typeof __propDef.slots;
export default class JsonSvelteStoreNode extends SvelteComponentTyped<JsonSvelteStoreNodeProps, JsonSvelteStoreNodeEvents, JsonSvelteStoreNodeSlots> {
}
export {};
