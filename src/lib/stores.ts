import { writable } from 'svelte/store';

export const blockStore = writable({
    opcode: 'noop',
    blockId: 0
});