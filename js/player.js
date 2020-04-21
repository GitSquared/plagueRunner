import Entity from './entity.js';
import KeyboardListener from './keyboard-listener.js';

export default class Player extends Entity {
	constructor(options) {
		super({
			...options,
			size: 40,
			speed: 6,
			x: -54,
			y: 72
		});
		this.element = options.element;
		this.direction = 's';
		this.walking = false;

		this._keyboard = new KeyboardListener();
	}

	loop() {
		let direction = null;

		if (this._keyboard.keys.up) {
			direction = 'n';
		}
		if (this._keyboard.keys.right) {
			direction = 'e';
		}
		if (this._keyboard.keys.down) {
			direction = 's';
		}
		if (this._keyboard.keys.left) {
			direction = 'w';
		}
		if (this._keyboard.keys.right && this._keyboard.keys.up) {
			direction = 'ne';
		}
		if ( this._keyboard.keys.right && this._keyboard.keys.down) {
			direction = 'se';
		}
		if (this._keyboard.keys.left && this._keyboard.keys.down) {
			direction = 'sw';
		}
		if (this._keyboard.keys.left && this._keyboard.keys.up) {
			direction = 'nw';
		}

		if (direction) {
			super.move(direction);
			this.walking = true;

			if (direction !== this.direction) {
				this.element.dataset.orientation = direction;

				this.direction = direction;
			}

			if (this.element.dataset.walking === 'false') {
				this.element.dataset.walking = 'true';
			}
		} else {
			if (this.element.dataset.walking === 'true') {
				this.element.dataset.walking = 'false';
			}
		}

		this._map.goTo(this.position[0], this.position[1]);

		if (this._keyboard.konamiCode && this.element.dataset.giant === 'false') {
			this.element.dataset.giant = 'true'
		}
	}
}
