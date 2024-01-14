import Component from "@/core/Component";
import { pageStore } from "@/stores/PageStore";

export default class CommentPage extends Component {
  initialize() {
    this.render = this.render.bind(this);
    this.subscribe([pageStore]);
  }

  template() {
    return `
      <h1>Comment Page</h1>
      <p data-id="post-id"></p>
      <p data-id="comment-id"></p>
    `;
  }

  render() {
    const postId = Number(pageStore.state.parameters.postId) || 0;
    const commentId = Number(pageStore.state.parameters.commentId) || 0;

    this.element.querySelector(
      '[data-id="post-id"]'
    )!.textContent = `${postId.toString()}번째 포스트`;

    this.element.querySelector(
      '[data-id="comment-id"]'
    )!.textContent = `${commentId.toString()}번째 댓글`;
  }
}
