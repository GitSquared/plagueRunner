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

		for (const i in npcs) {
			if (npcs[i].destroyed) {
				npcs.splice(i, 1);
			}
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

	window.checkNpcHitbox = (x, y, index) => {
		for (const i in npcs) {
			if (i == index) continue;

			const diff = [
				npcs[i].position[0] - x,
				npcs[i].position[1] - y
			].map(n => (n < 0) ? ~n+1 : n);

			if (diff[0] < 50 && diff[1] < 50) {
				return false;
			}
		}
		return true;
	}

	npcs.push(new NPC({
		map,
		player,
		parent: document.querySelector('.npcs'),
		index: npcs.length
	}));

	setInterval(() => {
		if (npcs.length > 30) return;

		npcs.push(new NPC({
			map,
			player,
			parent: document.querySelector('.npcs'),
			index: npcs.length
		}));
	}, 6000);

	document.querySelector('.loading-screen').classList.add('hidden');
	main();
});
