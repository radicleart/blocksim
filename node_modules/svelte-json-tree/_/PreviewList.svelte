<script >export let list;
export let hasMore;
export let label = undefined;
export let prefix = undefined;
export let postfix = undefined;
</script>

{#if prefix}{#if label}<span class="label">{label}</span>{/if}<span class="operator">{prefix}</span>{/if}
{#each list as item, index}
  <slot name="item" {item} {index} />
  {#if index < list.length - 1}
    <span class="comma operator">,</span>
  {/if}
{/each}
{#if hasMore}
  <span class="comma operator">,</span>
  <span class="operator">…</span>
{/if}
{#if postfix}<span class="operator">{postfix}</span>{/if}

<style>
  .comma {
    margin-left: -0.5em;
    margin-right: 0.5em;
  }
</style>
