document.addEventListener('DOMContentLoaded', () => {
	function main() {
		let next = window.requestAnimationFrame(main);

		if (keyboard.keys.up) {
			y = y + speed;
		}
		if (keyboard.keys.right) {
			x = x - speed;
		}
		if (keyboard.keys.down) {
			y = y - speed;
		}
		if (keyboard.keys.left) {
			x = x + speed;
		}

		map.goTo(x, y);

		// if (i > 1000) {
		//    window.cancelAnimationFrame(next);
		// }
	}

	document.querySelector('.loading-screen').classList.add('hidden');
	const map = new GameMap(
		document.querySelector('.map'),
		'assets/images/background.png',
		[3750, 2710]
	);
	map.goTo(0, 0);

	let x = 0,
		y = 0;

	const speed = 5;

	const keyboard = new KeyboardListener();

	main();
});
