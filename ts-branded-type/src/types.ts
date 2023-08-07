type Brand<T, U> = T & { __brand: U };

type Id<T> = Brand<string, T>;

type User = {
  id: Id<"User">;
};

const UserId = (id: string): User["id"] => id as User["id"];

// const _failedSample: User = {
//   Type 'string' is not assignable to type 'Id<"User">'.
//   Type 'string' is not assignable to type '{ __brand: "User"; }'
//   id: "abc",
// };

const _succeededSample: User = {
  id: UserId("abc"),
};

const getUser = (id: User["id"]): User => ({ id });

// これは通らない
// getUser("abc");

// これは通る
getUser(UserId("abc"));

// これも実行できる
UserId("abc").includes("a");

const logger = (msg: string) => {
  console.log(msg);
}
// これも通る
logger(UserId("abc"));

console.log(`UserId("abc").includes("a") : ${UserId("abc").includes("a")}`);

console.log(`UserId("abc") === "abc" : ${UserId("abc") === "abc"}`);

console.log(
  `UserId("abc") === UserId("abc") : ${UserId("abc") === UserId("abc")}`
);

console.log(`typeof UserId("abc") === "string" : ${typeof UserId("abc") === "string"}`);

console.log(`!!UserId("abc") : ${!!UserId("abc")}`);

// 型定義は、直接 Brand<string, "UserId"> とかでもよいかも
