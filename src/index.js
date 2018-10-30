import { extractDomainFromEmail, log, validateUrl } from './utils';
const parse = require('./Parse');
const extractChildPages = require('./Indexer');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

let email = process.argv[2];
let url = process.argv[3] || extractDomainFromEmail(email);

// @todo add validation here
let profile = {};
let processedUrls = [];
let urls = [url];

function markUrlAsProcessed(url) {
    let index = urls.indexOf(url);
    if (index > -1) {
        urls.splice(index, 1);
    }
    processedUrls.push(url);
}

function crawlPage(url) {
    let options = {
        uri: url,
        transform: function(body) {
            return cheerio.load(body);
        }
    }

    rp(options)
        .then(($) => {
            Object.assign(profile, parse($));
            urls.concat(extractChildPages($, url, processedUrls));
            markUrlAsProcessed(url);
        })
        .catch((err) => {
            log(err, `Initial crawl page did not return a 200 status. Got ${err.status}. Aborting`);
            process.exit(1);
        });
}

urls.forEach(function(url) {
    let validUrl = validateUrl(url);
    console.log(`Starting crawl at ${validUrl}`);
    crawlPage(validUrl);
    console.log(profile);
});
