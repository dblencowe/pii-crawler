const http = require('http');

export const extractDomainFromEmail = (email) => {
    return email.replace(/.*@/, '');
}

export function log(err, message) {
    console.log(message);
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }
}

export function validateUrl(url) {
    if (isLiveUrl(url)) return url;
    if (isLiveUrl(`http://${url}`)) return `http://${url}`;
    if (isLiveUrl(`https://${url}`)) return `https://${url}`;
}

function isLiveUrl(url) {
    try {
        return http.get(url, function(res) {
            return true;
        }).on('error', function(e) {
            console.log(`${url} is currently not reachable`);
        });
    } catch(e) {
        // Url unreachable but this is fine
    }    
}