import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import path from 'path';
import vue from 'vue';
import fs from 'fs';
import createApp from './public/app';

import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

import * as PageController from './controllers/page';

const app = express();
const host = process.env.HOST || '127.0.0.1';

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
	if (err) {
		throw err;
	}
	console.log('Mongoose connect');
});

// Listen the server
app.listen(config.port, err => {
    if (err) throw err;

    console.log(`Server listening on port ${config.port}`);
});

app.use(morgan('tin'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secret
}));

// app.use('/public', express.static('public'));
app.use('/public', express.static(
  path.resolve(__dirname, 'public')
));

// Получаем доступ к Vue глобально для серверной версии app.js
global.Vue = vue;
// Создаём рендерер
let renderer = require('vue-server-renderer').createRenderer();
// Получаем HTML-шаблон
let layout = fs.readFileSync('./views/index.html', 'utf8');

app.get('/', (req, res, next) => {
  PageController.getAll(req, res, next).then(data => {
    console.log(111111111111111111, data);

    renderer.renderToString(
      // Создаём экземпляр приложения
      new Vue({
        template: '<div id="app">{{ data }}</div>',
        data: {
          data
        }
      }),
      // Обрабатываем результат рендеринга
      function (error, html) {
        // Если при рендеринге произошла ошибка...
        if (error) {
          // Логируем её в консоль
          console.error(error)
          // И говорим клиенту, что что-то пошло не так
          return next({
            status: 500,
            message
          });
        }
        // Отсылаем HTML-шаблон, в который вставлен результат рендеринга приложения
        res.send(layout.replace('<div id="app"></div>', html))
      }
    )
  });
  // res.sendFile(__dirname + '/views/index.html', {posts: posts});
    // Рендерим наше приложение в строку
  
});
// app.get('/', (req, res) => {
//   const posts = PageController.getAll(req, res);
//   res.sendFile(__dirname + '/views/index.html', {posts: posts});
// });

app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use(getUser);
app.use('/api', checkToken, pageRoute);


// проверка работы токена
// app.get('/token', checkToken, (req, res) => {
// 	res.json('token');
// });



// обработчик ошибок все последний
app.use(errorHandler);