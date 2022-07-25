const handleMouseMove = (e) =>
	(e.target.style.backgroundColor = grab('#color').value);

const onMove = on('mousemove', handleMouseMove);
const handleMouseDown = () => chilrenArr(grab('.container')).map(onMove);

const offMove = off('mousemove', handleMouseMove);
const handleMouseUp = () => chilrenArr(grab('.container')).map(offMove);

const makeBox = (index) =>
	R.compose(attr('data-index', index), addClass('box'))(elem('div'));

const sketch = (gridSize) => {
	for (let i = 0; i < gridSize * gridSize; i++) {
		R.compose(
			setGridTemplate(gridSize),
			append(makeBox(i)),
		)(grab('.container'));
	}
};

const handleReset = () => {
	clear(grab('.container'));
	let squares = prompt("How many squares per side? (keep 'em less than 100)");
	sketch(squares);
};

on('mousedown', handleMouseDown, grab('.container'));
on('mouseup', handleMouseUp, grab('.container'));
on('click', handleReset, grab('.btn-reset'));

sketch(16);
