const express = require("express");
//instance of all express methods
const app = express();
//connect to db
const pool = require("./db");
//Global middlware to read json type
app.use(express.json());
//routes
//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query(" SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query(" SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo(description) VALUES ($1) RETURNING*",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

//update todo
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    await pool.query(" UPDATE todo SET description = $1 WHERE todo_id = $2", [
      description,
      id,
    ]);
    res.json("Todo was updated successfully");
  } catch (error) {
    console.log(error.message);
  }
});
//delete todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(" DELETE FROM todo WHERE todo_id = $1", [id]);
    res.json("Todo was deletded successfully");
  } catch (error) {
    console.log(error.message);
  }
});
//port
const PORT = 6000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
