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
  searchMovies: async (q, order, genre) => {
    return await API.fetch('/movies/search/', {q, order, genre});
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
