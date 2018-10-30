const cheerio = require('cheerio');
const Knwl = require('knwl.js');
let knwlInstance = null;
let profile = {};

function setupKnwl($) {
    let lang = null;
    if ($('html').attr('lang')) {
        lang = $('html').attr('lang').replace(/-.*/, '');
        const languages = require('./json/languages');
        console.log(`Setting scrape language to ${languages[lang].name}`);
        knwlInstance = new Knwl(languages[lang].name);
        [
            { name: 'dates', file: 'default_plugins/dates' },
            { name: 'links', file: 'default_plugins/links' },
            { name: 'phones', file: 'default_plugins/phones' }
        ].forEach((plugin) => {
            knwlInstance.register(plugin.name, require(`knwl.js/${plugin.file}`));
        });
    }
}

function extractFrom(item) {
    knwlInstance.init(item.text());
    Object.keys(knwlInstance.plugins).forEach(function(key) {
        let result = knwlInstance.get(key);
        if (result.length !== 0) {
            profile[key] = profile[key] || [];
            result.forEach(function(rst) {
                profile[key].push(rst.address);
            });
        }        
    });
}

function parse($) {
    if (! knwlInstance) {
        setupKnwl($);
    }

    $('html').each(function() {
        extractFrom($(this));
    })

    return profile;
}

module.exports = parse;