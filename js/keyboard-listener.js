class KeyboardListener {
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
				this.keys.up = true;
				break;
			case 'ArrowRight':
				this.keys.right = true;
				break;
			case 'ArrowDown':
				this.keys.down = true;
				break;
			case 'ArrowLeft':
				this.keys.left = true;
				break;
		}
	}

	_keyupListener(e) {
		switch(e.code) {
			case 'ArrowUp':
				this.keys.up = false;
				break;
			case 'ArrowRight':
				this.keys.right = false;
				break;
			case 'ArrowDown':
				this.keys.down = false;
				break;
			case 'ArrowLeft':
				this.keys.left = false;
				break;
		}
	}
}
