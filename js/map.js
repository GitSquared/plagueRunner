class GameMap {
	constructor(mapComponent, textureUrl, textureSize) {
		this.element = mapComponent;
		this.element.style.background = `center / ${textureSize[0]}px ${textureSize[1]}px url("${textureUrl}") no-repeat`;
		this.textureSize = textureSize;
	}

	goTo(x, y) {
		const map = this.textureSize;
		const view = [window.innerWidth, window.innerHeight];

		const center = [
			- (map[0] / 2 - view[0] / 2),
			- (map[1] / 2 - view[1] / 2)
		];

		const position = [
			center[0] + x,
			center[1] + y
		];

		this.element.style.backgroundPosition = `${position[0]}px ${position[1]}px`;
	}
}
