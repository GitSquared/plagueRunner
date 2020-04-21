import Entity from './entity.js';
import KeyboardListener from './keyboard-listener.js';

export default class Player extends Entity {
	constructor(options) {
		super({
			...options,
			size: 40,
			speed: 5,
			x: 0,
			y: 0
		});
		this.element = options.element;

		this._keyboard = new KeyboardListener();
	}

	loop() {
		let direction;

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

			this.element.classList.remove(this.element.classList[1]);
			this.element.classList.add(direction);
		}
		
		this._map.goTo(this.position[0], this.position[1]);
	}
}