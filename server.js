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

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

import {getPageAll} from './services/PageService.js';

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

app.set('view engine', 'pug');

app.get('/', (req, res, next) => {
  getPageAll()
    .then(data => {
      res.render('index', {
        posts: data
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


// проверка работы токена
// app.get('/token', checkToken, (req, res) => {
// 	res.json('token');
// });



// обработчик ошибок все последний
app.use(errorHandler);