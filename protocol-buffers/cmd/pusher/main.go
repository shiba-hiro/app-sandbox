package main

import (
	"encoding/base64"
	"flag"
	"fmt"
	"net/http"

	v1 "github.com/shiba-hiro/app-sandbox/protocol-buffers/pb-generated/pb-generated/v1"
	v2 "github.com/shiba-hiro/app-sandbox/protocol-buffers/pb-generated/pb-generated/v2"
	"google.golang.org/protobuf/proto"
)

func main() {
	destination := flag.Int("d", 0, "Destination")

	flag.Parse()

	switch *destination {
	case 1:
		b, err := proto.Marshal(
			&v1.HelloWorld{
				ExistingField: "existing field",
			},
		)
		if err != nil {
			panic(err)
		}
		sendGetRequest(
			"http://localhost:19180/one-to-two",
			base64.StdEncoding.EncodeToString(b),
		)
	case 2:
		b, err := proto.Marshal(
			&v2.HelloWorld{
				ExistingField: "existing field",
				NewField:      "new field",
			},
		)
		if err != nil {
			panic(err)
		}
		sendGetRequest(
			"http://localhost:19180/two-to-one",
			base64.StdEncoding.EncodeToString(b),
		)
	default:
		fmt.Println("Invalid destination")
	}
}

func sendGetRequest(url string, sampleHeaderValue string) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}

	req.Header.Set("sample", sampleHeaderValue)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("Failed to send GET request: %v\n", err)
		return
	}
	defer resp.Body.Close()

	fmt.Printf("GET request sent to %s\n", url)
	body := []byte{}
	_, err = resp.Body.Read(body)
	if err != nil {
		panic(err)
	}
	fmt.Printf("Response: %s\n", body)
}
