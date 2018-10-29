const cheerio = require('cheerio');
const Knwl = require('knwl.js');
let knwlInstance = null;
let profile = {};

let setupKnwl = ($) => {
    let lang = null;
    if ($('html').attr('lang')) {
        lang = $('html').attr('lang').replace(/-.*/, '');
        const languages = require('./json/languages');
        console.log(`Setting scrape language to ${languages[lang].name}`);
        let knwlInstance = new Knwl(languages[lang].name);
        [
            { name: 'dates', file: 'default_plugins/dates' },
            { name: 'links', file: 'default_plugins/links' },
            { name: 'phones', file: 'default_plugins/phones' }
        ].forEach((plugin) => {
            knwlInstance.register(plugin.name, require(`knwl.js/${plugin.file}`));
        });
    }
}

module.exports = {
    parse(content) {
        if (! knwlInstance) {
            setupKnwl(content);
        }

        let items = startElem.getElementsByTagName("*");
        for (let i = items.length; i--;) {
            extractFrom(item);
        }

        return profile;
    }
}