"use strict";
function isInteractiveComment(comment) {
    return comment.commentType == 'comment';
}
function isInteractiveReply(comment) {
    return comment.commentType == 'reply';
}
