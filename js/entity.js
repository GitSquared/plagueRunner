export default class Entity {
	constructor(options) {
		this.speed = options.speed;
		this.halfSpeed = Math.ceil(options.speed / 2) + 1;
		this.size = options.size;
		this.position = [options.x, options.y];
		this._map = options.map;
	}

	move(direction) {
		let newPos = [this.position[0], this.position[1]];

		switch(direction) {
			case 'n':
				newPos[1] = this.position[1] - this.speed;
				break;
			case 'e':
				newPos[0] = this.position[0] + this.speed;
				break;
			case 's':
				newPos[1] = this.position[1] + this.speed;
				break;
			case 'w':
				newPos[0] = this.position[0] - this.speed;
				break;
			case 'ne':
				newPos[0] = this.position[0] + this.halfSpeed;
				newPos[1] = this.position[1] - this.halfSpeed;
				break;
			case 'se':
				newPos[0] = this.position[0] + this.halfSpeed;
				newPos[1] = this.position[1] + this.halfSpeed;
				break;
			case 'sw':
				newPos[0] = this.position[0] - this.halfSpeed;
				newPos[1] = this.position[1] + this.halfSpeed;
				break;
			case 'nw':
				newPos[0] = this.position[0] - this.halfSpeed;
				newPos[1] = this.position[1] - this.halfSpeed;
				break;
		}

		let test = [newPos[0] - this.size / 2, newPos[1] - this.size / 2];
		let odd = false;
		let abandon = false;

		while (!this._map.canGo(test[0], test[1], this.size, this.size) && !abandon) {
			let speedx = newPos[0] - this.position[0];
			let speedy = newPos[1] - this.position[1];

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

			newPos = [this.position[0] + speedx, this.position[1] + speedy];
			test = [newPos[0] - this.size / 2, newPos[1] - this.size / 2];
		}

		if (this.position[0] !== newPos[0] || this.position[1] !== newPos[1]) {
			this.position = [newPos[0], newPos[1]];
			return true;
		}
		return false;
	}
}
