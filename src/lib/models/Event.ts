import { BlockState } from './Block.ts'

export type EventType = {
	blockId: number,
	parentId: number,
	from: BlockState,
	to: BlockState
};

export class Event {
  blockId = 0;
	parentId = 0;
	from = BlockState.READY;
	to = BlockState.READY;

  constructor(blockId: number, parentId:number, from:BlockState, to:BlockState) {
    this.parentId = parentId;
    this.blockId = blockId;
    this.from = from;
    this.to = to;
  }
}
