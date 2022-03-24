/*eslint-disable*/
import axios from "axios";
import F from "./fizmasoft";
// import useJwt from "@src/auth/jwt/useJwt"
// const config = useJwt.jwtConfig

F.Address = F.Class.extend({
  options: {},
  initialize: function (options) {
    F.setOptions(this, options);
  },
  addTo: function (map) {
    this._map = map;
    this._fg = L.featureGroup().addTo(this._map);
    L.control
      .search({
        // placeholder: "Қидириш",
        // placeholder: this.options.intl.formatMessage({ id: "NavSearch" }),
        searchCallback: this._onSearch,
      })
      .addTo(this._map);
  },
  _onSearch: async function (value) {
    try {
      const { data } = await axios.get(
        `${config.url}/map/search?searchQuery=${value}`
      );
      return data;
    } catch (error) {}
  },
});

F.address = function (options) {
  return new F.Address(options);
};
