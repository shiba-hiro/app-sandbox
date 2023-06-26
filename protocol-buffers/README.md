# Protocol Buffers



## 後方互換性

https://protobuf.dev/overview/#updating-defs

https://protobuf.dev/programming-guides/proto3/#updating

https://protobuf.dev/programming-guides/dos-donts/

特に問題なくやれそう。新しいフィールドを足すだけであれば。

Go の tutorial
https://protobuf.dev/getting-started/gotutorial/



```
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```


```
protoc -I=./pb --go_out=./pb-generated ./pb/**/*.proto
```
