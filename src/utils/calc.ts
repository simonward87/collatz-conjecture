function collatz(input: number) {
	let inputCopy = input;
	let steps = 0;
	let ceiling = input;

	while (inputCopy > 1) {
		if (inputCopy % 2 === 0) {
			inputCopy /= 2;
		} else {
			inputCopy = inputCopy * 3 + 1;
		}

		if (inputCopy > ceiling) ceiling = inputCopy;

		steps += 1;
	}

	return { input, steps, ceiling };
}

export default collatz;
