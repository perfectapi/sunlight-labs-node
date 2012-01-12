
# Intro

Sunlight Labs provides several APIs for accessing political data within the US.  This project is a Node.js wrapper for those APIs.  The APIs are:

 - Sunlight Labs Congress API - Information on members of congress: contact information, IDs on various websites, and committees. Also provides methods for finding legislators by location or district.
 - Transparency Data API - Transparency Data gives programmers and journalists the ability to easily create subsets of large data for their own research and development purposes. The API currently offers campaign contributions and lobbying records with more data sets coming soon.
 - Open States API (not available in this wrapper) - Open States collects and makes available data about state legislative activities, including bill summaries, votes, sponsorships and state legislator information. This data is gathered directly from the states and made available in a common format for interested developers, through a RESTful API and through upcoming data dumps.
 - Real Time Congress API (not available in this wrapper) - The Real Time Congress API is a RESTful API over the artifacts of Congress, updated in as close to real time as possible. This includes data on floor updates, committee hearings, floor video, bills, votes, amendments, and various documents and reports.
 
# Help please

The work to add missing APIs is not difficult, but it is laborious.  I will welcome any contributions that can add the missing APIs.

# Install

    npm install sunlight-labs

# Usage

Can currently be used from test server, command-line, or from Node.js.  Requires a Sunlight Labs api key, which is free and easy at their website.

## From a test server

You have to do a global install to enable the command-line.  `[sudo] npm install -g sunlight-labs`.  

Type `sunlight-labs server` to start a local server, and then browse to `http://localhost:3000/sunlightlabs/testapp/`.

## From Command-line

You have to do a global install to enable the command-line.  `[sudo] npm install -g sunlight-labs`.

Type `sunlight-labs --help` for a list of commands.  For a given command `x`, type `sunlight-labs x --help` for help.  For command-line usage, set an environment variable `SUNLIGHT_API_KEY` with your key.

## From Node.js

Like any other API.  Run the test server or the command-line to get help on the available commands and their parameters.

```
var sunlight = require('sunlight-labs');

var config = {};
config.name = "Nancy Pelosi"
sunlight.searchLegislators(config, function(err, result) {
	//do something with the result
});
```
