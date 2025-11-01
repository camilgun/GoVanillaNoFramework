import { routes } from "./Routes.js";

export const Router = {
  init: () => {
    window.addEventListener("popstate", () => {
      Router.go(location.pathname, false);
    });

    document.querySelectorAll("a.navlink").forEach(a => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = a.getAttribute("href");
        Router.go(href);
      });
    });

    Router.go(location.pathname + location.search);
  },
  go: (route, addToHistory=true) => {
    if (addToHistory) {
      history.pushState(null, "", route);
    }
    let pageElement = null;
    const routPath = route.includes("?") ? route.split("?")[0] : route;

    for (const r of routes) {
      if (typeof r.path === "string" && r.path === routPath) {
        pageElement = new r.component();
        break;
      }
      else if (r.path instanceof RegExp) {
        const match = routPath.match(r.path);
        if (match) {
          pageElement = new r.component();
          // Pass route params to the component
          pageElement.params = match.slice(1);
          break;
        }
      }

    }

    if (pageElement === null) {
      pageElement = document.createElement("h1");
      pageElement.textContent = "Page not found";
    }

    document.querySelector("main").innerHTML = null;
    document.querySelector("main").appendChild(pageElement);


  },
};
