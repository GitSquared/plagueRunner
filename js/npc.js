import Entity from './entity.js';

export default class NPC extends Entity {
	constructor(options) {
		super({
			...options,
			size: 40,
			speed: 4,
			x: 200,
			y: 300
		});
		this.infected = options.infected || true;
		this._player = options.player;
		this.direction = 'n';

		// Create new DOM element and store it in this.element
		let element = document.createElement('div');
		element.classList.add('npc');
		options.parent.append(element);
		this.element = element;
	}

	loop() {
		const diff = [this.position[0] - this._player.position[0], this.position[1] - this._player.position[1]];
		const normalizedDiff = diff.map(n => (n < 0) ? ~n+1 : n);

		if (normalizedDiff[0] > 50 || normalizedDiff[1] > 50) {
			let speedBackup = this.speed;

			if (normalizedDiff[0] < this.speed || normalizedDiff[1] < this.speed) {
				let tempSpeed = Math.min(...normalizedDiff.filter(x => (x !== 0)));
				if (tempSpeed < this.speed) {
					this.speed = tempSpeed;
				}
			}

			this.move(diff);
			this.speed = speedBackup;
		}

		const [left, top] = this._map.getScreenPos(this.position[0], this.position[1]);

		if (left > -100 && top > -100 && left < (window.innerWidth + 100) && top < (window.innerHeight + 100)) {
			this.element.style.left = `${left - 40}px`;
			this.element.style.top = `${top - 34}px`;
		}
	}

	move(diff) {
		let direction;

		if (diff[1] > 0) {
			direction = 'n';
		}
		if (diff[0] < 0) {
			direction = 'e';
		}
		if (diff[1] < 0) {
			direction = 's';
		}
		if (diff[0] > 0) {
			direction = 'w';
		}
		if (diff[1] > 0 && diff[0] < 0) {
			direction = 'ne';
		}
		if (diff[1] < 0 && diff[0] < 0) {
			direction = 'se';
		}
		if (diff[1] < 0 && diff[0] > 0) {
			direction = 'sw';
		}
		if (diff[1] > 0 && diff[0] > 0) {
			direction = 'nw';
		}

		if (this._map.canGo(this.position[0], this.position[1], this.size, this.size)) {
			// Respect walls
			if (!super.move(direction, true, true)) {
				// Moving did not work,
				// we're probably hitting a building
				// try another direction
			}

			if (this.element.classList.contains('hidden')) {
				this.element.classList.remove('hidden');
			}

		} else {
			// Traverse walls
			super.move(direction, true, true);
			if (!this.element.classList.contains('hidden')) {
				this.element.classList.add('hidden');
			}
		}

		if (direction !== this.direction) {
			this.element.dataset.orientation = direction;
			this.direction = direction;
		}
	}

	destroy() {
		this.element.remove();
	}
}
