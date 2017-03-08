/* global window */

function getUrlVars(url) {
	let vars = {};
	let arrayId = [];
	let arrayIdSpec = [];
	if (!url) {
		url = window.location.href;
	}
	decodeURIComponent(url).replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
		if (key === 'city_id') {
			if (value === '') {
				vars[key] = arrayId;
			} else {
				arrayId.push(value);
				vars[key] = arrayId;
			}
		} else if (key === 'label_id') {
			if (value === '') {
				vars[key] = arrayIdSpec;
			} else {
				arrayIdSpec.push(value);
				vars[key] = arrayIdSpec;
			}
		} else {
			vars[key] = value;
		}
	});

	return vars;
}

export default getUrlVars;
