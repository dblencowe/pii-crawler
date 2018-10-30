import { extractDomainFromEmail, log } from './utils';
const parse = require('./Parse');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

let email = process.argv[2];
let url = process.argv[3] || extractDomainFromEmail(email);

// @todo add validation here

let options = {
    uri: url,
    transform: function(body) {
        return cheerio.load(body);
    }
}

rp(options)
    .then(($) => {
        let profile = parse($);
        console.log(profile);
    })
    .catch((err) => {
        log(err, `Initial crawl page did not return a 200 status. Got ${err.status}. Aborting`);
        process.exit(1);
    });
