export type BlockType = {
	[x: string]: any;
	id: number,
	parentId: number,
	children: [],
	state: BlockState,
  level: number,
  coords: { x:number, y:number }
};

export enum BlockState {
  READY,
	FROZEN,
	CONCEALED,
  DISCLOSED
};

export class Block {
  id = 0;
	parentId = 0;
	children: []=[];
	state = BlockState.READY;
	level = 1;
  coords = { x: 0, y: 0 };

  constructor(parentId: number, id: number, state:BlockState) {
    this.parentId = parentId;
    this.id = id;
    this.level = id;
    this.state = state;
  }

  // Extensions
  isGensis() {
    return this.id === 1;
  }

  changeState(newState:BlockState) {
    if (this.state === newState) {
      throw new Error('Unable to change to same state');
    }
    if (this.state === BlockState.FROZEN && newState !== BlockState.READY) {
      throw new Error('A frozen block can only transition to ready.');
    }
    this.state = newState;
  }
  
  
}
