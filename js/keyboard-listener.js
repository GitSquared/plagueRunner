export default class KeyboardListener {
	constructor() {
		document.addEventListener('keydown', this._keydownListener.bind(this));
		document.addEventListener('keyup', this._keyupListener.bind(this));

		this.keys = {
			up: false,
			right: false,
			down: false,
			left: false
		};
	}

	_keydownListener(e) {
		switch(e.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.keys.up = true;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.right = true;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this.keys.down = true;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.left = true;
				break;
		}
	}

	_keyupListener(e) {
		switch(e.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.keys.up = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.right = false;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this.keys.down = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.left = false;
				break;
		}
	}
}
