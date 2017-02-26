import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import bluebird from 'bluebird';
import Nuxt from 'nuxt';

import config from './config';
import authRoute from './routes/auth';
import userRoute from './routes/user';
import pageRoute from './routes/page';

import errorHandler from './middlewares/errorHandler';
import checkToken from './middlewares/checkToken';
import getUser from './middlewares/getUser';

const app = express();

const host = process.env.HOST || '127.0.0.1';

mongoose.Promise = bluebird;
mongoose.connect(config.database, err => {
	if (err) {
		throw err;
	}

	console.log('Mongoose connect');
});

// Import and Set Nuxt.js options
let configNuxt = require('./nuxt.config.js')
configNuxt.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(configNuxt)
app.use(nuxt.render)

// Build only in dev mode
if (configNuxt.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

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

// app.get('/admin', async (req, res) => {
//     res.render('admin.vue');
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