/* global $ */
const Cookies = require('js-cookie');
import getUrlVars from './get-url-vars.js';

function auth() {
	const $signup = $('.js-signup-user');
	$signup.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		$.ajax({
			url: '/api/signup',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(getUrlVars(`&${form.serialize()}`))
		})
		.done(data => {
			console.log(data);
		});
	});
	const $signin = $('.js-signin-user');
	$signin.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		$.ajax({
			url: '/api/signin',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(getUrlVars(`&${form.serialize()}`))
		})
		.done(data => {
			console.log(data);
			Cookies.set('token', data, {
				expires: 30,
				path: '/'
			});
		});
	});
}

export default auth;
