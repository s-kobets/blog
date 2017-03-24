import Page from '../models/page';
import config from '../config';
import {markdown} from 'markdown';
import paginat from '../static_src/js/pagination'

export async function getPageAll(req) {
  let pages;
  const page = req.query.page ? req.query.page : 1;
  try {
    await Page.paginate({}, { page: req.query.page, limit: config.limit })
      .then(result => {
        pages = result.docs;
        // pages.paginat = paginat(result.pages, Number(result.page));
        pages.paginat = {
          total: Math.ceil(result.total/config.limit),
          current: page
        }
        // console.log(result);
    });


    // var pages = await Page.find({});
  } catch (e) {
    throw e;
  }
// 
  // function fn(element) { // sample async action
  //   return new Promise(resolve => {
  //   	resolve(markdown.toHTML(element.body)); 
  //   });
  // };
  // // map over forEach since it returns
  // var actions = pages.map(fn); // run the function over all items.

  // // we now have a promises array and we want to wait for it
  // var results = Promise.all(actions); // pass array of promises

  // results.then(data => {// or just .then(console.log)
	 //  return pages; 
  // });

  pages.forEach(function(element, index) {
    if (element.body) {
      element.body = markdown.toHTML(element.body);
    }
  });

  return pages;
  
}
