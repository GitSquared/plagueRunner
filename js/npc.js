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
