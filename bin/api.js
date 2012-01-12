#!/usr/bin/env node

var perfectapi = require('perfectapi');  
//var perfectapi = require('../../perfectapi/api.js');  
var path = require('path');
var request = require('request');

var configPath = path.resolve(__dirname, '..', 'perfectapi.json');
var parser = new perfectapi.Parser();

//handle the commands
parser.on('getLegislator', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/legislators.get.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getLegislators', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/legislators.getList.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('searchLegislators', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/legislators.search.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getLegislatorsForZip', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/legislators.allForZip.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getLegislatorsForLatLong', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/legislators.allForLatLong.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getDistrictsFromZip', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/districts.getDistrictsFromZip.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getDistrictFromLatLong', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/districts.getDistrictFromLatLong.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getCommittees', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/committees.getList.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getCommittee', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/committees.get.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getAllCommitteesForLegislator', function(config, callback) {
	callAnyApi(config, 'http://services.sunlightlabs.com/api/committees.allForLegislator.json?apikey=<SUNLIGHT_API_KEY>', callback);
});


parser.on('getCampaignContributions', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/contributions.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getFederalLobbying', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/lobbying.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getFederalGrants', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/grants.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getFederalContracts', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/contracts.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('searchPoliticalEntities', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/entities.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('lookupPoliticalEntityById', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/entities/id_lookup.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getEntityOverview', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/entities/<id>.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getTopContributorsForPolitician', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/pol/<id>/contributors.json?apikey=<SUNLIGHT_API_KEY>', callback);
});

parser.on('getTopSectorsForPolititian', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/pol/<id>/contributors/sectors.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getTopIndustriesWithinSector', function(config, callback) {
	//does not work, even using the example they provide directly in the browser
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/pol/<id>/contributors/sector/<sector>/industries.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getLocalBreakdown', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/pol/<id>/contributors/local_breakdown.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getContributorTypeBreakdown', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/pol/<id>/contributors/type_breakdown.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getIndividualsTopRecipientOrgs', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/indiv/<id>/recipient_orgs.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getIndividualsTopRecipientPoliticians', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/indiv/<id>/recipient_pols.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getIndividualsPartyBreakdown', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/indiv/<id>/recipients/party_breakdown.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getOrganizationsTopRecipients', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/org/<id>/recipients.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getOrganizationsPartyBreakdown', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/org/<id>/recipients/party_breakdown.json?apikey=<SUNLIGHT_API_KEY>', callback);
});
parser.on('getOrganizationsStateFederalBreakdown', function(config, callback) {
	callAnyApi(config, 'http://transparencydata.com/api/1.0/aggregates/org/<id>/recipients/level_breakdown.json?apikey=<SUNLIGHT_API_KEY>', callback);
});

//expose the api
module.exports = parser.parse(configPath);


/* ------------ helper functions --------------------- */

function callAnyApi(config, pattern, callback) {
	//pattern should use <xyz> to indicate config or parameter or environment name.  Remaining items will be passed as query params
	
	var matches = pattern.match(/\<.+?\>/g);
	var ignoreList = ['options','environment'];
	for (var i=0;i<matches.length;i++) {
		var name = matches[i].substring(1, matches[i].length - 1);
		var val;
		
		if (config.environment && config.environment[name]) 
			val = config.environment[name]
		else if (config.options && config.options[name])
			val = config.options[name]
		else if (config[name])
			val = config[name]
		else
			console.log('Failed to find matching config for ' + name);
			
		if (val) {
			pattern = pattern.replace(matches[i], val);
			ignoreList.push(name);
		}
	}
	
	//now get the rest of the options/parameters
	var url = pattern;
	var query = '';
	var sep = (url.indexOf('?') == -1) ? '?' : '&';
	var options = config.options;
	for( var p in options ) {
		var val = options[p];
		if ((val != '') && (ignoreList.indexOf(p) == -1) ) {
			if (val === true) {
				query += sep + p + '=1' 
				sep = '&';
			} else if (val == 'false') {
				//don't pass false, it is default (hopefully)
			} else {
				query += sep + p + '=' + encodeURIComponent(val);
				sep = '&';
			}
		}
	}
	
	for( var p in config ) {
		if (ignoreList.indexOf(p) == -1) {
			query += sep + p + '=' + encodeURIComponent(config[p]);
			sep = '&';
		}
	}
	
	url += query;
	callRestService(url, callback);
}

function callRestService(uri, callback) {
	console.log('calling ' + uri);
	request(uri, function (err, res, body) {
		if (!err && res.statusCode == 200) {
			//console.log('got good response from ' + uri);
			var result = {};
			try { 
				result = JSON.parse(body); 
			} 
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