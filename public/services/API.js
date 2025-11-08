export const API = {
  baseURL: '/api',
  getTopMovies: async () => {
    return await API.fetch('/movies/top');
  },
  getRandomMovies: async () => {
    return await API.fetch('/movies/random');
  },
  getTopMovies: async () => {
    return await API.fetch('/movies/top');
  },
  getMoviesById: async (id) => {
    return await API.fetch(`/movies/${id}`);
  },
  getGenres: async () => {
    return await API.fetch('/genres');
  },
  searchMovies: async (q, order, genre) => {
    return await API.fetch('/movies/search', {q, order, genre});
  },
  register: async (name, email, password) => {
    return await API.send('/account/register/', { name, email, password });
  },
  login: async (email, password) => {
    return await API.send('/account/authenticate/', { email, password });
  },
  send: async (serviceName, data) => {
    try {
      const response = await fetch(API.baseURL + serviceName, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    }
    catch (error) {
      console.error(error);
    }
  },
  fetch: async (serviceName, args) => {
    try {
      const queryString = args ? new URLSearchParams(args).toString() : '';
      const url = API.baseURL + serviceName + (queryString ? '?' + queryString : '');
      const response = await fetch(url);
      const result = await response.json();
      return result;
    }
    catch (error) {
      console.error(error);
    }
  },
}

export default API;
