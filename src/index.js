import { extractDomainFromEmail } from './utils';
import Parser from './Parse';
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
        let profile = Parser.parse($);
        console.log(profile);
    })
    .catch((err) => {
        console.log(`Initial crawl page did not return a 200 status. Got ${err.status}. Aborting`);
        if (process.env.NODE_ENV === 'development') {
            console.log(err);
        }
        process.exit(1);
    });
