package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/fsnotify/fsnotify"
)

var fileWatcher *fsnotify.Watcher

func main() {
	log.Println("Starting SCSS files monitoring...")

	var err error
	fileWatcher, err = fsnotify.NewWatcher()

	if err != nil {
		log.Fatal(err)
	}

	defer fileWatcher.Close()

	registerDirs()

	go watchFiles()

	<-make(chan bool)
}

func registerDirs() {
	_, currentFilePath, _, _ := runtime.Caller(1)

	dirs := []string{
		fmt.Sprintf("%v/%v", strings.Split(currentFilePath, "/infra")[0], "frontend/src/Components"),
		fmt.Sprintf("%v/%v", strings.Split(currentFilePath, "/infra")[0], "frontend/src/Pages"),
	}

	for _, dir := range dirs {
		err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
			if !strings.HasSuffix(path, ".scss") {
				return nil
			}

			compileSass(path)
			return fileWatcher.Add(path)
		})

		if err != nil {
			log.Fatal(err)
		}
	}
}

func compileSass(path string) {
	log.Println("Executing command: npx sass", path, strings.Replace(path, "scss", "css", len("scss")))
	cmd := exec.Command("npx", "sass", path, strings.Replace(path, "scss", "css", len("scss")))

	cmd.Run()
}

func watchFiles() {
	for {
		select {
		case event := <-fileWatcher.Events:
			log.Println(event.Name)
			if !strings.HasSuffix(event.Name, ".scss") {
				return
			}

			log.Println("Compiling assets for file:", event.Name)
			compileSass(event.Name)
		case err := <-fileWatcher.Errors:
			log.Fatal(err)
		}
	}
}
