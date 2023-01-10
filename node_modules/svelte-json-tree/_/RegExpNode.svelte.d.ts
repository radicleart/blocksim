import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        value: RegExp;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export declare type RegExpNodeProps = typeof __propDef.props;
export declare type RegExpNodeEvents = typeof __propDef.events;
export declare type RegExpNodeSlots = typeof __propDef.slots;
export default class RegExpNode extends SvelteComponentTyped<RegExpNodeProps, RegExpNodeEvents, RegExpNodeSlots> {
}
export {};
