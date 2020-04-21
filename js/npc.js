import Entity from './entity.js';

export default class NPC {
	constructor(options) {
		super({
			...options,
			size: 40
		});
		this.infected = options.infected;
		this._player = options.player;

		// Create new DOM element and store it in this.element
	}

	loop() {
		let direction;

		if (this._player.position[1] < this.position[1]) {
			direction = 'n';
		}
		if (this._player.position[0] > this.position[0]) {
			direction = 'e';
		}
		if (this._player.position[1] > this.position[1]) {
			direction = 's';
		}
		if (this._player.position[0] < this.position[0]) {
			direction = 'w';
		}
		if (this._player.position[1] < this.position[1] && this._player.position[0] > this.position[0]) {
			direction = 'ne';
		}
		if (this._player.position[1] > this.position[1] && this._player.position[0] > this.position[0]) {
			direction = 'se';
		}
		if (this._player.position[1] > this.position[1] && this._player.position[0] < this.position[0]) {
			direction = 'sw';
		}
		if (this._player.position[1] < this.position[1] && this._player.position[0] < this.position[0]) {
			direction = 'ne';
		}

		if (this._map.goTo(this.position[0], this.position[1], this.size, this.size)) {
			// Respect walls
		} else {
			// Traverse walls
		}

		if (this.infected) {
			// Run to player
		} else {
			// Run from player
		}
	}

	destroy() {
		// 'Destroyer' function: clean up anything created by this class,
		// most notably the DOM element!
	}
}
