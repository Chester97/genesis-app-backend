const EventEmitter = require('events');

const postsBus = new EventEmitter();

function onPostAdded(post) {
  postsBus.emit('newPost', post);
}

const commentsBus = new EventEmitter();

function onCommentAdded(comment) {
  commentsBus.emit('newComment', comment);
}

module.exports = {
  commentsBus,
  postsBus,
  onPostAdded,
  onCommentAdded,
};