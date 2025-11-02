import './components/HomePage.js';
import './components/AnimatedLoading.js';
import './components/MovieDetailsPage.js';
import './components/YoutubeEmbed.js';
import { Router } from './services/Router.js';

document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});

window.app = {
  Router,
  showError: (message="There was an error." , goToHome=true) => {
    document.getElementById("alert-modal").showModal();
    document.querySelector("#alert-modal p").textContent = message;
    if (goToHome) {
      app.Router.go("/");
    }
  },
  closeError: () => {
    document.getElementById("alert-modal").close();
  },

  search: (event) => {
      event.preventDefault();
      const q = document.querySelector("input[type='search']").value;
      app.Router.go('movies?q=' + encodeURIComponent(q));
    },
};
