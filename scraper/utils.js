import striptags from 'striptags';

// given a DOM node, get the actual data we want.
export function getCleanData(data) {
  return striptags(data.innerHTML.replace(/(\n|&nbsp;|&gt;|\t)/g, '')).trim();
}
