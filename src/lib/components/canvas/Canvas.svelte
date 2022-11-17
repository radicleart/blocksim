<script lang="ts">
    import { onMount, onDestroy, tick } from "svelte";
    import { fabric } from "fabric";
    import { Download } from "svelte-bootstrap-icons";
    import { createEventDispatcher } from "svelte";
    import { createBlock, getBlocks, calculateBlockCoords } from '$lib/blocks'
    import { makeLines, getTextProps, addRect } from '$lib/drawing'
	  import type { DimensionsType } from "../../blocks";

    const dispatch = createEventDispatcher();
    
    export let blockMode:string;
    export let blockDimensions:DimensionsType = { width: 100, height: 100 };
    export let dimensions = {
      width: (window.innerWidth - 60) / 2,
      height: (window.innerHeight - 200)
    };
    let canvas: HTMLCanvasElement;
    let canv;
    let text; 

    onDestroy(() => {
      if (canv) canv.dispose();
    })

    const download = () => {
      dispatch("update", { opcode: 'download', canv });
    }

    const saveBlockState = () => {
      dispatch("update", { opcode: 'saveBlockState', canv });
    }

    const render = function () {
      calculateBlockCoords(blockMode, dimensions, blockDimensions);
      const blocks = getBlocks();
      canv.clear();
      blocks.forEach((b) => {
        const coords = b.coords;
        const group = addRect(canv, b.id, coords, blockDimensions);
        group.on({'mouseup' : addBlock});
      })
      renderLines(blockDimensions);
      canv.renderAll();
    };

    const renderLines = function (blockDimensions) {
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

    const addBlock = function (evt) {
      const block = evt.target.toObject();
      createBlock(block.id);
      canv.clear();
      render();
      saveBlockState();
    };

    const handleGenesis = function (evt) {
      canv.clear();
      createBlock(0);
      render();
      saveBlockState();
    };

    const mountCanvas = async function () {
      canv = new fabric.Canvas(canvas, {
        preserveObjectStacking: true
      });
      canv.setDimensions({width: dimensions.width, height: dimensions.height})
      const blocks = getBlocks();
      if (blocks.length > 0) {
        render()
      } else {
        text = new fabric.Text('Click here to load genesis block..', getTextProps({ x: 20, y: 20 }, '#000'));
        if (blockMode === 'stacks') {
          canv.add(text).renderAll();
        }
        text.on({'mouseup' : handleGenesis});
      }
    };

    onMount(async () => {
      await mountCanvas();
    });
</script>

<div class="d-flex justify-content-between py-1">
  <div><span class="block-mode">Mode: {blockMode}</span></div>
  <div class=" px-5">
    <span class=""><a href="/" on:click|preventDefault={download}><Download width={20} height={20}/></a></span>
  </div>
</div>
<canvas bind:this={canvas} width="400" height="400" style={'width: 400px; height: 400px; border-radius: 25px;'}/>

<style>
  canvas {
    border: 1pt solid #ccc;
  }
  .block-mode {
    text-transform: capitalize;
  }
</style>