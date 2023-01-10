import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        keys: string[];
        shouldShowColon?: (key: string) => boolean;
        expandKey?: (key: string) => string;
        defaultExpanded?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        summary: {};
        preview: {};
        item_key: {
            key: string;
            index: any;
        };
        item_value: {
            key: string;
            index: any;
        };
    };
};
export declare type JsonNestedProps = typeof __propDef.props;
export declare type JsonNestedEvents = typeof __propDef.events;
export declare type JsonNestedSlots = typeof __propDef.slots;
export default class JsonNested extends SvelteComponentTyped<JsonNestedProps, JsonNestedEvents, JsonNestedSlots> {
}
export {};
