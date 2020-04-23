import GameMap from './map.js';
import Ui from './ui.js';
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

		ui.loop();

		if (player.life <= 0) {
			window.cancelAnimationFrame(next);

			const score = Math.round((Date.now() - start) / 5000);

			document.querySelector('.endgame').classList.toggle('hidden');
			document.querySelector('.scoreboard').innerText = `Score: ${score}`;
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

	const ui = new Ui(player);

	const npcs = [];

	const start = Date.now();

	window.checkNpcHitbox = (x, y, index, range = 15) => {
		for (const i in npcs) {
			if (i == index) continue;

			const diff = [
				npcs[i].position[0] - x,
				npcs[i].position[1] - y
			].map(n => (n < 0) ? ~n+1 : n);

			if (diff[0] < range && diff[1] < range) {
				return false;
			}
		}
		return true;
	}

	let t = 6000;
	function spawnNew(delay) {
		setTimeout(() => {
			if (npcs.length > 30) {
				spawnNew(t);
				return;
			}

			npcs.push(new NPC({
				map,
				player,
				parent: document.querySelector('.npcs'),
				index: npcs.length
			}));

			if (t > 500) {
				t = t - 500;
			}
			spawnNew(t);
		}, delay);
	}
	spawnNew(0);

	document.querySelector('.loading-screen').classList.add('hidden');
	main();
});
