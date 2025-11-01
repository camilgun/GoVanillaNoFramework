export class MovieItemComponent extends HTMLElement {
  constructor(movie) {
    super();
    this.movie = movie;
  }

  connectedCallback() {
    this.innerHTML = `
      <a href="/movies/${this.movie.id}">
        <article>
          <img src="${this.movie.poster_url}"
            alt="${this.movie.title} Poster">
          <p>${this.movie.title} (${this.movie.release_year})</p>
        </article>
      </a>
    `;

    const link = this.querySelector('a');
    link.addEventListener('click', (event) => {
      event.preventDefault();
      app.Router.go(`/movies/${this.movie.id}`);
    });
  }
}

customElements.define('movie-item', MovieItemComponent);
