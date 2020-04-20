window.gameEngine.map = (x, y) => {
	const map = [3750, 2710];
	const view = [window.innerWidth, window.innerHeight];

	const center = [
		- (map[0] / 2 - view[0] / 2),
		- (map[1] / 2 - view[1] / 2)
	];

	const position = [
		center[0] + x,
		center[1] + y
	];

	document.querySelector('.map').style.backgroundPosition = `${position[0]}px ${position[1]}px`;
};
