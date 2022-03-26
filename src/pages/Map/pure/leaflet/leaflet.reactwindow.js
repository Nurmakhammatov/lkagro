/* eslint-disable */
import ReactDOM from "react-dom";
import { useState } from "react";
import L from "leaflet";
import { Box, Button, IconButton, Modal } from "@mui/material";
import { Close } from "@mui/icons-material";

const LModal = ({ options }) => {
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
  const [open, setOpen] = useState(true);
  console.log(options);
  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{ borderBottom: "1px solid black", position: "relative" }}
          >
            <h3 style={{ textAlign: "center", margin: 5 }}>{options.title}</h3>
            <hr style={{ margin: "0px 20px" }} />
            <div
              onClick={() => setOpen(false)}
              style={{
                position: "absolute",
                top: -5,
                right: 10,
                cursor: "pointer",
              }}
            >
              <IconButton color="primary" aria-label="add to shopping cart">
                <Close />
              </IconButton>
            </div>
            {options.content}
            {options.addField && (
              <>
                <hr />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    margin: "0px 10px 10px 0px",
                  }}
                >
                  <Button
                    onClick={() => setOpen(false)}
                    style={{ margin: "0px 5px" }}
                    variant="contained"
                    color="error"
                  >
                    Бекор қилиш
                  </Button>
                  <Button
                    onClick={() => options.okCb && options.okCb()}
                    style={{ margin: "0px 5px" }}
                    variant="contained"
                    color="success"
                  >
                    Сақлаш
                  </Button>
                </div>
              </>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

L.Control.ReactWindow = L.Control.extend({
  includes: L.Evented.prototype || L.Mixin.Events,

  options: {
    element: "map",
    className: "control-window",
    visible: false,
    title: undefined,
    closeButton: true,
    content: undefined,
    prompt: undefined,
    maxWidth: 600,
    modal: true,
    scrollable: false,
    draggable: false,
    position: "top",
    footerContent: null,
    carDebtHeight: false,
    addField: false,
  },
  initialize: function (options) {
    L.setOptions(this, options);
    const div = L.DomUtil.create("div");
    ReactDOM.render(
      // <Provider>
      // <IntlProviderWrapper>
      // <ThemeContext>
      <LModal options={this.options} />,
      // {/* </ThemeContext> */}
      // </IntlProviderWrapper>
      // </Provider>,
      div
    );
  },
});

L.control.reactWindow = function (options) {
  return new L.Control.ReactWindow(options);
};
