<script lang="ts">
import { getBlocks, undoBlock, clearBlocks } from '../blocks';
import { popEvent, getEvents, pushEvent, clearEvents } from '../events';
import { saveState } from '../blockStorage';
import Canvas from './canvas/Canvas.svelte';
import BlockMenu from './BlockMenu.svelte';
import { ArrowsFullscreen, CloudDownloadFill, ZoomIn, Grid3x2GapFill, ArrowRepeat, ArrowUpLeftCircleFill, FileBarGraphFill } from "svelte-bootstrap-icons";
import { onDestroy } from 'svelte';
import type { BlockType } from "$lib/models/Block";
import { BlockState } from '$lib/models/Block'

let displayMode = 'both';
let displays = 2;
let componentKey = 0;
let componentKey2 = 0;
let componentKey3 = 0;
let targetBlock:BlockType;
let errorMessage: string|undefined;

let dimensions = {
    width: (window.innerWidth - 60) / displays,
    height: (window.innerHeight - 200)
};

let blockSize:number = 80;
let blockDimensions = { width: 80, height: 80 };

/**
 * Event handler for canvas rendering
 * @param e
 */
const handleUpdateCanvas = (e: { detail: any; }) => {
  const data = e.detail;
  switch(data.opcode) {
    case 'downloadCanvas':
      downloadCanvas(data.canv);
      break;
    case 'expandCanvas':
      expandCanvas();
      break;
    case 'activateMenu':
      targetBlock = data.block;
      componentKey3++;
      break;
    case 'addBlock':
      errorMessage = undefined;
      targetBlock = data.block;
      pushEvent(data.block.id, data.block.parentId, BlockState.READY, BlockState.READY);
      dimensions = data.dimensions;
      componentKey3++;
      componentKey2++;
      componentKey++;
      break;
    case 'freeze':
      registerNewState(data.block, BlockState.FROZEN);
      break;
    case 'thaw':
      registerNewState(data.block, BlockState.READY);
      break;
    case 'conceal':
      registerNewState(data.block, BlockState.CONCEALED);
      break;
    case 'disclose':
      registerNewState(data.block, BlockState.READY);
      break;
    case 'stateChangeError':
        errorMessage = data.e
    default:
      saveState(getBlocks(), getEvents());
  }
}

const registerNewState = (block:BlockType, newState:BlockState) => {
  try {
    errorMessage = undefined;
    const startState = block.state;
    block.changeState(newState);
    pushEvent(block.id, block.parentId, startState, newState);
    componentKey3++;
    componentKey2++;
    componentKey++;
  } catch(err:any) {
    errorMessage = err;
  }
}

const updateBlockSize = (value:number) => {
  blockSize = value;
  //const scaleRatio = Math.min(dimensions.width/blockSize, dimensions.height/blockSize);
  blockDimensions = { width: (80 * blockSize) / 100, height: (80 * blockSize) / 100 };
  //dimensions = { width: dimensions.width * scaleRatio, height: dimensions.height * scaleRatio };
  componentKey++;
}

const expandCanvas = () => {
  dimensions.width = dimensions.width * 1.5;
  dimensions.height = dimensions.height * 2.5;
  componentKey++;
  componentKey2++;
  componentKey3++;
}

const undoLastBlock = () => {
  const event = popEvent();
  undoBlock(event);
  saveState(getBlocks(), getEvents());
  componentKey++;
  componentKey2++;
  componentKey3++;
}

const updateDisplayMode = (value:string) => {
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
    componentKey3++;
}

const restart = () => {
  dimensions = {
    width: (window.innerWidth - 60) / displays,
    height: (window.innerHeight - 200)
  };
  saveState(getBlocks(), getEvents());
  clearBlocks();
  clearEvents();
  componentKey++;
  componentKey2++;
  componentKey3++;
}

const download = (filename:string, data:any) => {
    // const canv = e.detail.canv;
    const link = document.createElement('a');
    link.download = filename;
    link.href = data;
    link.target = '_blank'
    link.click();
    //document.body.removeChild(link);
}
const downloadCanvas = (canv:any) => {
  let rawDataUrl = canv.toDataURL({
        format: 'png',
        quality: 0.8
    })
    download('Block Simulation.png', rawDataUrl);
}

const downloadJson = () => {
	// get zip file from endpoint
  let objJsonStr = "data:json," + JSON.stringify(getBlocks());
  //let objJsonB64 = base64.encode(utf8.encode(JSON.stringify(getBlocks())));
  //let objJsonB64 = Buffer.from(objJsonStr).toString("base64");
  download('Block Simulation.json', objJsonStr);

	// convert zip file to url object (for anchor tag download)
	//let blob = await res.blob();
	//var url = window.URL || window.webkitURL;
	//let link = url.createObjectURL(blob);
}

onDestroy(() => saveState(getBlocks(), getEvents()));

</script>
{#key componentKey3}
<nav class="navbar navbar-expand-lg navbar-light bg-light" style="width: 100%;">
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
          <a title="Download json" class="nav-link" href="/" on:click|preventDefault={downloadJson}><CloudDownloadFill width={20} height={20}/></a>
        </li>
        <li class="nav-item active">
          <a title="Clear and restart" class="nav-link" href="/" on:click|preventDefault={restart}><ArrowRepeat width={20} height={20}/></a>
        </li>
        <li class="nav-item">
          <a title="Undo last operation" class="nav-link" href="/" on:click|preventDefault={undoLastBlock}><ArrowUpLeftCircleFill width={20} height={20}/></a>
        </li>
        <li class="nav-item">
          <a title="Expand canvas" class="nav-link" href="/" on:click|preventDefault={expandCanvas}><ArrowsFullscreen width={20} height={20}/></a>
        </li>
        <li class="nav-item dropdown">
          <a title="Change layout" class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <Grid3x2GapFill width={20} height={20} />
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('both') }}">Dual</a>
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('stacks') }}">Stacks</a>
            <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateDisplayMode('bitcoin') }}">Bitcoin</a>
          </div>
        </li>
        <li class="nav-item dropdown">
            <a title="Zoom in/out" class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <ZoomIn width={20} height={20} />
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(20) }}">20%</a>
              <a class="dropdown-item" href="/" on:click|preventDefault="{() => {updateBlockSize(40) }}">40%</a>
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
<div class="mx-2 d-flex justify-content-around">
  <BlockMenu block={targetBlock} on:doUpdateState={handleUpdateCanvas}/>
</div>
{/key}

<div class="">

<div class="mx-2 d-flex justify-content-around text-danger" style="height: 30px;">
  {#if errorMessage}  {errorMessage} {/if}
</div>

{#key componentKey}
<div id="frame" class="d-flex justify-content-start">
    {#if displayMode === 'both' || displayMode === 'stacks'}
    <div class="mx-2">
      <Canvas on:doUpdateCanvas={handleUpdateCanvas} blockMode={'stacks'} {dimensions} {blockDimensions}/>
    </div>
    {/if}
    {#if displayMode === 'both' || displayMode === 'bitcoin'}
    <div class="mx-2">
        <Canvas on:doUpdateCanvas={handleUpdateCanvas} blockMode={'bitcoin'} {dimensions} {blockDimensions}/>
    </div>
    {/if}
</div>
{/key}
{#key componentKey2}
<div class="row">
  <div class="col-6">
    <h2>Blocks</h2>
    {#each getBlocks() as block}
    <div>id: {block.id}, parent: {block.parentId}, level: {block.level}, coords: {block.coords.x + ', ' + block.coords.y}</div>
    {/each}
  </div>
  <div class="col-6">
    <h2>Events</h2>
    {#each getEvents() as event}
    <div>id: {event.blockId}, parent: {event.parentId}, from: { event.from }, to: { event.to }</div>
    {/each}
  </div>
</div>
{/key}
</div>