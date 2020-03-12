const EventEmitter = require('events');

const postsBus = new EventEmitter();

function onPostAdded(post) {
  postsBus.emit('newPost', post);
}

module.exports = {
  postsBus,
  onPostAdded
};