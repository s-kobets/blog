// server.js
'use strict'
import path from 'path';
import vue from 'vue';
import createApp from '../public/main'
import * as PageController from '../controllers/page';

// Получаем доступ к Vue глобально для серверной версии app.js
global.Vue = vue;
// Создаём рендерер
let renderer = require('vue-server-renderer').createRenderer();
// Создаём Express-сервер
import express from 'express';
const router = express.Router();
// Обрабатываем все GET-запросы
router.get('/', (req, res) => {
	const posts = PageController.getAll(req, res);
	// let layout = res.sendFile(__dirname + '/../views/index.html');
	res.sendFile(__dirname + '/../views/index.html', {posts: posts});
	// Рендерим наше приложение в строку
	// renderer.renderToString(
	// 	// Создаём экземпляр приложения
	// 	createApp(),
	// 	// Обрабатываем результат рендеринга
	// 	function (error, posts) {
	// 		// Если при рендеринге произошла ошибка...
	// 		if (error) {
	// 			// Логируем её в консоль
	// 			console.error(error)
	// 			// И говорим клиенту, что что-то пошло не так
	// 			return response
	// 			.status(500)
	// 			.send('Server Error')
	// 		}
	// 		// Отсылаем HTML-шаблон, в который вставлен результат рендеринга приложения
	// 		res.send(layout.replace('<div id="app"></div>', posts))
	// 	}
	// )
});

export default router;
