package data

import "goandjs.com/noframework/models"

type MovieStorage interface {
	GetTopMovies() ([]models.Movie, error)
	GetRandomMovies() ([]models.Movie, error)
	// getMovieByID(id int) (models.Movie, error)
	// searchMoviesByName(name string) ([]models.Movie, error)
	// getAllGenres() ([]models.Genre, error)
}
