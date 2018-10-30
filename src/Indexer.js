let links = [];
let domain = '';
let excludedUrls = [];

function findLinks($) {
    $('a[rel!="nofollow"]').each(function(link) {
        let target = $(link).attr('href');
        if (! target) {
            return true;
        }

        if (excludedUrls.indexOf(target) === -1) {
            console.log(`Adding ${target} to be spidered`);
            links.push(target);
        }
    });
}

function isRelative(url) {
    var reg = /^https?:\/\/|^\/\//i;
    if (! reg.test(url)) {
        return true;
    }

    return false;
}

function tidyLinks() {
    links.forEach(function(item, index) {
        if (isRelative(item)) {
            links[index] = domain + item;
        }
    });
}

function extractDomain(url) {
    let arr = url.split('/');
    
    return arr[0] + "//" + arr[1];
}

function extractChildPages($, searchUrl, setExcludedUrls) {
    excludedUrls = setExcludedUrls;
    domain = extractDomain(searchUrl)
    findLinks($);
    tidyLinks();

    return links;
}

module.exports = extractChildPages;