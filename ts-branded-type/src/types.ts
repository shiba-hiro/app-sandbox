type Brand<T, U> = T & { __brand: U };

type Id<T> = Brand<string, T>;

type UserId = Id<"User">;

const UserId = (id: string): UserId => id as UserId;

type User = {
  id: UserId;
};

const getUser = (id: UserId): User => ({ id });

// これは通らない
// getUser("abc");

// これは通る
getUser(UserId("abc"));

// これも実行できる
UserId("abc").includes("a");

console.log(`UserId("abc").includes("a") : ${UserId("abc").includes("a")}`);

console.log(`UserId("abc") === "abc" : ${UserId("abc") === "abc"}`);

console.log(
  `UserId("abc") === UserId("abc") : ${UserId("abc") === UserId("abc")}`
);

// type UserId = Brand<string, "UserId"> とかでもよいかも
