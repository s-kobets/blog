/* global $ */
const Cookies = require('js-cookie');

function addPost() {
	const $addpost = $('.js-submit-addpost');
	$addpost.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		$.ajax({
			url: '/api/current-user',
			method: 'GET',
			contentType: 'application/json',
			data: JSON.stringify(getUrlVars(`&${form.serialize()}`))
		})
		.done(data => {
			console.log(data);
		});
	});
}

export default addPost;
