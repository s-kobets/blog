function translit(title) {
	// Символ, на который будут заменяться все спецсимволы
	const space = '-';
	// Берем значение из нужного поля и переводим в нижний регистр
	const text = title.toLowerCase();

	/* eslint-disable */
	// Массив для транслитерации
	const transl = {
		'а': 'a','б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 
		'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
		'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
		'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
		' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
		'#': space, '$': space, '%': space, '^': space, '&': space, '*': space, 
		'(': space, ')': space,'-': space, '\=': space, '+': space, '[': space, 
		']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
		'{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
		'?': space, '<': space, '>': space, '№':space
	}
	/* eslint-enable */

	let result = '';
	let curentSim = '';

	for (let i = 0; i < text.length; i += 1) {
		// Если символ найден в массиве то меняем его
		if (transl[text[i]]) {
			if (curentSim !== transl[text[i]] || curentSim !== space) {
				result += transl[text[i]];
				curentSim = transl[text[i]];
			}
		// Если нет, то оставляем так как есть
		} else {
			result += text[i];
			curentSim = text[i];
		}
	}

	result = trimStr(result);

	return result;
}

function trimStr(s) {
	s = s.replace(/^-/, '');
	return s.replace(/-$/, '');
}

export default translit;
