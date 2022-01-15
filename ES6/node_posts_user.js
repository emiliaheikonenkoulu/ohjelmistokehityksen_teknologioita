let users = require('./users.json');
let posts = require('./posts.json');

let allPosts = users.map(user => {
    const result = {}
    result.name = user.name
    result.titles = posts.filter(post => {
        return post.userId === user.id
    }).map(post => post.title)
    return result
})

for (const user of allPosts) {
    console.log(user.name)
    console.log('- ' + user.titles.join('\n- '))
    console.log(' ')
}