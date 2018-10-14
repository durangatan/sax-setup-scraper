import getJSDOM from '../fetcher';
import scraper from '../scraper';
import writeToJson from '../writer';

// Runner
// takes a config and runs with it!

export default function runner({ sourceUrl, scrapeFunction, outputFile }) {
  getJSDOM(sourceUrl)
    .then(jsDom => scraper(jsDom, scrapeFunction))
    .then(({ allPropertyNames, players }) => writeToJson({ allPropertyNames, players, sourceUrl }, outputFile))
    .catch(console.err);
}
