'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _nuxt = require('nuxt');

var _nuxt2 = _interopRequireDefault(_nuxt);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./routes/user');

var _user2 = _interopRequireDefault(_user);

var _page = require('./routes/page');

var _page2 = _interopRequireDefault(_page);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _checkToken = require('./middlewares/checkToken');

var _checkToken2 = _interopRequireDefault(_checkToken);

var _getUser = require('./middlewares/getUser');

var _getUser2 = _interopRequireDefault(_getUser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

var host = process.env.HOST || '127.0.0.1';

_mongoose2.default.Promise = _bluebird2.default;
_mongoose2.default.connect(_config2.default.database, function (err) {
    if (err) {
        throw err;
    }

    console.log('Mongoose connect');
});

// Import and Set Nuxt.js options
var configNuxt = require('./nuxt.config.js');
configNuxt.dev = !(process.env.NODE_ENV === 'production');

// Init Nuxt.js
var nuxt = new _nuxt2.default(configNuxt);
app.use(nuxt.render);

// Build only in dev mode
if (configNuxt.dev) {
    nuxt.build().catch(function (error) {
        console.error(error); // eslint-disable-line no-console
        process.exit(1);
    });
}

// Listen the server
app.listen(_config2.default.port, function (err) {
    if (err) throw err;

    console.log('Server listening on port ' + _config2.default.port);
});

app.use((0, _morgan2.default)('tin'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use((0, _expressSession2.default)({
    resave: true,
    saveUninitialized: true,
    secret: _config2.default.secret
}));

// app.get('/admin', async (req, res) => {
//     res.render('admin.vue');
// });

app.use('/api', _auth2.default);
app.use('/api', _checkToken2.default, _user2.default);
app.use(_getUser2.default);
app.use('/api', _checkToken2.default, _page2.default);

// проверка работы токена
// app.get('/token', checkToken, (req, res) => {
// 	res.json('token');
// });


// обработчик ошибок все последний
app.use(_errorHandler2.default);
