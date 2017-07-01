import Page from '../models/page';
import config from '../config';
import {markdown} from 'markdown';

export async function getPageAll(req) {
  let pages;
  const page = req.query.page ? req.query.page : 1;
  try {
    await Page.paginate({}, { page: req.query.page, limit: config.limit })
      .then(result => {
        pages = result.docs;
        pages.paginat = {
          total: Math.ceil(result.total/config.limit),
          current: page
        }
    });

  } catch (e) {
    throw e;
  }

  pages.forEach(function(element, index) {
    if (element.body) {
      element.body = markdown.toHTML(element.body);
    }
  });

  return pages;

}
