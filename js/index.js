console.log('hello world');

// Import scripts

let i = 0;

document.addEventListener('DOMContentLoaded', () => {
	function main() {
		let next = window.requestAnimationFrame(main);

		document.querySelector('h1').innerText = `${i}`;
		i++;

		if (i > 1000) {
			window.cancelAnimationFrame(next);
		}
	}

	main();
});
