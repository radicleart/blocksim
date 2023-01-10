import { getContext, setContext } from 'svelte';
const STATE = {};
export function useState(newState, opts) {
    const currentState = getContext(STATE);
    const _newState = typeof newState === 'function' ? newState(currentState) : newState;
    const nextState = { ...currentState, ..._newState };
    if (opts?.expandable)
        nextState.isParentExpanded = nextState.expanded;
    setContext(STATE, nextState);
    return currentState;
}
