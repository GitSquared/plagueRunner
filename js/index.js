import KeyboardListener from './keyboard-listener.js';
import GameMap from './map.js';

window.addEventListener('load', () => {
	function main() {
		let next = window.requestAnimationFrame(main);

		const playerSize = 40;
		const speed = 5;
		const halfSpeed = 3;
		const player = document.querySelector('.player');

		let newx = x;
		let newy = y;
		let direction = '';

		if (keyboard.keys.up) {
			newy = y - speed;
			direction = 'n';
		}
		if (keyboard.keys.right) {
			newx = x + speed;
			direction = 'e';
		}
		if (keyboard.keys.down) {
			newy = y + speed;
			direction = 's';
		}
		if (keyboard.keys.left) {
			newx = x - speed;
			direction = 'w';
		}

		if (keyboard.keys.right && keyboard.keys.up) {
			newx = x + halfSpeed;
			newy = y - halfSpeed;
			direction = 'ne';
		}
		if ( keyboard.keys.right && keyboard.keys.down) {
			newx = x + halfSpeed;
			newy = y + halfSpeed;
			direction = 'se';
		}
		if (keyboard.keys.left && keyboard.keys.down) {
			newx = x - halfSpeed;
			newy = y + halfSpeed;
			direction = 'sw';
		}
		if (keyboard.keys.left && keyboard.keys.up) {
			newx = x - halfSpeed;
			newy = y - halfSpeed;
			direction = 'nw';
		}

		if (x !== newx || y !== newy) {
			let testx = newx - playerSize / 2;
			let testy = newy - playerSize / 2;

			let odd = false;
			let abandon = false;
			while (!map.canGo(testx, testy, playerSize, playerSize) && !abandon) {
				let speedx = newx - x;
				let speedy = newy - y;

				if (speedx === 0 && speedy === 0) {
					abandon = true;
					break;
				}

				if (odd && speedx !== 0) {
					odd = false;
					if (speedx > 0) {
						speedx--;
					} else {
						speedx++;
					}
				} else if (speedy !== 0) {
					odd = true;
					if (speedy > 0) {
						speedy--;
					} else {
						speedy++;
					}
				} else {
					if (speedx > 0) {
						speedx--;
					} else {
						speedx++;
					}
				}

				newx = x + speedx;
				newy = y + speedy;
				testx = newx - playerSize / 2;
				testy = newy - playerSize / 2;
			}

			x = newx;
			y = newy;

			player.classList.remove(player.classList[1]);
			player.classList.add(direction);
		}

		map.goTo(x, y);
	}

	document.querySelector('.loading-screen').classList.add('hidden');
	const map = new GameMap(
		document.querySelector('.map'),
		'assets/images/background.png',
		[3750, 2710],
		document.querySelector('.hitbox-canvas'),
		document.querySelector('.hitbox-img')
	);
	map.goTo(0, 0);

	window.currentMap = map;

	let x = 0;
	let y = 0;

	const keyboard = new KeyboardListener();

	main();
});
