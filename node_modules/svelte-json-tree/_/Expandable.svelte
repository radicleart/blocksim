<script >import { writable } from 'svelte/store';
import { useState } from './utils/context';
export let expanded;
export let key;
const expandable = writable(false);
useState(({ keyPath, level }) => {
    if (key !== '[[Entries]]') {
        keyPath = [...keyPath, key];
        level = level + 1;
    }
    return {
        keyPath,
        level,
        expanded,
        expandable,
    };
});
</script>

<slot />
