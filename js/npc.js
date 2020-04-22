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
		this.hasGotOut = false;
		this.destroyed = false;

		// Create new DOM element and store it in this.element
		let element = document.createElement('div');
		element.classList.add('npc');
		options.parent.append(element);
		this.element = element;
	}

	loop() {
		if (this.destroyed) {
			return;
		}

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

			let ignore = null;
			if ((normalizedDiff[1] > normalizedDiff[0] * 2 || normalizedDiff[0] > normalizedDiff[1] * 2) && this.hasGotOut) {
				if (normalizedDiff[1] > normalizedDiff[0]) {
					ignore = 'x';
				}
				if (normalizedDiff[0] > normalizedDiff[1]) {
					ignore = 'y';
				}
			}

			let diagonal = false;
			let roundedDiff = normalizedDiff.map(x => Math.round(x / 100) * 100);
			if (roundedDiff[0] === roundedDiff[1] && this.hasGotOut) {
				diagonal = true;
			}

			this.move(diff, diagonal, ignore);
			this.speed = speedBackup;
		}

		const [left, top] = this._map.getScreenPos(this.position[0], this.position[1]);

		if (left > -50 && top > -50 && left < (window.innerWidth + 50) && top < (window.innerHeight + 50)) {
			this.element.style.left = `${left - 40}px`;
			this.element.style.top = `${top - 34}px`;
		}

		console.log(left, top, window.innerWidth, window.innerHeight);
		if (left < -150 || top < -150 && left > (window.innerWidth + 150) || top > (window.innerHeight + 150)) {
			console.warn('Despawn');
			this.destroy();
		}
	}

	move(diff, diagonal = false, ignore = null) {
		let direction;

		if (diff[1] > 0 && ignore !== 'y') {
			direction = 'n';
		}
		if (diff[0] < 0 && ignore !== 'x') {
			direction = 'e';
		}
		if (diff[1] < 0 && ignore !== 'y') {
			direction = 's';
		}
		if (diff[0] > 0 && ignore !== 'x') {
			direction = 'w';
		}
		if (diff[1] > 0 && diff[0] < 0 && diagonal) {
			direction = 'ne';
		}
		if (diff[1] < 0 && diff[0] < 0 && diagonal) {
			direction = 'se';
		}
		if (diff[1] < 0 && diff[0] > 0 && diagonal) {
			direction = 'sw';
		}
		if (diff[1] > 0 && diff[0] > 0 && diagonal) {
			direction = 'nw';
		}

		if (this.hasGotOut || this._map.canGo(this.position[0], this.position[1], this.size, this.size)) {
			// Respect walls

			if (!this.hasGotOut) {
				this.hasGotOut = true;
			}

			if (!super.move(direction)) {
				// Moving did not work,
				// we're probably hitting a building
				// try another direction
				switch(direction) {
					case 'n':
					case 's':
						direction = (diff[0] > 0) ? 'w' : 'e';
						super.move(direction);
						break;
					case 'e':
					case 'w':
						direction = (diff[1] > 0) ? 'n' : 's';
						super.move(direction);
						break;
					case 'ne':
					case 'nw':
					case 'se':
					case 'sw':
						direction = (diff[0] > 0) ? 'w' : 'e';
						if (!super.move(direction)) {
							direction = (diff[1] > 0) ? 'n' : 's';
							super.move(direction);
						}
						break;
				}
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
		this.destroyed = true;
	}
}
