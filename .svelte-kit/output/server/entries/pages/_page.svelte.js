import { c as create_ssr_component, d as compute_rest_props, f as spread, h as escape_object, b as subscribe, i as createEventDispatcher, o as onDestroy, e as escape, v as validate_component, j as add_attribute, k as set_store_value, l as each } from "../../chunks/index.js";
import { fabric } from "fabric";
import { w as writable } from "../../chunks/index2.js";
var BlockState = /* @__PURE__ */ ((BlockState2) => {
  BlockState2[BlockState2["THAWED"] = 0] = "THAWED";
  BlockState2[BlockState2["FROZEN"] = 1] = "FROZEN";
  BlockState2[BlockState2["CONCEALED"] = 2] = "CONCEALED";
  BlockState2[BlockState2["DISCLOSED"] = 3] = "DISCLOSED";
  return BlockState2;
})(BlockState || {});
class Block {
  id = 0;
  parentId = 0;
  level = 1;
  frozen = false;
  concealed = false;
  coords = { x: 0, y: 0 };
  constructor(parentId, id) {
    this.parentId = parentId;
    this.id = id;
    this.level = id;
  }
  isGensis() {
    return this.id === 1;
  }
  freeze() {
    this.frozen = true;
  }
  thaw() {
    this.frozen = false;
  }
  conceal() {
    this.concealed = true;
  }
  disclose() {
    this.concealed = false;
  }
}
class Event {
  blockId = 0;
  parentId = 0;
  from = BlockState.READY;
  to = BlockState.READY;
  constructor(blockId, parentId, from, to) {
    this.parentId = parentId;
    this.blockId = blockId;
    this.from = from;
    this.to = to;
  }
}
let eventList = [];
function pushEvent(blockId, parentId, from, to) {
  eventList.push(new Event(blockId, parentId, from, to));
}
function popEvent() {
  if (eventList.length === 1)
    throw new Error("Nothing to undo");
  return eventList.pop();
}
function getEvents() {
  return eventList;
}
function clearEvents() {
  eventList = [];
}
const STORAGE_KEY = "block-store";
function saveState(blocks, events) {
  const blockStore2 = [
    {
      blocks,
      events,
      ts: new Date().getTime()
    }
  ];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blockStore2));
  return true;
}
let blockList = [];
function getLevel(parentId) {
  const parent = blockList.find((o) => o.id === parentId);
  return parent ? parent.level + 1 : 1;
}
function getBlocks() {
  return blockList;
}
function saveCurrentState() {
  saveState(blockList, getEvents());
}
function clearBlocks() {
  blockList = [];
  clearEvents();
}
function setBlocks(blocks) {
  blockList = blocks;
}
function undoLastOperation() {
  const event = popEvent();
  if (!event)
    throw new Error("State change error - last event not found");
  const index = blockList.findIndex((o) => o.id === event.blockId);
  if (event.from === event.to) {
    blockList.splice(index, 1);
  } else {
    if (event.from === BlockState.FROZEN)
      blockList[index].frozen = true;
    else if (event.from === BlockState.THAWED)
      blockList[index].frozen = false;
    else if (event.from === BlockState.CONCEALED)
      blockList[index].concealed = true;
    else if (event.from === BlockState.DISCLOSED)
      blockList[index].concealed = false;
  }
  return event.blockId;
}
function mineBlock(parentId) {
  const parent = blockList.find((b) => b.id === parentId);
  if (parent == null ? void 0 : parent.frozen) {
    throw new Error("Unable to mine - this block is frozen");
  } else {
    const b = new Block(parentId, blockList.length + 1);
    b.level = getLevel(parentId);
    blockList.push(b);
    setMinableBlocks();
    pushEvent(b.id, b.parentId, BlockState.THAWED, BlockState.THAWED);
    saveCurrentState();
    return b;
  }
}
function freezeBlock(id) {
  const block = blockList.find((b) => b.id === id);
  if (!block)
    throw new Error("State change error - block not found for id=" + id);
  if (block.frozen)
    throw new Error("State change error - block is already frozen");
  block.frozen = true;
  pushEvent(block.id, block.parentId, BlockState.THAWED, BlockState.FROZEN);
  saveCurrentState();
}
function thawBlock(id) {
  const block = blockList.find((b) => b.id === id);
  if (!block)
    throw new Error("State change error - block not found for id=" + id);
  if (!block.frozen)
    throw new Error("State change error - block is already thawed");
  block.frozen = false;
  pushEvent(block.id, block.parentId, BlockState.FROZEN, BlockState.THAWED);
  saveCurrentState();
}
function concealBlock(id) {
  const block = blockList.find((b) => b.id === id);
  if (!block)
    throw new Error("State change error - block not found for id=" + id);
  if (block.concealed)
    throw new Error("State change error - block is already concealed");
  block.concealed = true;
  pushEvent(block.id, block.parentId, BlockState.DISCLOSED, BlockState.CONCEALED);
  saveCurrentState();
}
function discloseBlock(id) {
  const block = blockList.find((b) => b.id === id);
  if (!block)
    throw new Error("State change error - block not found for id=" + id);
  if (!block.concealed)
    throw new Error("State change error - block is already disclosed");
  block.concealed = false;
  pushEvent(block.id, block.parentId, BlockState.CONCEALED, BlockState.DISCLOSED);
  saveCurrentState();
}
function setMinableBlocks() {
  const numb = blockList.length;
  blockList.forEach((b) => {
    if (!b.frozen && b.id > numb - 2)
      b.frozen = false;
    else
      b.frozen = true;
  });
}
window.mineBlock = mineBlock;
window.setMinableBlocks = setMinableBlocks;
window.setBlocks = setBlocks;
window.undoLastOperation = undoLastOperation;
window.clearBlocks = clearBlocks;
window.freezeBlock = freezeBlock;
window.thawBlock = thawBlock;
window.concealBlock = concealBlock;
window.discloseBlock = discloseBlock;
const ArrowRepeat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-arrow-repeat"
    }
  )}>${slots.default ? slots.default({}) : ``}<path d="${"M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"}"></path><path fill-rule="${"evenodd"}" d="${"M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"}"></path></svg>`;
});
const ArrowUpLeftCircleFill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-arrow-up-left-circle-fill"
    }
  )}>${slots.default ? slots.default({}) : ``}<path d="${"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-5.904 2.803a.5.5 0 1 0 .707-.707L6.707 6h2.768a.5.5 0 1 0 0-1H5.5a.5.5 0 0 0-.5.5v3.975a.5.5 0 0 0 1 0V6.707l4.096 4.096z"}"></path></svg>`;
});
const ArrowUpRightCircleFill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-arrow-up-right-circle-fill"
    }
  )}>${slots.default ? slots.default({}) : ``}<path d="${"M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707l-4.096 4.096z"}"></path></svg>`;
});
const CloudDownloadFill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-cloud-download-fill"
    }
  )}>${slots.default ? slots.default({}) : ``}<path fill-rule="${"evenodd"}" d="${"M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.5a.5.5 0 0 1 1 0V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0zm-.354 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V11h-1v3.293l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"}"></path></svg>`;
});
const Download = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-download"
    }
  )}>${slots.default ? slots.default({}) : ``}<path d="${"M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"}"></path><path d="${"M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"}"></path></svg>`;
});
const Grid3x2GapFill = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-grid-3x2-gap-fill"
    }
  )}>${slots.default ? slots.default({}) : ``}<path d="${"M1 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4zM1 9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9zm5 0a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V9z"}"></path></svg>`;
});
const ZoomIn = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { width: "16" },
      { height: "16" },
      { fill: "currentColor" },
      { viewBox: "0 0 16 16" },
      escape_object($$restProps)
    ],
    {
      classes: "bi bi-zoom-in"
    }
  )}>${slots.default ? slots.default({}) : ``}<path fill-rule="${"evenodd"}" d="${"M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"}"></path><path d="${"M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z"}"></path><path fill-rule="${"evenodd"}" d="${"M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z"}"></path></svg>`;
});
const lineColors = ["#154c79", "#d66d35", "#7C3626", "#Ee0d10", "#81fb3f", "#76b5c5", "#642425", "#B3F3A4", "#81fb3f", "#065996", "#E4CD08", "#08D5E4", "#065996", "#C885F3", "#FB3FD3", "#FB3F77", "#642425", "#642425", "#642425", "#642425"];
function getLineSegment(endX, endY, startX, startY, color, strokeWidth) {
  return new fabric.Line([endX, endY, startX, startY], {
    fill: "red",
    stroke: color,
    strokeWidth,
    selectable: false
  });
}
function makeLines(block, parent, blockDimensions) {
  const lines = [];
  const gap = blockDimensions.height / 10;
  let stroke = lineColors[block.parentId];
  if (!stroke)
    stroke = "#000";
  let startX = parent.coords.x + blockDimensions.width / 2;
  let startY = parent.coords.y + blockDimensions.width / 2;
  let endX = block.coords.x + blockDimensions.width / 2;
  let endY = block.coords.y + blockDimensions.width / 2;
  if (block.coords.x === parent.coords.x) {
    lines.push(getLineSegment(endX, endY, startX, startY, stroke, 2));
    return lines;
  }
  const rnd = 0;
  endX = startX;
  endY = startY + blockDimensions.width / 2 + gap * 2;
  if (parent.id % 2 === 0)
    endY += parent.id / 1.2;
  else
    endY -= parent.id / 1.2;
  lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));
  startX = endX;
  startY = endY;
  endY = startY;
  if (block.coords.x < parent.coords.x) {
    endX = block.coords.x + blockDimensions.width / 2;
  } else {
    endX = block.coords.x + blockDimensions.width / 2;
  }
  lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));
  startX = endX;
  startY = endY;
  endY = block.coords.y + blockDimensions.width / 2 + gap;
  lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));
  return lines;
}
function getCenterXBitcoinMode(gap, subList, block, width) {
  const parent = subList.find((o) => o.id === block.parentId);
  if (!parent)
    return 0;
  let siblings = subList.filter((o) => block.parentId === o.parentId).length;
  if (block.parentId === parent.id)
    siblings++;
  let x = 0;
  if (siblings === 0) {
    x = parent.coords.x + gap;
  } else if (block.parentId % 2 === 0) {
    x = parent.coords.x - (width + gap) / 2 * siblings;
  } else {
    x = parent.coords.x + (width + gap) / 2 * siblings;
  }
  return x;
}
function getCenterXStacksMode(gap, blocksAtLevel, subList, block, dimensions, blockDimensions) {
  const firstBlockAtLevel = subList.filter((o) => o.level === block.level)[0];
  const parent = subList.find((o) => o.id === block.parentId);
  const w = blockDimensions.width;
  let centerX = (dimensions.width - w) / 2;
  if (firstBlockAtLevel) {
    centerX = firstBlockAtLevel.coords.x;
  } else if (parent) {
    centerX = parent.coords.x;
  }
  let x;
  if (!blocksAtLevel) {
    x = centerX;
  } else if (blocksAtLevel % 2 === 0) {
    const blockRight = Math.floor(blocksAtLevel / 2);
    x = centerX + (w + gap) * blockRight;
  } else {
    let blockLeft = blocksAtLevel;
    if (blocksAtLevel === 3)
      blockLeft = blockLeft - 1;
    if (blocksAtLevel === 5)
      blockLeft = blockLeft - 2;
    if (blocksAtLevel === 7)
      blockLeft = blockLeft - 3;
    if (blocksAtLevel === 9)
      blockLeft = blockLeft - 4;
    if (blocksAtLevel === 11)
      blockLeft = blockLeft - 5;
    if (blocksAtLevel === 13)
      blockLeft = blockLeft - 6;
    if (blocksAtLevel === 15)
      blockLeft = blockLeft - 7;
    x = centerX - (w + gap) * blockLeft;
  }
  return x;
}
function getCenterY(blockList2, block, gap, height) {
  const parent = blockList2.find((o) => o.id === block.parentId);
  const y = parent ? parent.coords.y : 0;
  return y + height + gap;
}
function getCoordsStacks(blockList2, subList, block, dimensions, blockDimensions, gap) {
  const coords = { x: 0, y: 0 };
  coords.y = getCenterY(blockList2, block, gap, blockDimensions.height);
  const blocksAtLevel = subList.filter((o) => o.level === block.level).length;
  coords.x = getCenterXStacksMode(gap, blocksAtLevel, subList, block, dimensions, blockDimensions);
  return coords;
}
function getCoordsBitcoin(subList, block, blockDimensions, gap) {
  const coords = { x: 0, y: 0 };
  coords.x = getCenterXBitcoinMode(gap, subList, block, blockDimensions.width);
  const numbBlocks = subList.length - 1;
  coords.y = subList[numbBlocks].coords.y + blockDimensions.height + 5;
  return coords;
}
function calculateBlockCoords(userCoords, blockList2, blockMode, dimensions, blockDimensions) {
  const gap = blockDimensions.height / 2;
  for (let i = 0; i < blockList2.length; i++) {
    const block = blockList2[i];
    const uc = userCoords.find((u) => u.blockId === block.id);
    if (uc) {
      block.coords = uc.coords;
    } else {
      const sublist = blockList2.slice(0, i);
      if (block.id === 1) {
        block.coords = { x: (dimensions.width - blockDimensions.width) / 2, y: gap };
      } else if (blockMode === "stacks") {
        block.coords = getCoordsStacks(blockList2, sublist, block, dimensions, blockDimensions, gap);
      } else {
        block.coords = getCoordsBitcoin(sublist, block, blockDimensions, gap);
      }
    }
  }
  return blockList2;
}
function getTextProps(coords, color, fontSize) {
  return {
    left: coords.x - 5,
    top: coords.y - 10,
    strokeWidth: 1,
    stroke: "#fff",
    paintFirst: "stroke",
    fontFamily: "sans-serif",
    fill: color ? color : "#fff",
    fontSize
  };
}
function addRect(canv, id, coords, blockDimensions, fill, stroke) {
  const rect = new fabric.Rect({
    left: coords.x + 5,
    top: coords.y,
    width: blockDimensions.width,
    height: blockDimensions.height,
    fill,
    strokeWidth: 2,
    stroke
  });
  const text = new fabric.Text("" + id, getTextProps(rect.getCenterPoint(), stroke, 18));
  const group = new fabric.Group([rect, text], { lockMovementX: false, lockMovementY: false, selectable: true });
  group.hoverCursor = "pointer";
  canv.add(group);
  group.toObject = function() {
    return {
      id
    };
  };
  return group;
}
function addMenuItem(position, canv, parent, block) {
  const coords = {
    x: parent.aCoords.bl.x,
    y: parent.aCoords.bl.y - 4
  };
  let symbol = "H";
  if (position === 1) {
    coords.x = coords.x + 15;
  } else if (position === 2) {
    symbol = "F";
    if (block.frozen)
      symbol = "T";
    coords.x = coords.x + 35.5;
  } else if (position === 3) {
    symbol = "D";
    if (!block.concealed)
      symbol = "C";
    coords.x = coords.x + 55;
  } else if (position === 4) {
    symbol = "M";
    coords.x = coords.x + 75;
  }
  let stroke = "#fff";
  if (block.frozen || block.concealed)
    stroke = "#000";
  const rect = new fabric.Circle({
    radius: 7.5,
    left: coords.x - 11,
    top: coords.y - 15,
    width: 14,
    height: 14,
    fill: "transparent",
    strokeWidth: 1,
    stroke
  });
  const text = new fabric.Text(symbol, getTextProps({ x: coords.x - 2, y: coords.y - 2 }, stroke, 9));
  const group = new fabric.Group([rect, text], { lockMovementX: false, lockMovementY: true, selectable: false });
  group.hoverCursor = "crosshairs";
  canv.add(group);
  group.toObject = function() {
    return {
      id: block.id,
      menuItem: position
    };
  };
  return group;
}
function isFamily(blockList2, block, id) {
  if (block.id === id) {
    return true;
  }
  if (block.id > 1) {
    let parent = blockList2.find((o) => o.id === block.parentId);
    while (parent && parent.id > 0) {
      if ((parent == null ? void 0 : parent.id) === id)
        return true;
      parent = blockList2.find((o) => o.id === (parent == null ? void 0 : parent.parentId));
    }
  }
  const children = blockList2.filter((o) => o.parentId === block.id);
  if (children.filter((o) => o.id === id).length > 0) {
    return true;
  }
  let result = false;
  children.forEach((child) => {
    const children2 = blockList2.filter((o) => o.parentId === child.id);
    if (children2.filter((o) => o.id === id).length > 0) {
      result = true;
    } else {
      children2.forEach((child2) => {
        const children3 = blockList2.filter((o) => o.parentId === child2.id);
        if (children3.filter((o) => o.id === id).length > 0) {
          result = true;
        } else {
          children3.forEach((child3) => {
            const children4 = blockList2.filter((o) => o.parentId === child3.id);
            if (children4.filter((o) => o.id === id).length > 0) {
              result = true;
            } else {
              children4.forEach((child4) => {
                const children5 = blockList2.filter((o) => o.parentId === child4.id);
                if (children5.filter((o) => o.id === id).length > 0) {
                  result = true;
                } else {
                  children5.forEach((child5) => {
                    const children6 = blockList2.filter((o) => o.parentId === child5.id);
                    if (children6.filter((o) => o.id === id).length > 0) {
                      result = true;
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
  return result;
}
const blockStore = writable({
  opcode: "noop",
  blockId: 0
});
const Canvas_svelte_svelte_type_style_lang = "";
const css = {
  code: "canvas.svelte-1pcqt5z{border:1pt solid #bf6bd6;border-radius:15px}.block-mode.svelte-1pcqt5z{text-transform:capitalize}",
  map: null
};
const Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $blockStore, $$unsubscribe_blockStore;
  $$unsubscribe_blockStore = subscribe(blockStore, (value) => $blockStore = value);
  const dispatch = createEventDispatcher();
  let { blockMode } = $$props;
  let { blockDimensions = { width: 100, height: 100 } } = $$props;
  let { dimensions = {
    width: (window.innerWidth - 60) / 2,
    height: window.innerHeight + 800
  } } = $$props;
  let canvas;
  let canv;
  let moving = false;
  let userCoords = [];
  let localOp;
  blockStore.subscribe((value) => localOp = value);
  const pallette = {
    background: "#E0E0E0",
    familyFill: "#c64ae8",
    readyFill: "#7d6bd6",
    readyStroke: "#98d9ed",
    frozenFill: "#98d9ed",
    frozenStroke: "#98d9ed",
    concealedFill: "#fff",
    concealedStroke: "#000",
    darkStroke: "#000",
    lightStroke: "#fff"
  };
  onDestroy(() => {
  });
  const rerender = function(block) {
    try {
      canv.clear();
    } catch (err) {
      console.log("Err: " + err + " " + block);
    }
    const blocks = getBlocks();
    calculateBlockCoords(userCoords, getBlocks(), blockMode, dimensions, blockDimensions);
    blocks.forEach((b) => {
      const coords = b.coords;
      let fill = pallette.readyFill;
      let stroke = pallette.darkStroke;
      if (b.frozen) {
        fill = pallette.frozenFill;
        stroke = pallette.darkStroke;
      }
      if (b.concealed) {
        fill = pallette.concealedFill;
        stroke = pallette.darkStroke;
      }
      if (block && isFamily(getBlocks(), block, b.id)) {
        fill = pallette.familyFill;
        stroke = pallette.lightStroke;
      }
      const group = addRect(canv, b.id, coords, blockDimensions, fill, stroke);
      let menuGroup = addMenuItem(1, canv, group, b);
      menuGroup.on({ "mousedblclick": toggleHighlight });
      menuGroup.on({ "mousedown": highlightTree });
      menuGroup.on({ "mouseup": unhighlightTree });
      menuGroup = addMenuItem(2, canv, group, b);
      menuGroup.on({ "mouseup": toggleFrozen });
      menuGroup = addMenuItem(3, canv, group, b);
      menuGroup.on({ "mouseup": toggleConcealed });
      menuGroup = addMenuItem(4, canv, group, b);
      menuGroup.on({ "mouseup": addBlock });
      group.on({ "mousedown": mouseDown });
      group.on({ "mousemove": mouseMove });
      group.on({ "mouseup": mouseUp });
    });
    renderLines(blockDimensions);
  };
  let highlighted = false;
  const unhighlightTree = function(evt) {
    const id = evt.target.toObject().id;
    set_store_value(blockStore, $blockStore = { opcode: "unhighlightTree", blockId: id }, $blockStore);
    highlighted = false;
  };
  const highlightTree = function(evt) {
    const id = evt.target.toObject().id;
    set_store_value(blockStore, $blockStore = { opcode: "highlightTree", blockId: id }, $blockStore);
    highlighted = true;
  };
  const mouseUp = function(evt) {
    moving = false;
    rerender(null);
  };
  let startingPoint;
  const mouseDown = function(evt) {
    startingPoint = canv.getPointer();
    moving = true;
  };
  const mouseMove = function(evt) {
    if (!moving)
      return;
    const canvasCoords = {
      x: canv.getPointer().x,
      y: canv.getPointer().y
    };
    if (Math.abs(canvasCoords.x - startingPoint.x) < 20 && Math.abs(canvasCoords.y - startingPoint.y) < 20) {
      return;
    }
    canvasCoords.y = evt.target.aCoords.tl.y;
    const uc = userCoords.find((o) => o.blockId === evt.target.toObject().id);
    if (uc) {
      uc.coords = canvasCoords;
    } else {
      userCoords.push({
        blockId: evt.target.toObject().id,
        coords: canvasCoords
      });
    }
    rerender(null);
  };
  const toggleHighlight = function(evt) {
    if (highlighted)
      unhighlightTree(evt);
    else
      highlightTree(evt);
  };
  const renderLines = function(blockDimensions2) {
    const blocks = getBlocks();
    blocks.forEach((b) => {
      if (b.parentId > 0) {
        const p = blocks.find((o) => o.id === b.parentId);
        const lines = makeLines(b, p, blockDimensions2);
        lines.forEach((line) => {
          canv.add(line);
          canv.sendToBack(line);
        });
      }
    });
  };
  const toggleFrozen = function(evt) {
    const id = evt.target.toObject().id;
    const block = getBlocks().find((o) => o.id === id);
    dispatch("doUpdateCanvas", { blockMode, opcode: "toggleFrozen", block });
  };
  const toggleConcealed = function(evt) {
    const id = evt.target.toObject().id;
    const block = getBlocks().find((o) => o.id === id);
    dispatch("doUpdateCanvas", {
      blockMode,
      opcode: "toggleConcealed",
      block
    });
  };
  const addBlock = function(evt) {
    try {
      moving = false;
      const block = mineBlock(evt.target.toObject().id);
      set_store_value(blockStore, $blockStore = { opcode: "addBlock", blockId: block.id }, $blockStore);
      dispatch("doUpdateCanvas", {
        blockMode,
        opcode: "addBlock",
        canv,
        block
      });
    } catch (e) {
      dispatch("doUpdateCanvas", { blockMode, opcode: "stateChangeError", e });
      console.log(e);
    }
  };
  if ($$props.blockMode === void 0 && $$bindings.blockMode && blockMode !== void 0)
    $$bindings.blockMode(blockMode);
  if ($$props.blockDimensions === void 0 && $$bindings.blockDimensions && blockDimensions !== void 0)
    $$bindings.blockDimensions(blockDimensions);
  if ($$props.dimensions === void 0 && $$bindings.dimensions && dimensions !== void 0)
    $$bindings.dimensions(dimensions);
  $$result.css.add(css);
  {
    {
      try {
        if (localOp.opcode === "highlightTree") {
          const block = getBlocks().find((o) => o.id === localOp.blockId);
          rerender(block);
        } else if (localOp.opcode === "loadSavedState" || localOp.opcode === "newState" || localOp.opcode === "unhighlightTree" || localOp.opcode === "addBlock") {
          rerender(null);
        } else if (localOp.opcode === "resetLayout") {
          userCoords = [];
          rerender(null);
        } else if (localOp.opcode === "undo" || localOp.opcode === "redo") {
          canv.clear();
          rerender(null);
          canv.renderAll();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  $$unsubscribe_blockStore();
  return `<div class="${"d-flex justify-content-between py-1"}"><div><span class="${"block-mode svelte-1pcqt5z"}">Mode: ${escape(blockMode)}</span></div>
  <div class="${"px-5"}"><span class="${""}"><a href="${"/"}">${validate_component(Download, "Download").$$render($$result, { width: 20, height: 20 }, {}, {})}</a></span></div></div>
<div><canvas width="${"400"}" height="${"400"}" class="${"svelte-1pcqt5z"}"${add_attribute("this", canvas, 0)}></canvas>
</div>`;
});
const Route_home = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_blockStore;
  $$unsubscribe_blockStore = subscribe(blockStore, (value) => value);
  let displays = 2;
  let errorMessage;
  const startWidth = (window.innerWidth - 60) / displays;
  const startHeight = window.innerHeight + 800;
  let dimensions = { width: startWidth, height: startHeight };
  let blockDimensions = { width: 80, height: 80 };
  const redraw = () => {
    errorMessage = void 0;
  };
  window.redraw = redraw;
  onDestroy(() => saveCurrentState());
  $$unsubscribe_blockStore();
  return `<nav class="${"navbar navbar-expand-lg navbar-light bg-light"}" style="${"width: 100%;"}"><div class="${"container"}"><a class="${"navbar-brand"}" href="${"/"}"><img width="${"50px"}" src="${"/img/logo.png"}" alt="${"stacks ecosystem dao logo"}"></a>
    <button class="${"navbar-toggler"}" type="${"button"}" data-toggle="${"collapse"}" data-target="${"#navbarSupportedContent"}" aria-controls="${"navbarSupportedContent"}" aria-expanded="${"false"}" aria-label="${"Toggle navigation"}"><span class="${"navbar-toggler-icon"}"></span></button>
  
    <div class="${"collapse navbar-collapse"}" id="${"navbarSupportedContent"}"><ul class="${"navbar-nav mr-auto"}"><li class="${"nav-item active"}"><a title="${"Download json"}" class="${"nav-link"}" href="${"/"}">${validate_component(CloudDownloadFill, "CloudDownloadFill").$$render($$result, { width: 20, height: 20 }, {}, {})}</a></li>
        <li class="${"nav-item"}"><a title="${"Undo last operation"}" class="${"nav-link"}" href="${"/"}">${validate_component(ArrowUpLeftCircleFill, "ArrowUpLeftCircleFill").$$render($$result, { width: 20, height: 20 }, {}, {})}</a></li>
        <li class="${"nav-item"}"><a title="${"Redo last operation"}" class="${"nav-link"}" href="${"/"}">${validate_component(ArrowUpRightCircleFill, "ArrowUpRightCircleFill").$$render($$result, { width: 20, height: 20 }, {}, {})}</a></li>
        
        <li class="${"nav-item dropdown"}"><a title="${"Change layout"}" class="${"nav-link dropdown-toggle"}" href="${"/"}" id="${"navbarDropdown"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-haspopup="${"true"}" aria-expanded="${"false"}">${validate_component(ArrowRepeat, "ArrowRepeat").$$render($$result, { width: 20, height: 20 }, {}, {})}</a>
          <div class="${"dropdown-menu"}" aria-labelledby="${"navbarDropdown"}">
            <a class="${"dropdown-item"}" href="${"/"}">Reset to Genesis</a></div></li>
        <li class="${"nav-item dropdown"}"><a title="${"Change layout"}" class="${"nav-link dropdown-toggle"}" href="${"/"}" id="${"navbarDropdown"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-haspopup="${"true"}" aria-expanded="${"false"}">${validate_component(Grid3x2GapFill, "Grid3x2GapFill").$$render($$result, { width: 20, height: 20 }, {}, {})}</a>
          <div class="${"dropdown-menu"}" aria-labelledby="${"navbarDropdown"}"><a class="${"dropdown-item"}" href="${"/"}">Dual</a>
            <a class="${"dropdown-item"}" href="${"/"}">Stacks</a>
            <a class="${"dropdown-item"}" href="${"/"}">Bitcoin</a></div></li>
        <li class="${"nav-item dropdown"}"><a title="${"Zoom in/out"}" class="${"nav-link dropdown-toggle"}" href="${"/"}" id="${"navbarDropdown"}" role="${"button"}" data-bs-toggle="${"dropdown"}" aria-haspopup="${"true"}" aria-expanded="${"false"}">${validate_component(ZoomIn, "ZoomIn").$$render($$result, { width: 20, height: 20 }, {}, {})}</a>
            <div class="${"dropdown-menu"}" aria-labelledby="${"navbarDropdown"}"><a class="${"dropdown-item"}" href="${"/"}">60%</a>
              <a class="${"dropdown-item"}" href="${"/"}">80%</a>
              <a class="${"dropdown-item"}" href="${"/"}">100%</a>
              <a class="${"dropdown-item"}" href="${"/"}">120%</a>
              <a class="${"dropdown-item"}" href="${"/"}">140%</a></div></li></ul>
    </div></div></nav>

<div class="${""}"><div class="${"mx-2 d-flex justify-content-around text-danger"}" style="${"height: 30px;"}">${errorMessage ? `${escape(errorMessage)}` : ``}</div>

<div id="${"frame"}" class="${"d-flex justify-content-start"}">${`<div class="${"mx-2"}">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      blockMode: "stacks",
      dimensions,
      blockDimensions
    },
    {},
    {}
  )}</div>`}
    ${`<div class="${"mx-2"}">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      blockMode: "bitcoin",
      dimensions,
      blockDimensions
    },
    {},
    {}
  )}</div>`}</div>

<div class="${"row"}"><div class="${"col-6"}"><h2>Blocks</h2>
    ${each(getBlocks(), (block) => {
    return `<div>id: ${escape(block.id)}, parent: ${escape(block.parentId)}, level: ${escape(block.level)}, coords: ${escape(block.coords.x + ", " + block.coords.y)}</div>`;
  })}</div>
  <div class="${"col-6"}"><h2>Events</h2>
    ${each(getEvents(), (event) => {
    return `<div>id: ${escape(event.blockId)}, parent: ${escape(event.parentId)}, from: ${escape(event.from)}, to: ${escape(event.to)}</div>`;
  })}</div></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Route_home, "RouteHome").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
