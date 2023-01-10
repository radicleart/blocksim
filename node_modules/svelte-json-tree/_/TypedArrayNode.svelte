<script >import JSONNested from './JSONNested.svelte';
import JSONNode from './JSONNode.svelte';
import PreviewList from './PreviewList.svelte';
export let value;
export let nodeType;
const TO_STRING_TAG = 'Symbol(Symbol.toStringTag)';
const internalKeys = ['buffer', 'byteLength', 'byteOffset', 'length', TO_STRING_TAG];
$: keys = [...Object.getOwnPropertyNames(value), ...internalKeys];
$: preview = value.slice(0, 5);
function getValue(key) {
    if (key === TO_STRING_TAG) {
        return value[Symbol.toStringTag];
    }
    return value[key];
}
</script>

<JSONNested {keys}>
  <svelte:fragment slot="summary"><span class="label">{nodeType}({value.length})</span></svelte:fragment>
  <svelte:fragment slot="preview">
    <PreviewList list={preview} hasMore={preview.length < value.length} label="{nodeType}({value.length}) " prefix="[" postfix="]">
      <svelte:fragment slot="item" let:item>
        <JSONNode value={item} />
      </svelte:fragment>
    </PreviewList>
  </svelte:fragment>
  <svelte:fragment slot="item_key" let:key
    ><span class={internalKeys.includes(key) ? 'internal' : 'property'}>{String(key)}</span></svelte:fragment
  >
  <svelte:fragment slot="item_value" let:key><JSONNode value={getValue(key)} /></svelte:fragment>
</JSONNested>
