package main

import (
	backend "app/util/lib"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

var pointDataGlobale backend.PointData
var gottenPoint []backend.Point

func handleInsert(w http.ResponseWriter, r *http.Request) {
	// Allow requests from any origin
	w.Header().Set("Access-Control-Allow-Origin", "*")

	// Allow the POST method
	w.Header().Set("Access-Control-Allow-Methods", "POST")

	// Allow the Content-Type header
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == http.MethodOptions {
		// Respond with HTTP OK status
		w.WriteHeader(http.StatusOK)
		return
	}

	// Set response content type
	w.Header().Set("Content-Type", "application/json")

	// fmt.Println(r.Method, http.MethodPost)

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	requestBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}

	// var pointData PointData
	// fmt.Println("Request body:", string(requestBody))
	if err := json.Unmarshal(requestBody, &pointDataGlobale); err != nil {
		http.Error(w, "Failed to parse request body", http.StatusBadRequest)
		return
	}

	// Log the request body
	fmt.Println("Request body:", string(requestBody))

	// Now you have access to pointData.ControlValue, pointData.IterationValue, pointData.Points
	fmt.Printf("Received data: %+v\n", pointDataGlobale)

	gottenPoint = backend.Back_Main(pointDataGlobale)
	
	// Optionally, you can send a response back to the client
	responseData := struct {
		Message     string   `json:"message"`
		GottenPoints []backend.Point `json:"gottenPoint"`
	}{
		Message:     "Received data successfully",
		GottenPoints: gottenPoint,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseData)
}

func main() {
	http.HandleFunc("/", handleInsert)
	fmt.Println("Server listening on port 8000...")
	http.ListenAndServe(":8000", nil)
}
