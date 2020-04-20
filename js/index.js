let i = 0;

document.addEventListener('DOMContentLoaded', () => {
	function main() {
		let next = window.requestAnimationFrame(main);

		document.querySelector('h1').innerText = `${i}`;
		i++;

		window.gameEngine.map(0, 0);

		// if (i > 1000) {
		//    window.cancelAnimationFrame(next);
		// }
	}

	document.querySelector('.loading-screen').classList.add('hidden');
	main();
});
