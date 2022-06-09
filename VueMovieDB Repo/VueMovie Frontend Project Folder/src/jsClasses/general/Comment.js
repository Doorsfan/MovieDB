export default class Comments {
  constructor(
    commentId,
    relatesToVideoId,
    postedByUsername,
    content,
    likes,
    dislikes,
    respondedToCommentId,
    timeOfPosting
  ) {
    this.commentId = commentId;
    this.relatesToVideoId = relatesToVideoId;
    this.postedByUsername = postedByUsername;
    this.content = content;
    this.likes = likes;
    this.dislikes = dislikes;
    this.responseToCommentId = respondedToCommentId;
    this.timeOfPosting = timeOfPosting;
  }

  settimeOfPosting(timeOfPosting) {
    this.timeOfPosting = timeOfPosting;
  }

  gettimeOfPosting() {
    return this.timeOfPosting;
  }
  getRespondedToCommentId() {
    return this.respondedToCommentId;
  }

  setRespondedToCommentId(respondedToCommentId) {
    this.respondedToCommentId = respondedToCommentId;
  }

  getDislikes() {
    return this.dislikes;
  }

  setDislikes(dislikes) {
    this.dislikes = dislikes;
  }

  setLikes(likes) {
    this.likes = likes;
  }

  getLikes() {
    return this.likes;
  }

  setContent(content) {
    this.content = content;
  }

  getContent() {
    return this.content;
  }

  getPostedByUsername() {
    return this.postedByUsername;
  }

  setPostedByUsername(postedByUsername) {
    this.postedByUsername = postedByUsername;
  }

  getRelatesToVideoId() {
    return this.relatesToVideoId;
  }

  setRelatesToVideoId(videoId) {
    this.relatesToVideoId = this.relatesToVideoId;
  }

  getCommentId() {
    return this.commentId;
  }

  setCommentId(commentId) {
    this.commentId = commentId;
  }
}
