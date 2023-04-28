import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const NotesAccordion = ({
  note,
  handleEditClick,
  handleUpdate,
  setOpenDeleteDialog,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        sx={{ width: "100%" }}
        expanded={expanded === note._id}
        onChange={handleChange(note._id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0, fontWeight: 600 }}>
            {note.title}
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            {note?.subtitle}
          </Typography>
        </AccordionSummary>
        <Divider variant="middle" />
        <AccordionDetails
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography>{note.body}</Typography>
          <Box sx={{ display: "flex" }}>
            <IconButton onClick={() => handleEditClick(note)}>
              <AutoFixHighOutlinedIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default NotesAccordion;
