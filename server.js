import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';

import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';
import uploadRoute from './routes/upload';

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

import {getPageAll} from './services/PageService.js';
import {markdown} from 'markdown';

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

app.use('/public', express.static('public'));
app.use('/uploads', express.static('uploads'));

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
/* vue */
//   PageController.getAll(req, res, next).then(data => {
//     console.log(111111111111111111, data);

//     renderer.renderToString(
//       // Создаём экземпляр приложения
//       new Vue({
//         template: '<div id="app">{{ data }}</div>',
//         data: {
//           data
//         }
//       }),
//       // Обрабатываем результат рендеринга
//       function (error, html) {
//         // Если при рендеринге произошла ошибка...
//         if (error) {
//           // Логируем её в консоль
//           console.error(error)
//           // И говорим клиенту, что что-то пошло не так
//           return next({
//             status: 500,
//             message
//           });
//         }
//         // Отсылаем HTML-шаблон, в который вставлен результат рендеринга приложения
//         res.send(layout.replace('<div id="app"></div>', html))
//       }
//     )
//   });
  // res.sendFile(__dirname + '/views/index.html', {posts: posts});
    // Рендерим наше приложение в строку
    getPageAll()
    .then(data => {
      res.render('index', {
        posts: data,
        html: data,
        markdown: markdown.toHTML('"Hello *World*!"') 
      });
    })
    .catch(function (err) {
      console.log(err);
    });

  // res.send(__dirname + '/views/index.pug', {posts: posts});
});

app.get('/add', (req, res, next) => {
  res.render('add');
});

app.get('/auth', (req, res, next) => {
  res.render('auth');
});

app.use('/api', authRoute);
app.use('/api', checkToken, userRoute);
app.use(getUser);
app.use('/api', checkToken, pageRoute);
app.use('/api', checkToken, uploadRoute);

// проверка работы токена
// app.get('/token', checkToken, (req, res) => {
// 	res.json('token');
// });

// обработчик ошибок все последний
app.use(errorHandler);