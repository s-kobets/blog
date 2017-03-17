/* global $ FormData document */
const Cookies = require('js-cookie');
import SimpleMDE from 'simplemde';

import getUrlVars from './get-url-vars.js';
import translit from './translit.js';

function addPost() {
	/* eslint-disable */
	const simplemde = new SimpleMDE({
		element: document.getElementById('body'),
		toolbar: [
			'bold', 'italic', 'strikethrough', 'heading', '|',
			'code', 'quote', 'unordered-list', 'ordered-list', '|',
			{
				name: 'file',
				action: function customFunction(editor) {
					console.log(editor);
					const buttonFile = $('.js-input-file');
					buttonFile.trigger('click');
					buttonFile.on('change', function () {
						upload($(this))
							.done(data => {
								const cm = editor.codemirror;
								const output = `![](${data.path})`;
								cm.replaceSelection(output);
							});
					});
				},
				className: 'fa fa-picture-o',
				title: 'Add File'
			}
		]
	});

	console.log(simplemde);

	simplemde.toolbar.push({
		name: 'file',
		action: function customFunction(editor) {
			console.log(editor);
			const buttonFile = $('.js-input-file');
			buttonFile.trigger('click');
			buttonFile.on('change', function () {
				upload($(this))
					.done(data => {
						const cm = editor.codemirror;
						const output = `![](${data.path})`;
						cm.replaceSelection(output);
					});
			});
		},
		className: 'fa fa-star',
		title: 'Add File'
	});
	/* eslint-enable */

	const $addpost = $('.js-submit-addpost');
	let request = {};

	$addpost.on('click', function (e) {
		e.preventDefault();
		const form = $(this).closest('form');
		request = getUrlVars(`&${form.serialize()}`);
		request.url = translit(request.title);

		request.body = simplemde.value();
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
		upload($(this))
			.done(data => {
				console.log(data);
			});
	});
}

function upload(selector) {
	const form = selector.closest('form');
	return $.ajax({
		beforeSend: function (xhr) {
			xhr.setRequestHeader('Authorization', Cookies.get('token'));
		},
		url: '/api/upload',
		method: 'POST',
		processData: false,
		contentType: false,
		data: new FormData(form[0])
	})
}

export default addPost;
