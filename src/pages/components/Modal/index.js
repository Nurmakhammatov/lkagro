import { Close } from "@mui/icons-material";
import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const ModalPrimary = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    zIndex: 9999,
  };
  return (
    <Modal
      title={"title"}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div
          onClick={handleClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            cursor: "pointer",
          }}
        >
          <IconButton color="primary" aria-label="add to shopping cart">
            <Close />
          </IconButton>
        </div>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
};

export default ModalPrimary;