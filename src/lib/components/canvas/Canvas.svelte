<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { fabric } from "fabric";
  import { Download } from "svelte-bootstrap-icons";
  import { createEventDispatcher } from "svelte";
  import { isFamily, createBlock, getBlocks, calculateBlockCoords } from '$lib/blocks'
  import { makeLines, addRect, addMenu } from '$lib/drawing'
  import type { DimensionsType } from "../../blocks";
  import type { BlockType } from "../../models/Block";
  import { BlockState } from "$lib/models/Block";
  import { blockStore } from '$lib/stores.js';

  const dispatch = createEventDispatcher();

  let localOp: { opcode:string, blockId:number };
  blockStore.subscribe((value: { opcode:string, blockId:number }) => localOp = value);

  $: {
    try {
      if (localOp.opcode === 'highlightTree') {
        //console.log('highlightTree: ' + $blockStore.blockId + ', ' + blockMode + ', $blockStore=', $blockStore);
        const block = getBlocks().find((o) => o.id === localOp.blockId);
        rerender(block);
      } else if (localOp.opcode === 'newState' || localOp.opcode === 'unhighlightTree' || localOp.opcode === 'addBlock') {
        rerender(null);
      } else if (localOp.opcode === 'undo') {
        canv.clear()
        rerender(null);
        canv.renderAll();
      }
    } catch(err) {
      console.log(err);
    }
	}
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

    const unhighlightTree = function (evt: any) {
      //const id = evt.target.toObject().id;
      //console.log('unhighlightTree: ' + id + ', ' + blockMode + ', $blockStore=', $blockStore);
      $blockStore = { opcode: 'unhighlightTree', blockId: 0 };
    };

    const highlightTree = function (evt: any) {
      const id = evt.target.toObject().id;
      $blockStore = { opcode: 'highlightTree', blockId: id };
    };

    /**
    const render = function (block:BlockType|null) {
      const blocks = getBlocks();
      canv.clear();
      canv.backgroundColor = pallette.background;
      calculateBlockCoords(blockMode, dimensions, blockDimensions);
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
        group.on({'mouseout': unhighlightTree});
        group.on({'mousemove': highlightTree});
        group.on({'mouseup': addBlock});
        const menuGroup = addMenu(canv, group, b.id);
        menuGroup.on({'mouseup' : activateMenu});
      });
      renderLines(blockDimensions);
      canv.renderAll();
    };
    */

    const rerender = function (block:BlockType|null) {
      const blocks = getBlocks();
      calculateBlockCoords(blockMode, dimensions, blockDimensions);
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
        group.on({'mouseout': unhighlightTree});
        group.on({'mousemove': highlightTree});
        group.on({'mouseup': addBlock});
        const menuGroup = addMenu(canv, group, b.id);
        menuGroup.on({'mouseup' : activateMenu});
      });
      renderLines(blockDimensions);
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

    const activateMenu = function (evt: any) {
      const id = evt.target.toObject().id;
      const block = getBlocks().find((o) => o.id === id);
      dispatch("doUpdateCanvas", { blockMode, opcode: 'activateMenu', block });
    };

    const addBlock = function (evt: any) {
      try {
        const block = createBlock(evt.target.toObject().id);
        //render(null);
        $blockStore = { opcode: 'addBlock', blockId: block.id };
        dispatch("doUpdateCanvas", { blockMode, opcode: 'addBlock', canv, block });
      } catch (e) {
        dispatch("doUpdateCanvas", { blockMode, opcode: 'stateChangeError', e });
        console.log(e);
      }
    };

    const handleGenesis = function () {
      const block = createBlock(0);
      $blockStore = { opcode: 'addBlock', blockId: block.id };
      //render(null);
      // doUpdateCanvas('handleGenesis');
      dispatch("doUpdateCanvas", { blockMode, opcode: 'addBlock', canv, dimensions, block });
    };

    const mountCanvas = async function () {
      canv = new fabric.Canvas(canvas, {
        //backgroundColor: 'cyan',
        preserveObjectStacking: true
      });
      canv.setDimensions({width: dimensions.width, height: dimensions.height})
      const blocks = getBlocks();
      if (blocks.length > 0) {
        rerender(null);
      } else {
        handleGenesis();
      }
    };

    onMount(async () => {
      await mountCanvas();
      /**
      blockStore.subscribe((block) => {
        console.log('onMount: ' + block + ', ' + blockMode + ', $blockStore=', $blockStore);
        if ($blockStore.id) {
          if (block && block.id) {
            render(block);
          } else {
            render(null)
          }
        }
      });
      */
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