/* eslint-disable */
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
// import ReactDOM from "react-dom";
// import { useState } from "react";
// import { IntlProviderWrapper } from "../../../../../utility/context/Internationalization";
// import { ThemeContext } from "../../../../../utility/context/ThemeColors";
// import PerfectScrollbar from "react-perfect-scrollbar";
// import { Provider } from "react-redux";
// import { store } from "../../../../../redux/storeConfig/store";

const LModal = ({ options }) => {
  const [open, setOpen] = useState(true);
  return (
    <Modal isOpen={open} className={options.modalCls}>
      <ModalHeader
        toggle={() => {
          options.cancelCb && options.cancelCb();
          setOpen(false);
        }}
      >
        {options.title}
      </ModalHeader>
      <PerfectScrollbar
        style={{
          height:
            options.carDebtHeight && options.content.props.children.length > 4
              ? "700px"
              : options.carDebtHeight &&
                options.content.props.children.length > 1
              ? "400px"
              : "",
        }}
      >
        <ModalBody
          style={{ height: options.height ? options.height : "inherit" }}
        >
          {options.content}
        </ModalBody>
      </PerfectScrollbar>
      <ModalFooter>
        {options.footerContent}
        <Button
          outline
          color="primary"
          onClick={() => {
            options.okCb && options.okCb();
            setOpen(false);
          }}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
};

import L from "leaflet";

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
  },
  initialize: function (options) {
    L.setOptions(this, options);
    const div = L.DomUtil.create("div");
    ReactDOM.render(
      <Provider store={store}>
        <IntlProviderWrapper>
          <ThemeContext>
            <LModal options={this.options} />
          </ThemeContext>
        </IntlProviderWrapper>
      </Provider>,
      div
    );
  },
});

L.control.reactWindow = function (options) {
  return new L.Control.ReactWindow(options);
};
