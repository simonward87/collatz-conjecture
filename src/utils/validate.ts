function validate(input: string, warned: boolean, checked: boolean): boolean {
	const repetitions = parseInt(input);

	if (repetitions > 1999 && !warned && checked) {
		alert(
			'Warning! Large numbers may take a while, or even crash your browser.'
		);

		return true;
	}

	if (repetitions < 1) {
		alert('Number must be positive');
	}

	return false;
}

export default validate;
