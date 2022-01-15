let users = require('./users.json');
let posts = require('./posts.json');

let result = users.map(row => {
    const allPosts = posts.filter(item => item.userId === row.id);
    return { ...row, allPosts };
});

let jsonString = JSON.stringify(result, null, 4);
const fs = require('fs');

fs.writeFileSync('output.json', jsonString);