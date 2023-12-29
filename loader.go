package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	dir := "./frontend/src/Components"
	inputSass := "./frontend/src/Pages/app.scss"

	for {
		fmt.Println("Attempting to modify files...")
		err := filepath.Walk(dir, func (path string, info os.FileInfo, err error) error {
			if err != nil {
				log.Fatal("Error trying to read path:", path)
			}

			if strings.HasSuffix(path, ".scss") == false {
				return nil
			}

			file, err := os.OpenFile(inputSass, os.O_RDWR, os.ModeAppend)

			if err != nil {
				file.Close()
				log.Fatal("Failed to Open file", inputSass)
			}

			defer file.Close()

			importStatement := fmt.Sprintf(`@import "../%v";`, strings.Split(path, "frontend/src/")[1])

			content, err := os.ReadFile(inputSass)

			if err != nil {
				file.Close()
				log.Fatal("Error reading contents of file: ", inputSass)
			}

			if strings.Contains(string(content), importStatement) {
				return nil
			}

			fmt.Println("Reading file", path, "\nTo write on", file.Name(), "\nThe import statement:", importStatement)

			newContent := fmt.Sprintf("%v\n%v", importStatement, string(content))

			_, err = file.WriteString(newContent)

			if err != nil {
				file.Close()
				log.Fatal("Failed to write on file ", file.Name(), " the import statement: ", importStatement, ".\nError: ", err.Error())
			}
	
			return nil
		})
	
		if err != nil {
			log.Fatal("Error trying to read directory:", dir)
		}

		// 2.5 minutes
		time.Sleep(150000 * time.Millisecond)
	}
}
