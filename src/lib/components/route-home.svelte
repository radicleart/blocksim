<script lang="ts">
import { getBlocks, undoBlock, clearBlocks, setBlocks } from '../blocks';
import { saveState, getLastState } from '../blockStorage';
import Canvas from './canvas/Canvas.svelte';
import { ArrowRepeat, ArrowUpLeftCircleFill, FileBarGraphFill } from "svelte-bootstrap-icons";
import { onDestroy } from 'svelte';

let displayMode = 'stacks';
let displays = 1;
let componentKey = 0;
let componentKey2 = 0;

let dimensions = {
    width: (window.innerWidth - 60) / displays,
    height: (window.innerHeight - 200)
};
let blockSize:number = 100;
let blockDimensions = { width: 100, height: 100 };

const updateBlockSize = (value) => {
    blockSize = value;
    //const scaleRatio = Math.min(dimensions.width/blockSize, dimensions.height/blockSize);
    blockDimensions = { width: (100 * blockSize) / 100, height: (100 * blockSize) / 100 };
    //dimensions = { width: dimensions.width * scaleRatio, height: dimensions.height * scaleRatio };
    componentKey++;
}

const undoLastBlock = () => {
    undoBlock();
    saveState(getBlocks());
    componentKey++;
    componentKey2++;
}

const updateDisplayMode = (value) => {
    displayMode = value;
    displays = 1;
    if (displayMode !== 'both') {
        displays = 2;
        dimensions = {
            width: (window.innerWidth - 60),
            height: (window.innerHeight - 200)
        }
    } else {
        dimensions.width = (window.innerWidth - 60) / 2;
    }
    componentKey++;
    componentKey2++;
}

const restart = () => {
  saveState(getBlocks());
  clearBlocks();
  componentKey++;
  componentKey2++;
}
const loadJson = () => {
  const blocks = getLastState();
  if (blocks) setBlocks(blocks);
  componentKey++;
  componentKey2++;
}

const update = (e) => {
    saveState(getBlocks());
    const data = e.detail;
    if (data.opcode === 'download') download(data.canv);
    else {
        componentKey2++;
    }
}

const download = (canv) => {
    // const canv = e.detail.canv;
    let rawDataUrl = canv.toDataURL({
        format: 'png',
        quality: 0.8
    })
    const link = document.createElement('a');
    link.download = 'Block Simulation.png';
    link.href = rawDataUrl;
    link.target = '_blank'
    link.click();
}

$: blocks = getBlocks();

onDestroy(() => saveState(getBlocks()));

</script>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" href="/">
        <img width="50px" src="/img/logo.png" alt="stacks ecosystem dao logo" />
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
  
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a title="load state" class="nav-link" href="/" on:click|preventDefault={loadJson}><FileBarGraphFill width={20} height={20}/></a>
        </li>
        <li class="nav-item active">
          <a title="Clear and restart" class="nav-link" href="/" on:click|preventDefault={restart}><ArrowRepeat width={20} height={20}/></a>
        </li>
        <li class="nav-item">
          <a title="Undo last block" class="nav-link" href="/" on:click|preventDefault={undoLastBlock}><ArrowUpLeftCircleFill width={20} height={20}/></a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Layout
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('both') }}">Dual</a>
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('stacks') }}">Stacks</a>
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('bitcoin') }}">Bitcoin</a>
          </div>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Zoom
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(20) }}">20%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(40) }}">40%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(60) }}">60%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(60) }}">60%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(80) }}">80%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(100) }}">100%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(120) }}">120%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(140) }}">140%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(160) }}">160%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(180) }}">180%</a>
            </div>
        </li>
    </ul>
    <!--
    <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
      -->
    </div>
  </div>
</nav>
<div class="container">
{#key componentKey}
<div class="d-flex justify-content-around">
    {#if displayMode === 'both' || displayMode === 'stacks'}
    <div>
        <Canvas on:update={update} blockMode={'stacks'} {dimensions} {blockDimensions}/>
    </div>
    {/if}
    {#if displayMode === 'both' || displayMode === 'bitcoin'}
    <div>
        <Canvas on:update={update} blockMode={'bitcoin'} {dimensions} {blockDimensions}/>
    </div>
    {/if}
</div>
{/key}
{#key componentKey2}
<div class="mx-5">
    {#each blocks as block}
    <div>id: {block.id}, parent: {block.parentId}, level: {block.level}, coords: {block.coords.x + ', ' + block.coords.y}</div>
    {/each}
</div>
{/key}
</div>