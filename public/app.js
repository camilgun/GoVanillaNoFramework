import './components/HomePage.js';
import './components/AnimatedLoading.js';
import './components/MovieDetailsPage.js';

window.app = {
  search: (event) => {
      event.preventDefault();
      const q = document.querySelector("input[type='search']").value;
      console.log("Searching for:", q);
    },
};
