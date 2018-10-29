export const extractDomainFromEmail = (email) => {
    return email.replace(/.*@/, '');
}
