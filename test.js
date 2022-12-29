import url from 'node:url';

const u = url.parse('https://www.google.com/a/b/c?d=2');

console.log(u.hostname);
