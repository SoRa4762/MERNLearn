import { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import NotesAccordion from "./components/NotesAccordion";
import DeleteDialog from "./components/DeleteDialog";

function App() {
  const [notes, setNotes] = useState(null);
  // const [editForm, setEditForm] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [createForm, setCreateForm] = useState({
    title: "",
    body: "",
  });
  const [updateForm, setUpdateForm] = useState({
    id: null,
    title: "",
    body: "",
  });

  const fetchNotes = async () => {
    const res = await axios.get(`http://localhost:5000/notes`);
    console.log(res);
    setNotes(res.data.notes);
  };

  const updateCreateFormField = (e) => {
    const { name, value } = e.target; //we have targeted value and name eh? no more than that.. jesus

    //we have to pass whole object everytime so we have just used spread operator here
    setCreateForm({
      ...createForm,
      [name]: value,
    });
  };

  //*create the note
  const createNote = async () => {
    const res = await axios.post("http://localhost:5000/notes", createForm);
    //update state
    setNotes([...notes, res.data.note]);
    console.log(res);
    //clear form state
    setCreateForm({ title: "", body: "" });
  };

  //*handleEdit
  const handleEditClick = (note) => {
    // setEditForm(true);
    setOpenUpdateDialog(true);
    setUpdateForm({
      id: note._id,
      title: note.title,
      body: note.body,
    });
  };

  //handle onChange update textfield
  const handleUpdateFormTextfield = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
    // console.log(updateForm);
  };

  //handle update submit
  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/notes/${id}`, {
        title: updateForm.title,
        body: updateForm.body,
      });
      console.log(res);

      const newNotes = [...notes].filter((note) => {
        return note._id !== id;
      });
      setNotes([...newNotes, res.data.note]);
    } catch (err) {
      console.log(err);
    }
  };

  //*delete Note
  const handleDelete = async (id) => {
    console.log(id);
    const res = await axios.delete(`http://localhost:5000/notes/${id}`);
    console.log(res);

    //update state
    const newNotes = [...notes].filter((note) => {
      return note._id !== id;
    });

    setNotes(newNotes);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleClose = () => {
    setOpenCreateDialog(false);
    setOpenUpdateDialog(false);
    setOpenDeleteDialog(false);
  };

  const handleOpen = () => {
    setOpenCreateDialog(true);
  };

  return (
    <Stack
      gap={2}
      alignItems={"center"}
      position={"relative"}
      sx={{
        fontFamily: "Bruno Ace SC, Open Sans, Arial, Helvetica, sans-serif",
        background: "#0f0f0f",
        // background: "linear-gradient(to right,#243b55,#141e30)",
        // background: "linear-gradient(to top, #FFBD00, #A3A300)",
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Stack gap={1}>
        <Typography
          textAlign={"center"}
          variant="h4"
          color={"white"}
          fontWeight={"bold"}
          fontFamily={"Bruno Ace SC"}
        >
          Notes
        </Typography>
        {notes &&
          notes.map((note) => {
            return (
              <Stack key={note._id} alignItems={"center"}>
                <NotesAccordion
                  note={note}
                  handleEditClick={handleEditClick}
                  handleUpdate={handleUpdate}
                  setOpenDeleteDialog={setOpenDeleteDialog}
                />

                <DeleteDialog
                  id={note._id}
                  openDeleteDialog={openDeleteDialog}
                  handleClose={handleClose}
                  handleDelete={handleDelete}
                />
              </Stack>
            );
          })}
      </Stack>

      <Tooltip title="Create a Note">
        <IconButton
          sx={{
            position: "absolute",
            bottom: "15%",
            right: "15%",
            height: "50px",
            width: "50px",
            color: "white",
            background: "#E151AF",
            "&:hover": {
              background: "#EC8FD0",
            },
          }}
          onClick={handleOpen}
        >
          <AddSharpIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Tooltip>
      <Dialog open={openCreateDialog} onClose={handleClose}>
        <DialogTitle fontFamily={"Bruno Ace SC"} fontWeight={600}>
          Create Note
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Enter title and body :)</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={updateCreateFormField}
            name="title"
          />

          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            multiline
            // rows={4}
            variant="standard"
            onChange={updateCreateFormField}
            name="body"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClose();
              createNote();
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openUpdateDialog} onClose={handleClose}>
        <DialogTitle fontFamily={"Bruno Ace SC"} fontWeight={600}>
          Update Note
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Enter title and body :)</DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleUpdateFormTextfield}
            name="title"
            value={updateForm.title}
          />

          <TextField
            autoFocus
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            multiline
            // rows={4}
            variant="standard"
            onChange={handleUpdateFormTextfield}
            name="body"
            value={updateForm.body}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              handleClose();
              handleUpdate(updateForm.id);
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default App;
