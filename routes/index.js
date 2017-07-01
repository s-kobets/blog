// server.js
'use strict'
import path from 'path'
import createApp from '../public/main'
import * as PageController from '../controllers/page'
// Создаём Express-сервер
import express from 'express'

const router = express.Router()

// Обрабатываем все GET-запросы
router.get('/', (req, res) => {
	const posts = PageController.getAll(req, res);

	res.sendFile(__dirname + '/../views/index.html', {posts: posts});
});

export default router;
