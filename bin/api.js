#!/usr/bin/env node

//var perfectapi = require('perfectapi');  
var perfectapi = require('../../perfectapi/api.js');  
var path = require('path');
var request = require('request');

var configPath = path.resolve(__dirname, '..', 'perfectapi.json');
var parser = new perfectapi.Parser();

//handle the commands
parser.on('getLegislator', function(config, callback) {
	callSunlightApi('legislators.get', config, callback);
});
parser.on('getLegislators', function(config, callback) {
	callSunlightApi('legislators.getList', config, callback);
});
parser.on('searchLegislators', function(config, callback) {
	callSunlightApi('legislators.search', config, callback);
});
parser.on('getLegislatorsForZip', function(config, callback) {
	callSunlightApi('legislators.allForZip', config, callback);
});
parser.on('getLegislatorsForLatLong', function(config, callback) {
	callSunlightApi('legislators.allForLatLong', config, callback);
});
parser.on('getDistrictsFromZip', function(config, callback) {
	callSunlightApi('districts.getDistrictsFromZip', config, callback);
});
parser.on('getDistrictFromLatLong', function(config, callback) {
	callSunlightApi('districts.getDistrictFromLatLong', config, callback);
});
parser.on('getCommittees', function(config, callback) {
	callSunlightApi('committees.getList', config, callback);
});
parser.on('getCommittee', function(config, callback) {
	callSunlightApi('committees.get', config, callback);
});
parser.on('getAllCommitteesForLegislator', function(config, callback) {
	callSunlightApi('committees.allForLegislator', config, callback);
});
parser.on('getCampaignContributions', function(config, callback) {
	callTransparencyApi('contributions', config, callback);
});
parser.on('getFederalLobbying', function(config, callback) {
	callTransparencyApi('lobbying', config, callback);
});
parser.on('getFederalGrants', function(config, callback) {
	callTransparencyApi('grants', config, callback);
});
parser.on('getFederalContracts', function(config, callback) {
	callTransparencyApi('contracts', config, callback);
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
	
	//special handling parameters
	if (config.name && (config.name != '')) {
		query += '&name=' + config.name;
	}
	if (config.zip && (config.zip != '')) {
		query += '&zip=' + config.zip;
	}
	if (config.chamber && (config.chamber != '')) {
		query += '&chamber=' + config.chamber;
	}
	if (config.bioguide_id && (config.bioguide_id != '')) {
		query += '&bioguide_id=' + config.bioguide_id;
	}
	if (config.id && (config.id != '')) {
		query += '&id=' + config.id;
	}
	
	console.log(query);
	return query;
}

function callTransparencyApi(apiName, config, callback) {
	var endPoint = 'http://transparencydata.com/api/1.0/';
	
	callSunlightApi(apiName, config, endPoint, callback);
}

//endPoint is optional, defaults otherwise 
function callSunlightApi(apiName, config, endPoint, callback) {
	if (typeof(endPoint) === 'function') {
		callback = endPoint;
		endPoint = 'http://services.sunlightlabs.com/api/';
	}

	var query = getQueryFromOptions(config);
	var uri = encodeURI(endPoint + apiName + '.json?apikey=' + config.environment.SUNLIGHT_API_KEY + '&' + query);
	console.log('calling ' + uri);
	request(uri, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			console.log('got good response from ' + uri);
			var result = {};
			try { result = JSON.parse(body); } 
			catch (err) {
				callback('Error parsing body result:' + body, result);
				return;
			};
			callback(err, result);
		} else {
			console.log('got BAD response from ' + uri);
			callback(err || body);
		}
	});
}