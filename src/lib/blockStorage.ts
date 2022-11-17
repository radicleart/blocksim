import type { BlockType } from './models/Block.ts'

const STORAGE_KEY = 'block-store';

export function saveState(blocks:BlockType[]) {
    const blockStore:[{ ts: number, blocks:BlockType[] }] = [
		{
			blocks,
			ts: new Date().getTime()
		}
	];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blockStore));
	return true;
}

export function getLastState() {
	const state = localStorage.getItem(STORAGE_KEY)
	if (state) {
		return JSON.parse(state)[0].blocks;
	}
}

