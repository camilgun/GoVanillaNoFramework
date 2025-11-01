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
  search: (event) => {
      event.preventDefault();
      const q = document.querySelector("input[type='search']").value;
      console.log("Searching for:", q);
    },
};
