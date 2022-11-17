import { Block } from './models/Block.ts'
import type { BlockType } from './models/Block.ts'

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
 * whether its the first fr this parent and whether any other parents
 * already have a block on this row - in this case the center is taken as the
 * x position of the first parent to have had a block on this row.
 * @param block 
 * @param dimensions 
 * @param blockDimensions 
 * @returns 
 */
function getCenterX(subList:BlockType[], block:BlockType, dimensions:DimensionsType, blockDimensions:DimensionsType) {
	const firstBlockAtLevel = subList.filter((o) => o.level === block.level)[0];
	const parent = subList.find((o) => o.id === block.parentId);
	const w = blockDimensions.width;
	let centerX = (dimensions.width - w) / 2;
	if (firstBlockAtLevel) {
		centerX = firstBlockAtLevel.coords.x;
	} else if (parent) {
		centerX = parent.coords.x;
	}
	return centerX;
}

function getCoords(subList:BlockType[], block:BlockType, blockMode:string, dimensions:DimensionsType, blockDimensions:DimensionsType) {
	const gap = blockDimensions.height / 10;
	const w = blockDimensions.width;
	const h = blockDimensions.height;
	if (block.id === 1) {
		return {
			x: (dimensions.width - w) / 2,
			y: gap
		}
	}
	const coords = { x: 0, y: 0 };
	const level = block.level;
	coords.y = 20 + ((20 + blockDimensions.height) * (level - 1));
	if (blockMode === 'stacks') {
		const blocksAtLevel = subList.filter((o) => o.level === block.level).length;
		const centerX = getCenterX(subList, block, dimensions, blockDimensions);
		// if none add below parent else add even to right and odd to left
		if (!blocksAtLevel) {
			coords.x = centerX;
		} else if (blocksAtLevel % 2 === 0) {
			// numb block to right of center
			const blockRight = Math.floor((blocksAtLevel) / 2)
			coords.x = centerX + ((w + gap) * blockRight);
		} else {
			let blockLeft = blocksAtLevel;
			if (blocksAtLevel === 3) blockLeft--;
			if (blocksAtLevel === 5) blockLeft = blockLeft - 2;
			if (blocksAtLevel === 7) blockLeft = blockLeft - 3;
			if (blocksAtLevel === 9) blockLeft = blockLeft - 4;
			if (blocksAtLevel === 11) blockLeft = blockLeft - 5;
			if (blocksAtLevel === 13) blockLeft = blockLeft - 6;
			coords.x = centerX - ((w + gap) * blockLeft);
		}
	} else {
		return {
			x: (dimensions.width - w) / 2,
			y: (block.id * h) + h
		}
	}
	return coords;
}

// public functions
export function getBlocks() {
	return blockList;
}

export function calculateBlockCoords(blockMode:string, dimensions:DimensionsType, blockDimensions:DimensionsType) {
	for (let i = 0; i < blockList.length; i++) {
		const block = blockList[i];
		const sublist = blockList.slice(0, i);
		block.coords = getCoords(sublist, block, blockMode, dimensions, blockDimensions);
	}
	return blockList;
}

export function clearBlocks() {
	blockList = [];
}

export function setBlocks(blocks:BlockType[]) {
	blockList = blocks;
}

export function undoBlock() {
	blockList.pop();
}

export function createBlock(parentId:number) {
	const b = new Block(parentId, blockList.length + 1);
	b.level = getLevel(parentId);
	blockList.push(b);
	return b;
}

