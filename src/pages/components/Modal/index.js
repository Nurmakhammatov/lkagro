import { Close } from "@mui/icons-material";
import { IconButton, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import DrawArea from "../DrawArea";
import ImageUpload from "../ImageUpload";

const ModalPrimary = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    zIndex: 9999,
    padding: 0,
  };
  return (
    <Modal
      // title={"title"}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div style={{ borderBottom: "1px solid black", position: "relative" }}>
          <h3 style={{ textAlign: "center", margin: 5 }}>Танланг</h3>
          <div
            onClick={handleClose}
            style={{
              position: "absolute",
              top: -5,
              right: 10,
              cursor: "pointer",
            }}
          >
            <IconButton color="error" aria-label="add to shopping cart">
              <Close />
            </IconButton>
          </div>
        </div>
        <div
          style={{
            padding: 10,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{ width: "45%" }}>
            <ImageUpload />
          </div>
          <div style={{ width: "45%" }}>
            <DrawArea setOpen={setOpen} />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalPrimary;
