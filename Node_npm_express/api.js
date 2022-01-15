const fetch = require('node-fetch');

function getPostcodes() {
    let httpPromise = fetch('https://raw.githubusercontent.com/theikkila/postinumerot/master/postcode_map_light.json')
    let postinumerot = httpPromise.then(response => response.json());
    return postinumerot;
}

module.exports = { getPostcodes };