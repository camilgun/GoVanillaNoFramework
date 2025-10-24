package main

import (
	"log"
	"net/http"

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

	logInstance := initializeLogger()
	defer logInstance.Close()

	movieHandler := handlers.MovieHandler{}

	http.HandleFunc("/api/movies/top", movieHandler.GetTopMovies)
	http.Handle("/", http.FileServer(http.Dir("public")))

	const addr = "localhost:8080"
	err := http.ListenAndServe(addr, nil)
	if err != nil {
		logInstance.Error("Server failed", err)
		log.Fatalf("Server failed: %v", err)
	}
}
