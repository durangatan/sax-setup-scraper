import fetch from 'isomorphic-fetch';
import { JSDOM } from 'jsdom';
// A basic fetcher that retuns a JSDOM object
export default async function getJSDOM(url) {
  try {
    const res = await fetch(url);
    const text = await res.text();
    const dom = new JSDOM(text);
    return dom.window.document;
  } catch (e) {
    console.log(e);
  }
}
