package main

import (
	"encoding/base64"
	"fmt"
	"net/http"

	v1 "github.com/shiba-hiro/app-sandbox/protocol-buffers/pb-generated/pb-generated/v1"
	v2 "github.com/shiba-hiro/app-sandbox/protocol-buffers/pb-generated/pb-generated/v2"
	"google.golang.org/protobuf/proto"
)

func main() {
	http.HandleFunc("/one-to-two", func(w http.ResponseWriter, r *http.Request) {
		result := &v2.HelloWorld{}
		sampleHeaderValue := r.Header[http.CanonicalHeaderKey("sample")][0]
		decoded, err := base64.StdEncoding.DecodeString(sampleHeaderValue)
		if err != nil {
			fmt.Println(w, "確認失敗", err)
			return
		}
		if err := proto.Unmarshal(decoded, result); err != nil {
			panic(err)
		}
		fmt.Printf("%+v\n", result)
		fmt.Fprintln(w, "確認成功")
	})

	http.HandleFunc("/two-to-one", func(w http.ResponseWriter, r *http.Request) {
		result := &v1.HelloWorld{}
		sampleHeaderValue := r.Header[http.CanonicalHeaderKey("sample")][0]
		decoded, err := base64.StdEncoding.DecodeString(sampleHeaderValue)
		if err != nil {
			fmt.Println(w, "確認失敗", err)
			return
		}
		if err := proto.Unmarshal(decoded, result); err != nil {
			panic(err)
		}
		fmt.Printf("%+v\n", result)
		fmt.Fprintln(w, "確認成功")
	})

	http.ListenAndServe(":19180", nil)

}
