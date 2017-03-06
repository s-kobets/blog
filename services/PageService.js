import Page from '../models/page';
import config from '../config';

export async function getPageAll() {
 
  try {
    var pages = await Page.find({});
  } catch (e) {
    throw e;
  }

  return pages;
}
