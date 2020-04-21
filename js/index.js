import GameMap from './map.js';
import Player from './player.js';

window.addEventListener('load', async () => {
	function main() {
		let next = window.requestAnimationFrame(main);
		player.loop();
	}

	const map = new GameMap(
		document.querySelector('.map'),
		'assets/images/map.jpg',
		[3750, 2710],
		document.querySelector('.hitbox-canvas'),
		document.querySelector('.hitbox-img')
	);
	map.goTo(0, 0);

	const player = new Player({
		map,
		element: document.querySelector('.player')
	});

	document.querySelector('.loading-screen').classList.add('hidden');
	main();
});
