export const toTitle = (text: string): string => {
	let result = '';
	for (const letter of text) {
		if (letter === letter.toUpperCase()) {
			result += ' ' + letter.toLowerCase();
		} else {
			result += letter;
		}
	}

	return result[0].toUpperCase() + result.slice(1);
};
