const container = document.querySelector('.container');
const btnReset = document.querySelector('.btn-reset');
const clrInput = document.getElementById('color');

const elem = (tag) => document.createElement(tag);
const grab = (tag) => document.querySelector(tag);

const on = R.curry((eventType, element, fn) => {
	element.addEventListener(eventType, fn);
	return () => element.removeEventListener(eventType, fn);
});

const addClass = R.curry((className, element) => {
	element.classList.add(className);
	return element;
});

const append = R.curry((node, element) => {
	element.appendChild(node);
	return element;
});
//remove
const clear = R.curry((element) => {
	element.innerHTML = '';
	return element;
});
const setGridTemplate = R.curry((value, element) => {
	element.style.setProperty('--sideLength', value);
	return element;
});
//container.style.setProperty('--sideLength', sqaureNum);
const makeBox = () => R.compose(addClass('box'))(elem('div'));

//the initial 16x16 grid

const sketch = (gridSize, sketchBox, dispatch) => {
	for (let i = 0; i < gridSize * gridSize; i++) {
		R.compose(setGridTemplate(gridSize), append(makeBox()))(sketchBox);
	}
	// console.log(
	// 	R.compose(setGridTemplate(gridSize), append(makeBox()))(sketchBox),
	// );
};

sketch(16, grab('.container'));

// for (let i = 0; i < 256; i++) {
// 	let box = document.createElement('div');
// 	box.className = 'box';
// 	container.appendChild(box);
// 	// console.log('box', box);
// }

let childDivs = Array.from(container.children);

//when left-mouse is held down, apply mouseover event to all the child square divs
const handleMouseDown = () => {
	Array.from(container.children).map((child) => {
		// console.log('child', child);
		child.addEventListener('mousemove', handleMouseMove);
	});
};

//remove the event listeners on the children square divs when left-mouse is let go
const handleMouseUp = () => {
	Array.from(container.children).map((child) => {
		child.removeEventListener('mousemove', handleMouseMove);
	});
};

//change bg color when the mouse moves over the sq divs
const handleMouseMove = (e) =>
	(e.target.style.backgroundColor = clrInput.value); //child

//add event listeners on the parent div
container.addEventListener('mousedown', handleMouseDown);
container.addEventListener('mouseup', handleMouseUp);

const handleReset = () => {
	let children = Array.from(container.children);
	if (children.length > 0)
		children.map((child) => container.removeChild(child));

	let sqaureNum = prompt("How many squares per side? (keep 'em less than 100)");

	container.style.setProperty('--sideLength', sqaureNum);

	for (let i = 0; i < sqaureNum * sqaureNum; i++) {
		let box = document.createElement('div');
		box.className = 'box';
		container.appendChild(box);
	}
};
btnReset.addEventListener('click', handleReset);
