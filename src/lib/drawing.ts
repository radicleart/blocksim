import { fabric } from "fabric";
import type { DimensionsType } from "./blocks";
import type { BlockType } from "../models/Block";

function getLineSegment(endX:number, endY:number, startX:number, startY:number, color:string, strokeWidth:number) {
    return new fabric.Line([endX, endY, startX, startY], {
        fill: 'red',
        stroke: color,
        strokeWidth: strokeWidth,
        selectable: false
    });
}

export function makeLines(block:BlockType, parent:BlockType, blockDimensions:DimensionsType) {
	const lines = [];
	const gap = blockDimensions.height / 10;
	let startX = parent.coords.x + blockDimensions.width / 2;
	let startY = parent.coords.y + blockDimensions.width / 2;
	let endX = block.coords.x + blockDimensions.width / 2;
	let endY = block.coords.y + blockDimensions.width / 2;

	if (block.coords.x === parent.coords.x) {
		lines.push(getLineSegment(endX, endY, startX, startY, 'blue', 1));
		return lines;
	}

	// 1st segment - drop down from parent into gap
	endX = startX;
	endY = startY + blockDimensions.width / 2 + gap;
	lines.push(getLineSegment(startX, startY, endX, endY, 'blue', 1));

	// 2nd segment - move left or right
	startX = endX;
	startY = endY;
	endY = startY;
	if (block.coords.x < parent.coords.x) {
		endX = block.coords.x + blockDimensions.width / 2
	} else {
		endX = block.coords.x + blockDimensions.width / 2
	}
	lines.push(getLineSegment(startX, startY, endX, endY, 'blue', 1));

	// 3rd segment - drop down
	startX = endX;
	startY = endY;
	lines.push(getLineSegment(startX, startY, endX, endY + blockDimensions.width / 2 + gap, 'blue', 1));
	
	return lines;
}

export function getTextProps(coords: { x:number, y:number }, color:string|undefined) {
	return {
		left: coords.x - 5,
		top: coords.y - 10,
		strokeWidth: 0,
		stroke:"#fff",
		paintFirst: "stroke",
		fontFamily: 'Gilroy-Light',
		fill: (color) ? color : '#fff',
		fontSize: 18,
	};
  }

export function  addRect(canv:any, id:number, coords: { x:number, y:number }, blockDimensions:DimensionsType) {
	const rect = new fabric.Rect({
		left: coords.x,
		top: coords.y,
		width: blockDimensions.width,
		height: blockDimensions.height,
		fill: "#BFBCE2",
		strokeWidth: 2,
		  stroke: "#880E4F",
	  });
	  //canv.add(rect);
	  const text = new fabric.Text('' + id, getTextProps(rect.getCenterPoint(), null));
	  const group = new fabric.Group([rect, text], { lockMovementX: true, lockMovementY: true })
	  canv.add(group);
	  group.toObject = function() {
			  return {
				id
			  };
		  };
	  //canv.sendToBack(rect);
	  return group;
  }

