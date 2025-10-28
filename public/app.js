import { API } from './services/API.js';

import './components/HomePage.js';

window.app = {
  search: (event) => {
      event.preventDefault();
      const q = document.querySelector("input[type='search']").value;
      console.log("Searching for:", q);
    },
    api: API,
};
