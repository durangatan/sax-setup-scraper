// Scraper
// Give it a DOM and a scraping function and it will produce
// players and all property names used in the setups.
export default function scraper(jsDoc, scrapingFunction) {
  const { players } = scrapingFunction(jsDoc);
  return Promise.resolve({
    players
  });
}
