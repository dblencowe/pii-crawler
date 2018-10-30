export const extractDomainFromEmail = (email) => {
    return email.replace(/.*@/, '');
}

export function log(err, message) {
    console.log(message);
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }
}