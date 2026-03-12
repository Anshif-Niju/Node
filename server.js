import express from "express";

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

// Array to store users
let users = [];

// POST /users - Create user
app.post("/users", (req, res) => {

  const { name, email, username } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email,
    username
  };

  users.push(newUser);

  res.json({
    message: "User created successfully",
    user: newUser
  });
});


// GET /users - Get all users
app.get("/users", (req, res) => {

  res.json(users);

});


// GET /users/:id - Get specific user
app.get("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  res.json(user);

});


// PUT /users/:id - Update user
app.put("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  const user = users.find(u => u.id === id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const { name, email, username } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.username = username || user.username;

  res.json({
    message: "User updated",
    user
  });

});


// DELETE /users/:id
app.delete("/users/:id", (req, res) => {

  const id = parseInt(req.params.id);

  users = users.filter(u => u.id !== id);

  res.json({
    message: "User deleted"
  });

});


app.listen(PORT, () => {
  console.log(`Server running on port  http://localhost:3000`);
});