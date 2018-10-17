const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { authorize, getNewToken } = require("./utils");

export default function getGoogleSheet({ spreadsheetId, range, callback }) {
  return fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Sheets API.
    return authorize(JSON.parse(content), auth => getRange(auth, spreadsheetId, range, callback));
  });
}

/**
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function getRange(auth, spreadsheetId, range, callback) {
  const sheets = google.sheets({ version: "v4", auth });
  return sheets.spreadsheets.values.get(
    {
      spreadsheetId,
      range
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      return callback(res.data.values);
    }
  );
}
