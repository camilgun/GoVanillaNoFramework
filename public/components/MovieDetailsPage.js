import { API } from "../services/API.js";


class MovieDetailsPage extends HTMLElement {
  movie = null;

  async render() {
    try {
      this.movie = await API.getMoviesById(this.movie)
    }
    catch {
      console.error("Movie does not exist");
      return;
    }
    const template = document.getElementById('template-movie-details');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
    this.querySelector("h2").textContent = this.movie.title;
    this.querySelector("h3").textContent = this.movie.tagline;
  }

  connectedCallback() {
    this.movie = 14; // temporary hardcoded movie id
    this.render();

  }

}

customElements.define('movie-details-page', MovieDetailsPage);
