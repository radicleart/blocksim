import { Block } from './models/Block.ts'
import type { BlockType } from './models/Block.ts'
import type { EventType } from './models/Event.ts'
import { BlockState } from './models/Block.ts'

let blockList:BlockType[]  = [];

export type DimensionsType = {
	width: number,
	height: number
};

export enum BlockModes {
	Bitcoin = 1,
	Stacks,
}

// private functions
function getLevel(parentId:number) {
	const parent = blockList.find((o) => o.id === parentId);
	return (parent) ? parent.level + 1 : 1;
}

/**
 * Where to place the block on next row depends on the position of the parent,
 * whether its the first for this parent and whether any other parents
 * already have a block on this row - in this case the center is taken as the
 * x position of the first parent to have had a block on this row.
 * @param block 
 * @param dimensions 
 * @param blockDimensions 
 * @returns 
 */
 function getCenterXStacksMode(gap:number, blocksAtLevel:number, subList:BlockType[], block:BlockType, dimensions:DimensionsType, blockDimensions:DimensionsType) {
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
		// numb block to right of center
		const blockRight = Math.floor((blocksAtLevel) / 2)
		x = centerX + ((w + gap) * blockRight);
	} else {
		let blockLeft = blocksAtLevel;
		//if ((blocksAtLevel % 2 > 0) && blockLeft > 2) blockLeft = blockLeft - (blocksAtLevel / 2);
		/**
		 */
		if (blocksAtLevel === 3) blockLeft = blockLeft - 1;
		if (blocksAtLevel === 5) blockLeft = blockLeft - 2;
		if (blocksAtLevel === 7) blockLeft = blockLeft - 3;
		if (blocksAtLevel === 9) blockLeft = blockLeft - 4;
		if (blocksAtLevel === 11) blockLeft = blockLeft - 5;
		if (blocksAtLevel === 13) blockLeft = blockLeft - 6;
		if (blocksAtLevel === 15) blockLeft = blockLeft - 7;
		x = centerX - ((w + gap) * blockLeft);
	}
	return x;
}

/**
 * Where to place the block on next row depends on the position of the parent,
 * whether its the first for this parent and whether any other parents
 * already have a block on this row - in this case the center is taken as the
 * x position of the first parent to have had a block on this row.
 * @param block 
 * @param dimensions 
 * @param blockDimensions 
 * @returns 
 */
 function getCenterXBitcoinMode(gap:number, subList:BlockType[], block:BlockType, width:number) {
	const parent = subList.find((o) => o.id === block.parentId);
	if (!parent) return 0; // the root node has already been handled.
	let siblings = subList.filter((o) => block.parentId === o.parentId).length;
	if (block.parentId === parent.id) siblings++;
	let x = 0;
	if (siblings === 0) {
		x = parent.coords.x + gap;
	} else if (siblings % 2 === 0) {
		x = parent.coords.x - ((width + gap) / 2) * siblings;
	} else  {
		x = parent.coords.x + ((width + gap) / 2) * siblings;
	}
	return x;
}

function getCenterY(block:BlockType, gap:number, height:number) {
	const parent = blockList.find((o) => o.id === block.parentId);
	const y = (parent) ? parent.coords.y : 0;
	return y + height + gap;
}

function getCoordsStacks(subList:BlockType[], block:BlockType, dimensions:DimensionsType, blockDimensions:DimensionsType, gap:number) {
	const coords = { x: 0, y: 0 };
	coords.y = getCenterY(block, gap, blockDimensions.height);
	const blocksAtLevel = subList.filter((o) => o.level === block.level).length;
	coords.x = getCenterXStacksMode(gap, blocksAtLevel, subList, block, dimensions, blockDimensions);
	// if none add below parent else add even to right and odd to left
	return coords;
}

function getCoordsBitcoin(subList:BlockType[], block:BlockType, blockDimensions:DimensionsType, gap:number) {
	const coords = { x: 0, y: 0 };
	coords.x = getCenterXBitcoinMode(gap, subList, block, blockDimensions.width);
	const numbBlocks = subList.length - 1;
	coords.y =  subList[numbBlocks].coords.y + blockDimensions.height + 5; // - (gap * 0.2);
	return coords
}

// public functions
export function getBlocks() {
	return blockList;
}

export function calculateBlockCoords(blockMode:string, dimensions:DimensionsType, blockDimensions:DimensionsType) {
	const gap = blockDimensions.height / 2;
	for (let i = 0; i < blockList.length; i++) {
		const block = blockList[i];
		const sublist = blockList.slice(0, i);
		if (block.id === 1) {
			block.coords = { x: (dimensions.width - blockDimensions.width) / 2, y: gap }
		} else if (blockMode === 'stacks') {
			block.coords = getCoordsStacks(sublist, block, dimensions, blockDimensions, gap);
		} else {
			block.coords = getCoordsBitcoin(sublist, block, blockDimensions, gap);
		}
	}
	return blockList;
}

export function clearBlocks() {
	blockList = [];
}

export function isFamily(block:BlockType, id:number) {
	if (block.id === id) {
		return true;
	}
	// check ancestors
	if (block.id > 1) {
		let parent = blockList.find((o) => o.id === block.parentId);
		while (parent && parent.id > 0) {
			if (parent?.id === id) return true;
			parent = blockList.find((o) => o.id === parent?.parentId);
		}
	}
	// check descendent
	const children = blockList.filter((o) => o.parentId === block.id);
	if (children.filter((o) => o.id === id).length > 0) {
		return true;
	}
	let result = false;
	children.forEach((child) => {
		const children = blockList.filter((o) => o.parentId === child.id);
		if (children.filter((o) => o.id === id).length > 0) {
			result = true;
		} else {
			children.forEach((child) => {
				const children = blockList.filter((o) => o.parentId === child.id);
				if (children.filter((o) => o.id === id).length > 0) {
					result = true;
				} else {
					children.forEach((child) => {
						const children = blockList.filter((o) => o.parentId === child.id);
						if (children.filter((o) => o.id === id).length > 0) {
							result = true;							
						} else {
							children.forEach((child) => {
								const children = blockList.filter((o) => o.parentId === child.id);
								if (children.filter((o) => o.id === id).length > 0) {
									result = true;							
								} else {
									children.forEach((child) => {
										const children = blockList.filter((o) => o.parentId === child.id);
										if (children.filter((o) => o.id === id).length > 0) {
											result = true;							
										}
									})
								}
							})
						}
					})
				}
			})
		}
	})
	return result;
}

export function setBlocks(blocks:BlockType[]) {
	blockList = blocks;
}

export function undoBlock(event:EventType) {
	const index = blockList.findIndex((o) => o.id === event.blockId);
	if (event.from === event.to) {
		return blockList.splice(index, 1);
	} else {
		return blockList[index].state = event.from;
	}
}

export function createBlock(parentId:number) {
	const parent = blockList.find((b) => b.id === parentId);
	if (parent?.state === BlockState.FROZEN) {
		throw new Error('Unable to mine - this block is frozen');
	} else {
		const b = new Block(parentId, blockList.length + 1, BlockState.READY);
		b.level = getLevel(parentId);
		blockList.push(b);
		return b;
	}
}

