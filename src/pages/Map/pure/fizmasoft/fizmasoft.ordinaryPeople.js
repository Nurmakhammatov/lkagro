/* eslint-disable */
// import OrdinaryPeople from "./react/ordinaryPeople"

F.OrdinaryPeople = F.Class.extend({
  options: {
    intl: null,
    isLine: null,
    geojson: null,
    radius: null,
    leftRight: null,
  },
  initialize: function (options) {
    F.setOptions(this, options);
  },
  addPopup: function (layer, isLine, radius, leftRight) {
    this.options.offset = 0;
    this.options.count = 0;
    this.options.geojson = layer.toGeoJSON();
    this.options.radius = radius;
    this.options.isLine = isLine;
    this.options.leftRight = leftRight;
    layer
      .bindPopup(() => {
        const container = L.DomUtil.create("div");
        const btn = L.DomUtil.create("button", "btn btn-primary", container);
        btn.innerText = this.options.intl.formatMessage({
          id: "OnListSeeCitizens",
        });
        L.DomEvent.on(btn, "click", this._modal, this);
        return container;
      })
      .openPopup();
  },
  _modal: function () {
    const { isLine, radius, geojson, leftRight } = this.options;
    L.control.reactWindow({
      height: "75vh",
      modalCls: "modal-dialog-centered modal-xl",
      title: this.options.intl.formatMessage({ id: "DashCitizen" }),
      scrollable: true,
      content: (
        <OrdinaryPeople
          isLine={isLine}
          radius={radius}
          geojson={geojson}
          leftRight={leftRight}
        />
      ),
      visible: true,
    });
  },
});

F.ordinaryPeople = function (options) {
  return new F.OrdinaryPeople(options);
};
