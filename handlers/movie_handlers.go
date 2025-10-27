package handlers

import (
	"encoding/json"
	"net/http"

	"goandjs.com/noframework/data"
	"goandjs.com/noframework/logger"
	"goandjs.com/noframework/models"
)

type MovieHandler struct {
	Storage data.MovieStorage
	Logger  *logger.Logger
}

func (h *MovieHandler) writeJSONResponse(w http.ResponseWriter, data any) {
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(data); err != nil {
		h.Logger.Error("Json encoding error", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}

}
func (h *MovieHandler) GetTopMovies(w http.ResponseWriter, r *http.Request) {
	movies, err := h.Storage.GetTopMovies()
	if err != nil {
		h.Logger.Error("Failed to get top movies", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
	h.writeJSONResponse(w, movies)
}

func (h *MovieHandler) GetRandomMovies(w http.ResponseWriter, r *http.Request) {
	movies := []models.Movie{
		{
			ID:          1,
			TMDB_ID:     101,
			Title:       "The Hacker",
			ReleaseYear: 2022,
			Genres:      []models.Genre{{ID: 1, Name: "Thriller"}},
			Keywords:    []string{"hacking", "cybercrime"},
			Casting:     []models.Actor{{ID: 1, FirstName: "John", LastName: "Doe"}},
		},
		{
			ID:          2,
			TMDB_ID:     102,
			Title:       "Space Dreams",
			ReleaseYear: 2020,
			Genres:      []models.Genre{{ID: 2, Name: "Sci-Fi"}},
			Keywords:    []string{"space", "exploration"},
			Casting:     []models.Actor{{ID: 2, FirstName: "John", LastName: "Star"}},
		},
		{
			ID:          3,
			TMDB_ID:     103,
			Title:       "The Lost City",
			ReleaseYear: 2019,
			Genres:      []models.Genre{{ID: 3, Name: "Adventure"}},
			Keywords:    []string{"jungle", "treasure"},
			Casting:     []models.Actor{{ID: 3, FirstName: "Lara", LastName: "Hunt"}},
		},
	}
	h.writeJSONResponse(w, movies)
}
