import "./components/HomePage.js";
import "./components/AnimatedLoading.js";
import "./components/MovieDetailsPage.js";
import "./components/YoutubeEmbed.js";
import { Router } from "./services/Router.js";
import { API } from "./services/API.js";
import Store from "./services/Store.js";

document.addEventListener("DOMContentLoaded", () => {
  Router.init();
});

window.app = {
  Router,
  Store,
  showError: (message = "There was an error.", goToHome = true) => {
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
    app.Router.go("/movies?q=" + encodeURIComponent(q));
  },
  searchOrderChange: (order) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    const genre = urlParams.get("genre") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  searchFilterChange: (genre) => {
    const urlParams = new URLSearchParams(window.location.search);
    const q = urlParams.get("q");
    const order = urlParams.get("order") ?? "";
    app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
  },
  register : async (event) => {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("register-password-confirmation").value;
    const errors = [];
    if (name.length < 2) errors.push("Name must be at least 2 characters long.");
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("Email is invalid.");
    if (password.length < 4) errors.push("Password must be at least 4 characters long.");
    if (password !== confirmPassword) errors.push("Passwords do not match.");
    if (errors.length > 0) {
      app.showError(errors.join(" "), false);
    }
    else {
      const response = await API.register(name, email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go("/account/");
      }
      else {
        app.showError(response.message, false);
      }
    }

  },
    login : async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const errors = [];
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.push("Email is invalid.");
    if (password.length < 4) errors.push("Password must be at least 4 characters long.");

    if (errors.length > 0) {
      app.showError(errors.join(" "), false);
    }
    else {
      const response = await API.login(email, password);
      if (response.success) {
        app.Store.jwt = response.jwt;
        app.Router.go("/account/");
      }
      else {
        app.showError(response.message, false);
      }
    }

  },

};
