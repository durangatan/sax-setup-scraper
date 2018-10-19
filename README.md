# Sax Setups Scraping Monorepo
I've been using this as a monorepo for a number of tasks such as:
- fetching web pages that contain info about sax setups
- scraping wep pages for sax setups
- writing those setups to a JSON object or Google Sheet
- normalizing the data in the JSON object
- seeding a Cloud Firestore database with the sax setups
- getting image paths from the wikiemdia API
## usage

install your dependencies:
`npm install`

start the script:
`npm start`

right now the script just scrapes the one site that has a config. I've set it up so that more configs can be added later for more sites.
