import GameMap from './map.js';
import Player from './player.js';
import NPC from './npc.js';

window.addEventListener('load', async () => {
	function main() {
		let next = window.requestAnimationFrame(main);

		player.loop();
		for (const npc of npcs) {
			npc.loop();
		}
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

	const gamePhase = 0;
	const npcs = [];
	window.gamemap = map;
	window.player = player;
	window.npcs = npcs;
	window.NPC = NPC;

	npcs.push(new NPC({
		map,
		player,
		parent: document.querySelector('.npcs')
	}));

	document.querySelector('.loading-screen').classList.add('hidden');
	main();
});
