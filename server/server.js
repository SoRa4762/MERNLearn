//load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const {
  fetchNote,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
} = require("./controller/notesController");

//create an express app
const app = express();

//Configure express app - because it cannot read json from the body, only our db does
app.use(express.json());
app.use(cors());

//connect to db
connectToDb();

//routing
app.get("/", (req, res) => {
  res.json({ hello: "World" });
});

//get notes
app.get("/notes", fetchNotes);

//get note by id
app.get("/notes/:id", fetchNote);

//upload note
app.post("/notes", createNote);

//update note
app.put("/notes/:id", updateNote);

//delete note
app.delete("/notes/:id", deleteNote);

//start our server
app.listen(process.env.PORT);
// console.log("port", process.env.PORT);
