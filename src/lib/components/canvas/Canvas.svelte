<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fabric } from "fabric";
  import { Download } from "svelte-bootstrap-icons";
  import { createEventDispatcher } from "svelte";
  import { isFamily, createBlock, getBlocks, calculateBlockCoords } from '$lib/blocks'
  import { makeLines, addRect, scaleCanvas, addMenu } from '$lib/drawing'
  import type { DimensionsType } from "../../blocks";
  import type { BlockType } from "../../models/Block";
  import { BlockState } from "$lib/models/Block";
  import { blockStore } from '$lib/stores.js';

  const dispatch = createEventDispatcher();

  const pallette = {
      background: '#E0E0E0',
      familyFill: '#c64ae8',
      readyFill: '#7d6bd6',
      readyStroke: '#98d9ed',
      frozenFill: '#98d9ed',
      frozenStroke: '#98d9ed',
      concealedFill: '#fff',
      concealedStroke: '#fff',
    }
    
    export let blockMode:string;
    export let blockDimensions:DimensionsType = { width: 100, height: 100 };
    export let dimensions = {
      width: (window.innerWidth - 60) / 2,
      height: (window.innerHeight - 200)
    };
    let canvas: HTMLCanvasElement;
    let canv: any;

    onDestroy(() => {
      if (canv) canv.dispose();
    })

    const render = function (block:BlockType|null) {
      const blocks = getBlocks();
      canv.clear();
      canv.backgroundColor = pallette.background;
      calculateBlockCoords(blockMode, dimensions, blockDimensions);
      // todo addMenu(canv); - possible in canvas but tricky discuss with Igor.
      blocks.forEach((b) => {
        const coords = b.coords;
        
        let fill = pallette.readyFill;
        let stroke = pallette.readyStroke;
        if (b.state === BlockState.FROZEN) {
          fill = pallette.frozenFill;
          stroke = pallette.frozenStroke;
        } else if (b.state === BlockState.CONCEALED) fill = pallette.concealedFill;
        if (block && isFamily(block, b.id)) fill = pallette.familyFill;
        const group = addRect(canv, b.id, coords, blockDimensions, fill, stroke);
        const menuGroup = addMenu(canv, group, b.id);
        menuGroup.on({'mouseup' : activateMenu});
        group.on({'mouseup' : addBlock});
        group.on({'mouseover' : highlightTree});
        group.on({'mouseout' : unhighlightTree});
      });
      renderLines(blockDimensions);
      canv.renderAll();
    };

    const renderLines = function (blockDimensions:DimensionsType) {
      const blocks = getBlocks();
      blocks.forEach((b) => {
        if (b.parentId > 0) {
          const p = blocks.find((o) => o.id === b.parentId);
          const lines = makeLines(b, p, blockDimensions);
          lines.forEach(line => {
            canv.add(line);
            canv.sendToBack(line);
          })
        }
      })
    };

    const unhighlightTree = function (evt: any) {
      render(null);
      blockStore.update(async () => null);
      dispatch("doUpdateCanvas", { blockMode, opcode: 'unhighlightTree', canv });
    };

    const highlightTree = function (evt: any) {
      const id = evt.target.toObject().id;
      const block = getBlocks().find((o) => o.id === id);
      blockStore.update(b => block);
      render(block);
      dispatch("doUpdateCanvas", { blockMode, opcode: 'highlightTree', canv });
    };

    const activateMenu = function (evt: any) {
      const id = evt.target.toObject().id;
      const block = getBlocks().find((o) => o.id === id);
      // render(block);
      dispatch("doUpdateCanvas", { blockMode, opcode: 'activateMenu', block });
    };

    const addBlock = function (evt: any) {
      try {
        const block = createBlock(evt.target.toObject().id);
        const dims = scaleCanvas(document, canv, dimensions, getBlocks().length)
        render(null);
        dispatch("doUpdateCanvas", { blockMode, opcode: 'addBlock', canv, dimensions: dims, block });
      } catch (e) {
        dispatch("doUpdateCanvas", { blockMode, opcode: 'stateChangeError', e });
        console.log(e);
      }
    };

    const handleGenesis = function () {
      const block = createBlock(0);
      render(null);
      // doUpdateCanvas('handleGenesis');
      dispatch("doUpdateCanvas", { blockMode, opcode: 'addBlock', canv, dimensions, block });
    };

    const mountCanvas = async function () {
      canv = new fabric.Canvas(canvas, {
        backgroundColor: 'cyan',
        preserveObjectStacking: true
      });
      canv.setDimensions({width: dimensions.width, height: dimensions.height})
      const blocks = getBlocks();
      if (blocks.length > 0) {
        render(null)
      } else {
        handleGenesis();
      }
    };

    onMount(async () => {
      await mountCanvas();
      blockStore.subscribe((block) => {
        if (getBlocks().length > 1) {
          if (block && block.id) {
            render(block);
          } else {
            render(null)
          }
        }
      });
    });
</script>

<div class="d-flex justify-content-between py-1">
  <div><span class="block-mode">Mode: {blockMode}</span></div>
  <div class=" px-5">
    <span class=""><a href="/" on:click|preventDefault={() => dispatch("doUpdateCanvas", { blockMode, opcode: 'downloadCanvas', canv })}><Download width={20} height={20}/></a></span>
  </div>
</div>
<div>
  <canvas bind:this={canvas} width="400" height="400"/>
</div>

<style>
  canvas {
    border: 1pt solid #bf6bd6;
    border-radius: 15px;
  }
  .block-mode {
    text-transform: capitalize;
  }
</style>