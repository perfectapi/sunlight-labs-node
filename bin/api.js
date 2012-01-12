#!/usr/bin/env node

var perfectapi = require('perfectapi');  
var path = require('path');
var request = require('request');

var configPath = path.resolve(__dirname, '..', 'perfectapi.json');
var parser = new perfectapi.Parser();

var endPoint = "http://services.sunlightlabs.com/api/";

//handle the commands
parser.on("getLegislator", function(config, callback) {
	callSunlightApi('legislators.get', config, callback);
});

parser.on("getLegislators", function(config, callback) {
	callSunlightApi('legislators.getList', config, callback);
});

parser.on("searchLegislators", function(config, callback) {
	callSunlightApi('legislators.search', config, callback);
});

//expose the api
module.exports = parser.parse(configPath);


/* ------------ helper functions --------------------- */

function getQueryFromOptions(config) {
	var query = '';
	var options = config.options;
	for( var p in options ) {
		if (options[p] != '') {
			if (p==='all_legislators') {
				if (options[p] == true) query += '&' + p + '=1' 
			} else {
				query += '&' + p + '=' + encodeURIComponent(options[p]);
			}
		}
	}
	
	//special handling name parameter
	if (config.name && (config.name != '')) {
		query += '&name=' + config.name;
	}
	
	console.log(query);
	return query;
}

function callSunlightApi(apiName, config, callback) {
	var query = getQueryFromOptions(config);
	var uri = encodeURI(endPoint + apiName + '.json?apikey=' + config.environment.SUNLIGHT_API_KEY + '&' + query);
	request(uri, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			var result = JSON.parse(body).response;
			callback(err, result);
		} else {
			callback(body);
		}
	});
}