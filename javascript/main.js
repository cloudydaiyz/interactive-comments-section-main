"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentUser;
let comments;
let numComments = 0;
// Top level functions
function createId() {
    return Math.round(Date.now() / (1000));
}
function importComments(origin) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield fetch(origin).then(res => res.json());
        const newComments = [];
        const allCommentData = data.comments;
        let numNewComments = 0;
        try {
            for (const commentData of allCommentData) {
                const newComment = {
                    id: numNewComments,
                    commentType: 'comment',
                    content: commentData.content,
                    createdAt: commentData.createdAt,
                    score: commentData.score,
                    user: {
                        image: {
                            png: commentData.user.image.png,
                            webp: commentData.user.image.webp
                        },
                        username: commentData.user.username
                    },
                    replies: [],
                    upvoted: false,
                    downvoted: false
                };
                numNewComments++;
                newComments.push(newComment);
                // Add the replies to the comment as well
                for (const replyData of commentData.replies) {
                    const newReply = {
                        id: numNewComments,
                        commentType: 'reply',
                        content: replyData.content,
                        createdAt: replyData.createdAt,
                        score: replyData.score,
                        user: {
                            image: {
                                png: replyData.user.image.png,
                                webp: replyData.user.image.webp
                            },
                            username: replyData.user.username
                        },
                        upvoted: false,
                        downvoted: false,
                        replyingTo: replyData.replyingTo,
                        editing: false
                    };
                    numNewComments++;
                    newComment.replies.push(newReply);
                }
            }
        }
        catch (error) {
            console.log(error);
        }
        comments = newComments;
        numComments = numNewComments;
    });
}
// Returns information about where the comment's at 
// [comment container index]
function findComment(id) {
    for (let i = 0; i < comments.length; i++) {
        const icomment = comments[i];
        if (icomment.id == id)
            return [icomment, comments, i];
        for (let j = 0; j < icomment.replies.length; j++) {
            const reply = icomment.replies[j];
            if (reply.id == id)
                return [reply, icomment.replies, j];
        }
    }
}
function populateTestData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield importComments('data.json');
        currentUser = {
            image: {
                png: './images/avatars/image-juliusomo.png',
                webp: './images/avatars/image-juliusomo.webp'
            },
            username: 'juliusomo'
        };
    });
}
function rerender() {
    console.log(comments);
    render(comments, currentUser, commentBindings, createReplyBindings);
}
// Event Bindings
const commentBindings = {
    updateCommentEvent: function (commentId, reply) {
        const commentInfo = findComment(commentId);
        if (commentInfo == undefined) {
            throw new Error("Can't find comment");
        }
        commentInfo[0].content = reply;
        rerender();
    },
    likeCommentEvent: function (commentId) {
        const commentInfo = findComment(commentId);
        if (commentInfo == undefined) {
            throw new Error("Can't find comment");
        }
        // Disable its downvoted state
        if (commentInfo[0].downvoted) {
            commentInfo[0].score++;
        }
        commentInfo[0].downvoted = false;
        // Toggle its upvoted state
        if (commentInfo[0].upvoted) {
            commentInfo[0].upvoted = false;
            commentInfo[0].score--;
        }
        else {
            commentInfo[0].upvoted = true;
            commentInfo[0].score++;
        }
        rerender();
    },
    dislikeCommentEvent: function (commentId) {
        const commentInfo = findComment(commentId);
        if (commentInfo == undefined) {
            throw new Error("Can't find comment");
        }
        // Disable its upvoted state
        if (commentInfo[0].upvoted) {
            commentInfo[0].score--;
        }
        commentInfo[0].upvoted = false;
        // Toggle its downvoted state
        if (commentInfo[0].downvoted) {
            commentInfo[0].downvoted = false;
            commentInfo[0].score++;
        }
        else {
            commentInfo[0].downvoted = true;
            commentInfo[0].score--;
        }
        rerender();
    },
    initiateReplyEvent: function (replyingTo) {
        const commentInfo = findComment(replyingTo);
        if (commentInfo == undefined) {
            throw new Error("Can't find comment to reply to");
        }
        const [replyTo, replyToContainer] = commentInfo;
        const reply = {
            id: -1,
            commentType: 'reply',
            content: `Add reply to ${replyTo.user.username}...`,
            createdAt: 'Now',
            score: 0,
            user: currentUser,
            upvoted: false,
            downvoted: false,
            replyingTo: replyingTo,
            editing: true
        };
        // Remove any existing initated reply that hasn't been submitted and
        // add the new reply
        if (isInteractiveComment(replyTo)) {
            const replyIndex = replyTo.replies.findIndex((element) => element.editing == true);
            if (replyIndex != -1)
                replyTo.replies.splice(replyIndex, 1);
            replyTo.replies.push(reply);
        }
        else {
            const replyIndex = replyToContainer.findIndex((element) => element.editing == true);
            if (replyIndex != -1)
                replyToContainer.splice(replyIndex, 1);
            replyToContainer.push(reply);
        }
        rerender();
    }
};
const createReplyBindings = {
    submitReplyEvent: function (replyId, replyContent) {
        const replyInfo = findComment(replyId);
        if (replyInfo == undefined) {
            throw new Error("Can't find reply");
        }
        const reply = replyInfo[0];
        // Finalize the ID and the rest of the reply properties
        reply.id = createId();
        reply.content = replyContent;
        reply.editing = false;
        numComments++;
        rerender();
    }
};
const bootstrapBindings = {
    deleteCommentEvent: function (commentId) {
        const commentInfo = findComment(commentId);
        if (commentInfo == undefined) {
            throw new Error("Can't find comment");
        }
        let [comment, container, index] = commentInfo;
        container.splice(index, 1);
        numComments--;
        rerender();
    },
    addCommentEvent(comment) {
        const newComment = {
            id: -1,
            commentType: 'comment',
            content: comment,
            createdAt: 'Now',
            score: 0,
            user: currentUser,
            upvoted: false,
            downvoted: false,
            replies: []
        };
        comments.push(newComment);
        rerender();
    },
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield populateTestData();
    bootstrap(bootstrapBindings);
    rerender();
}))();
