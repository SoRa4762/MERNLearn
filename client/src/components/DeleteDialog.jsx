import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const DeleteDialog = ({ id, openDeleteDialog, handleClose, handleDelete }) => {
  return (
    <Dialog open={openDeleteDialog} onClose={handleClose}>
      <DialogTitle fontFamily={"Bruno Ace SC"} fontWeight={600}>
        Delete Note
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="success" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => {
            handleClose();
            handleDelete(id);
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
