import getJSDOM from "../fetcher";
import scraper from "../scraper";
import writeToJson from "../writer";

// Runner
// takes a config and runs with it!

export default function runner({ sourceUrl, scrapeFunction, outputFile }) {
  return getJSDOM(sourceUrl)
    .then(jsDom => scraper(jsDom, scrapeFunction))
    .then(({ players }) => writeToJson({ players, sourceUrl }, outputFile))
    .catch(console.err);
}
