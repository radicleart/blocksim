export type BlockType = {
	id: number,
	parentId: number,
	children: [],
	state: string,
  level: number,
  coords: { x:number, y:number }
};

export class Block {
  id = 0;
	parentId = 0;
	children: []=[];
	state = 'unknown';
	level = 1;
  coords = { x: 0, y: 0 };

  constructor(parentId: number, id: number) {
    this.parentId = parentId;
    this.id = id;
    this.level = id;
  }

  // Extensions
  isGensis() {
    return this.id === 1;
  }
}
