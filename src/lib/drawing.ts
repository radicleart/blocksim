import { fabric } from "fabric";
import type { DimensionsType } from "./blocks";
import type { BlockType } from "../models/Block";

const lineColors = ['#154c79', '#d66d35', '#7C3626', '#Ee0d10', '#81fb3f', '#76b5c5', '#642425', '#B3F3A4', '#81fb3f', '#065996', '#E4CD08', '#08D5E4', '#065996', '#C885F3', '#FB3FD3', '#FB3F77', '#642425', '#642425', '#642425', '#642425'];
const scalor = { x: 1.2, y: 1.5 };

function getRndInteger(min:number, max:number) {
	const str = (Math.random() * (max - min) + min).toFixed(2);
	return parseFloat(str);
  }

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
	let stroke = lineColors[block.parentId];
	if (!stroke) stroke = '#000';
	let startX = parent.coords.x + blockDimensions.width / 2;
	let startY = parent.coords.y + blockDimensions.width / 2;
	let endX = block.coords.x + blockDimensions.width / 2;
	let endY = block.coords.y + blockDimensions.width / 2;

	if (block.coords.x === parent.coords.x) {
		lines.push(getLineSegment(endX, endY, startX, startY, stroke, 2));
		return lines;
	}

	const rnd = 0; //getRndInteger(-5, 5);

	// 1st segment - drop down from parent into gap
	endX = startX;
	endY = startY + blockDimensions.width / 2 + gap * 2;
	if (parent.id % 2 === 0) endY += parent.id / 1.2;
	else endY -= parent.id / 1.2;
	lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));


	// 2nd segment - move left or right
	startX = endX;
	startY = endY;
	endY = startY;
	if (block.coords.x < parent.coords.x) {
		endX = block.coords.x + blockDimensions.width / 2
	} else {
		endX = block.coords.x + blockDimensions.width / 2
	}
	lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));

	// 3rd segment - drop down
	startX = endX;
	startY = endY;
	// endY = endY + blockDimensions.width / 2 + gap;
	// if (blockMode === 'bitcoin') 
	endY = block.coords.y + blockDimensions.width / 2 + gap;
	lines.push(getLineSegment(startX + rnd, startY, endX + rnd, endY, stroke, 2));
	
	return lines;
}

function getCircle(coords: { x:number, y:number }, config:any) {
	return new fabric.Circle({ 
		left: coords.x, 
		top: coords.y, 
		width: config.width, 
		height: config.height, 
		fill: config.fill, 
		strokeWidth: 1, 
		stroke: '#fff',
		radius: config.radius, 
	  });
  }

  export function getTextProps(coords: { x:number, y:number }, color:string|undefined, fontSize:number) {
	return {
		left: coords.x - 5,
		top: coords.y - 10,
		strokeWidth: 1,
		stroke:"#fff",
		paintFirst: "stroke",
		fontFamily: 'Gilroy-Light',
		fill: (color) ? color : '#fff',
		fontSize: fontSize,
	};
  }

  export function  addRect(canv:any, id:number, coords: { x:number, y:number }, blockDimensions:DimensionsType, fill:string, stroke:string) {
	const rect = new fabric.Rect({
		left: coords.x + 5,
		top: coords.y,
		width: blockDimensions.width,
		height: blockDimensions.height,
		fill,
		strokeWidth: 2,
		stroke,
	  });
	  //canv.add(rect);
	  const text = new fabric.Text('' + id, getTextProps(rect.getCenterPoint(), null, 18));
	  const group = new fabric.Group([rect, text], { lockMovementX: true, lockMovementY: true, selectable: false });
	  group.hoverCursor = 'pointer';
	  canv.add(group);
	  group.toObject = function() {
			  return {
				id
			  };
		  };
	  //canv.sendToBack(rect);
	  return group;
  }

  export function addMenu(canv:any, parent:any, id:number) {
	const coords = {
		x: parent.getCenterPoint().x - parent.width / 2 + 3,
		y: parent.getCenterPoint().y - parent.height / 2 + 3,
	}
	const config = { radius: 3, width: 30, height: 20, fill: '#3e3e3e', stroke: '#3e3e3e', drawer: { height: 30, width: 146, fill: '#C5edee', stroke: '#C5edee' } };
	
	const c1 = getCircle({ x: coords.x, y: coords.y }, config);
	const c2 = getCircle({ x: coords.x, y: coords.y + 6 }, config);
	const c3 = getCircle({ x: coords.x, y: coords.y + 12 }, config);
	const group = new fabric.Group([c1, c2, c3], { lockMovementX: true, lockMovementY: true, selectable: false });
	group.hoverCursor = 'crosshairs';
	canv.add(group);
	group.toObject = function() {
		return {
			id
		};
	};
	return group;
  }

function addDrawer(config:any) {
	const rect1 = new fabric.Rect({ left: 2, top: 2, width: config.drawer.width, height: config.drawer.height, fill: config.drawer.fill, strokeWidth: 1, stroke: config.drawer.stroke });
	const coords = {
		x: rect1.getCenterPoint().x - 40,
		y: rect1.getCenterPoint().y + 3,
	}
	const text1 = new fabric.Text('disclose node', getTextProps(coords, '#333', 12));
	const group1 = new fabric.Group([rect1, text1], { lockMovementX: true, lockMovementY: true });
	return group1;
}

export function scaleCanvas(document:any, canv:any, dimensions:DimensionsType, blocks:number) {
	if (blocks % 10 !== 0) return dimensions;
	const scaleFactor = Math.floor((blocks / 10)) + 1;
	if (scaleFactor <= 1) return dimensions;
	scalor.x += scaleFactor / 10;
	scalor.y += scaleFactor / 10;
	const frameEl = document.getElementById('frame');
	if (frameEl && frameEl.style) frameEl.style.width = scalor.x * dimensions.width * 2.5 + 'px';
	dimensions = {width: scalor.x * dimensions.width, height: scalor.y * dimensions.height}
	canv.setDimensions({width: dimensions.width, height: dimensions.height});
	return dimensions;
}