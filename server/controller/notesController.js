const Note = require("../models/note");

const fetchNotes = async (req, res) => {
  const notes = await Note.find();
  res.json({ notes }); //its actually notes: notes, we have just shortned it down.
};

const fetchNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    res.json({ note });
  } catch (err) {
    res.json({ err });
  }
};

const createNote = async (req, res) => {
  //get the sent in data off request body
  const title = req.body.title;
  const body = req.body.body;

  //create a note with it
  const note = await Note.create({
    title,
    body,
  });

  //respond with the new note
  res.json({ note });
};

const updateNote = async (req, res) => {
  const noteId = req.params.id;
  const title = req.body.title;
  const body = req.body.body;

  try {
    await Note.findByIdAndUpdate(noteId, {
      title,
      body,
    });
    //* res.json({ update: "success!" }); only one res at a time

    const note = await Note.findById(noteId);
    res.json({ note });
  } catch (err) {
    res.json({ err });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  //   try {
  await Note.deleteOne({ _id: noteId }); //* seems like i need to pass id for deleteOne, by spreading it with id and noteId
  res.json({ success: "Note Deleted!" });
  //   } catch (err) {
  //     res.json({ err: err });
  //   }
};

module.exports = {
  fetchNotes,
  fetchNote,
  createNote,
  updateNote,
  deleteNote,
};
