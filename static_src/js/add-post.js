/* global $ FormData */
const Cookies = require('js-cookie');
import getUrlVars from './get-url-vars.js';
import translit from './translit.js';

function addPost() {
	const $addpost = $('.js-submit-addpost');
	let request = {};

	$addpost.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		request = getUrlVars(`&${form.serialize()}`);
		request.url = translit(request.title);
		$.ajax({
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', Cookies.get('token'));
			},
			url: '/api/pages',
			method: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(request)
		})
		.done(data => {
			console.log(data);
		});
	});

	const $addFile = $('.js-submit-addFile');
	$addFile.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		console.log(new FormData(form[0]));
		$.ajax({
			beforeSend: function (xhr) {
				xhr.setRequestHeader('Authorization', Cookies.get('token'));
			},
			url: '/api/upload',
			method: 'POST',
			processData: false,
			contentType: false,
			data: new FormData(form[0])
		})
		.done(data => {
			console.log(data);
		});
	});
}

export default addPost;
