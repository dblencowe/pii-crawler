const cheerio = require('cheerio');
const Knwl = require('knwl.js');
let knwlInstance = null;
let profile = {};

// let parseHead = ($) => {
//     $('head').each()
// };

let setupKnwl = ($) => {
    let lang = null;
    if ($('html').attr('lang')) {
        lang = $('html').attr('lang').replace(/-.*/, '');
        const languages = require('./json/languages');
        console.log(`Setting scrape language to ${languages[lang].name}`);
        knwlInstance = new Knwl(languages[lang].name);
    }
}

module.exports = {
    parse(content) {
        if (! knwlInstance) {
            setupKnwl(content);
        }

        return profile;
    }
}