package main

import (
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"goandjs.com/noframework/data"
	"goandjs.com/noframework/handlers"
	"goandjs.com/noframework/logger"
)

func initializeLogger() *logger.Logger {
	logInstance, err := logger.NewLogger("movie.log")
	if err != nil {
		log.Fatalf("Failed to instance logger %v", err)
	}

	return logInstance
}

func main() {
	// Log initializer
	logInstance := initializeLogger()
	defer logInstance.Close()

	// Environment variables
	if err := godotenv.Load(); err != nil {
		log.Fatal("No .env file was available")
	}

	dbConnStr := os.Getenv("DATABASE_URL")
	if dbConnStr == "" {
		log.Fatal("DATABASE_URL is not set")
	}

	db, err := sql.Open("postgres", dbConnStr)
	if err != nil {
		log.Fatalf("Failed to connect to the DB %v", err)
	}
	defer db.Close()

	// Initialize Data Repositories for movies
	movieRepo, err := data.NewMovieRepository(db, logInstance)
	if err != nil {
		log.Fatalf("Failed to initialize Movie Repository: %v", err)
	}

	// Movie handlers Initializer
	movieHandler := handlers.MovieHandler{
		Storage: movieRepo,
		Logger:  logInstance,
	}

	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.HandleFunc("/api/movies/random", movieHandler.GetRandomMovies)

	http.Handle("/", http.FileServer(http.Dir("public")))

	const addr = "localhost:8080"
	err = http.ListenAndServe(addr, nil)
	if err != nil {
		logInstance.Error("Server failed", err)
		log.Fatalf("Server failed: %v", err)
	}
}
