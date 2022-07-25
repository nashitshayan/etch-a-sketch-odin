const handleMouseMove = (e) =>
	(e.target.style.backgroundColor = grab('#color').value); //child

const onMove = on('mousemove', handleMouseMove);
const handleMouseDown = () => chilrenArr(grab('.container')).map(onMove);

const offMove = off('mousemove', handleMouseMove);
const handleMouseUp = () => chilrenArr(grab('.container')).map(offMove);

const makeBox = (index) =>
	R.compose(attr('data-index', index), addClass('box'))(elem('div'));

const sketch = (gridSize, sketchBox) => {
	for (let i = 0; i < gridSize * gridSize; i++) {
		R.compose(setGridTemplate(gridSize), append(makeBox(i)))(sketchBox);
	}
};

sketch(12, grab('.container'));

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
//add event listeners on the parent div
on('mousedown', handleMouseDown, grab('.container'));
on('mouseup', handleMouseUp, grab('.container'));
on('click', handleReset, grab('.btn-reset'));
