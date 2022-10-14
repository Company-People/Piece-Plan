import Component from '../../../core/Component.js';

class Detail extends Component {
  render() {
    const { category, title, subTitle, content, favoriteCnt, time } = this.props.targetPiece || this.props.pieces[0];

    // prettier-ignore
    return `
      <section class="piece">
        <h2 class="piece-title text-gradient">${title}</h2>
        <div class="piece-info">
          <div class="piece-label">
            <span class="piece-time">${time}h</span>
            <span class="piece-category">${category}</span>
          </div>
          <button class="piece-favorite">${favoriteCnt}</button>
        </div>
        <section class="piece-content">
          <h3 class="piece-subtitle">${subTitle}</h3>
          <p class="piece-describtion">
            ${content}
          </p>
        </section>
        <button class="btn-close"></button>
      </section>
      `;
  }

  closePieceDetail({ target }) {
    if (!target.matches('.piece > .btn-close')) return;
    document.querySelector('.modal')?.classList.remove('moving');
  }

  setEvent() {
    return [
      {
        type: 'click',
        selector: '.piece',
        handler: this.closePieceDetail,
      },
    ];
  }
}

export default Detail;
