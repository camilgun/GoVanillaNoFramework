package handlers

import (
	"encoding/json"
	"net/http"

	"goandjs.com/noframework/data"
	"goandjs.com/noframework/logger"
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
	movies, err := h.Storage.GetRandomMovies()
	if err != nil {
		h.Logger.Error("Failed to get random movies", err)
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}
	h.writeJSONResponse(w, movies)
}
