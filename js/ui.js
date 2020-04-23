export default class Ui {
	constructor(player) {
		this._player = player;
		this.lifebar = document.querySelector('.lifebar');
	}

	loop() {
		this.lifebar.style.width = `${this._player.life * 45}px`;
	}
}
