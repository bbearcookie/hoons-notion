import Page from "@/core/Page";

export default class CommentPage extends Page {
  initialize() {
    this.render = this.render.bind(this);
  }

  template() {
    return `
      <h1>Comment Page</h1>
      <p data-id="post-id"></p>
      <p data-id="comment-id"></p>
    `;
  }

  render() {
    const postId = Number(this.pageStore.state.parameters.postId) || 0;
    const commentId = Number(this.pageStore.state.parameters.commentId) || 0;

    this.element.querySelector(
      '[data-id="post-id"]'
    )!.textContent = `${postId.toString()}번째 포스트`;

    this.element.querySelector(
      '[data-id="comment-id"]'
    )!.textContent = `${commentId.toString()}번째 댓글`;
  }
}
