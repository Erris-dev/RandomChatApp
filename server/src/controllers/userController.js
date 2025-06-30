import User from "./models/User.js";

await User.create({
  username: "testuser",
  email: "test@example.com",
  password: "hashedpass",
  avatar: "https://example.com/avatar.jpg",
});

