package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"slices"
	"strings"
	"time"

	"github.com/fsnotify/fsnotify"
	tsize "github.com/kopoli/go-terminal-size"
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

	if err != nil {
		log.Fatal(err)
	}

	registerDirs(true)
	
	go watchFiles()

	for range time.Tick(time.Second * 5) {
		registerDirs(false)
	}

	<-make(chan bool)
}

func registerDirs(compile bool) {
	_, currentFilePath, _, _ := runtime.Caller(1)

	dirs := []string{
		fmt.Sprintf("%v/%v", strings.Split(currentFilePath, "/infra")[0], "frontend/src/Components"),
		fmt.Sprintf("%v/%v", strings.Split(currentFilePath, "/infra")[0], "frontend/src/Pages"),
	}

	for _, dir := range dirs {
		addPathToWatcher(dir, compile)
	}
}

func addPathToWatcher(dir string, compile bool) {
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if !strings.HasSuffix(path, ".scss") {
			return nil
		}

		if (compile == true) {
			compileSass(path)
		}

		if !slices.Contains(fileWatcher.WatchList(), path) {
			return fileWatcher.Add(path)
		}

		return nil
	})

	if err != nil {
		log.Fatal(err)
	}
}

func compileSass(path string) {
	message := fmt.Sprintf("Executing command: npx sass %v %v", path, strings.Replace(path, "scss", "css", len("scss")))
	log.Println(message)

	cmd := exec.Command("npx", "sass", path, strings.Replace(path, "scss", "css", len("scss")))
	cmd.Run()

	size, err := tsize.GetSize()

	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(strings.Repeat("-", size.Width))
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
