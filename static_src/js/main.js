/* global */
// const Vue = require('vue');
// import SimpleMDE from 'simplemde';
// import createApp from './create-app';
// console.log(33333333333333333, createApp(Vue));
import auth from './auth';
import addPost from './add-post';
// require('../../node_modules/simplemde/dist/simplemde.min.css');
require('../css/main.css');
/* page add */
// const simplemde = new SimpleMDE({
// 	element: document.getElementById('js-add-post')
// });

// console.log(simplemde);
auth();
addPost();
