class GameMap {
	constructor(mapComponent, textureUrl, textureSize, hitboxCanvas, hitboxImg) {
		this.element = mapComponent;
		this.element.style.background = `center / ${textureSize[0]}px ${textureSize[1]}px url("${textureUrl}") no-repeat`;
		this.textureSize = textureSize;

		this.hitbox = hitboxCanvas;
		this.hitbox.width = textureSize[0];
		this.hitbox.height = textureSize[1];

		this.hitbox.getContext('2d').drawImage(hitboxImg, 0, 0, textureSize[0], textureSize[1]);
	}

	canGo(x, y, width = 1, height = 1) {
		console.log('test', x, y, width, height);
		x = (this.textureSize[0] / 2) + x;
		y = (this.textureSize[1] / 2) + y;
		const pixels = this.hitbox.getContext('2d').getImageData(x, y, width, height).data;

		let black = false;
		for (const pixel of pixels) {
			if (pixel === 0) {
				black = true;
				break;
			}
		}
		return (!black);
	}

	goTo(x, y) {
		const map = this.textureSize;
		const view = [window.innerWidth, window.innerHeight];

		const center = [
			- (map[0] / 2 - view[0] / 2),
			- (map[1] / 2 - view[1] / 2)
		];

		const position = [
			center[0] - x,
			center[1] - y
		];

		this.element.style.backgroundPosition = `${position[0]}px ${position[1]}px`;
	}
}
