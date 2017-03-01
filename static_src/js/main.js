/* global */

const Vue = require('vue');
require('../css/main.css');

let app = new Vue({
	el: '#app',
	data: {
		message: 'Hello Vue!'
	}
});

console.log(app);
